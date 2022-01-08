const router = require('express').Router();
const usersMw = require('../middlewares/users');

// POST /api/users/login
router.post('/login', usersMw.loginMw);
// GET /api/users
router.get(
  '/',
  usersMw.authMw,
  usersMw.isAdminMw,
  usersMw.getUsersMw,
  usersMw.returnUsersMw
);
// GET /api/users/:id
router.get('/:id', usersMw.authMw, usersMw.getUserMw, usersMw.returnUserMw);

module.exports = router;
