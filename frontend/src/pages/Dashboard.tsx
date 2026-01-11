import Header from "../components/Header";

export default function Dashboard() {
  // Temporary mock user (will come from backend later)
  const user = {
    name: "Vedant",
    email: "vedant@example.com",
  };

  return (
    <div>
      <Header />

      <div className="p-6">
        <h1 className="text-2xl font-semibold">
          Welcome, {user.name}
        </h1>

        <p className="text-gray-600 mt-1">
          {user.email}
        </p>
      </div>
    </div>
  );
}
