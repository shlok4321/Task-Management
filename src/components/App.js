import React from "react";
import { useState, useEffect } from "react";
import "../styles/App.css";
import TaskLog from "./TaskLog";
import ExportTasks from "./ExportTasks";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadListFromLocalStorage();
  }, []);

  function addEmptyTask(status) {
    const lastTask = tasks[tasks.length - 1];

    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }

    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        title: "",
        status: status,
      },
    ]);
  }

  function addNewTask(taskToAdd) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskToAdd.id;
    });

    let newTaskList = [...filteredTasks, taskToAdd];

    setTasks(newTaskList);

    saveListToLocalStorage(newTaskList);
  }

  function deleteTask(taskId) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(filteredTasks);

    saveListToLocalStorage(filteredTasks);
  }

  function moveTask(id, newStatus) {
    let task = tasks.filter((task) => {
      return task.id === id;
    })[0];

    let filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    task.status = newStatus;

    let newTaskList = [...filteredTasks, task];

    setTasks(newTaskList);

    saveListToLocalStorage(newTaskList);
  }

  function saveListToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadListFromLocalStorage() {
    let loadedTasks = localStorage.getItem("tasks");

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Task Management</h1>
        <ExportTasks></ExportTasks>
      </div>
      <main>
        <section>
          <TaskLog
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addNewTask={addNewTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Backlog"
          />
          <TaskLog
            tasks={tasks}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="In Progress"
          />
          <TaskLog
            tasks={tasks}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Done"
          />
        </section>
      </main>
    </div>
  );
}

export default App;
