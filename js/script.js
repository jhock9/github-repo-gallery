// Where profile info will appear
const overview = document.querySelector(".overview");
// Github Username
const username = "jhock9";
// List of all repos on Github
const repoList = document.querySelector(".repo-list");
// Div container for all repos
const allReposContainer = document.querySelector(".repos");
// Individual repo info
const repoData = document.querySelector(".repo-data");
// Back button to return to full list of repos
const viewReposButton = document.querySelector(".view-repos");
// Search bar for repos
const filterInput = document.querySelector(".filter-repos")

const gitUserInfo = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const userData = await userInfo.json();
  // console.log(userData);
  displayUserInfo(userData);
}

gitUserInfo();

const displayUserInfo = function (userData) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${userData.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${userData.name}</p>
      <p><strong>Bio:</strong> ${userData.bio}</p>
      <p><strong>Location:</strong> ${userData.location}</p>
      <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
    </div>
  `;
  overview.append(div);
  gitRepos();
};

const gitRepos = async function () {
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoApiData = await fetchRepos.json();
  // console.log(repoApiData);
  displayRepos(repoApiData);
}

const displayRepos = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);      
  };
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  };
});

const getRepoInfo = async function (repoName) {
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();
  // console.log(repoInfo);
  // Grab languages;
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  // console.log(languageData);

  // Make a list of languages
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
    // console.log(languages);
  };
  displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  allReposContainer.classList.add("hide");
  viewReposButton.classList.remove("hide");
  const div = document.createElement("div");
  div.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoData.append(div);
};

viewReposButton.addEventListener("click", function () {
  allReposContainer.classList.remove("hide");
  repoData.classList.add("hide");
  viewReposButton.classList.add("hide");
});

//Dynamic Search
filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  // console.log(searchInput);
  const repos = document.querySelectorAll(".repo");
  const searchLowerText = searchText.toLowerCase();
  
  for (repo of repos) {
    const repoLowerText = repo.innerText.toLowerCase();
    if (repoLowerText.includes(searchLowerText)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    };
  };
});