const passport = require('passport');
const debug = require('debug')('app:local.strategy');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');

module.exports = function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected correctly to the server');

                const db = client.db(dbName);
                const collection = db.collection('users');

                const user = await collection.findOne({ username });

                if (user.password === password) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (err) {
                debug(err.stack);
            }
            // To close the connection
            client.close();
        }());
    }));
};
