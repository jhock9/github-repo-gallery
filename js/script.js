// Where profile info will appear
const overview = document.querySelector(".overview");
const username = "jhock9";
const repoList = document.querySelector(".repo-list");

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
};

const gitRepos = async function () {
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=100`);
  const repoData = await fetchRepos.json();
  // console.log(repoData);
  displayRepos(repoData);
}

gitRepos();

const displayRepos = function (repos) {

for (const repo of  )

/*
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
  repoList.append(div);
*/
};

