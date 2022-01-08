const router = require('express').Router();
const usersMw = require('../middlewares/users');
const postsMw = require('../middlewares/posts');
const commentsMw = require('../middlewares/comments');

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
// GET /api/users/:id/posts
router.get(
  '/:id/posts',
  usersMw.authMw,
  usersMw.getUserMw,
  postsMw.getPostsByUserMw,
  postsMw.returnPostsMw
);
// GET /api/users/:id/comments
router.get(
  '/:id/comments',
  usersMw.authMw,
  usersMw.getUserMw,
  commentsMw.getCommentsByUserMw,
  commentsMw.returnCommentsMw
);

module.exports = router;
