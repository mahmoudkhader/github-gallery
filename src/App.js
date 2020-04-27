import React, { useState, useEffect } from "react";

const App = () => {
  // initialize the repos state with an empty array
  const [repos, setRepos] = useState([]);

  // once the component is mounted, fetch the repos data from the github API
  useEffect(() => {
    fetch(`https://api.github.com/users/mahmoudkhader/repos?`)
      // this gives us a promise back that we need to map to json
      .then((res) => res.json())
      // once the promise is resolved, set the repos state to the json data sent from the API
      .then((data) => {
        setRepos(data);
      })
      // catch and log errors
      .catch((err) => console.log(err));
  }, []);

  // create repoItems variables and map the repos
  const repoItems = repos.map((repo) => (
    // return a col containing a card, and set each repo item's key to it's respective id property(given by the API)
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
  ));

  // render the page
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
      {/* Render the repoItems object created above */}
      <div className="row">{repoItems}</div>
    </div>
  );
};

export default App;
