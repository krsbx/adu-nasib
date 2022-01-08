const model = require('../models');
const { encrypt } = require('../utils/encryption');
const { ACCOUNT_STATUS, ACCOUNT_ROLE } = require('../utils/constant');
const { Users } = model;

module.exports = {
  up: async () =>
    Users.bulkCreate([
      {
        email: 'admin@admin.com',
        password: await encrypt('admin'),
        username: 'Gw Admin',
        role: ACCOUNT_ROLE.ADMIN,
        status: ACCOUNT_STATUS.ACTIVE,
      },
      {
        email: 'user@user.com',
        password: await encrypt('user'),
        username: 'Gw User',
        role: ACCOUNT_ROLE.USER,
        status: ACCOUNT_STATUS.ACTIVE,
      },
    ]),
  down: async (queryInterface) => queryInterface.bulkDelete('Users', {}, null),
};
