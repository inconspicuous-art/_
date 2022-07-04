import './build.js'
import * as graph from './dist/graph.json'


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