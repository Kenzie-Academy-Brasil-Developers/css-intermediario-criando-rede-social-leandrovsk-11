let loggedUserId = 1;

let topContent = document.querySelector(".to-post");
let followContent = document.querySelector(".follow-wrapper")
let posts_area = document.querySelector(".posts")

let userArr = [];

function userArrMaker(option, value) {
  if (option === true) {
    userArr = [];
    for (obj in users) {
      if (users[obj].id === value) {
        userArr.push(users[obj]);
      }
    }
  } else {
    userArr = [];
    for (let obj in users) {
      for (let i = 0; i < value.length; i++) {
        if (value[i] === users[obj].id) {
          userArr.push(users[obj]);
        }
      }
    }
  }
  return userArr;
}

function createUserCard(option,arr) {
  for (obj in arr) {
    let span = document.createElement("span");
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let li = document.createElement("li")

    span.classList.add("profile");
    figure.classList.add("profile-picture-wrapper");
    img.classList.add("profile-picture");
    div.classList.add("profile-aside");
    h2.classList.add("profile-name");
    p.classList.add("profile-job");
    li.classList.add("to-follow")

    img.src = arr[obj].img;
    h2.innerText = arr[obj].user;

    if(arr[obj].stack === undefined) {
      p.innerText = 'Kenzie User';
    } else {
      p.innerText = arr[obj].stack;
    }
   
    div.appendChild(h2);
    div.appendChild(p);
    figure.appendChild(img);
    span.appendChild(figure);
    span.appendChild(div);
    
      if(option === 0) {
         topContent.prepend(span);
      } else if(option === 1) {
         let follow_btn = document.createElement('button')
         follow_btn.innerText = 'Seguir';
         follow_btn.classList.add('follow-btn')
         li.appendChild(span)
         li.appendChild(follow_btn)
         followContent.appendChild(li)
      } else {
         return span;
      }
  }
}

function renderPosts(arr) {
   for(let obj in arr) {
      post_user = [];
      for(let obj2 in users) {
         if(arr[obj].user == users[obj2].id) {
            let li = document.createElement('li')
            let h2 = document.createElement('h2')
            let p = document.createElement('p')

            li.classList.add('post')
            h2.classList.add('post-title')
            p.classList.add('post-content')

            h2.innerText = arr[obj].title
            p.innerText = arr[obj].text

            post_user.push(users[obj2])
            li.appendChild(createUserCard(3, post_user))
            li.appendChild(h2)
            li.appendChild(p)
            posts_area.appendChild(li)
         }
      }
   }
}


createUserCard(0,userArrMaker(true,loggedUserId));
createUserCard(1,userArrMaker(false,sugestUsers));


