const _ = require('lodash');
const asyncMw = require('async-express-mw');
const repository = require('../repository');

exports.createPostMw = asyncMw(async (req, res, next) => {
  const { userAuth } = req;
  req.body.userId = userAuth.id;

  const data = await repository.post.resourceToModel(req.body);

  req.post = await repository.post.create(data);

  return next();
});

exports.getPostsMw = asyncMw(async (req, res, next) => {
  req.posts = await repository.post.findAll(
    {},
    req.filterQueryParams,
    req.query
  );

  return next();
});

exports.getPostMw = asyncMw(async (req, res, next) => {
  req.post = await repository.post.findOne(req.params.id);

  return next();
});

exports.getPostsByUserMw = asyncMw(async (req, res, next) => {
  req.posts = await repository.post.findAll(
    {
      userId: req.user.id,
    },
    req.filterQueryParams,
    req.query
  );

  return next();
});

exports.isPostOwnerMw = asyncMw(async (req, res, next) => {
  const { post } = req;

  if (post.userId !== req.userAuth.id)
    return res.status(401).json({ message: 'Unauthorized!' });

  return next();
});

exports.updatePostMw = asyncMw(async (req, res, next) => {
  const data = await repository.post.resourceToModel(req.body);
  await repository.post.update(req.params.id, data);

  return next();
});

exports.deletePostMw = asyncMw(async (req, res) => {
  await repository.post.delete(req.params.id);

  return res.json({ id: req.params.id, message: 'Post deleted!' });
});

exports.returnPostsMw = asyncMw(async (req, res) => {
  const posts = await Promise.all(
    _.map(req.posts.rows, (post) => repository.post.modelToResource(post))
  );

  return res.json({
    rows: posts,
    count: _.get(req, 'posts.count', 0),
  });
});

exports.returnPostMw = asyncMw(async (req, res) => {
  return res.json(await repository.post.modelToResource(req.post));
});
