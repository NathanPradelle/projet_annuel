import axios from 'axios';

/**
 * @deprecated bootstrap is trash and should be deleted
 * @returns
 */
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '4e754f6d21959e36f02f',
    cluster: 'eu',
    forceTLS: true,
});
