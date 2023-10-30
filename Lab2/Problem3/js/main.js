const searchButton = document.getElementById("search");
const usernameInput = document.getElementById("username");
const avatarImage = document.getElementById("avatar");
const nameInfo = document.getElementById("name");
const usernameInfo = document.getElementById("username-info");
const emailInfo = document.getElementById("email");
const locationInfo = document.getElementById("location");
const gistsInfo = document.getElementById("gists");
const repoList = document.getElementById("repo-list");

searchButton.addEventListener("click", () => {
    const username = usernameInput.value;
    if (username) {
        fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
            .then(data => {
                avatarImage.src = data.avatar_url;
                nameInfo.textContent = data.name;
                usernameInfo.textContent = `Username: ${data.login}`;
                emailInfo.textContent = `Email: ${data.email || "N/A"}`;
                locationInfo.textContent = `Location: ${data.location || "N/A"}`;
                gistsInfo.textContent = `Number of Gists: ${data.public_gists || 0}`;
                getRepositories(data.repos_url);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }
});

function getRepositories(reposUrl) {
    fetch(reposUrl)
        .then(response => response.json())
        .then(repos => {
            repoList.innerHTML = "";
            repos.forEach(repo => {
                const listItem = document.createElement("p");
                const repoName = document.createElement("strong");
                repoName.textContent = repo.name;
                listItem.appendChild(repoName);

                if (repo.description) {
                    const description = document.createElement("p");
                    description.textContent = repo.description;
                    listItem.appendChild(description);
                }

                repoList.appendChild(listItem);
            });

            if (repos.length > 5) {
              repoList.style.maxHeight = "400px";
              repoList.style.width = "100%";
              repoList.style.overflowY = "auto";
              repoList.style.overflowX = "hidden";
            }else{
              repoList.style.overflowY = "hidden";
              repoList.style.maxHeight = "800px";
              repoList.style.width = "100%";
            }
        })
        .catch(error => {
            console.error("Error fetching user repositories:", error);
        });
}
