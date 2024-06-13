require("dotenv").config();

const passport = require('passport');

const UserRepository = require('./src/repository/UserRepository');

const userRepository = new UserRepository();

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
};

passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    try {
        // Simulação de busca do usuário no banco de dados
        const user = userRepository.findByEmail(jwtPayload.email); // Implemente esta função
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));


module.exports = passport;
