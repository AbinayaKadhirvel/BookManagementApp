const passport = require('passport');
const debug = require('debug')('app:local.strategy');
const { Strategy } = require('passport-local');

module.exports = function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        const user = {
            username, password
        };
        debug(username);
        done(null, user);
    }));
};
