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
  const [hasFetchedRandomPaper, setHasFetchedRandomPaper] = useState(false); // Flag to track if random paper has been fetched
  const [hasFetchedAllPapers, setHasFetchedAllPapers] = useState(false); // Flag to track if all papers have been fetched

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
      console.log('Random paper fetched, setting loading to false');
      // Removed setLoading(false) to centralize loading state management in the useEffect hook
      setHasFetchedRandomPaper(true); // Set flag to true after fetching random paper
    } catch (error) {
      console.error("Could not fetch random paper: ", error);
      setFetchError(`Could not fetch random paper: ${error.message}`);
      // Removed setLoading(false) as it's handled by the useEffect hook
    }
  }, []);

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
        console.log('All papers fetched, setting loading to false');
        // Removed setLoading(false) to centralize loading state management in the useEffect hook
        setHasFetchedAllPapers(true); // Set flag to true after fetching all papers
        console.log('Updated papers state:', papersData); // Log the updated state
      } else {
        // Handle unexpected data structure
        console.error("Received data is not in the expected format or is empty");
      }
    } catch (error) {
      // Handle errors during fetch
      console.error("Could not fetch all papers: ", error);
      setFetchError(`Failed to fetch all papers: ${error.message}`);
      // Removed setLoading(false) as it's handled by the useEffect hook
    }
  }, []); // Empty dependency array to ensure the function is memoized

  // Fetch a random paper and all papers on component mount
  useEffect(() => {
    console.log('Mounting App component, starting fetch operations');
    fetchRandomPaper();
    fetchAllPapers(); // Fetch all papers for the graph
  }, [fetchRandomPaper, fetchAllPapers]); // Re-fetch when these functions change

  // useEffect hook to update loading state based on fetch completion flags and errors
  useEffect(() => {
    console.log('Checking fetch completion flags and errors for loading state update');
    if (hasFetchedRandomPaper && hasFetchedAllPapers && fetchError === '') {
      console.log('Both fetches complete and no errors, setting loading to false');
      setLoading(false); // Set loading to false when both fetches are complete and no errors
    } else if (fetchError !== '') {
      console.log(`Fetch error encountered: ${fetchError}, setting loading to false`);
      setLoading(false); // Also set loading to false if there is an error
    }
  }, [hasFetchedRandomPaper, hasFetchedAllPapers, fetchError]); // Update loading state when fetches are complete or there is an error

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
          <Route path="/" element={
            <>
              {console.log('Home route rendering, loading state:', loading)}
              {loading ? <Box>Loading...</Box> : <Home randomPaper={randomPaper} closestMatches={closestMatches} fetchRandomPaper={fetchRandomPaper} />}
              {console.log('Home route rendered')}
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/graph" element={
            <>
              {console.log('Graph route rendering, loading state:', loading)}
              {loading ? <Box>Loading...</Box> : <Graph papers={allPapers} />}
              {console.log('Graph route rendered')}
            </>
          } />
          <Route path="/papers/:paperId" element={<PaperDetail />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
