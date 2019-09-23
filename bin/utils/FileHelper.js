const fs = require('fs');
const path = require('path');

function getTests(testDir) {
  const testFiles = [];
  fs.readdirSync(testDir)
    .filter(file => file.substr(-3) === '.js')
    .forEach((file) => {
      testFiles.push(path.join(testDir, file));
    });
  return testFiles;
}
module.exports = { getTests };
