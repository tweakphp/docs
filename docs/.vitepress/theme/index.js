// https://vitepress.dev/guide/custom-theme
import {h} from 'vue'
import Theme from 'vitepress/theme'
import Contributors from './components/Contributors.vue'
import './style.css'
import MyLayout from "./MyLayout.vue";

export default {
    extends: Theme,
    Layout: MyLayout,
    enhanceApp({app, router, siteData}) {
        // app.component('Component', Component)
        app.component('Contributors', Contributors)
    },
}
