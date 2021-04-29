const express = require('express');
const { checkRemider } = require('../external/switcher-api-facade');
const { auth } = require('../middleware/index');
const { Reminder } = require('../models/reminder');

const router = new express.Router();

router.post('/create', auth, async (req, res) => {
    try {
        const reminder = new Reminder(req.body);
        reminder.createdBy = req.user._id;
        await reminder.save();
        res.status(201).send(reminder);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

router.patch('/:id', auth, async (req, res) => {
    try {
        let reminder = await Reminder.findById(req.params.id);

        if (!reminder) {
            return res.status(404);
        }
        
        const updates = Object.keys(req.body);
        updates.forEach((update) => reminder[update] = req.body[update]);

        await reminder.save();
        res.send(reminder);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.id);

        if (!reminder) {
            return res.status(404);
        }

        await reminder.remove();
        res.send(reminder);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const reminders = await Reminder.find({ createdBy: req.user._id });
        res.send(reminders);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

router.get('/count', auth, async (req, res) => {
    const reminder = await checkRemider();
    const total = await Reminder.find({ createdBy: req.user._id }).countDocuments();
    res.send({ total, reminder });
})

module.exports = router;