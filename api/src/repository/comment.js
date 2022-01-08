const _ = require('lodash');
const { Comments } = require('../models');
const { factory } = require('./baseRepository');
const { OMIT_FIELDS, PICK_FIELDS } = require('../utils/constant');
const commentRepository = factory(Comments);

commentRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, PICK_FIELDS.COMMENT);

  return model;
};

commentRepository.modelToResource = async (model) => {
  if (!model) return {};
  const resource = model.toJSON();

  return _.omit(resource, OMIT_FIELDS);
};

module.exports = commentRepository;
