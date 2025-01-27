import React, { useEffect, useState } from 'react'
import Sites from '../common/Sites'
import Header from '../common/Header'
import { toast } from 'react-toastify'
import { FaEye } from 'react-icons/fa'
import StatCard from '../common/StatCard'
import { motion } from 'framer-motion'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import MapVisual from './MapVisual'

function LogData() {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='System Log insights' />
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <Sites />
        <SessionData />
        <Logs />
      </main>
    </div>
  )
}


function SessionData() {
  const [sessionData, setSessionData] = useState([]);
  const [individualIP, setIndividualIp] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [currentPageIP, setCurrentPageIP] = useState(1);
  const [limitIP, setLimitIP] = useState(10);

  async function getSessionData() {
    let result = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/get-sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: localStorage.getItem("email"), url: localStorage.getItem("current-site") })
    });
    result = await result.json();
    if (result.status) {
      setSessionData(result.data);
      processData(result.data);
    } else {
      toast.warning("Your account was not activated for tracking session data!");
    }
  }

  function processData(sessionData) {
    let output = [];
    let ips = {};
    sessionData.forEach((data) => {
      if (ips[data.ip] >= 0) {
        output[ips[data.ip]].cnt += 1;
      } else {
        output.push({ ip: data.ip, cnt: 1, usage: 0 });
        ips[data.ip] = output.length - 1;
      }
      if (data.end) {
        let usage_time = data.end - data.start;
        output[ips[data.ip]].usage += usage_time;
      }
    });
    setIndividualIp(output);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChangeIP = (page) => {
    setCurrentPageIP(page);
  };

  const handleLimitChangeIP = (e) => {
    setLimitIP(parseInt(e.target.value));
    setCurrentPageIP(1); // Reset to first page
  };

  useEffect(() => {
    getSessionData();
  }, []);

  // Pagination logic
  const sessionDataPaginated = sessionData.slice((currentPage - 1) * limit, currentPage * limit);
  const individualIPPaginated = individualIP.slice((currentPageIP - 1) * limitIP, currentPageIP * limitIP);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <div className="flex justify-around flex-wrap bg-gray-800 rounded-lg p-4">
        <motion.div
          className="flex justify-around gap-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Current Website" icon={FaEye} value={localStorage.getItem("current-site")} color="green" />
          <StatCard name="Total Unique IPs" icon={FaEye} value={individualIP.length} color="blue" />
          <StatCard name="Total Log Records" icon={FaEye} value={sessionData.length} color="red" />
        </motion.div>
      </div>

      <h3 className="text-xl font-bold mt-6">Session Data</h3>

      <div className="mt-4">
        <b className="text-lg">Individual IPs</b>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border border-gray-700 rounded-lg">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2">S.No</th>
                <th className="px-4 py-2">IP</th>
                <th className="px-4 py-2">Visits</th>
                <th className="px-4 py-2">Duration (sec)</th>
                <th className="px-4 py-2">Avg. Session (sec)</th>
              </tr>
            </thead>
            <tbody>
              {individualIPPaginated.map((data, idx) => (
                <tr key={idx} className="border-t border-gray-700 hover:bg-gray-800">
                  <td className="px-4 py-2">{(currentPageIP - 1) * limitIP + idx + 1}</td>
                  <td className="px-4 py-2">{data.ip}</td>
                  <td className="px-4 py-2">{data.cnt}</td>
                  <td className="px-4 py-2">{(data.usage / 1000).toFixed(2)}</td>
                  <td className="px-4 py-2">{((data.usage / 1000) / data.cnt).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <div>
              <label className="text-sm text-gray-400 mr-2">Limit:</label>
              <select
                className="bg-gray-700 text-white border border-gray-600 rounded-lg p-1"
                value={limitIP}
                onChange={handleLimitChangeIP}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div>
              <button
                className="bg-gray-700 text-white rounded-lg p-2 mx-1"
                onClick={() => handlePageChangeIP(currentPageIP - 1)}
                disabled={currentPageIP === 1}
              >
                Prev
              </button>
              <span className="text-gray-400 mx-2">{currentPageIP}</span>
              <button
                className="bg-gray-700 text-white rounded-lg p-2 mx-1"
                onClick={() => handlePageChangeIP(currentPageIP + 1)}
                disabled={currentPageIP * limitIP >= individualIP.length}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <b className="text-lg">System Logs</b>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border border-gray-700 rounded-lg">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2">S.No</th>
                <th className="px-4 py-2">IP</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Start</th>
                <th className="px-4 py-2">End</th>
                <th className="px-4 py-2">Duration (sec)</th>
              </tr>
            </thead>
            <tbody>
              {sessionDataPaginated.map((data, idx) => (
                <tr key={idx} className="border-t border-gray-700 hover:bg-gray-800">
                  <td className="px-4 py-2">{(currentPage - 1) * limit + idx + 1}</td>
                  <td className="px-4 py-2">{data.ip}</td>
                  <td className="px-4 py-2">{data.time}</td>
                  <td className="px-4 py-2">{data.start}</td>
                  <td className="px-4 py-2">{data.end}</td>
                  <td className="px-4 py-2">{data.end ? ((data.end - data.start) / 1000).toFixed(2) : "NaN"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <div>
              <label className="text-sm text-gray-400 mr-2">Limit:</label>
              <select
                className="bg-gray-700 text-white border border-gray-600 rounded-lg p-1"
                value={limit}
                onChange={handleLimitChange}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div>
              <button
                className="bg-gray-700 text-white rounded-lg p-2 mx-1"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="text-gray-400 mx-2">{currentPage}</span>
              <button
                className="bg-gray-700 text-white rounded-lg p-2 mx-1"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage * limit >= sessionData.length}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function Logs() {
  const [sessions, setSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);


  async function getSiteData() 
  {
    let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/get-sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          url: localStorage.getItem("current-site"),
        }),
      });
    data = await data.json();
    console.log(data.data);

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

  return (
    <div className="p-6   min-h-screen">
      <MapVisual locations={ sessions.filter(item => item && item.lat !== null && item.lon !== null) }/>
      {
        console.log(sessions.filter(item => item && item.lat !== null && item.lon !== null))
      }
      <h3 className="text-xl font-bold mb-4">Log Data</h3>
      {sessions.length > 0 ? (
        <>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr  >
                <th className="border px-4 py-2">S.No</th>
                <th className="border px-4 py-2">IP</th>
                <th className="border px-4 py-2">Timestamp</th>
                <th className="border px-4 py-2">Country</th>
                <th className="border px-4 py-2">City</th>
                <th className="border px-4 py-2">ZIP</th>
                <th className="border px-4 py-2">Lat</th>
                <th className="border px-4 py-2">Lon</th>
                <th className="border px-4 py-2">Start</th>
                <th className="border px-4 py-2">End</th>
                <th className="border px-4 py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {displayedSessions.map((data, idx) => (
                <tr key={idx} className={`${idx % 2 === 0 ? "bg-grey-900" : "bg-gray-800"}`}>
                  <td className="border px-4 py-2">{(currentPage - 1) * entriesPerPage + idx + 1}</td>
                  <td className="border px-4 py-2">{data.ip}</td>
                  <td className="border px-4 py-2">{data.timestamp}</td>
                  <td className="border px-4 py-2">{data.country}</td>
                  <td className="border px-4 py-2">{data.city}</td>
                  <td className="border px-4 py-2">{data.zip}</td>
                  <td className="border px-4 py-2">{data.lat}</td>
                  <td className="border px-4 py-2">{data.lon}</td>
                  <td className="border px-4 py-2">{data.start}</td>
                  <td className="border px-4 py-2">{data.end || "None"}</td>
                  <td className="border px-4 py-2">{data.end ? Math.floor((data.end - data.start) / 1000) : "None"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <div>
              <label className="mr-2">Entries per page:</label>
              <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))} className="p-2 border rounded bg-gray-900 cursor-pointer">
                {
                  [10, 20, 50, 100].map((size) => (
                    <option key={size} value={size} className='bg-gray-900 cursor-pointer'>{size}</option>
                  ))
                }
              </select>
            </div>
            <div className="space-x-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="p-2 bg-gray-500 text-white rounded disabled:opacity-50">Prev</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="p-2 bg-gray-500 text-white rounded disabled:opacity-50">Next</button>
            </div>
          </div>

          <button onClick={downloadCSV} className="m-4 p-2 bg-blue-600 text-white rounded">Download CSV</button>
          <button onClick={downloadA3PDF} className="m-4 p-2 bg-blue-600 text-white rounded">Download PDF</button>
          <button onClick={downloadJSON} className="m-4 p-2 bg-blue-600 text-white rounded">Download json</button>
        </>
      ) : (
        <p className="text-gray-700">Not enough data to show</p>
      )}
    </div>
  );
}


export default LogData;