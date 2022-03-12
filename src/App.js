import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./App.css";
import CustomersList from "./components/Customers/CustomersList";

const App = () => {
  const [appData, setAppData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [finalCheck, setFinalCheck] = useState([]);
  const [finalCheckEndTime, setFinalCheckEndTime] = useState([]);

  useEffect(() => {
    fetch("/customers.json")
      .then((response) => response.json())
      .then((data) => {
        setAppData(data);
      });
  }, []);

  useEffect(() => {
    fetch("/table.json")
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
      });
  }, []);

  return (
    <>
      <div>
        <CustomersList
          appData={appData}
          tableData={tableData}
          changeTableData={(tableData) => setTableData(tableData)}
          changeAppData={(appData) => setAppData(appData)}
          finalCheck={finalCheck}
          getocupateTable={(finalCheck) => setFinalCheck(finalCheck)}
          finalCheckEndTime={finalCheckEndTime}
          finalCheckEndTimeARR={(finalCheckEndTime) =>
            setFinalCheckEndTime(finalCheckEndTime)
          }
        />
      </div>
    </>
  );
};

export default App;
