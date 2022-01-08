const _ = require('lodash');
const { Posts } = require('../models');
const { factory } = require('./baseRepository');
const commentRepository = require('./comment');
const { OMIT_FIELDS, PICK_FIELDS } = require('../utils/constant');
const postRepository = factory(Posts);

postRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, PICK_FIELDS.POST);

  return model;
};

postRepository.modelToResource = async (model) => {
  if (!model) return {};
  const resource = model.toJSON();

  return _.omit(resource, OMIT_FIELDS);
};

/**
 * Delete a post and all its comments
 * @param {string | number} id
 */
postRepository.delete = async (id) => {
  commentRepository.delete({ postId: id });

  await Posts.destroy({ where: { id } });
};

module.exports = postRepository;
