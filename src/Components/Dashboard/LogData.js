import React from 'react'

function LogData({logs}) {
  return (
    <div>
        <h3>LogData</h3>
        <table>
            <thead>
                <tr>
                    <th>s.no</th>
                    <th>timestamp</th>
                    <th>country</th>
                    <th>city</th>
                    <th>zip</th>
                    <th>lat</th>
                    <th>lon</th>
                    <th>browser</th>
                    <th>device type</th>
                    <th>platform</th>
                    <th>referrer</th>
                    <th>isp</th>
                </tr>
            </thead>
            <tbody>
                {
                    logs.map((data, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{data.timestamp}</td>
                            <td>{data.country}</td>
                            <td>{data.city}</td>
                            <td>{data.zip}</td>
                            <td>{data.lat}</td>
                            <td>{data.lon}</td>
                            <td>{data.browser}</td>
                            <td>{data.deviceType}</td>
                            <td>{data.platform}</td>
                            <td>{data.referrer}</td>
                            <td>{data.isp}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default LogData