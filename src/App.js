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
  const [similarPapers, setSimilarPapers] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  // Function to fetch papers from the backend server
  const fetchPapers = async () => {
    try {
      const response = await fetch('https://longevity-research-website-bqrhp4y8.devinapps.com/fetch_papers'); // Updated the fetch URL to the exposed backend server
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPapers(data);
      // Assuming the API or another function provides similar papers data
      setSimilarPapers(data.similarPapers); // Adjust as per actual data structure
      setLoading(false); // Set loading to false after data is fetched
      console.log('Fetched papers data:', data); // Added logging to check the fetched data
    } catch (error) {
      console.error("Could not fetch papers: ", error);
      setLoading(false); // Set loading to false even if there is an error
    }
  };

  // Fetch papers on component mount
  useEffect(() => {
    fetchPapers();
  }, []);

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
          <Route path="/graph" element={loading ? <div>Loading...</div> : <Graph papers={papers} />} /> {/* Conditional rendering based on loading state */}
          <Route path="/papers/:paperId" element={<PaperDetail paper={papers[0]} similarPapers={similarPapers} />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
