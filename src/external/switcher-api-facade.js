const { Switcher } = require('switcher-client');

const switcher = Switcher.factory();

async function checkRemider(user) {
    try {
        return await switcher.isItOn('REMINDER');
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    checkRemider
}