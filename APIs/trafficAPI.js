const express = require('express');
const trafficAPI = express.Router();

// Basic route to check if the API is reachable
trafficAPI.get('/', (req, res) => {
    res.send("trafficAPI");
});

// Increment view count for a site
trafficAPI.post('/visit1', async (req, res) => {
    try {
        const userId = req.body.url; // Assuming URL is passed in the request body
        let response = await req.sitesCollection.updateOne({ url: userId }, { $inc: { views: 1 } });
        
        if (response.modifiedCount === 0) {
            return res.status(404).json({ message: 'Site not found' });
        }
        
        res.send({ status: "success" });
    } catch (error) {
        console.error(error);
        res.send({ status: "failure at server!" });
    }
});

// Main route to handle visits and update user data
trafficAPI.post('/visit', async (req, res) => {
    try {
        const incomingData = req.body;
        const userId = incomingData.url; // Assuming the URL is the unique identifier

        // Find the existing user
        const user = await req.sitesCollection.findOne({ url: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.views += 1;

        // Date handling
        const date = new Date(incomingData.timestamp);
        const dayString = date.toISOString().split('T')[0]; // YYYY-MM-DD
        const monthString = `${date.getMonth() + 1}-${date.getFullYear()}`; // MM-YYYY

        // Update stats.daily
        const dailyStat = user.stats.daily.find(stat => stat.day === dayString);
        if (dailyStat) {
            dailyStat.cnt += 1; // Increment existing count
        } else {
            user.stats.daily.push({ day: dayString, cnt: 1 }); // Add new entry
        }

        // Update stats.monthly
        const monthlyStat = user.stats.monthly.find(stat => stat.month === monthString);
        if (monthlyStat) {
            monthlyStat.cnt += 1; // Increment existing count
        } else {
            user.stats.monthly.push({ month: monthString, cnt: 1 }); // Add new entry
        }

        // Update countrys
        const countryStat = user.countrys.find(country => country.name === incomingData.address.country);
        if (countryStat) {
            countryStat.cnt += 1; // Increment existing count
        } else {
            user.countrys.push({ name: incomingData.address.country, cnt: 1 }); // Add new entry
        }

        // Update devices
        const deviceStat = user.devices.find(device => device.type === incomingData.deviceType);
        if (deviceStat) {
            deviceStat.cnt += 1; // Increment existing count
        } else {
            user.devices.push({ type: incomingData.deviceType, cnt: 1 }); // Add new entry
        }

        // Update browsers
        const browserStat = user.browsers.find(browser => browser.name === incomingData.browser);
        if (browserStat) {
            browserStat.cnt += 1; // Increment existing count
        } else {
            user.browsers.push({ name: incomingData.browser, cnt: 1 }); // Add new entry
        }

        // Update ips
        const ipStat = user.ips.find(ip => ip.address === incomingData.ip);
        if (ipStat) {
            ipStat.cnt += 1; // Increment existing count
        } else {
            user.ips.push({ address: incomingData.ip, cnt: 1 }); // Add new entry
        }

        // Update referer url
        const referrer = user.referrers.find(referrer => referrer.referrer === incomingData.referrer);
        if (referrer) {
            referrer.cnt += 1; // Increment existing count
        } else {
            user.referrers.push({ referrer: incomingData.referrer, cnt: 1 }); // Add new entry
        }

        // Update logs
        let logsObj = {
            timestamp: incomingData.timestamp,
            country: incomingData.address.country,
            city: incomingData.address.city,
            lat: incomingData.address.lat,
            lon: incomingData.address.lon,
            browser: incomingData.browser,
            deviceType: incomingData.deviceType,
            platform: incomingData.platform,
            referrer: incomingData.referrer,
            isp: incomingData.address.isp,
            zip: incomingData.address.zip,
        }

        if(user.plan == 'premium')
        {
            logsObj.time = new Date().toUTCString();
            await req.sessionsCollection.insertOne( logsObj );
        }

        
        // user.logs.push(logsObj);

        // Save the updated user document
        await req.sitesCollection.updateOne({ url: userId }, { $set: user });
        res.send({ status: "success" });
        
    } catch (error) {
        console.error(error);
        res.send({ status: "failure at server!" });
    }
});



trafficAPI.post('/session/start', async (req, res) => {
    console.log("new session request came !")

    const { start ,ip,id,url } = req.body;

    // Store session start time in the database
    await req.sessionsCollection.insertOne({ url:url , time : new Date().toUTCString() ,  id : id, ip : ip, start:start , end: null });

    res.send({ status: 'Session started' });
});

trafficAPI.post('/session/end', async (req, res) => {

    console.log("session ended !!!")
    const { end,id } = req.body;

    // Update the latest session end time in the database
    await req.sessionsCollection.updateOne( { id : id }, { $set: { end :end } } );

    res.send({ status: 'Session ended' });
});

module.exports = trafficAPI;
