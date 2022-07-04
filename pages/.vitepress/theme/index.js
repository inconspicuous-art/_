import Layout from './layouts/GraphView.vue'
// Global components
// (accessible from markdown files)
import Logo from './components/Logo.vue'
import { TroisJSVuePlugin } from 'troisjs';

// VitePress Theme
export default {
    // root component to wrap each page
    Layout,

    // this is a Vue 3 functional component
    NotFound: () => 'custom 404',

    enhanceApp({ app, router, siteData }) {
        // app is the Vue 3 app instance from `createApp()`.
        // router is VitePress' custom router. `siteData` is
        // a `ref` of current site-level metadata.
        app.component('Logo', Logo)
        app.use(TroisJSVuePlugin);
        // console.log(siteData)
    }
}