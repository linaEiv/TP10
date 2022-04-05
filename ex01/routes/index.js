const express = require('express');
const auth = require('../middlewares/auth');
const { signInSchema, signUpSchema } = require('../schemas');
var router = express.Router();
const joiValidation = require('../middlewares/joiValidation');
const { login } = require('../services/login');
const { register } = require('../services/register');
const { createAsessionToken } = require('../services/utils');
const userService = require('../services/user');
const { logout } = require('../services/logout');

router.post('/login', auth.ensureSignedOut, joiValidation(signInSchema), async (req, res, next) => {

    const { email, password } = req.body;
    const user = await login(email, password);

    const token = createAsessionToken(user?._id, user?.email);
    req.session.jwt = token;

    res.json(user);

});

router.post('/register', auth.ensureSignedOut, joiValidation(signUpSchema), async (req, res, next) => {

    const createdUser = await register(req.body);
    res.json(createdUser);

});

router.get('/user/:id', auth.ensureSignedIn, async function (req, res, next) {
    const { id } = req.params;
    const result = await userService.findById(id);
    res.json(result);
});

router.post('/logout', auth.ensureSignedIn, async (req, res) => {

    const result = logout(req.session);
    res.json(result);

});

router.get('/me', auth.ensureSignedIn, async function (req, res, next) {
    const { id } = req.params;
    const result = await userService.findById(id);
    res.json(result);
});

router.post('/update-user', async (req, res) => {

    res.send('');

});

router.post('/update-password', async (req, res) => {

    res.send('');

});

router.post('/delete-user', async (req, res) => {

    res.send('');

});

module.exports = router;