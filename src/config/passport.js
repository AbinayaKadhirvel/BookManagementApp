const passport = require('passport');

module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    // Store user in the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Retrieves user from the session
    passport.deserializeUser((userId, done) => {
        // find the suer by id
        done(null, userId);
    });

    require('./strategies/local.strategy');
};
