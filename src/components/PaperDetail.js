import React from 'react';
import { Box, Heading, Text, Link, List, ListItem } from '@chakra-ui/react';

const PaperDetail = ({ paper, similarPapers }) => {
  // Helper function to format author names
  const formatAuthors = (authors) => {
    // Check if authors is an array and each author has 'given' and 'family' properties
    if (Array.isArray(authors) && authors.every(author => author.hasOwnProperty('given') && author.hasOwnProperty('family'))) {
      return authors.map(author => `${author.given} ${author.family}`).join(', ');
    } else {
      // If the authors array does not have the expected structure, log an error for debugging
      console.error('Unexpected authors structure:', authors);
      return 'Author information not available';
    }
  };

  // Check if paper is not null or undefined before attempting to access its properties
  if (!paper) {
    return (
      <Box p={5}>
        <Text fontSize="lg" textAlign="center">Paper details are not available.</Text>
      </Box>
    );
  }

  // Additional logging to verify the structure of the authors prop
  console.log('Authors prop:', JSON.stringify(paper.authors, null, 2));

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={5}>
        {paper.title}
      </Heading>
      <Text fontSize="lg" textAlign="justify" mt={3}>
        <strong>Authors:</strong> {formatAuthors(paper.authors)}
      </Text>
      <Text fontSize="lg" textAlign="justify" mt={3}>
        <strong>Abstract:</strong> {paper.abstract || "Abstract not available."}
      </Text>
      {/* Assuming 'summary' is a field in the paper object */}
      <Text fontSize="lg" textAlign="justify" mt={3}>
        <strong>Summary:</strong> {paper.summary || "Summary not available."}
      </Text>
      <Link href={paper.link} isExternal color="teal.500" mt={3}>
        Read Full Text
      </Link>
      <Heading as="h2" size="lg" textAlign="center" mt={5}>
        Similar Papers
      </Heading>
      <List spacing={3} mt={3}>
        {similarPapers.map((similarPaper, index) => (
          <ListItem key={index}>
            <Link href={similarPaper.link} isExternal color="teal.500">
              {similarPaper.title}
            </Link>
            <Text fontSize="sm">
              <strong>Authors:</strong> {formatAuthors(similarPaper.authors)}
            </Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PaperDetail;
