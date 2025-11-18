import { Router } from 'express';
import Answer from '../models/Answer.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const toDto = (a) => {
  const votes = a.votes || [];
  const upvotes = votes.filter((v) => v.value === 1).length;
  const downvotes = votes.filter((v) => v.value === -1).length;
  const score = votes.reduce((sum, v) => sum + (v.value || 0), 0);
  return {
    id: a._id,
    questionId: a.questionId,
    body: a.body,
    userId: a.userId,
    userName: a.userName,
    createdAt: a.createdAt,
    score,
    upvotes,
    downvotes
  };
};

router.get('/:questionId', async (req, res) => {
  try {
    const { questionId } = req.params;
    const answers = await Answer.find({ questionId }).sort({ createdAt: 1 });
    return res.json(answers.map(toDto));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:questionId', requireAuth, async (req, res) => {
  try {
    const { questionId } = req.params;
    const { body } = req.body || {};
    if (!body || !body.trim()) {
      return res.status(400).json({ message: 'Answer text is required' });
    }

    const answer = await Answer.create({
      questionId,
      body: body.trim(),
      userId: req.user.id,
      userName: req.user.name
    });

    return res.status(201).json(toDto(answer));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await Answer.findById(id);
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    const isOwner = String(answer.userId) === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'You can only delete your own answers' });
    }

    await answer.deleteOne();
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/vote', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body || {};
    if (value !== 1 && value !== -1) {
      return res.status(400).json({ message: 'Vote value must be 1 or -1' });
    }

    const answer = await Answer.findById(id);
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    const idx = (answer.votes || []).findIndex((v) => String(v.userId) === req.user.id);
    if (idx >= 0) {
      if (answer.votes[idx].value === value) {
        // Same vote again -> remove (unvote)
        answer.votes.splice(idx, 1);
      } else {
        answer.votes[idx].value = value;
      }
    } else {
      answer.votes.push({ userId: req.user.id, value });
    }

    await answer.save();

    
    const updated = await Answer.findById(id);
    return res.json(toDto(updated));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
