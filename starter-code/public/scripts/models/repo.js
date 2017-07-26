'use strict';
var app = app || {};

(function(module) {
  const repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    // TODO: DONE How would you like to fetch your repos? Don't forget to call the callback.
    //       Remember that the callback function we'll want to call relies on repos.all
    //       being an array with a bunch of repo objects in it, so you'll need to
    //       populate it with the response from Github before you call the callback.
    // Completed in 20 minutes - Receiving linter error for githubToken from the githubToken.js file in models
    $.ajax({
      url: 'https://api.github.com/orgs/codefellows-seattle-301d27/repos',
      method: 'GET',
      headers: {
        Authorization: `token ${githubToken}`
      }
    })
    .then(function(data) {
      repos.all = data.map(repo => ({
        html_url: repo.html_url,
        name: repo.name,
        description: repo.description,
        language: repo.language,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        watchers_count: repo.watchers_count
      }));
      callback();
    });
  };

  // REVIEW: Model method that filters the full collection for repos with a particular attribute.
  // You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
  repos.with = attr => repos.all.filter(repo => repo[attr]);

  module.repos = repos;
})(app);
