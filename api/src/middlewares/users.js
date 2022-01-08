const _ = require('lodash');
const asyncMw = require('async-express-mw');
const jwtToken = require('../utils/token');
const { compare } = require('../utils/encryption');
const repository = require('../repository');
const { ACCOUNT_ROLE } = require('../utils/constant');

exports.authMw = asyncMw(async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).json({ message: 'Unauthorized' });

  const authorizationHeader = req.headers.authorization;

  const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];

  jwtToken.verifyAccessToken(accessToken, async (err, payload) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.userAuth = await repository.user.findOne(payload.id);

    return next();
  });
});

exports.isAdminMw = asyncMw(async (req, res, next) => {
  if (!req.userAuth || req.userAuth.role !== ACCOUNT_ROLE.ADMIN)
    return res.status(403).json({ message: 'Forbidden' });

  return next();
});

exports.getUsersMw = asyncMw(async (req, res, next) => {
  req.users = await repository.user.findAll(
    {},
    req.filterQueryParams,
    req.query
  );

  return next();
});

exports.getUserMw = asyncMw(async (req, res, next) => {
  const { userAuth } = req;

  if (userAuth.role !== ACCOUNT_ROLE.ADMIN && userAuth.id != req.params.id)
    return res.status(401).json({ message: 'Unauthorized!' });

  const user = await repository.user.findOne(req.params.id);

  if (!user) return res.status(404).json({ message: 'User not found!' });

  req.user = user;

  return next();
});

exports.loginMw = asyncMw(async (req, res) => {
  const user = await repository.user.findOne({ email: req.body.email });

  if (!user) return res.status(404).json({ email: 'User not found!' });

  const isMatch = await compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).json({ password: 'Wrong password!' });

  const newToken = jwtToken.signAccessToken(_.pick(user, ['id']));

  return res.json({
    id: user.id,
    token: newToken,
  });
});

exports.returnUsersMw = asyncMw(async (req, res) => {
  const users = await Promise.all(
    _.map(req.users, (user) => repository.user.modelToResource(user))
  );

  return res.json(users);
});

exports.returnUserMw = asyncMw(async (req, res) => {
  return res.json(await repository.user.modelToResource(req.user));
});
