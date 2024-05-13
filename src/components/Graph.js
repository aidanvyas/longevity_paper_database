import React from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';

// Simple hash function to create unique identifiers
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
};

const Graph = ({ papers, fetchCount }) => {
  const container = React.useRef(null);
  const network = React.useRef(null);

  React.useEffect(() => {
    console.log('Graph component papers prop at render:', papers); // Additional logging to check the papers prop at render time
    if (container.current && !network.current && Array.isArray(papers) && papers.length > 0) { // Ensure papers data is an array and not empty
      // Create an array with nodes
      const nodes = [];
      const nodeIds = new Set(); // To track unique node IDs

      papers.forEach((paper) => {
        let id = paper.doi || hashString(`${paper.title}-${paper.authors.join(', ')}`); // Fallback to hashed title-authors if DOI is missing
        if (!nodeIds.has(id)) {
          nodes.push({
            id: id, // Use DOI or hashed title-authors as a unique identifier for nodes
            label: paper.title,
            title: paper.authors.join(', '),
          });
          nodeIds.add(id);
        }
      });

      // Create an array with edges
      const edges = [];
      const edgeIds = new Set(); // To track unique edge IDs

      papers.forEach((paper) => {
        let paperId = paper.doi || hashString(`${paper.title}-${paper.authors.join(', ')}`);
        if (paper.references && Array.isArray(paper.references)) { // Ensure references exist and is an array
          paper.references.forEach((reference) => {
            let referenceId = reference.DOI || hashString(`${reference.title}-${reference.authors.join(', ')}`);
            const edgeId = hashString(`${paperId}-${referenceId}`);
            if (referenceId && !edgeIds.has(edgeId)) {
              edges.push({ from: paperId, to: referenceId });
              edgeIds.add(edgeId);
            } else {
              console.warn(`Reference titled "${reference.title}" does not have a DOI and will not be included in the graph.`);
            }
          });
        }
      });

      // Provide the data in the vis format
      const data = {
        nodes: new DataSet(nodes),
        edges: new DataSet(edges),
      };

      // Initialize network!
      network.current = new Network(container.current, data, {});
      console.log('Network instance created:', network.current); // Added for debugging

      // Debugging: Log the nodes and edges to the console
      console.log('Nodes:', JSON.stringify(nodes, null, 2));
      console.log('Edges:', JSON.stringify(edges, null, 2));
      // Additional debugging: Log the papers prop to ensure it contains the correct reference data
      console.log('Papers prop:', JSON.stringify(papers, null, 2));
      console.log('Data object passed to Network:', JSON.stringify(data, null, 2)); // Added for debugging
    } else {
      console.log('Graph component did not receive an array of papers or the array was empty:', papers);
    }
  }, [papers, fetchCount]); // Re-run effect if papers prop changes or fetchCount changes

  // Conditional rendering to display the graph only if papers data is available
  return (
    Array.isArray(papers) && papers.length > 0 ? (
      <div ref={container} style={{ height: '500px' }} />
    ) : (
      <div>No data available for the graph.</div>
    )
  );
};

export default Graph;
