import React, { useState, useEffect, useCallback } from 'react';
import { ChakraProvider, Box, Heading, Flex, Alert, AlertIcon } from '@chakra-ui/react';
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
  const [fetchError, setFetchError] = useState(''); // State to store fetch errors

  // Function to fetch a random paper and its closest matches from the backend server
  const fetchRandomPaper = useCallback(async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await fetch('https://longevity-research-website-lgahj0je.devinapps.com/fetch_papers'); // Updated the fetch URL to the exposed backend server
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
  }, []);

  // Function to fetch all papers for the graph visualization with pagination
  // Function to fetch all papers for the graph visualization with pagination
  const fetchAllPapers = useCallback(async () => {
    try {
      const response = await fetch('https://longevity-research-website-lgahj0je.devinapps.com/fetch_all_papers');
      console.log('Fetched papers data:', response); // Log the response
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const papersData = await response.json();
      console.log('Fetched papers data:', papersData); // Log the fetched data
      if (Array.isArray(papersData)) {
        setAllPapers(papersData);
        console.log('Updated papers state:', papersData); // Log the updated state
      } else {
        // Handle unexpected data structure
        console.error("Received data is not in the expected format or is empty");
      }
    } catch (error) {
      // Handle errors during fetch
      console.error("Could not fetch all papers: ", error);
      setFetchError('Failed to fetch papers. Please try again later.'); // Set fetch error message
    }
  }, []); // Empty dependency array to ensure the function is memoized

  // Fetch a random paper and all papers on component mount
  useEffect(() => {
    fetchRandomPaper();
    fetchAllPapers(); // Fetch all papers for the graph
  }, [fetchRandomPaper, fetchAllPapers]); // Re-fetch when these functions change

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
        {fetchError && (
          <Alert status="error">
            <AlertIcon />
            {fetchError}
          </Alert>
        )}
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
