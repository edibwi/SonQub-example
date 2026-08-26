const { exec } = require('child_process');

function pingHost(host) {
  // OS command injection: host is passed straight into a shell command (javascript:S4721)
  exec('ping -c 1 ' + host, (err, stdout) => {
    console.log(stdout);
  });
}

function calculateDiscount(price, customerType) {
  // High cognitive complexity from deeply nested conditionals (javascript:S3776)
  if (customerType === 'gold') {
    if (price > 100) {
      if (price > 500) {
        return price * 0.8;
      } else {
        return price * 0.85;
      }
    } else {
      if (price > 50) {
        return price * 0.9;
      } else {
        return price * 0.95;
      }
    }
  } else if (customerType === 'silver') {
    if (price > 100) {
      return price * 0.92;
    } else {
      return price * 0.97;
    }
  } else {
    return price;
  }
}

function formatUserA(user) {
  // Duplicated block #1 (javascript:S4144)
  var result = user.firstName + ' ' + user.lastName;
  result = result.trim();
  result = result.toUpperCase();
  return result;
}

function formatUserB(user) {
  // Duplicated block #2 - near-identical to formatUserA (javascript:S4144)
  var result = user.firstName + ' ' + user.lastName;
  result = result.trim();
  result = result.toUpperCase();
  return result;
}

function applyLegacyDiscount(price) {
  return price * 0.5; // magic number, no explanation (javascript:S109)
  // eslint-disable-next-line no-unreachable
  console.log('this line is unreachable dead code'); // Dead code (javascript:S1763)
}

module.exports = {
  pingHost,
  calculateDiscount,
  formatUserA,
  formatUserB,
  applyLegacyDiscount,
};
