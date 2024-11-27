import React, { useEffect,useState } from 'react'

function AllSites() {
    const [sites , setSites] = useState([])

    async function getAllSites()
    {
        let data =  await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/sites/all-sites`) 
        data = await data.json()
        setSites(data)
    }
    useEffect(()=>{
        getAllSites()
    },[])
  return (
    <div>
        <h3>All Sites</h3>
        <div  style={{textAlign:"center",height:"70vh",overflowY:"scroll"}}>
            <center>
                {
                    sites.map((site,idx)=><Site key={idx} site={site}/>)
                }
            </center>
        </div>
    </div>
  )
}

function Site({site})
{
    async function upgradeSiteToPremium(e)
    {
        e.preventDefault();
        let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/sites/upgrade-to-premium`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body : JSON.stringify( { url : site.url} )
        })

        console.log(data)
        data = await data.json()
        if(data.acknowledged)
        {
            alert("success")
        }
        else{
            alert("failed to make operation")
        }
    }
    return <div className='admin-single-user'>
        <b>{site.url}</b><br/>
        <p>owner : {site.email}</p>
        <p>views : {site.views}</p>
        <b>
            {
                site.plan&&site.plan == 'premium'?
                <b>Premium Site</b>
                :
                <div>
                    <b>normal plan</b>
                    <button onClick={(e)=>upgradeSiteToPremium(e)}>Upgrade !</button>
                </div>
            }
        </b>
    </div>
}

export default AllSites