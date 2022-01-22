const _ = require('lodash');
const asyncMw = require('async-express-mw');
const jwtToken = require('../utils/token');
const { compare } = require('../utils/encryption');
const repository = require('../repository');
const { ACCOUNT_ROLE, ACCOUNT_STATUS } = require('../utils/constant');

exports.loginMw = asyncMw(async (req, res) => {
  const user = await repository.user.findOne({ email: req.body.email });

  if (!user) return res.status(404).json({ email: 'User not found!' });

  if (user.status == ACCOUNT_STATUS.INACTIVE)
    return res.status(401).json({ message: 'Account is inactive!' });

  const isMatch = await compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).json({ password: 'Wrong password!' });

  const newToken = jwtToken.signAccessToken(_.pick(user, ['id']));

  return res.json({
    id: user.id,
    token: newToken,
  });
});

exports.registerMw = asyncMw(async (req, res) => {
  req.body.role = ACCOUNT_ROLE.USER;
  req.body.status = ACCOUNT_STATUS.INACTIVE;

  const user = await repository.user.findOne({ email: req.body.email });

  if (user) return res.status(401).json({ message: 'Email already in use!' });

  const data = await repository.user.resourceToModel(req.body);
  await repository.user.create(data);

  return res.json({ message: 'Register success!' });
});

exports.createUserMw = asyncMw(async (req, res, next) => {
  const data = await repository.user.resourceToModel(req.body);
  req.user = await repository.user.create(data);

  return next();
});

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

exports.updateUserMw = asyncMw(async (req, res, next) => {
  const { userAuth } = req;

  if (userAuth.role !== ACCOUNT_ROLE.ADMIN) delete req.body.role;

  const data = await repository.user.resourceToModel(req.body);
  await repository.user.update(req.params.id, data);

  return next();
});

exports.deleteUserMw = asyncMw(async (req, res) => {
  await repository.user.delete(req.params.id);

  return res.json({ id: req.params.id, message: 'User deleted!' });
});

exports.returnUsersMw = asyncMw(async (req, res) => {
  const users = await Promise.all(
    _.map(req.users.rows, (user) => repository.user.modelToResource(user))
  );

  return res.json({
    rows: users,
    count: _.get(req, 'users.count', 0),
  });
});

exports.returnUserMw = asyncMw(async (req, res) => {
  return res.json(await repository.user.modelToResource(req.user));
});
