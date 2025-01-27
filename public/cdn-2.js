
(async function() {
    try {
        
        // Fetch the user's public IP address
        const response = await fetch('https://api.ipify.org?format=json');
        const { ip } = await response.json();

        const response2 = await fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`);
        const locationData = await response2.json();
    
        // Initial user details
        const userData = {
            ip: ip,
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            timestamp: new Date().toISOString(),
        };

        // Detect device type based on userAgent
        let deviceType = "Unknown";
        if (/Mobi|Android/i.test(userData.userAgent)) {
            deviceType = "Mobile";
        } else if (/Tablet|iPad/i.test(userData.userAgent)) {
            deviceType = "Tablet";
        } else if (/Mac|Windows|Linux/i.test(userData.userAgent)) {
            deviceType = "Desktop";
        } else {
            deviceType = "Laptop";
        }

        // Detect browser type
        let browser = "Unknown";
        if (userData.userAgent.includes("Firefox")) {
            browser = "Firefox";
        } else if (userData.userAgent.includes("Chrome") && !userData.userAgent.includes("Edg")) {
            browser = "Chrome";
        } else if (userData.userAgent.includes("Safari") && !userData.userAgent.includes("Chrome")) {
            browser = "Safari";
        } else if (userData.userAgent.includes("Edg")) {
            browser = "Edge";
        }

        // Capture referrer for tracking sources
        const referrer = document.referrer || "Direct";

 

        const sessionStart = new Date().getTime()
        // console.log('Session started at:', sessionStart);

        function generateRandomCode(length = 40) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters[randomIndex];
            }
            return result;
        }

        const userId = generateRandomCode()
        localStorage.setItem('trafficUserId' , userId)


        // Combine all details into a single data object
        const finalData = {
            ip: userData.ip,
            deviceType,
            browser,
            referrer,
            timestamp: userData.timestamp,
            userAgent: userData.userAgent,
            language: userData.language,
            platform: userData.platform,
            address : locationData,
            url : window.location.hostname,
            
            start: sessionStart,
            id:userId
        };

        // Log the final data to verify
        // console.log(finalData);
        
        // console.log(locationData)

        
        let data = await fetch('https://traffic-production.up.railway.app/traffic/visit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalData)
        });

    } catch (error) {
        console.error('Tracking script error:', error);
    }
})();
