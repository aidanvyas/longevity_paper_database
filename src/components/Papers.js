import React, { useState, useEffect } from 'react';
import { Box, Heading, Input, VStack } from '@chakra-ui/react';

const Papers = () => {
  const [papers, setPapers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch papers from the backend server
  const fetchPapers = async () => {
    try {
      // Update the fetch URL to the exposed backend server
      const response = await fetch('https://longevity-research-website-bqrhp4y8.devinapps.com/fetch_papers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPapers(data);
      // Log the data to the console after setting the state
      console.log('Fetched papers:', data);
    } catch (error) {
      console.error("Could not fetch papers: ", error);
    }
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Implement search functionality if needed
  };

  // Fetch papers on component mount
  useEffect(() => {
    fetchPapers();
  }, []);

  return (
    <VStack spacing={8} p={5}>
      <Heading as="h2" size="lg">
        Research Papers
      </Heading>
      <Input
        placeholder="Search for papers..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Box>
        {papers.length > 0 ? (
          papers.map((paper, index) => (
            <Box key={index}>
              <Heading as="h3" size="md">
                {paper.title}
              </Heading>
              {/* Additional paper details can be rendered here */}
            </Box>
          ))
        ) : (
          <Heading as="h3" size="md">
            No papers found.
          </Heading>
        )}
      </Box>
    </VStack>
  );
};

export default Papers;
