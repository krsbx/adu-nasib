const router = require('express').Router();
const usersMw = require('../middlewares/users');
const postsMw = require('../middlewares/posts');
const commentsMw = require('../middlewares/comments');

// POST /api/posts
router.post('/', usersMw.authMw, postsMw.createPostMw, postsMw.returnPostMw);
// GET /api/posts
router.get('/', usersMw.authMw, postsMw.getPostsMw, postsMw.returnPostsMw);
// GET /api/posts/:id
router.get('/:id', usersMw.authMw, postsMw.getPostMw, postsMw.returnPostMw);
// GET /api/posts/:id/comments
router.get(
  '/:id',
  usersMw.authMw,
  postsMw.getPostMw,
  commentsMw.getCommentsByPostMw,
  commentsMw.returnCommentsMw
);
// PATCH /api/posts/:id
router.patch(
  '/:id',
  usersMw.authMw,
  postsMw.getPostMw,
  postsMw.isPostOwnerMw,
  postsMw.updatePostMw,
  postsMw.getPostMw,
  postsMw.returnPostMw
);
// DELETE /api/posts/:id
router.delete(
  '/:id',
  usersMw.authMw,
  postsMw.getPostMw,
  postsMw.isPostOwnerMw,
  postsMw.deletePostMw
);

module.exports = router;
