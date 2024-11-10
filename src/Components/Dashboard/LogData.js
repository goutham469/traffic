import React, { useEffect, useState } from 'react'
import MapVisualization from './MapVisualization'
import {jsPDF} from 'jspdf'
import autoTable from 'jspdf-autotable'; // Import autoTable

function LogData({url}) {
    // console.log("log Data inside : ",url)
    const [sessions , SetSessions] = useState([])
    async function getSiteData()
    {
        let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/get-sessions`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body : JSON.stringify( {email:localStorage.getItem('email') , url:url} )
        })
        data = await data.json()

        // console.log(data, data.data)

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


    // Function to download CSV data
    function downloadCSV() 
    {
        const csvRows = [];
        const headers = ["S.No", "IP", "Timestamp", "Country", "City", "ZIP", "Lat", "Lon", "Start", "End", "Duration (sec)", "Browser", "Device Type", "Platform", "Referrer", "ISP"];
        csvRows.push(headers.join(","));

        sessions.forEach((data, index) => {
            const row = [
                index + 1,
                data.ip,
                data.timestamp,
                data.country,
                data.city,
                data.zip,
                data.lat,
                data.lon,
                data.start,
                data.end ? data.end : 'None',
                data.end ? Math.floor((data.end - data.start) / 1000) : 'None',
                data.browser,
                data.deviceType,
                data.platform,
                data.referrer,
                data.isp
            ];
            csvRows.push(row.map(value => `"${value}"`).join(","));  // Wrap each value in quotes for CSV format
        });

        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "sessions_data.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    function downloadJSON() 
    {
        const jsonContent = JSON.stringify(sessions, null, 2); // Pretty-printed JSON
    
        const blob = new Blob([jsonContent], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "session_data.json";
        link.click();
        URL.revokeObjectURL(url);
    }
    function downloadPDF() 
    {
    const pdf = new jsPDF();
    
    // Define table headers
    const headers = [
        ["S.No", "IP", "Timestamp", "Country", "City", "ZIP", "Latitude", "Longitude",
        "Start", "End", "Duration (sec)", "Browser", "Device Type", "Platform", "Referrer", "InternetSP"]
    ];
    
    // Map sessions data into rows for the table
    const rows = sessions.map((data, idx) => [
        idx + 1, 
        data.ip, 
        data.timestamp, 
        data.country, 
        data.city, 
        data.zip, 
        data.lat, 
        data.lon, 
        data.start, 
        data.end ? data.end : 'None', 
        data.end ? Math.floor((data.end - data.start) / 1000) : 'None', 
        data.browser, 
        data.deviceType, 
        data.platform, 
        data.referrer, 
        data.isp
    ]);
    
    // Add a title to the PDF
    pdf.text("Session Data", 10, 10);
    
    // Generate the table
    autoTable(pdf, {
        head: headers,
        body: rows,
        startY: 0,
        startX:0,
        theme: "grid",
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] },
        showHead: "firstPage",
        columnStyles: {
        0: { cellWidth: 8 },    // S.No column
        1: { cellWidth: 20 },    // IP column
        2: { cellWidth: 20 },    // Timestamp column
        3: { cellWidth: 10 },    // Country column
        4: { cellWidth: 10 },    // City column
        5: { cellWidth: 8 },    // ZIP column
        6: { cellWidth: 10 },    // Latitude column
        7: { cellWidth: 10 },    // Longitude column
        8: { cellWidth: 15 },    // Start column
        9: { cellWidth: 15 },    // End column
        10: { cellWidth: 8 },   // Duration column
        11: { cellWidth: 10 },   // Browser column
        12: { cellWidth: 10 },   // Device Type column
        13: { cellWidth: 10 },   // Platform column
        14: { cellWidth: 15 },   // Referrer column
        15: { cellWidth: 30 },   // ISP column
        }
    });
    
    // Save the PDF
    pdf.save("session_data.pdf");
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
                                <td>{data&&data.lat}</td>
                                <td>{data&&data.lon}</td>
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
        <button onClick={downloadCSV}>DOWNLOAD CSV formated Data</button>
        <button onClick={downloadJSON}>DOWNLOAD JSON formated Data</button>
        <button onClick={downloadPDF}>DOWNLOAD PDF formated Data</button>
    </div>
  )
}

export default LogData