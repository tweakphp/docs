// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme'
import './style.css'
import MyLayout from "./MyLayout.vue";
import Contributors from "./components/Contributors.vue";

export default {
    extends: Theme,
    Layout: MyLayout,
    enhanceApp({ app }) {
        app.component('Contributors', Contributors);
    }
}
