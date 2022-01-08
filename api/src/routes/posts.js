const router = require('express').Router();
const usersMw = require('../middlewares/users');
const postsMw = require('../middlewares/posts');

// POST /api/posts
router.post('/', usersMw.authMw, postsMw.createPostMw, postsMw.returnPostMw);
// GET /api/posts
router.get('/', usersMw.authMw, postsMw.getPostsMw, postsMw.returnPostsMw);
// GET /api/posts/:id
router.get('/:id', usersMw.authMw, postsMw.getPostMw, postsMw.returnPostMw);
// PATCH /api/posts/:id
router.put(
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
