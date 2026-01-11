import express from "express";
import Problem from "../models/Problem.js";
import Progress from "../models/Progress.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Seed problems once
router.post("/seed", async (req, res) => {
    await Problem.deleteMany();

    const problems = await Problem.insertMany([
        {
            title: "Binary Search",
            topic: "Algorithms",
            leetcode: "https://leetcode.com/problems/binary-search",
            youtube: "https://youtube.com",
            article: "https://geeksforgeeks.org",
            level: "Easy",
        },
        {
            title: "Merge Sort",
            topic: "Algorithms",
            leetcode: "https://leetcode.com",
            youtube: "https://youtube.com",
            article: "https://geeksforgeeks.org",
            level: "Medium",
        },
        {
            title: "Linked List",
            topic: "Data Structures",
            leetcode: "https://leetcode.com",
            youtube: "https://youtube.com",
            article: "https://geeksforgeeks.org",
            level: "Easy",
        }
    ]);

    res.json(problems);
});


router.get("/", auth, async (req, res) => {
    const problems = await Problem.find();
    const progress = await Progress.find({ userId: req.userId });

    const progressMap = {};
    progress.forEach(p => {
        progressMap[p.problemId.toString()] = p.completed;
    });

    const result = problems.map(p => ({
        ...p.toObject(),
        completed: progressMap[p._id.toString()] || false
    }));

    res.json(result);
});

router.post("/progress", auth, async (req, res) => {
  const { problemId, completed } = req.body;

  await Progress.findOneAndUpdate(
    { userId: req.userId, problemId },
    { completed },
    { upsert: true, new: true }
  );

  res.json({ success: true });
});

router.get("/stats", auth, async (req, res) => {
  const total = await Problem.countDocuments();
  const solved = await Progress.countDocuments({
    userId: req.userId,
    completed: true
  });

  const percentage = total === 0 ? 0 : Math.round((solved / total) * 100);

  res.json({
    total,
    solved,
    percentage
  });
});

router.get("/level-stats", auth, async (req, res) => {
  const problems = await Problem.find();
  const progress = await Progress.find({
    userId: req.userId,
    completed: true
  });

  const solvedSet = new Set(progress.map(p => p.problemId.toString()));

  const stats = {
    Easy: { solved: 0, total: 0 },
    Medium: { solved: 0, total: 0 },
    Tough: { solved: 0, total: 0 }
  };

  problems.forEach(p => {
    const level = p.level?.trim();

    if (!stats[level]) return;   // ignore unknown levels safely

    stats[level].total++;

    if (solvedSet.has(p._id.toString())) {
      stats[level].solved++;
    }
  });

  res.json(stats);
});



export default router;