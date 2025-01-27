import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';

function DownloadStatistics( {sessions} ) {

  const countryStats = {};
  const browserStats = {};
  const deviceTypeStats = {};

  sessions.forEach((session) => {
    countryStats[session.country] = (countryStats[session.country] || 0) + 1;
    browserStats[session.browser] = (browserStats[session.browser] || 0) + 1;
    deviceTypeStats[session.deviceType] = (deviceTypeStats[session.deviceType] || 0) + 1;
  });

  // Chart Data
  const countryChartData = Object.keys(countryStats).map((key) => ({
    name: key,
    Sessions: countryStats[key],
  }));

  const browserChartData = Object.keys(browserStats).map((key) => ({
    name: key,
    Sessions: browserStats[key],
  }));

  const deviceTypeChartData = Object.keys(deviceTypeStats).map((key) => ({
    name: key,
    Sessions: deviceTypeStats[key],
  }));

  // Create PDF
  const generatePDF = async () => {
    const pdf = new jsPDF('landscape', 'mm', 'a3'); // Set A3 size and landscape orientation
    pdf.text('Analytics and Session Data', 10, 10);

    // Adding session table to PDF
    const headers = [
      ['S.No', 'IP', 'Timestamp', 'Country', 'City', 'ZIP', 'Latitude', 'Longitude', 'Start', 'End', 'Duration (sec)', 'Browser', 'Device Type', 'Platform', 'Referrer', 'ISP'],
    ];
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
      data.isp,
    ]);
    autoTable(pdf, { head: headers, body: rows });

    // Adding Charts to PDF using html2canvas
    const chartContainer = document.createElement('div');
    document.body.appendChild(chartContainer);

    const countryChart = (
      <ResponsiveContainer width="90%" height={300}>
        <BarChart data={countryChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Sessions" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );

    ReactDOM.render(countryChart, chartContainer);

    // Capture chart as image
    html2canvas(chartContainer).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 80, 200, 120); // Add the chart to the PDF at position (10, 80)
      document.body.removeChild(chartContainer); // Clean up
      pdf.save('session_data_with_analytics.pdf');
    });
  };

  return (
    <div>
      <h2>Session Analytics</h2>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Sessions by Country</h3>
        <ResponsiveContainer width="90%" height={300}>
          <BarChart data={countryChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Sessions" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <h3>Sessions by Browser</h3>
        <ResponsiveContainer width="90%" height={300}>
          <PieChart>
            <Pie
              data={browserChartData}
              dataKey="Sessions"
              nameKey="name"
              outerRadius={100}
              fill="#82ca9d"
            >
              {browserChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <h3>Sessions by Device Type</h3>
        <ResponsiveContainer width="90%" height={300}>
          <LineChart data={deviceTypeChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Sessions" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button onClick={generatePDF} style={{ padding: '10px 20px', marginTop: '20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
        Download Analytics as PDF
      </button>
    </div>
  );
}

export default DownloadStatistics;
