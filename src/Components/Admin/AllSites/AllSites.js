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
    return <div className='admin-single-user'>
        <b>{site.url}</b><br/>
        <p>owner : {site.email}</p>
        <p>views : {site.views}</p>
        <b>
            {
                site.plan&&site.plan == 'premium'?
                <b>Premium Site</b>
                :
                <b>normal plan</b>
            }
        </b>
    </div>
}

export default AllSites