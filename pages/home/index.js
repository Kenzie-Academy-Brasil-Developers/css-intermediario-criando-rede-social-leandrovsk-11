let loggedUserId = 1;

let topContent = document.querySelector(".to-post");
let followContent = document.querySelector(".follow-wrapper");
let postsArea = document.querySelector(".posts");
let like = document.querySelector(".like-img-wrapper");
let openFollow = document.querySelector(".open-follow");
let modalFollow = document.querySelector(".modal-follow");
let modalWrapper = document.querySelector(".modal-wrapper");
let closeModalFollow = document.querySelector(".close-follow");
let postBtn = document.querySelector(".to-post-btn");
let postModalWrapper = document.querySelector(".post-modal-wrapper");
let postModal = document.querySelector(".posts-modal");
let closePostModal = document.querySelector(".close-post")

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
        let liModal = document.createElement("li");
        li.classList.add("to-follow");
        let userCard = renderUserCard(users[user]);
        let follow_btn = document.createElement("button");
        let follow_btn2 = document.createElement("button");
        follow_btn2.innerText = "Seguir";
        follow_btn2.classList.add("follow-btn");
        follow_btn.innerText = "Seguir";
        follow_btn.classList.add("follow-btn");

        follow_btn.addEventListener("click", function () {
          let follow = follow_btn.classList.toggle("follow-btn");
          let follow2 = follow_btn2.classList.toggle("follow-btn");
          follow_btn.classList.toggle("follow-true");
          follow_btn2.classList.toggle("follow-true");
          if (follow || follow2) {
            follow_btn.innerText = "Seguir";
            follow_btn2.innerText = "Seguir";
          } else {
            follow_btn.innerText = "Seguindo";
            follow_btn2.innerText = "Seguindo";
          }
        });

        follow_btn2.addEventListener("click", function () {
          let follow = follow_btn.classList.toggle("follow-btn");
          let follow2 = follow_btn2.classList.toggle("follow-btn");
          follow_btn.classList.toggle("follow-true");
          follow_btn2.classList.toggle("follow-true");
          if (follow || follow2) {
            follow_btn.innerText = "Seguir";
            follow_btn2.innerText = "Seguir";
          } else {
            follow_btn.innerText = "Seguindo";
            follow_btn2.innerText = "Seguindo";
          }
        });

        li.appendChild(userCard);
        liModal = li.cloneNode(true);
        li.appendChild(follow_btn);
        liModal.appendChild(follow_btn2);
        modalFollow.appendChild(liModal);
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
        let span = document.createElement("span");
        let btn = document.createElement("button");
        let fig = document.createElement("figure");
        let img = document.createElement("img");
        let figcaption = document.createElement("figcaption");

        li.classList.add("post");
        li.classList.add("flex-column")
        h2.classList.add("post-title");
        p.classList.add("post-content");
        span.classList.add("post-foot-wrapper");
        btn.classList.add("open-post-btn");
        fig.classList.add("like-img-wrapper");
        img.classList.add("like-img");
        figcaption.classList.add("like-counter");

        let randomLikes = Math.floor(Math.random() * 30);

        h2.innerText = postsArr[obj].title;
        p.innerText = postsArr[obj].text;
        btn.innerText = "Abrir Post";
        img.src = "/assets/img/gray_heart.svg";
        figcaption.innerText = randomLikes;

        let likeCounter = 0;

        fig.addEventListener("click", function () {
          if (likeCounter === 0) {
            likeCounter++;
            img.src = "/assets/img/red_heart.svg";
            figcaption.innerText = parseInt(figcaption.innerText) + 1;
          } else {
            likeCounter--;
            img.src = "/assets/img/gray_heart.svg";
            figcaption.innerText = parseInt(figcaption.innerText) - 1;
          }
        });

        btn.addEventListener("click", function (event) {
          postModal.innerHTML = ''
          let userCard = event.target.parentElement.parentElement.children[0].cloneNode(true);
          let postTitle = event.target.parentElement.parentElement.children[1].cloneNode(true);
          let postContent = event.target.parentElement.parentElement.children[2].cloneNode(true);
          postContent.classList.remove("post-content");
          postContent.classList.add("modal-post-content");
          postModal.appendChild(userCard);
          postModal.appendChild(postTitle);
          postModal.appendChild(postContent);
          postModalWrapper.classList.toggle("hidden");
        });

        let usercard = renderUserCard(users[user]);
        fig.appendChild(img);
        fig.appendChild(figcaption);
        span.appendChild(btn);
        span.appendChild(fig);
        li.appendChild(usercard);
        li.appendChild(h2);
        li.appendChild(p);
        li.appendChild(span);
        postsArea.prepend(li);
      }
    }
  }
}

function callEvents() {
  closeModalFollow.addEventListener("click", function () {
    modalWrapper.classList.toggle("hidden");
  });

  closePostModal.addEventListener("click", function() {
    postModalWrapper.classList.toggle('hidden');
  })

  openFollow.addEventListener("click", function () {
    modalWrapper.classList.toggle("hidden");
  });

  postBtn.addEventListener("click", function (event) {
    let postTitle = event.target.parentElement.children[1].value;
    let postContent = event.target.previousElementSibling.value;

    if (postTitle === "" || postContent === "") {
      alert("Campo Vazio!");
    } else {
      let newId = posts[posts.length - 1].id_post + 1;

      let newPost = {
        id_post: newId,
        user: loggedUserId,
        title: postTitle,
        text: postContent,
      };
      posts.push(newPost);
      postsArea.innerHTML = "";
      renderPosts(posts);

      event.target.parentElement.children[1].value = "";
      event.target.previousElementSibling.value = "";
    }
  });
}

function renderSite() {
  renderLoggedUserCard(loggedUserId);
  renderFolloUsersBar(sugestUsers);
  renderPosts(posts);
  callEvents();
}

renderSite();
