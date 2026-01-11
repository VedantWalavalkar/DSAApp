import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Progress() {
    const [stats, setStats] = useState<any>(null);
    const [levels, setLevels] = useState<any>(null);


    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:5000/api/dsa/stats", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setStats(data));

        fetch("http://localhost:5000/api/dsa/level-stats", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setLevels(data));

    }, []);

    if (!stats) return null;

    return (
        <div>
            <Header />

            <div className="p-6 max-w-xl mx-auto">
                <h1 className="text-2xl font-semibold mb-4">Your Progress</h1>

                <div className="bg-white shadow rounded p-6">
                    <p>Total Problems: {stats.total}</p>
                    <p>Solved: {stats.solved}</p>
                    <p>Completion: {stats.percentage}%</p>

                    <div className="w-full bg-gray-200 rounded h-4 mt-4">
                        <div
                            className="bg-blue-600 h-4 rounded"
                            style={{ width: `${stats.percentage}%` }}
                        />
                    </div>

                    {levels && (
                        <div className="mt-6 space-y-2">
                            <p>Easy: {(levels.Easy.solved / levels.Easy.total) * 100}%</p>
                            <p>Medium: {(levels.Medium.solved/levels.Medium.total) * 100}%</p>
                            <p>Tough: {(levels.Tough.solved/levels.Tough.total)*100}%</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
