const _ = require('lodash');
const { Users } = require('../models');
const { factory } = require('./baseRepository');
const { OMIT_FIELDS, PICK_FIELDS } = require('../utils/constant');

const userRepository = factory(Users);

userRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, PICK_FIELDS.USER);

  // hash password/passcode if available
  if (resource.password) {
    model.password = await encrypt(resource.password);
  }

  return model;
};

userRepository.modelToResource = async (model) => {
  if (!model) return {};
  const resource = model.toJSON();

  return _.omit(resource, _.concat(['password'], OMIT_FIELDS));
};

module.exports = userRepository;
