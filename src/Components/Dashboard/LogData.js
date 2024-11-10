import React, { useEffect, useState } from 'react'
import MapVisualization from './MapVisualization'

function LogData({url}) {
    console.log("log Data inside : ",url)
    const [sessions , SetSessions] = useState([])
    async function getSiteData()
    {
        let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/get-sessions`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body : JSON.stringify( {email:localStorage.getItem('email') , url:url} )
        })
        data = await data.json()

        console.log(data, data.data)

        SetSessions(data.data)
    }

    function processData(sessionData)
    {
        let output = []
        let ips = {}
        sessionData.forEach((data)=>{
            if(ips[data.ip] >= 0)
            {
                output[ips[data.ip]].cnt += 1;
            }
            else
            {
                output.push({ ip:data.ip , cnt:1 , usage:0});
                ips[data.ip] = output.length-1;
            }
            
            if(data.end)
            {
                let usage_time = data.end - data.start;
                // usage_time = parseFloat(usage_time.toFixed(2));
                output[ips[data.ip]].usage += usage_time;
            }
        })
    }


    useEffect(()=>{
        getSiteData()
    },[])


    
  return (
    <div>
        <h3>LogData</h3>
        <MapVisualization data={sessions}/>
        {
            sessions?
            <table>
                <thead>
                    <tr>
                        <th>s.no</th>
                        <th>ip</th>
                        <th style={{width:"200px"}}>timestamp</th>
                        <th>country</th>
                        <th>city</th>
                        <th>zip</th>
                        <th>lat</th>
                        <th>lon</th>

                        <td>start</td>
                        <td>end</td>
                        <td>duration (sec)</td>

                        <th>browser</th>
                        <th>device type</th>
                        <th>platform</th>
                        <th>referrer</th>
                        <th style={{width:"400px"}} >isp</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sessions&&sessions.map((data, idx) => (
                            <tr key={idx} style={{fontSize:'12px',backgroundColor:idx%2==0?'#b8b7b7':'666565'}}>
                                <td>{idx + 1}</td>
                                <td>{data.ip}</td>
                                <td>{data.timestamp}</td>
                                <td>{data.country}</td>
                                <td>{data.city}</td>
                                <td>{data.zip}</td>
                                <td>{data.lat}</td>
                                <td>{data.lon}</td>
                                <td>{data.start}</td>
                                <td>{data.end?data.end:'None'}</td>
                                <td>{data.end?(Math.floor((data.end-data.start)/1000)):'None'}</td>
                                <td>{data.browser}</td>
                                <td>{data.deviceType}</td>
                                <td>{data.platform}</td>
                                <td>{data.referrer}</td>
                                <td style={{width:"400px"}} >{data.isp}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            :
            <b>Not enough data to show</b>
        }
    </div>
  )
}

export default LogData