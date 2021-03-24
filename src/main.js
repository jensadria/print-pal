import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';
import store from './store/index.js';

import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseOrderModal from './components/ui/BaseOrderModal.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';

const app = createApp(App);
app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-order-modal', BaseOrderModal);
app.component('base-spinner', BaseSpinner);

app.mount('#app');
