// Global variable
const baseUrl = "https://api.github.com/users";

const getUsers = async(url = '') => {
    const response = await fetch(url);
    try {
        const allUsers = await response.json();
        // console.log(allUsers);
        return allUsers;
    } catch (e) {
        console.log(`error:${e}`);
    }

}
const getUserInfo = async(url = '') => {
    const response = await fetch(url);
    try {
        const userInfo = await response.json();
        // console.log(allUsers);
        return userInfo;
    } catch (e) {
        console.log(`error:${e}`);
    }

}

function createDomElements(isUser = false, container, user = {}) {
    /**
         * 
          <div class="card" style="width: 18rem;">
        <img class="card-img-top avatarUrl" alt="...">
        <div class="card-body">
            <h5 class="card-title userName"></h5>
            <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
            <a class="btn btn-primary accountUrl">Go Github Account</a>
        </div>
    </div>
         */
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('class', 'col');
    //  --------img-----------
    const img = document.createElement('img');
    img.setAttribute('class', 'card-img-top');
    img.setAttribute('style', 'width: 220px');
    card.appendChild(img);
    // --------Card body-----------
    const cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    // --------user name header-----------
    const header = document.createElement('h5');
    header.setAttribute('class', 'card-title');
    cardBody.appendChild(header);
    if (isUser == true) {
        const details = document.createElement('p');
        details.innerHTML = `number of repos :${user.public_repos}<br>
        Created at: ${user.created_at}<br>
        Followers: ${user.followers}<br>
        Following: ${user.following}`;
        cardBody.appendChild(details);
    }

    // --------button -----------
    const buttonUrl = document.createElement('a');
    buttonUrl.setAttribute('class', 'btn btn-primary');
    buttonUrl.setAttribute('style', 'width: 200px;');
    buttonUrl.innerHTML = 'Go Github Account';
    cardBody.appendChild(buttonUrl);
    card.appendChild(cardBody);
    img.setAttribute('src', user.avatar_url);
    header.innerHTML = user.login;
    buttonUrl.setAttribute('href', user.html_url);
    container.appendChild(card);
}

getUsers(baseUrl).then(function(users) {
    const container = document.querySelector('.githubUsers');
    users.forEach(user => {
        createDomElements(false, container, user);
    });
});

getUserInfo(baseUrl + '/WejdanCS').then(function(userInfo) {
    console.log(userInfo);
    // userContainer
    const container = document.querySelector('.userContainer');
    createDomElements(true, container, userInfo);
});