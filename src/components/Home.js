import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={5}>
        Welcome to the Longevity Papers Database
      </Heading>
      <Text fontSize="lg" textAlign="justify">
        Explore a curated collection of scientific research papers in the field of longevity.
        Discover the latest findings, connect the dots between studies, and dive deep into the
        science of aging and lifespan extension. Our interactive graphs and semantic comparison
        features will help you navigate through the complex web of research and authors.
      </Text>
    </Box>
  );
};

export default Home;
