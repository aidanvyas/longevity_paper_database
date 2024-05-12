import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const About = () => {
  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={5}>
        About the Longevity Papers Database
      </Heading>
      <Text fontSize="lg" textAlign="justify">
        The Longevity Papers Database is a project dedicated to aggregating and presenting
        scientific research papers in the field of longevity and aging. Our goal is to provide
        a platform for researchers, students, and enthusiasts to explore the connections between
        various studies and authors, facilitating a deeper understanding of the subject matter.
      </Text>
      <Text fontSize="lg" textAlign="justify" mt={3}>
        This website features interactive graphs to visualize the citation network of research
        papers and the collaboration network among authors. Additionally, we offer a semantic
        comparison tool to discover papers with similar content, aiding in the exploration of
        related research.
      </Text>
      <Text fontSize="lg" textAlign="justify" mt={3}>
        The database is designed to be intuitive and user-friendly, with a clean and minimalistic
        interface that allows users to focus on the content. We are committed to continuously
        improving the platform and welcome any feedback or suggestions.
      </Text>
    </Box>
  );
};

export default About;
