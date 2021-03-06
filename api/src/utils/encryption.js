const bcrypt = require('bcrypt');

exports.encrypt = async (text) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(text, salt);
};

exports.compare = async (text, encrypted) =>
  await bcrypt.compare(text, encrypted);
