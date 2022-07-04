import fs from "fs";
import fg from "fast-glob"
import { Graph } from 'graphlib'
function parseLinks(text) {
  const links = []
  const regex = /\[(.*?)\]\((.*?)\)/g
  let match
  while (match = regex.exec(text)) {
	links.push({
	  text: match[1],
	  url: match[2]
	})
  }
  return links
}

export async function generateGraph() {
	// // A function to parse a markdown file and return the edges
	// const parseMarkdown = async (file) => {
	// 		// Read the file
	// 		const content = fs.readFileSync(file, 'utf8')
	// }

	// Create a new undirected graph
	const g = new Graph({
		directed: false
	});

	// Get all markdown files
	const files = await fg(['**.md'], {
		cwd: '.',
		ignore: ['**/node_modules']
	})
	files.sort()


	for (const file of files) {
		// Parse the markdown file
		const content = fs.readFileSync(file, 'utf8')
		// convert the file to URI
		const links = parseLinks(content)
		// Add the edges to the graph
		for (const link of links) {
			g.setEdge(file, link.url)
		}
	}
	// read the files and add them to the graph
	// console.log(g)
	return g
}

import { json as GraphToJson } from 'graphlib'

const graph = async() => {
	const directoryGraph = await generateGraph()
	const json = JSON.stringify(GraphToJson.write(directoryGraph))

	// write the graph to a file in the build directory
	fs.writeFileSync('./pages/.vitepress/dist/graph.json', json)

	return json
}
graph()
