const _ = require('lodash');
const asyncMw = require('async-express-mw');
const repository = require('../repository');

exports.createCommentMw = asyncMw(async (req, res, next) => {
  const { userAuth } = req;
  req.body.userId = userAuth.id;

  const data = await repository.comment.resourceToModel(req.body);

  req.comment = await repository.comment.create(data);

  return next();
});

exports.getCommentsMw = asyncMw(async (req, res, next) => {
  req.comments = await repository.comment.findAll(
    {},
    req.filterQueryParams,
    req.query
  );

  return next();
});

exports.getCommentMw = asyncMw(async (req, res, next) => {
  req.comment = await repository.comment.findOne(req.params.id);

  return next();
});

exports.getCommentsByPostMw = asyncMw(async (req, res, next) => {
  req.comments = await repository.comment.findAll(
    {
      postId: req.post.id,
    },
    req.filterQueryParams,
    req.query
  );

  return next();
});

exports.getCommentsByUserMw = asyncMw(async (req, res, next) => {
  req.comments = await repository.comment.findAll(
    {
      userId: req.user.id,
    },
    req.filterQueryParams,
    req.query
  );

  return next();
});

exports.isCommentOwnerMw = asyncMw(async (req, res, next) => {
  const { comment } = req;

  if (comment.userId !== req.userAuth.id)
    return res.status(401).json({ message: 'Unauthorized!' });

  return next();
});

exports.updateCommentMw = asyncMw(async (req, res, next) => {
  const { comment } = req;

  const data = await repository.comment.resourceToModel(req.body);
  await repository.comment.update(comment.id, data);

  return next();
});

exports.deleteCommentMw = asyncMw(async (req, res) => {
  await repository.comment.delete(req.comment.id);

  return res.json({ id: req.params.id, message: 'Comment deleted!' });
});

exports.returnCommentsMw = asyncMw(async (req, res) => {
  const comments = await Promise.all(
    _.map(req.comments, (comment) =>
      repository.comment.modelToResource(comment)
    )
  );

  return res.json(comments);
});

exports.returnCommentMw = asyncMw(async (req, res) => {
  return res.json(await repository.comment.modelToResource(req.comment));
});
