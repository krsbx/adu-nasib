const jwtToken = require('jsonwebtoken');

const jwtSecret = process.env.JWT_TOKEN_SECRET;

/**
 * Verify user access token
 * @param {string} token
 * @param {() => void} onComplete
 */

exports.verifyAccessToken = (token, onComplete) =>
  jwtToken.verify(token, jwtSecret, onComplete);

/**
 * Verify user access token
 * @param {string | object} payload
 * @return {string}
 */
exports.signAccessToken = (payload) =>
  jwtToken.sign(payload, jwtSecret, { expiresIn: '3h' });
