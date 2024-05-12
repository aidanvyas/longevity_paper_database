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
    }
  }, [papers]); // Re-run effect if papers prop changes

  return (
    <div ref={container} style={{ height: '500px' }} />
  );
};

export default Graph;
