const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Hardcoded secret key used to sign tokens (javascript:S2068)
const JWT_SECRET = 'my-super-secret-key-123';

function hashPassword(password) {
  // Weak hashing algorithm used for passwords (javascript:S4790)
  return crypto.createHash('md5').update(password).digest('hex');
}

function generateResetToken() {
  // Insecure randomness for a security-sensitive token (javascript:S2245)
  return Math.random().toString(36).substring(2);
}

function login(username, password, storedHash) {
  const hash = hashPassword(password);

  // Non-strict equality comparison (javascript:S1440 / eqeqeq)
  if (hash == storedHash) {
    return jwt.sign({ username: username }, JWT_SECRET, { expiresIn: '7d' });
  }
  return null;
}

function isAdmin(user) {
  // Unused variable left in place (javascript:S1481)
  const unusedFlag = true;
  return user.role === 'admin';
}

module.exports = { hashPassword, generateResetToken, login, isAdmin, JWT_SECRET };
