const redis = require('redis');
const LAST_VALID_FILE_TS = "last_valid_file_ts"
const INTERVAL = 10 * 1000 // 10 seconds
const ONE_MINUTE = Number(60 * 1000) // 1 minute

const client = redis.createClient();

let normalState = true;

client.on('connect', function() {
    console.log('Redis Connected!');
});

function checkLastValidFile() {
    client.get(LAST_VALID_FILE_TS, (err, lastFileTS) => {
        if (err) throw err;
        if (Number(lastFileTS) + ONE_MINUTE >= Date.now()) {
            if (!normalState) {
                console.log('Back to normal'); //ok
            }
            normalState = true;
        } else {
            if (normalState) {
                console.warn('No new files analyzed in more than 1 minute'); // not ok
            }
            normalState = false;
        }
    });
}
setInterval(checkLastValidFile, INTERVAL);
