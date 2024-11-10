import React, { useEffect, useState } from 'react'

function SessionData({ url }) {
    const [sessionData , setSessionData] = useState([])
    const [individualIP , setIndividualIp] = useState([])

    async function getSessionData()
    {
        let result = await fetch("http://localhost:4000/users/get-sessions",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({ email:"gouth@gmail.com" , url:"localhost" })
        })
        result = await result.json()
        if(result.status)
        {
            setSessionData(result.data)
            console.log(result.data)
        }
        else
        {
            alert("your account was not activated for tracking session Data !")
        }
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
        
        setIndividualIp(output)
    }

    useEffect(()=>{
        getSessionData()
        processData(sessionData)
        console.log("processed !")
    },[])
  return (
    <div>
        <h3>SessionData</h3>
        <div>
            <b>individual ip's</b>
            <center>
                <table>
                    <thead>
                        <th>s.no</th>
                        <th>ip</th>
                        <th>visits</th>
                        <th>duration (sec)</th>
                        <th>avg. session (sec)</th>
                    </thead>
                    <tbody>
                        {
                            individualIP.map((data,idx)=><tr>
                                <td>{idx+1}</td>
                                <td>{data.ip}</td>
                                <td>{data.cnt}</td>
                                <td>{data.usage/1000}</td>
                                <td>{((data.usage/1000)/data.cnt)}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </center>
        </div>
        <div>
            <b>System logs</b>
            <center>
                <table>
                    <thead>
                        <th>s.no</th>
                        <th>ip</th>
                        <th>time</th>
                        <th>start</th>
                        <th>end</th>
                        <th>duration (sec)</th>
                    </thead>
                    <tbody>
                        {
                            sessionData.map((data,idx)=><tr>
                                <td>{idx+1}</td>
                                <td>{data.ip}</td>
                                <td>{data.time}</td>
                                <td>{data.start}</td>
                                <td>{data.end}</td>
                                <td>{ data.end?((data.end - data.start)/1000) : 'NaN'}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </center>
        </div>
    </div>
  )
}

export default SessionData