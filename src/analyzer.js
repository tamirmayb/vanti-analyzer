const chokidar = require('chokidar');
const watcher = chokidar.watch('input', {ignored: /^\./, persistent: true});

const FILE_SUFFIX = ".batch";
const customers = ["1424", "4323", "1194"];

const run = () => {
  watcher
    .on('add', function(path) {
      analyzeFilePath(path)
    })
}

/**
 * analyzeFilePath analyzes file name and decides if it belongs to a customer
 * @param { string } path
 */
function analyzeFilePath(path) {
  if (path.endsWith(FILE_SUFFIX)) {
    let checkCustomerId = path
      .substring(path.lastIndexOf("/") + 1, path.lastIndexOf(FILE_SUFFIX));
    if(checkCustomerId) {
      const found = customers.find(c => c === checkCustomerId);
      if(found) {
        console.log('found!')
      }
    }
  }
}

module.exports = { run };
