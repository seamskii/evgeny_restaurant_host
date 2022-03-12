import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { Table } from "antd";
import "antd/dist/antd.css";
import "./TableList.css";
import { ReactComponent as CircleOrange } from "../../Icons/CircleOrange.svg";
import { ReactComponent as Ellipse } from "../../Icons/Ellipse.svg";
import { ReactComponent as EllipseRed } from "../../Icons/EllipseRed.svg";
import { ReactComponent as Square } from "../../Icons/Square.svg";
import { ReactComponent as SquareRed } from "../../Icons/SquareRed.svg";
import { ReactComponent as Triangle } from "../../Icons/Triangle.svg";
import { ReactComponent as TriangleRed } from "../../Icons/TriangleRed.svg";
import { ReactComponent as Pentagon } from "../../Icons/Pentagon.svg";
import { ReactComponent as PentagonRed } from "../../Icons/PentagonRed.svg";
import { ReactComponent as CircleRed } from "../../Icons/CircleRed.svg";
import TimeLine from "../TimeLine";

const TablesList = ({
  tableData,
  changeTableData,
  finalCheck,
  endTimeArray,
  finalCheckEndTimeARR,
}) => {
  const [renewOrangeTable, setrenewOrangeTable] = useState(true);
  const [curentActiveTable, setCurentActiveTable] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (index) => {
    setIsModalVisible(true);
    const curentCustomer = finalCheck.filter((i) => i.tables.includes(index));
    setCurentActiveTable(curentCustomer);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columnsModal = [
    {
      title: "Mobile",
      dataIndex: "Mobile",
      key: "Mobile",
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
      key: "start_time",
      width: 150,
    },
  ];

  const handleTimeLine = (index) => {
    return (
      <div className="time-picker">
        <TimeLine
          tableIndex={index.Table}
          tableData={tableData}
          changeTableData={changeTableData}
          renewOrangeTable={renewOrangeTable}
          renewTable={(renewOrangeTable) =>
            setrenewOrangeTable(renewOrangeTable)
          }
          finalCheck={finalCheck}
          endTimeArray={endTimeArray}
          finalCheckEndTimeARR={finalCheckEndTimeARR}
          curentCustomerActive={CurenyCustomer(index)}
        />
      </div>
    );
  };


  const CurenyCustomer = (index) => {
    const CustomerMomile = finalCheck.filter((i) =>
      i.tables.includes(index.Table)
    );
    if (CustomerMomile.length) {
      return CustomerMomile[0].Mobile;
    }
  };

  const tabl1 = tableData.filter((i) => i.Diners === 1);
  const tabl2 = tableData.filter((i) => i.Diners === 2);
  const tabl3 = tableData.filter((i) => i.Diners === 3);
  const tabl4 = tableData.filter((i) => i.Diners === 4);
  const tabl5 = tableData.filter((i) => i.Diners >= 5);

  return (
    <>
      <div className="table-main">
        <div>
          <div className="table">
            {tabl1 &&
              tabl1.map((index, key) =>
                index.Active === true ? (
                  <div className="red-table">
                    {handleTimeLine(index)}
                    <div>
                      {" "}
                      <CircleRed
                        className="each-table"
                        onClick={() => showModal(index.Table)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="orange-table">
                    <CircleOrange className="each-table" />
                  </div>
                )
              )}
          </div>
          <div className="table">
            {tabl2 &&
              tabl2.map((index, key) =>
                index.Active === true ? (
                  <div className="red-table">
                    {handleTimeLine(index)}
                    <div>
                      {" "}
                      <EllipseRed
                        className="each-table"
                        onClick={() => showModal(index.Table)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="orange-table">
                    <Ellipse className="each-table" />
                  </div>
                )
              )}
          </div>

          <div className="table">
            {tabl3 &&
              tabl3.map((index, key) =>
                index.Active === true ? (
                  <div className="red-table">
                    {handleTimeLine(index)}
                    <div>
                      {" "}
                      <TriangleRed
                        className="each-table"
                        onClick={() => showModal(index.Table)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="orange-table">
                    <Triangle className="each-table" />
                  </div>
                )
              )}
          </div>

          <div className="table">
            {tabl4 &&
              tabl4.map((index, key) =>
                index.Active === true ? (
                  <div className="red-table">
                    {handleTimeLine(index)}
                    <div>
                      {" "}
                      <SquareRed
                        className="each-table"
                        onClick={() => showModal(index.Table)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="orange-table">
                    <Square className="each-table" />
                  </div>
                )
              )}
          </div>

          <div className="table">
            {tabl5 &&
              tabl5.map((index, key) =>
                index.Active === true ? (
                  <div className="red-table">
                    {handleTimeLine(index)}
                    <div>
                      {" "}
                      <PentagonRed
                        className="each-table"
                        onClick={() => showModal(index.Table)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="orange-table">
                    <Pentagon className="each-table" />
                  </div>
                )
              )}
          </div>
        </div>
      </div>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          columns={columnsModal}
          dataSource={curentActiveTable}
          pagination={false}
          scroll={false}
        />
      </Modal>
    </>
  );
};
export default TablesList;
