const { Switcher } = require('switcher-client');

const apiKey = '$2b$08$zVI5e6oNVr3SxCmi334nZ.baCoJH3W1hiCgV4E1ZQ489M88DLvxe6';
const url = 'https://switcher-api-staging.herokuapp.com';
const environment = process.env.SWITCHER_ENV || 'default';
const domain = 'Switcher API';
const component = 'reminder-api';

Switcher.buildContext({ url, apiKey, domain, component, environment }, { silentMode: true, retryAfter: '10s', offline: true });
Switcher.loadSnapshot();