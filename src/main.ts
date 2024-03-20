import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import components from "@/components/UI";
import directives from "@/directives";
import store from "@/store";
import { DirectiveBinding } from 'vue';

interface VueDirective {
    name: string;
    mounted?: (el: HTMLElement, binding: DirectiveBinding) => void;
}

const app = createApp(App)
components.forEach(c => {
    app.component(c.name, c)
})

directives.forEach((directive: VueDirective) => {
    app.directive(directive.name, directive)
})

app
    .use(router)
    .use(store)
    .mount('#app')
