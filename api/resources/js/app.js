const { default: Echo } = require('laravel-echo');

require('./bootstrap');

document.addEventListener('DOMContentLoaded', () => {
    const access_token = document.querySelector('#access_token');

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.MIX_PUSHER_APP_KEY,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        wsHost: 'localhost',
        wsPort: 6001,
        forceTLS: false,
        auth: {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    });

    window.Echo.channel('games.1')
        .listen('GameFinished', (e) => console.log(e))
})

