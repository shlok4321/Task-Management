import React from "react";
import { CSVLink } from "react-csv";
import "../styles/App.css";
function ExportTasks() {
  let loadedTasks = localStorage.getItem("tasks");
  let tasks = JSON.parse(loadedTasks);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Title", key: "title" },
    { label: "Status", key: "status" },
  ];
  return (
    <CSVLink data={tasks} headers={headers} className="download">
      Download List
    </CSVLink>
  );
}

export default ExportTasks;
