export function checkLoginExpiration(ttl = 1000*60*5 ) 
{
    // ttl = 5 min
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    if (!loginTimestamp) {
        return false;
    }

    const currentTime = new Date().getTime();
    if (currentTime - loginTimestamp > ttl) {
        localStorage.clear(); 
        return false; 
    }

    return true; // Valid session
}
  
export function storeLoginTimestamp() 
{
    const loginTime = new Date().getTime();
    localStorage.setItem('loginTimestamp', loginTime);
}