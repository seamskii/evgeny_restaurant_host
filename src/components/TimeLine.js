import React, { useState, useEffect } from "react";

const TimeLine = ({
  tableIndex,
  tableData,
  changeTableData,
  renewTable,
  renewOrangeTable,
  finalCheck,
  endTimeArray,
  finalCheckEndTimeARR,
  curentCustomerActive,
}) => {
  const [counter, setCounter] = useState(20);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (timer) {
      return () => clearInterval(timer);
    } else {
      const CustomerMomile = finalCheck.filter(
        (i) => i.Mobile === curentCustomerActive
      );

      if (CustomerMomile.length) {
        const checkObject = finalCheck.filter((i) =>
          i.tables.includes(tableIndex)
        );

        let today = new Date();
        let time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();

        const newFinalCheckObject = {
          Mobile: checkObject[0].Mobile,
          Diners: checkObject[0].Diners,
          tables: checkObject[0].tables,
          start_time: checkObject[0].start_time,
          end_time: time,
        };
        const clearCustomer = finalCheck.filter(
          (i) => i.Mobile !== newFinalCheckObject.Mobile
        );
        endTimeArray(clearCustomer);
        finalCheckEndTimeARR((finalCheckEndTime) => [
          ...finalCheckEndTime,
          newFinalCheckObject,
        ]);
      }

      const findTableObject = tableData.filter((i) => i.Table === tableIndex);
      const indexTableObject = tableData.indexOf(findTableObject[0]);

      const newTableObject = {
        Table: findTableObject[0].Table,
        Diners: findTableObject[0].Diners,
        Concat: findTableObject[0].Concat,
      };
      const newTable = tableData;
      newTable[indexTableObject] = newTableObject;

      changeTableData(newTable);
      renewTable(!renewOrangeTable);
    }
  }, [counter]);
  return <div>Time Left: {counter}</div>;
};
export default TimeLine;
