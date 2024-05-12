import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Flex } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home'; // Import the Home component
import About from './components/About'; // Import the About component
import Graph from './components/Graph'; // Import the Graph component
import PaperDetail from './components/PaperDetail'; // Import the PaperDetail component

function App() {
  const [randomPaper, setRandomPaper] = useState(null);
  const [closestMatches, setClosestMatches] = useState([]);
  const [allPapers, setAllPapers] = useState([]); // State to store all papers for the graph
  const [loading, setLoading] = useState(true); // Added loading state

  // Function to fetch a random paper and its closest matches from the backend server
  const fetchRandomPaper = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await fetch('https://longevity-research-website-bqrhp4y8.devinapps.com/fetch_papers'); // Updated the fetch URL to the exposed backend server
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRandomPaper(data.random_paper);
      setClosestMatches(data.closest_matches);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Could not fetch random paper: ", error);
      setLoading(false); // Set loading to false even if there is an error
    }
  };

  // Function to fetch all papers for the graph visualization
  const fetchAllPapers = async () => {
    try {
      const response = await fetch('https://longevity-research-website-bqrhp4y8.devinapps.com/fetch_all_papers'); // Endpoint to fetch all papers
      console.log('Fetching all papers response:', response); // Log the response for debugging
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const papersData = await response.json();
      console.log('All papers data:', papersData); // Log the data for debugging
      setAllPapers(papersData); // Update state with all papers
    } catch (error) {
      console.error("Could not fetch all papers: ", error);
    }
  };

  // Fetch a random paper and all papers on component mount
  useEffect(() => {
    fetchRandomPaper();
    fetchAllPapers(); // Fetch all papers for the graph
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
          <Route path="/" element={<Home randomPaper={randomPaper} closestMatches={closestMatches} loading={loading} fetchRandomPaper={fetchRandomPaper} />} />
          <Route path="/about" element={<About />} />
          <Route path="/graph" element={<Graph papers={allPapers} />} /> {/* Pass allPapers as prop to Graph */}
          <Route path="/papers/:paperId" element={<PaperDetail />} /> {/* Placeholder for future paper detail functionality */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
