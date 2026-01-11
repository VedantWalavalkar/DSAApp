import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Go to topics page
      window.location.href = "/topics";
    } catch (err) {
      setError("Server not reachable");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="p-6 bg-white shadow rounded w-80">
        <h2 className="text-xl mb-4 font-semibold text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="border p-2 w-full mb-4 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 w-full rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
