const express = require('express');
const passport = require('passport');
const inviteController = require('../controllers/inviteController');

const router = express.Router();

// Middleware para verificar role ADMIN
function authorizeRole(role) {
    return (req, res, next) => {
        if (req.body.role_id !== role) {
            return res.status(403);
        }
        next();
    };
}

router.post('/invite', 
    passport.authenticate('jwt', { session: false }), 
    authorizeRole(1), 
    inviteController.inviteUser
);

module.exports = router;
