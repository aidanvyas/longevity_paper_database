import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Flex } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home'; // Import the Home component
import Papers from './components/Papers'; // Import the Papers component
import About from './components/About'; // Import the About component
import Graph from './components/Graph'; // Import the Graph component
import PaperDetail from './components/PaperDetail'; // Import the PaperDetail component

function App() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  // Function to fetch papers from the backend server
  const fetchPapers = async () => {
    console.log('Starting fetchPapers function'); // Added for debugging
    try {
      const response = await fetch('https://longevity-research-website-bqrhp4y8.devinapps.com/fetch_papers'); // Updated the fetch URL to the exposed backend server
      console.log('Fetch response received'); // Added for debugging
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Data received from fetch:', data); // Added for debugging
      setPapers(data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Could not fetch papers: ", error);
      setLoading(false); // Set loading to false even if there is an error
    }
  };

  // Fetch papers on component mount
  useEffect(() => {
    fetchPapers();
  }, []); // Removed papers dependency to avoid re-fetching on papers state update

  // Effect to log papers state after it's set
  useEffect(() => {
    console.log('Papers state after fetch:', papers);
  }, [papers]);

  // Log the papers state before rendering the routes
  console.log('Papers state before rendering routes:', papers);

  // Additional logging to track rendering of Graph component
  useEffect(() => {
    console.log('Graph component key prop:', papers.length);
  }, [papers.length]);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Box bg="gray.100" px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Box>
              <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                Longevity Papers Database
              </Heading>
            </Box>

            <Flex alignItems={'center'}>
              <Link px={2} mr={4} to="/">
                Home
              </Link>
              <Link px={2} mr={4} to="/papers">
                Papers
              </Link>
              <Link px={2} mr={4} to="/about">
                About
              </Link>
              <Link px={2} mr={4} to="/graph">
                Graph
              </Link>
            </Flex>
          </Flex>
        </Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/papers" element={<Papers papers={papers} />} />
          <Route path="/about" element={<About />} />
          <Route path="/graph" element={loading ? <div>Loading...</div> : <Graph papers={papers} key={JSON.stringify(papers)} />} /> {/* Conditional rendering based on loading state, updated key prop to Graph */}
          <Route path="/papers/:paperId" element={<PaperDetail paper={papers[0]} />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
