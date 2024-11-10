function GenerateApiKey(length = 10) 
{
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let apiKey = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        apiKey += chars[randomIndex];
    }

    // Get the current timestamp
    const timestamp = Date.now();

    // Append the timestamp to the API key
    return `${apiKey}${timestamp}`;
}

module.exports = GenerateApiKey;
