import React from 'react';
import { Box, Heading, Text, VStack, HStack, Button } from '@chakra-ui/react';

const Home = ({ randomPaper, closestMatches, loading, fetchRandomPaper }) => {
  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={5}>
        Welcome to the Longevity Papers Database
      </Heading>
      {loading ? (
        <Text fontSize="lg" textAlign="center">Loading...</Text>
      ) : (
        <VStack spacing={8}>
          <Box p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{randomPaper.title}</Heading>
            <Text mt={4}>{randomPaper.abstract}</Text>
            <HStack justify="space-between" mt={4}>
              <Text fontWeight="bold">Authors:</Text>
              <Text>{randomPaper.authors.join(', ')}</Text>
            </HStack>
          </Box>
          <Heading size="md" textAlign="center">Closest Matches</Heading>
          {closestMatches.map((paper, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="lg">{paper.title}</Heading>
              <HStack justify="space-between" mt={4}>
                <Text fontWeight="bold">Authors:</Text>
                <Text>{paper.authors.join(', ')}</Text>
              </HStack>
            </Box>
          ))}
          <Button onClick={fetchRandomPaper} colorScheme="teal" size="lg">
            Find New Paper
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Home;
