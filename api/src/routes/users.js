const router = require('express').Router();
const usersMw = require('../middlewares/users');

router.post('/login', usersMw.loginMw);
router.get(
  '/',
  usersMw.authMw,
  usersMw.isAdminMw,
  usersMw.getUsersMw,
  usersMw.returnUsersMw
);
router.get('/:id', usersMw.authMw, usersMw.getUserMw, usersMw.returnUserMw);

module.exports = router;
