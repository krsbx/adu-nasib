const _ = require('lodash');
const { Users } = require('../models');
const { factory } = require('./baseRepository');

const userRepository = factory(Users);

userRepository.resourceToModel = async (resource) => {
  // hash password/passcode if available
  const model = _.pick(resource, ['email', 'firstName', 'lastName', 'avatar']);
  if (resource.password) {
    model.password = await encrypt(resource.password);
  }

  return model;
};

userRepository.modelToResource = async (model) => {
  if (!model) return {};
  const resource = model.toJSON();

  return _.omit(resource, ['password', 'createdAt', 'updatedAt', 'deletedAt']);
};

module.exports = userRepository;
