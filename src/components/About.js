import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const About = () => {
  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={5}>
        About the Longevity Papers Database
      </Heading>
      <Text fontSize="lg" textAlign="justify">
        The Longevity Papers Database is a dynamic platform dedicated to showcasing research papers in the field of longevity and aging. Our mission is to provide an accessible and interactive resource for researchers, students, and anyone interested in the longevity space.
      </Text>
      <Text fontSize="lg" textAlign="justify" mt={3}>
        On our home page, you'll find a randomly selected research paper, complete with its title, authors, and abstract. Accompanying the featured paper are the three closest matches based on semantic similarity, determined using BERTSCORES. This feature allows for the discovery of related work and fosters connections within the field.
      </Text>
      <Text fontSize="lg" textAlign="justify" mt={3}>
        The website also includes a 'Find New Paper' button, which refreshes the page with a new random paper and its closest matches. This encourages exploration and ensures a fresh experience with each visit.
      </Text>
      <Text fontSize="lg" textAlign="justify" mt={3}>
        While the graph page is currently under development, it will soon provide interactive visualizations of the citation network among papers and the collaboration network among authors.
      </Text>
      <Text fontSize="lg" textAlign="justify" mt={3}>
        Designed with a clean and minimalistic aesthetic, our platform prioritizes user experience and content quality. We are continuously working to enhance the site and welcome your feedback to improve our service.
      </Text>
    </Box>
  );
};

export default About;
