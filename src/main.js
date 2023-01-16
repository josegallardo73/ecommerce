import { fetchBD } from './helpers/fetchBD.js';
import { router } from './router/router.js';

const loadApp = () => {
    fetchBD();
    location.hash = '#_home';
    router(location.hash);
}

document.addEventListener('DOMContentLoaded', loadApp);
window.addEventListener('hashchange', () => router(location.hash));


