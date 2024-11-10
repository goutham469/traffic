import React, { useEffect, useState } from 'react';
import { Line, Pie, Doughnut, Bar } from 'react-chartjs-2';
import { Card, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import LogData from './LogData';
import MapVisualization from './MapVisualization';
import SessionData from './SessionData';

function Dashboard() {
    const [choosenSite, setChoosenSite] = useState('');
    const [mainData, setMainData] = useState([]);

    async function getData() {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/get-stats`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: localStorage.getItem('email') })
            });
            const result = await response.json();
            if (response.ok) {
                setMainData(result.data);
            } else {
                alert("Problem at server!");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Unable to fetch data.");
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div>
                {
                    mainData ?
                    <div>
                        <b>Select a site below</b>
                        <br/>
                        <select onChange={(e) => setChoosenSite(e.target.value)} value={choosenSite}>
                            <option value="">Select a site</option>
                            {
                                mainData.map((data) => <option key={data.url} value={data.url}>{data.url}</option> )
                            }
                        </select>
                    </div>
                    :
                    <b>No sites yet, add a site domain/url to see statistics .</b>
                } 

                <Dashboard2 siteData={choosenSite ? mainData.find(data => data.url === choosenSite) : null} />
            </div>
        </div>
    );
}

function Dashboard2({ siteData }) {
    // Register the components you need
    console.log("inside Dashboard2 ",siteData,siteData&&siteData.url)
    const [logData , setLogData] = useState(false)
    const [sessionData , setSessionData] = useState(false)

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        ArcElement,
        BarElement
    );

    if (!siteData) {
        return <Typography variant="h6"> </Typography>;
    }

    const lineData = {
        labels: siteData.stats.daily.map(entry => entry.day),
        datasets: [
            {
                label: 'Daily Views',
                data: siteData.stats.daily.map(entry => entry.cnt),
                borderColor: 'green',
                fill: false,
            }
        ],
    };

    const lineDataMonth = {
        labels: siteData.stats.daily.map(entry => entry.day),
        datasets: [
            {
                label: 'Monthly Views',
                data: siteData.stats.monthly.map(entry => entry.cnt),
                borderColor: 'red',
                fill: false
            },
        ],
    };

    const pieData = {
        labels: siteData.devices.map(device => device.type),
        datasets: [
            {
                data: siteData.devices.map(device => device.cnt),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const pieDataCountry = {
        labels: siteData.countrys.map(device => device.name),
        datasets: [
            {
                data: siteData.countrys.map(country => country.cnt),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
                    '#FFCD56', '#C9CBCF', '#36A2EB', '#7E57C2', '#66BB6A', '#FFA726'
                ]
            },
        ],
    };

    const pieDataReferrer = {
        labels: siteData.referrers.map(referrer => referrer.referrer),
        datasets: [
            {
                data: siteData.referrers.map(referrer => referrer.cnt),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
                    '#FFCD56', '#C9CBCF', '#36A2EB', '#7E57C2', '#66BB6A', '#FFA726'
                ]
            },
        ],
    };

    const doughnutData = {
        labels: siteData.browsers.map(browser => browser.name),
        datasets: [
            {
                data: siteData.browsers.map(browser => browser.cnt),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom> {siteData.url}</Typography>

            <center>
                <Card style={{ padding: 20, marginBottom: 20 ,width:"300px"}}>
                    <Typography variant="h5">Total Views: {siteData.views}</Typography>
                </Card>
            </center>

            <h3>day wise views</h3>
            <div style={{display:"flex",justifyContent:"space-around"}}>
                <Card style={{ padding: "40px", marginBottom: 20, width: "600px", height: "400px", border: "2px solid black" }}>
                    <Typography variant="h6">Views Over Time</Typography>
                    <Line data={lineData} />
                </Card>

                <Card style={{ padding: "40px", marginBottom: 20, width: "600px", height: "400px", border: "2px solid black" }}>
                    <Typography variant="h6">Views Over Time</Typography>
                    <Bar data={lineData} />
                </Card>
            </div>



            <h3>month wise views</h3>
            <div style={{display:"flex",justifyContent:"space-around"}}>
                <Card style={{ padding: "40px", marginBottom: 20, width: "600px", height: "400px", border: "2px solid black" }}>
                    <Typography variant="h6">Views Over Time</Typography>
                    <Line data={lineDataMonth} />
                </Card>

                <Card style={{ padding: "40px", marginBottom: 20, width: "600px", height: "400px", border: "2px solid black" }}>
                    <Typography variant="h6">Views Over Time</Typography>
                    <Bar data={lineDataMonth} />
                </Card>
            </div>

            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Card style={{ padding: 20, margin: 20, width: "600px", border: "2px solid black" }}>
                    <Typography variant="h6">Device Distribution</Typography>
                    <Pie data={pieData} />
                </Card>

                <Card style={{ padding: 20, margin: 20, width: "600px", border: "2px solid black" }}>
                    <Typography variant="h6">Browser Distribution</Typography>
                    <Doughnut data={doughnutData} />
                </Card>

                <Card style={{ padding: 20, margin: 20, width: "500px", border: "2px solid black" }}>
                    <Typography variant="h6">Top IP Addresses</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>IP Address</TableCell>
                                <TableCell>Count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {siteData.ips.slice(0, 10).map(ip => (
                                <TableRow key={ip.address}>
                                    <TableCell>{ip.address}</TableCell>
                                    <TableCell>{ip.cnt}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ padding: 20, margin: 20, width: "600px", border: "2px solid black" }}>
                    <b>Country-wise Statistics</b>
                    <Card style={{ padding: 20, margin: 20, width: "500px", border: "2px solid black" }}>
                        <Typography variant="h6">Country Distribution</Typography>
                        <Pie data={pieDataCountry} />
                    </Card>
                    <table>
                        <thead>
                            <tr>
                                <th>s.no</th>
                                <th>Country</th>
                                <th>Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {siteData.countrys.map((data, idx) => (
                                <tr key={data.name}>
                                    <td>{idx + 1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.cnt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ padding: 20, margin: 20, width: "600px", border: "2px solid black" }}>
                    <b>Referrers</b>
                    <Card style={{ padding: 20, margin: 20, width: "500px", border: "2px solid black" }}>
                        <Typography variant="h6">Referer Distribution</Typography>
                        <Pie data={pieDataReferrer} />
                    </Card>
                    <table>
                        <thead>
                            <tr>
                                <th>s.no</th>
                                <th>Referrer</th>
                                <th>Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {siteData.referrers.map((data, idx) => (
                                <tr key={data.referrer}>
                                    <td>{idx + 1}</td>
                                    <td>{data.referrer}</td>
                                    <td>{data.cnt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* <div>
                {
                    sessionData?
                    <div>
                        <button onClick={()=>setSessionData(false)}>hide session data</button>
                        <SessionData url={siteData.url}/>
                    </div>
                    :
                    <button onClick={()=>setSessionData(true)}>show session data</button>
                }
            </div> */}
 
            <div>
                {
                    logData?
                    <div>
                        <button onClick={()=>setLogData(false)}>hide log data</button>
                        {/* <MapVisualization data={siteData.logs}/> */}
                        <LogData url={siteData.url}/>
                    </div>
                    :
                    <button onClick={()=>setLogData(true)}>show log data</button>
                }
            </div>
        </div>
    );
}

export default Dashboard;
