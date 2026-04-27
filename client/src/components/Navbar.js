import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        {!token && (
          <>
            <Link to="/">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {token && (
          <Link to="/dashboard">Dashboard</Link>
        )}
      </div>

      {token && (
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
}