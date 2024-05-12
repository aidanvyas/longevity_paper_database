import React from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';

const Graph = ({ papers }) => {
  const container = React.useRef(null);
  const network = React.useRef(null);

  React.useEffect(() => {
    if (container.current && !network.current) {
      // Create an array with nodes
      const nodes = papers.map((paper, index) => ({
        id: index,
        label: paper.title,
        title: paper.authors.join(', '),
      }));

      // Create an array with edges
      const edges = [];
      papers.forEach((paper, index) => {
        paper.references.forEach((reference) => {
          const targetIndex = papers.findIndex((p) => p.title === reference.title);
          if (targetIndex !== -1) {
            edges.push({ from: index, to: targetIndex });
          }
        });
      });

      // Provide the data in the vis format
      const data = {
        nodes: new DataSet(nodes),
        edges: new DataSet(edges),
      };

      // Initialize network!
      network.current = new Network(container.current, data, {});

      // Debugging: Log the nodes and edges to the console
      console.log('Nodes:', JSON.stringify(nodes, null, 2));
      console.log('Edges:', JSON.stringify(edges, null, 2));
      // Additional debugging: Log the papers prop to ensure it contains the correct reference data
      console.log('Papers prop:', JSON.stringify(papers, null, 2));
    }
  }, [papers]); // Re-run effect if papers prop changes

  return (
    <div ref={container} style={{ height: '500px' }} />
  );
};

export default Graph;
