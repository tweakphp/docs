// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme'
import Contributors from './components/Contributors.vue'
import './style.css'
import MyLayout from "./MyLayout.vue";

export default {
    extends: Theme,
    Layout: MyLayout,
}
