import { useEffect, useState } from "react";
import type { Topic } from "../types/dsa";
import Header from "../components/Header";

const initialTopics: Topic[] = [
  {
    id: "algo",
    name: "Algorithms",
    problems: [
      {
        id: "a1",
        title: "Binary Search",
        level: "Easy",
        completed: false,
        leetcode: "https://leetcode.com/problems/binary-search",
        youtube: "https://youtube.com",
        article: "https://geeksforgeeks.org",
      },
      {
        id: "a2",
        title: "Merge Sort",
        level: "Medium",
        completed: true,
        leetcode: "https://leetcode.com",
        youtube: "https://youtube.com",
        article: "https://geeksforgeeks.org",
      },
    ],
  },
  {
    id: "ds",
    name: "Data Structures",
    problems: [
      {
        id: "d1",
        title: "Linked List",
        level: "Easy",
        completed: false,
        leetcode: "https://leetcode.com",
        youtube: "https://youtube.com",
        article: "https://geeksforgeeks.org",
      },
    ],
  },
];

export default function Topics() {
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>(initialTopics);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/dsa", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const grouped: any = {};

        data.forEach((p: any) => {
          if (!grouped[p.topic]) grouped[p.topic] = [];
          grouped[p.topic].push({
            id: p._id,
            title: p.title,
            level: p.level,
            completed: p.completed,
            leetcode: p.leetcode,
            youtube: p.youtube,
            article: p.article
          });
        });

        const result = Object.keys(grouped).map(topic => ({
          id: topic,
          name: topic,
          problems: grouped[topic]
        }));

        setTopics(result);
      });
  }, []);


  const toggleProblem = async (topicId: string, problemId: string) => {
    setTopics(prev =>
      prev.map(topic =>
        topic.id === topicId
          ? {
            ...topic,
            problems: topic.problems.map(p =>
              p.id === problemId
                ? { ...p, completed: !p.completed }
                : p
            ),
          }
          : topic
      )
    );

    const token = localStorage.getItem("token");

    const current = topics
      .find(t => t.id === topicId)
      ?.problems.find(p => p.id === problemId)?.completed;

    const newStatus = !current;


    await fetch("http://localhost:5000/api/dsa/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        problemId,
        completed: newStatus
      })
    });
  };

  return (
    <div>
      <Header />

      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">DSA Topics</h1>

        {topics.map(topic => (
          <div key={topic.id} className="border rounded mb-4">

            {/* Topic Header */}
            <div
              className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 hover:bg-gray-200"
              onClick={() =>
                setOpenTopic(openTopic === topic.id ? null : topic.id)
              }
            >
              <span className="font-medium">{topic.name}</span>
              <span>{openTopic === topic.id ? "▲" : "▼"}</span>
            </div>

            {/* Problems Table */}
            {openTopic === topic.id && (
              <div className="p-4 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200 text-left">
                      <th className="p-2 text-center">Done</th>
                      <th className="p-2">Name</th>
                      <th className="p-2">LeetCode</th>
                      <th className="p-2">YouTube</th>
                      <th className="p-2">Article</th>
                      <th className="p-2">Level</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {topic.problems.map(problem => (
                      <tr key={problem.id} className="border-b hover:bg-gray-50">

                        {/* Checkbox */}
                        <td className="p-2 text-center">
                          <input
                            type="checkbox"
                            checked={problem.completed}
                            onChange={() =>
                              toggleProblem(topic.id, problem.id)
                            }
                            className="h-4 w-4"
                          />
                        </td>

                        {/* Name */}
                        <td className="p-2 font-medium">{problem.title}</td>

                        <td className="p-2">
                          <a
                            href={problem.leetcode}
                            target="_blank"
                            className="text-blue-600 underline"
                          >
                            LeetCode
                          </a>
                        </td>

                        <td className="p-2">
                          <a
                            href={problem.youtube}
                            target="_blank"
                            className="text-red-600 underline"
                          >
                            YouTube
                          </a>
                        </td>

                        <td className="p-2">
                          <a
                            href={problem.article}
                            target="_blank"
                            className="text-green-600 underline"
                          >
                            Article
                          </a>
                        </td>

                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded text-xs ${problem.level === "Easy"
                              ? "bg-green-200 text-green-800"
                              : problem.level === "Medium"
                                ? "bg-yellow-200 text-yellow-800"
                                : "bg-red-200 text-red-800"
                              }`}
                          >
                            {problem.level}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${problem.completed
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                              }`}
                          >
                            {problem.completed ? "Done" : "Pending"}
                          </span>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
