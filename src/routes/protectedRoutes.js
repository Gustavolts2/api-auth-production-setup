const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Rota protegida acessada com sucesso!', userId: req.user.id });
});

module.exports = router;