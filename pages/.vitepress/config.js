import {generateGraph} from './build.js'
const graph = generateGraph()
// Converts [[links]] to <a> tags
const wikilinks = require('markdown-it-wikilinks')(
    //options
)

export default {
    title: 'inconspicuous.art',
    themeConfig: {
        graph: graph,
    },
    markdown: {
        config: (md) => {
            md.use(wikilinks)
        }
    },
}