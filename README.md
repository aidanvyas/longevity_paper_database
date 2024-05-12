# Longevity Papers Web Application

This web application is designed to showcase research papers in the longevity space. It includes features such as displaying paper details, visualizing connections between papers and authors through interactive graphs, and comparing the semantic similarity of papers.

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and styled using [Chakra UI](https://chakra-ui.com/).

### Running the Application Locally

- `npm start`: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload with changes.
- `npm test`: Launches the test runner. See [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
- `npm run build`: Builds the app for production to the `build` folder.

### Deployment

The application is deployed to Netlify for public access. For more information on deployment, see [deployment](https://facebook.github.io/create-react-app/docs/deployment).

## Features

- **Paper List**: Displays a list of research papers fetched from the Crossref REST API.
- **Paper Details**: Shows detailed information about each paper, including title, authors, abstract, and a link to the full text.
- **Graphs**: Utilizes `vis-network` library to create interactive graphs that visualize the connections between papers and authors.
- **Semantic Comparison**: Implements BERTSCORE to compare the semantic similarity of papers.

## Repository Structure

- The `main` branch contains the production-ready code.
- Feature branches are created off the `main` branch for new features and updates.
- Pull requests are used to merge feature branches into the `main` branch after review.

## Contributing

Contributions to the project are welcome. Please follow the standard GitHub pull request workflow.

## License

This project is open source and available under the [MIT License](LICENSE).
