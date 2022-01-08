const router = require('express').Router();
const usersMw = require('../middlewares/users');
const commentsMw = require('../middlewares/comments');

// POST /api/comments
router.post(
  '/',
  usersMw.authMw,
  commentsMw.createCommentMw,
  commentsMw.returnCommentMw
);
// GET /api/comments
router.get(
  '/',
  usersMw.authMw,
  commentsMw.getCommentsMw,
  commentsMw.returnCommentsMw
);
// GET /api/comments/:id
router.get(
  '/',
  usersMw.authMw,
  commentsMw.getCommentMw,
  commentsMw.returnCommentsMw
);
// PATCH /api/comments/:id
router.patch(
  '/',
  usersMw.authMw,
  commentsMw.getCommentMw,
  commentsMw.isCommentOwnerMw,
  commentsMw.updateCommentMw,
  commentsMw.getCommentMw,
  commentsMw.returnCommentsMw
);
// DELETE /api/comments/:id
router.delete(
  '/',
  usersMw.authMw,
  commentsMw.getCommentMw,
  commentsMw.isCommentOwnerMw,
  commentsMw.deleteCommentMw
);

module.exports = router;
