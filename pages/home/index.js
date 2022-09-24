let loggedUserId = 1;

let topContent = document.querySelector(".to-post");
let followContent = document.querySelector(".follow-wrapper");
let posts_area = document.querySelector(".posts");

function renderUserCard(obj) {
  let span = document.createElement("span");
  let figure = document.createElement("figure");
  let img = document.createElement("img");
  let div = document.createElement("div");
  let h2 = document.createElement("h2");
  let p = document.createElement("p");

  span.classList.add("profile");
  figure.classList.add("profile-picture-wrapper");
  img.classList.add("profile-picture");
  div.classList.add("profile-aside");
  h2.classList.add("profile-name");
  p.classList.add("profile-job");

  img.src = obj.img;
  h2.innerText = obj.user;

  if (obj.stack === undefined) {
    p.innerText = "Kenzie User";
  } else {
    p.innerText = obj.stack;
  }

  div.appendChild(h2);
  div.appendChild(p);
  figure.appendChild(img);
  span.appendChild(figure);
  span.appendChild(div);

  return span;
}

function renderLoggedUserCard(userId) {
  for (obj in users) {
    if (users[obj].id === userId) {
      topContent.prepend(renderUserCard(users[obj]));
    }
  }
}

function renderFolloUsersBar(usersIdArr) {
  for (obj in usersIdArr) {
    for (user in users) {
      if (usersIdArr[obj] === users[user].id) {
        let li = document.createElement("li");
        li.classList.add("to-follow");
        let userCard = renderUserCard(users[user]);
        let follow_btn = document.createElement("button");
        follow_btn.innerText = "Seguir";
        follow_btn.classList.add("follow-btn");
        follow_btn.id = "follow-btn";

        follow_btn.addEventListener("click", function () {
          let follow = follow_btn.classList.toggle("follow-btn");
          follow_btn.classList.toggle("follow-true");
          if (follow) {
            follow_btn.innerText = "Seguir";
          } else {
            follow_btn.innerText = "Seguindo";
          }
        });

        li.appendChild(userCard);
        li.appendChild(follow_btn);
        followContent.appendChild(li);
      }
    }
  }
}

function renderPosts(postsArr) {
  for (obj in postsArr) {
    for (user in users) {
      if (postsArr[obj].user == users[user].id) {
        let li = document.createElement("li");
        let h2 = document.createElement("h2");
        let p = document.createElement("p");

        li.classList.add("post");
        h2.classList.add("post-title");
        p.classList.add("post-content");

        h2.innerText = postsArr[obj].title;
        p.innerText = postsArr[obj].text;

        let usercard = renderUserCard(users[user]);

        li.appendChild(usercard);
        li.appendChild(h2);
        li.appendChild(p);
        posts_area.appendChild(li);
      }
    }
  }
}

function renderSite() {
  renderLoggedUserCard(loggedUserId);
  renderFolloUsersBar(sugestUsers);
  renderPosts(posts);
}

renderSite();
