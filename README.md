# Feeds Analyzer
### Author: Tamir Mayblat

This is the Feeds Analyzer for the BE-Exercise, developed using Nodejs.

### Prerequisite
* Redis server running and configured to default configuration (127.0.0.1:6379).
* Folder `input` in the project's root.

### Starting the analyzer
* Run `npm install` from the project's root. 
* Run `npm start`, this will start the server and connect to Redis.

The server will now listen to changes in the `input` folder. 
If a customer matching file is created the current time will be logged in Redis under key `last_valid_file_ts`.

Note, the server does not delete the files after processing them.

### The Watcher
* The Watcher is a small app design to watch and write to log if: 
  * A file has not been received for over a minute.
  * When a matching file arrives it will write to log ("Back to normal")
  * The watcher has a state boolean which prevents the same logs from being written more than one time. 

* Run `node watcher.js` from the project's root.

* Create files in the `input` folder, matching files (to customers) are: 1424.batch, 1194.batch, 4323.batch.
* Any other file will not be counted as a valid file.
* Note, the files do not have to contain anything (just an empty file is enough...).

Please let me know if anything is missing or needs modifications.

Thanks!

