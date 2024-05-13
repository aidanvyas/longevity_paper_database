import React from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';

const Graph = ({ papers, fetchCount }) => {
  const container = React.useRef(null);
  const network = React.useRef(null);

  React.useEffect(() => {
    console.log('Graph component papers prop at render:', papers); // Additional logging to check the papers prop at render time
    if (container.current && !network.current && Array.isArray(papers) && papers.length > 0) { // Ensure papers data is an array and not empty
      // Create an array with nodes
      const nodes = papers.map((paper) => {
        let id = paper.doi || `${paper.title}-${paper.authors.join(', ')}`; // Fallback to title-authors if DOI is missing
        return {
          id: id, // Use DOI or title-authors as a unique identifier for nodes
          label: paper.title,
          title: paper.authors.join(', '),
        };
      });

      // Create an array with edges
      const edges = [];
      papers.forEach((paper) => {
        let paperId = paper.doi || `${paper.title}-${paper.authors.join(', ')}`;
        if (paper.references && Array.isArray(paper.references)) { // Ensure references exist and is an array
          paper.references.forEach((reference) => {
            let referenceId = reference.DOI || `${reference.title}-${reference.authors.join(', ')}`;
            const targetNode = nodes.find((node) => node.id === referenceId);
            if (targetNode) {
              edges.push({ from: paperId, to: targetNode.id });
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
