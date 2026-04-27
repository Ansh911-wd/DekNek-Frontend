import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/auth/signup", form);

      alert("Signup successful");

      // 
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
 <div className="container">
  <form className="card" onSubmit={handleSubmit}>
    <h2>Signup</h2>

    <input
      placeholder="Name"
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
    />

    <input
      placeholder="Email"
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
    />

    <input
      type="password"
      placeholder="Password"
      onChange={(e) =>
        setForm({ ...form, password: e.target.value })
      }
    />

    <button>Signup</button>
  </form>
</div>
  );
}