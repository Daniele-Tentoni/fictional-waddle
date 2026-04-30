import type { App } from 'vue';
import { BButton, BContainer } from './components/index';

export * from './components/index';

export default {
    install(app: App) {
        app.component('BButton', BButton);
        app.component('BContainer', BContainer);
    },
};
