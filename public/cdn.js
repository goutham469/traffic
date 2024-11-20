(async function () {
    try {
        // Fetch the user's public IP address
        const response = await fetch('https://api.ipify.org?format=json');
        const { ip } = await response.json();

        // Fetch location data from an IP-based geolocation API
        const response2 = await fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`);
        const locationData = await response2.json();

        // Detect device type based on userAgent
        const userAgent = navigator.userAgent;
        const deviceType = /Mobi|Android/i.test(userAgent) 
            ? "Mobile" 
            : /Tablet|iPad/i.test(userAgent)
            ? "Tablet"
            : "Desktop";

        // Detect browser type
        const browser = userAgent.includes("Firefox")
            ? "Firefox"
            : userAgent.includes("Chrome") && !userAgent.includes("Edg")
            ? "Chrome"
            : userAgent.includes("Safari") && !userAgent.includes("Chrome")
            ? "Safari"
            : userAgent.includes("Edg")
            ? "Edge"
            : "Unknown";

        // Capture referrer
        const referrer = document.referrer || "Direct";

        // Generate a unique user ID
        const generateRandomCode = (length = 40) => {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
        };
        const userId = generateRandomCode();
        localStorage.setItem("trafficUserId", userId);

        // Start the session
        const sessionStart = new Date().getTime();

        // Initial user details
        const userData = {
            ip,
            userAgent,
            language: navigator.language,
            platform: navigator.platform,
            timestamp: new Date().toISOString(),
        };

        // Prepare the final data object
        let finalData = {
            ip: userData.ip,
            deviceType,
            browser,
            referrer,
            timestamp: userData.timestamp,
            userAgent: userData.userAgent,
            language: userData.language,
            platform: userData.platform,
            address: locationData,
            url: window.location.hostname,
            start: sessionStart,
            id: userId,
        };

        // Use the Geolocation API for precise location
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // Add precise geolocation to the final data
                    finalData = {
                        ...finalData,
                        preciseLocation: {
                            latitude,
                            longitude,
                        },
                    };

                    // Send data to the server
                    sendToServer(finalData);
                },
                (error) => {
                    console.error("Geolocation error:", error.message);
                    sendToServer(finalData); // Send IP-based location if geolocation fails
                }
            );
        } else {
            // console.warn("Geolocation API not supported in this browser.");
            sendToServer(finalData); // Send IP-based location if geolocation is not supported
        }

        // Function to send data to the server
        async function sendToServer(data) {
            try {
                const response = await fetch("https://traffic-production.up.railway.app/traffic/visit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                console.log("Data sent successfully:", await response.json());
            } catch (error) {
                console.error("Error sending data to the server:", error);
            }
        }
    } catch (error) {
        console.error("Tracking script error:", error);
    }
})();
