import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { Table } from "antd";
import "antd/dist/antd.css";
import TablesList from "../TabelList/TablesList";

const CustomersList = ({
  appData,
  tableData,
  changeTableData,
  changeAppData,
  finalCheck,
  getocupateTable,
  finalCheckEndTime,
  finalCheckEndTimeARR,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [curentOpenModal, setCurentOpenModal] = useState();
  const [matchTable, setMatchTable] = useState([]);
  const [objectTableData, setObjectTableData] = useState({
    key: "",
    active: "",
    index: "",
  });

  const ConcatTables = (key, active, index) => {
    setObjectTableData({ key: key, active: active, index: index });
  };
  const isTableOcupate = (index) => {
    const isTableActive = tableData.filter((i) => i.Active === true);
    const table = isTableActive.filter((i) => i.Table === index);
    return table.length > 0 ? true : false;
  };

  useEffect(() => {
    if (objectTableData.key > 0) {
      const newAppData = appData.filter((i) => i.Mobile !== curentOpenModal);
      const newOcupateTable = appData.filter(
        (i) => i.Mobile === curentOpenModal
      );
      const findTableObject = tableData.filter(
        (i) => i.Table === objectTableData.key
      );
      const indexTableObject = tableData.indexOf(findTableObject[0]);

      if (newOcupateTable.length > 0) {
        let today = new Date();
        let time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        const ocupateTable = {
          Mobile: newOcupateTable[0].Mobile,
          Diners: newOcupateTable[0].Diners,
          tables: objectTableData.index
            ? [objectTableData.index, objectTableData.key]
            : [objectTableData.key],
          start_time: time,
          end_time: false,
        };
        getocupateTable((finalCheck) => [...finalCheck, ocupateTable]);
      }

      const newTableObject = {
        Table: findTableObject[0].Table,
        Diners: findTableObject[0].Diners,
        Concat: findTableObject[0].Concat,
        Active: objectTableData.active ? true : false,
      };
      const newTable = tableData;
      newTable[indexTableObject] = newTableObject;

      changeTableData(newTable);
      changeAppData(newAppData);
      setIsModalVisible(false);
    }
  }, [objectTableData]);

  const handleChoseTable = (key, index = 0) => {
    if (!index) {
      setObjectTableData({ key: key, active: true });
    }

    if (index) {
      setTimeout(() => ConcatTables(index, true, key), 100);
      setTimeout(() => ConcatTables(key, true, index), 100);
    }
  };

  const showModal = (key) => {
    setCurentOpenModal(key.Mobile);
    const match = tableData.filter(
      (table) => table.Diners === key.Diners && table.Active !== true
    );
    setMatchTable(match);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Mobile",
      dataIndex: "Mobile",
      key: "Mobile",
      width: 150,
    },
    {
      title: "Diners",
      dataIndex: "Diners",
      width: 150,
    },
    {
      title: "Take a Table",
      dataIndex: "",
      key: "x",
      width: 150,
      render: (key) => <a onClick={() => showModal(key)}>Take a Table</a>,
    },
  ];
  const columnsFinalCheckTable = [
    {
      title: "Mobile",
      dataIndex: "Mobile",
      key: "Mobile",
      width: 150,
    },
    {
      title: "Diners",
      dataIndex: "Diners",
      width: 150,
    },
    {
      title: "Tables",
      dataIndex: "tables",
      width: 150,
      render: (dataIndex) => dataIndex.map((index) => <>{index + " "}</>),
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      width: 150,
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      width: 150,
    },
  ];

  const columnsModal = [
    {
      title: "Table",
      dataIndex: "Table",
      key: "Table",
      width: 150,
    },
    {
      title: "Concat",
      dataIndex: "Concat",
      width: 150,
      render: (dataIndex, key) =>
        dataIndex.map((index) => (
          <a onClick={() => handleChoseTable(key.Table, index)}>
            {isTableOcupate(index) ? " " : index + " "}
          </a>
        )),
    },
    {
      title: "Take a Table",
      dataIndex: "",
      key: "x",
      render: (key) => (
        <a onClick={() => handleChoseTable(key.Table)}>Take a Table</a>
      ),
    },
  ];

  return (
    <>
      <div className="main-page">
        <Table
          columns={columns}
          dataSource={appData}
          pagination={false}
          scroll={{ y: 280 }}
        />
        <Table
          columns={columnsFinalCheckTable}
          dataSource={finalCheckEndTime}
          pagination={false}
          scroll={{ y: 280 }}
        />
      </div>
      <div>
        <TablesList
          tableData={tableData}
          changeTableData={changeTableData}
          finalCheck={finalCheck}
          endTimeArray={getocupateTable}
          finalCheckEndTimeARR={finalCheckEndTimeARR}
        />
      </div>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          columns={columnsModal}
          dataSource={matchTable}
          pagination={false}
          scroll={false}
        />
      </Modal>
    </>
  );
};

export default CustomersList;
