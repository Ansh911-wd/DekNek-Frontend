import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  //  FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await API.get("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  //  ADD TASK
  const addTask = async () => {
    if (!title) return alert("Enter task");

    try {
      await API.post("/api/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      alert("Error adding task");
    }
  };

  //  DELETE TASK
  const deleteTask = async (id) => {
    try {
      await API.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Error deleting task");
    }
  };

  //  TOGGLE COMPLETE
 

  // EDIT TASK
  const editTask = async (id) => {
    const newTitle = prompt("Edit task:");
    if (!newTitle) return;

    try {
      await API.put(`/api/tasks/${id}`, { title: newTitle });
      fetchTasks();
    } catch (err) {
      alert("Error editing task");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ width: "400px" }}>
        <h2>My Tasks</h2>

        {/* ADD TASK */}
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            placeholder="Enter task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        {/* TASK LIST */}
        <div style={{ marginTop: "20px" }}>
          {tasks.map((task) => (
            <div
              key={task._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                background: task.completed ? "#d1fae5" : "#f1f5f9",
                padding: "10px",
                borderRadius: "8px"
              }}
            >
              {/* LEFT SIDE */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                
               

                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none"
                  }}
                >
                  {task.title}
                </span>
              </div>

              {/* RIGHT SIDE */}
              <div style={{ display: "flex", gap: "5px" }}>
                <button onClick={() => editTask(task._id)}>
                  Edit Tasks
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Delete Tasks
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}