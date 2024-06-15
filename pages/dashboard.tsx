import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (res.ok) {
        router.push("/login");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  return (
    <div>
      <h1>Welcome to your dashboard</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
