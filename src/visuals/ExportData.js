import React, { useState, useEffect } from 'react';
import Sites from '../common/Sites';
import Header from '../common/Header';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function ExportData() {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Export Your Data' />
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <Sites />
        <Logs />
      </main>
    </div>
  );
}

function Logs() {
  const [sessions, setSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  async function getSiteData() {
    let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/get-sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        url: localStorage.getItem("current-site"),
      }),
    });
    data = await data.json();
    setSessions(data.data);
  }

  useEffect(() => {
    getSiteData();
  }, []);

  const totalPages = Math.ceil(sessions.length / entriesPerPage);
  const displayedSessions = sessions.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Download as CSV
  function downloadCSV() {
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
        data.end ? data.end : "None",
        data.end ? Math.floor((data.end - data.start) / 1000) : "None",
        data.browser,
        data.deviceType,
        data.platform,
        data.referrer,
        data.isp,
      ];
      csvRows.push(row.map((value) => `"${value}"`).join(","));
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

  // Download as JSON
  function downloadJSON() {
    const jsonContent = JSON.stringify(sessions, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "session_data.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  // Download as PDF (A3 size)
  function downloadA3PDF() {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a3",
    });

    const headers = [
      ["S.No", "IP", "Timestamp", "Country", "City", "ZIP", "Latitude", "Longitude", "Start", "End", "Duration (sec)", "Browser", "Device Type", "Platform", "Referrer", "ISP"],
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

    pdf.text("Session Data", 10, 10);
    autoTable(pdf, {
      head: headers,
      body: rows,
      startY: 20,
      startX: 10,
      theme: "grid",
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185] },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 30 },
        2: { cellWidth: 40 },
        3: { cellWidth: 10 },
        4: { cellWidth: 20 },
        5: { cellWidth: 15 },
        6: { cellWidth: 15 },
        7: { cellWidth: 15 },
        8: { cellWidth: 30 },
        9: { cellWidth: 30 },
        10: { cellWidth: 20 },
        11: { cellWidth: 20 },
        12: { cellWidth: 20 },
        13: { cellWidth: 20 },
        14: { cellWidth: 80 },
        15: { cellWidth: 30 },
      },
    });

    pdf.save("session_data_A3.pdf");
  }

  // Download as XML
  function downloadXML() {
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<sessions>';

    sessions.forEach((data, index) => {
      xmlContent += `
      <session>
        <SNo>${index + 1}</SNo>
        <IP>${data.ip}</IP>
        <Timestamp>${data.timestamp}</Timestamp>
        <Country>${data.country}</Country>
        <City>${data.city}</City>
        <ZIP>${data.zip}</ZIP>
        <Latitude>${data.lat}</Latitude>
        <Longitude>${data.lon}</Longitude>
        <Start>${data.start}</Start>
        <End>${data.end ? data.end : 'None'}</End>
        <Duration>${data.end ? Math.floor((data.end - data.start) / 1000) : 'None'}</Duration>
        <Browser>${data.browser}</Browser>
        <DeviceType>${data.deviceType}</DeviceType>
        <Platform>${data.platform}</Platform>
        <Referrer>${data.referrer}</Referrer>
        <ISP>${data.isp}</ISP>
      </session>`;
    });

    xmlContent += "\n</sessions>";

    const blob = new Blob([xmlContent], { type: "application/xml" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sessions_data.xml";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6 min-h-screen">
      {sessions.length > 0 ? (
        <div>
          <button onClick={downloadCSV} className="m-4 p-2 bg-blue-600 text-white rounded">
            Download CSV
          </button>
          <button onClick={downloadA3PDF} className="m-4 p-2 bg-blue-600 text-white rounded">
            Download A3 PDF
          </button>
          <button onClick={downloadJSON} className="m-4 p-2 bg-blue-600 text-white rounded">
            Download JSON
          </button>
          <button onClick={downloadXML} className="m-4 p-2 bg-blue-600 text-white rounded">
            Download XML
          </button> 
        </div>
      ) : (
        <p className="text-gray-700">Not enough data to show</p>
      )}
    </div>
  );
}

export default ExportData;
