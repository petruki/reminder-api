const express = require('express');
const { auth } = require('../middleware/index');
const { User } = require('../models/user');

const router = new express.Router();

router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        const jwt = await user.generateAuthToken();

        res.status(201).send({ user, jwt });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const jwt = await user.generateAuthToken();
        res.send({ user, jwt });
    } catch (e) {
        res.status(401).send({ error: e.message });
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.token = null;
        await req.user.save();
        res.send({ message: 'Success' });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

router.get('/me', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

module.exports = router;