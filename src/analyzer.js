const chokidar = require('chokidar');
const redis = require('redis');

const LAST_VALID_FILE_TS = "last_valid_file_ts"
const FILE_SUFFIX = ".batch";
const customers = ["1424", "4323", "1194"];

const client = redis.createClient();

const run = () => {
  client.on('connect', function() {
    console.log('Redis Connected!');
  });

  const watcher = chokidar.watch('input', {ignored: /^\./, persistent: true});
  watcher
    .on('add', async function (path) {
      await analyzeFilePath(path);
    })
}

/**
 * analyzeFilePath analyzes file name and decides if it belongs to a customer
 * @param { string } path
 */
const analyzeFilePath = async (path) => {
  if (path.endsWith(FILE_SUFFIX)) {
    let checkCustomerId = path
      .substring(path.lastIndexOf("/") + 1, path.lastIndexOf(FILE_SUFFIX));
    if(checkCustomerId) {
      const found = customers.find(c => c === checkCustomerId);
      if(found) {
        await notifyValidFile();
      }
    }
  }
}

/**
 * notifyValidFile sets LAST_VALID_FILE_TS value to current time
 */
const notifyValidFile = async () => {
  client.set(LAST_VALID_FILE_TS, Date.now(), (err) => {
    if (err) throw err;
  });
}

module.exports = { run };
