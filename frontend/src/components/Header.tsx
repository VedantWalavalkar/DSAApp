import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-blue-600 text-white h-14 flex items-center px-6 justify-between">

      {/* Left */}
      <Link to="/" className="text-lg font-semibold hover:text-blue-200">
        DSA Sheet
      </Link>

      {/* Right */}
      <div className="flex gap-6 items-center text-sm font-medium">
        <Link to="/topics" className="hover:text-blue-200">Topics</Link>
        <Link to="/progress" className="hover:text-blue-200">Progress</Link>
        <span className="text-blue-100">
          {user.name}
        </span>
        <button onClick={logout} className="hover:text-red-300">
          Logout
        </button>
      </div>

    </div>
  );
}
