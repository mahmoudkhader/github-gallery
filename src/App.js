// This is a basic React Application that fetches a user's public repositories from their GitHub profile and renders them with links to the source code as well as the published site, if one is listed

// Start by importing the React library, and include the useState and useEffect hooks
import React, { useState, useEffect } from "react";

// Declare the App functional component
const App = () => {
  // Initialize the repos state as an empty array
  const [repos, setRepos] = useState([]);

  // Once the component is mounted in the browser, fetch the repos data from the github API
  useEffect(() => {
    fetch(`https://api.github.com/users/mahmoudkhader/repos?`)
      // Resolve the async promise by converting the HTTP response to a JSON string
      .then((res) => res.json())
      // Once the promise is resolved, set the repos state to the json data that was converted above
      .then((data) => {
        setRepos(data);
      })
      // If there are any errors, be sure to catch and log them to the console
      .catch((err) => console.log(err));
  }, []);

  // Create a template for the repository cards
  // To do this, create an anonymous function that takes in the repos array element as a parameter
  const repoCard = (repo) => (
    <div key={repo.id} className="col-xl-4 col-md-6 mb-3">
      <div className="card text-white bg-primary h-100">
        <div className="card-body">
          <h4 className="card-title">
            <a href={repo.html_url} className="text-info" target="_blank">
              {repo.name}
            </a>
          </h4>
          <p className="card-text">{repo.description}</p>
          <a href={repo.html_url}>
            <img
              className="github-img"
              src={`./img/${repo.name}.png`}
              alt="Project"
            />
          </a>
        </div>
        <div className="list-group">
          <a
            href={repo.homepage}
            target="_blank"
            className="list-group-item list-group-item-action"
          >
            Project
          </a>
          <a
            href={repo.html_url}
            target="_blank"
            className="list-group-item list-group-item-action"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  );

  // Create the repoGallery function, which maps through the repos array and passes in each repo as an element to the repoCard function above
  const repoGallery = repos.map((repo) => repoCard(repo));

  // Once the above functions have successfully completed, return the fully rendered page
  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col d-flex justify-content-between">
          <h1 className="text-muted">
            mahmoud
            <span className="text-primary">.io</span>
          </h1>
          <div>
            <a
              href="https://www.linkedin.com/in/mahmoud-khader-959221b5/"
              className="ml-2"
            >
              <img
                className="link-icon"
                src="https://simpleicons.org/icons/linkedin.svg"
              />
            </a>
            <a href="https://github.com/mahmoudkhader" className="ml-2">
              <img
                className="link-icon"
                src="https://simpleicons.org/icons/github.svg"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col">
          <h2>Welcome to my GitHub Gallery!</h2>
          <p className="lead">
            This is a concept web app that queries my GitHub API and renders all
            of my public repos as individual cards.
          </p>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col">
          <h2>some of my work...</h2>
        </div>
      </div>
      {/* Render the repoGallery object created above */}
      <div className="row">{repoGallery}</div>
    </div>
  );
};

// Export the App component
export default App;
