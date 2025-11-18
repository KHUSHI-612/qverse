import { Router } from 'express';
import Question from '../models/Question.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const search = (req.query.search || '').trim();
    const filter = {};

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const questions = await Question.find(filter).sort({ createdAt: -1 }).limit(100);

    return res.json(
      questions.map((q) => ({
        id: q._id,
        title: q.title,
        body: q.body,
        userId: q.userId,
        userName: q.userName,
        createdAt: q.createdAt
      }))
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const q = await Question.findById(id);
    if (!q) {
      return res.status(404).json({ message: 'Question not found' });
    }
    return res.json({
      id: q._id,
      title: q.title,
      body: q.body,
      userId: q.userId,
      userName: q.userName,
      createdAt: q.createdAt
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, body } = req.body || {};

    if (!title || !body) {
      return res.status(400).json({ message: 'Title and body are required' });
    }

    const question = await Question.create({
      title: title.trim(),
      body: body.trim(),
      userId: req.user.id,
      userName: req.user.name
    });

    return res.status(201).json({
      id: question._id,
      title: question.title,
      body: question.body,
      userId: question.userId,
      userName: question.userName,
      createdAt: question.createdAt
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const isOwner = String(question.userId) === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'You can only delete your own questions' });
    }

    await question.deleteOne();
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;


