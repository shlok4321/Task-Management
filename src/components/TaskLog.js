import "../styles/taskLog.css";
import Task from "./Task";
import React from "react";

export default function TaskLog(props) {
  const {
    status,
    tasks,
    addNewTask,
    deleteTask,
    addEmptyTask,
    moveTask,
  } = props;

  let taskList, tasksForStatus;

  function handleAddEmpty() {
    addEmptyTask(status);
  }

  if (tasks) {
    tasksForStatus = tasks.filter((task) => {
      return task.status === status;
    });
  }

  if (tasksForStatus) {
    taskList = tasksForStatus.map((task) => {
      return (
        <Task
          addNewTask={(task) => addNewTask(task)}
          deleteTask={(id) => deleteTask(id)}
          moveTask={(id, status) => moveTask(id, status)}
          key={task.id}
          task={task}
        />
      );
    });
  }

  return (
    <div className="taskLog">
      <h3>{status}</h3>
      {taskList}

      {status === "Backlog" && (
        <button onClick={handleAddEmpty} className="button addNewTask">
          +
        </button>
      )}
    </div>
  );
}
