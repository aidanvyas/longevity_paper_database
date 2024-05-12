import React from 'react';
import { Box, Heading, Text, Link, List, ListItem } from '@chakra-ui/react';

const PaperDetail = ({ paper, similarPapers }) => {
  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={5}>
        {paper.title}
      </Heading>
      <Text fontSize="lg" textAlign="justify" mt={3}>
        <strong>Authors:</strong> {paper.authors.join(', ')}
      </Text>
      <Text fontSize="lg" textAlign="justify" mt={3}>
        <strong>Abstract:</strong> {paper.abstract}
      </Text>
      {/* Assuming 'summary' is a field in the paper object */}
      <Text fontSize="lg" textAlign="justify" mt={3}>
        <strong>Summary:</strong> {paper.summary}
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
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PaperDetail;
