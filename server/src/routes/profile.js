import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import Question from '../models/Question.js';
import Answer from '../models/Answer.js';

const router = Router();

router.get('/stats', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const questionsCount = await Question.countDocuments({ userId });

    const answers = await Answer.find({ userId });
    const answersCount = answers.length;

    let upvotes = 0;
    let downvotes = 0;

    for (const ans of answers) {
      for (const v of ans.votes || []) {
        if (v.value === 1) upvotes += 1;
        if (v.value === -1) downvotes += 1;
      }
    }

    const reputation = upvotes; 

    return res.json({ questionsCount, answersCount, upvotes, downvotes, reputation });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;

