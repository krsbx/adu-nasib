exports.ACCOUNT_ROLE = {
  ADMIN: 'admin',
  USER: 'user',
};

exports.ACCOUNT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

exports.OMIT_FIELDS = ['createdAt', 'updatedAt', 'deletedAt'];
exports.PICK_FIELDS = {
  USER: ['email', 'password', 'username', 'role', 'status'],
  POST: ['message', 'userId'],
  COMMENT: ['message', 'userId', 'postId'],
};
