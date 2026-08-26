const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

function readUserFile(filename) {
  // Path traversal: filename is not sanitized before being joined (javascript:S6096)
  const fullPath = UPLOAD_DIR + '/' + filename;
  // Synchronous fs call blocks the event loop (javascript:S4123-style perf smell)
  const contents = fs.readFileSync(fullPath, 'utf8');
  return contents;
}

function runTemplate(userExpression) {
  // Dynamic code execution from user input (javascript:S1523)
  return eval(userExpression);
}

module.exports = { readUserFile, runTemplate };
