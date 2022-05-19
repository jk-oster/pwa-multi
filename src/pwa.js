"use strict";
import KWMJS from "./js/kwm.js";

console.log('hello world multi app loaded');

new KWMJS();

// const answer = await Notification.requestPermission();

/*

btn_fetch_cloths.addEventListener('click', (e) => {
    e.preventDefault();
    fetch("https://api.s2010456022.student.kwmhgb.at/wp-json/wp/v2/kwm_cloth?per_page=3")
        .then(function (response) {
            paginate(response.headers.get("X-WP-TotalPages"));
            return response;
        }).then(response => response.json())
        .then(posts => renderPosts(posts));
    btn_fetch_cloths.style.display = 'none';
});

function paginate(totalPages) {
    if (totalPages > 1) {
        let button = document.createElement("button");
        button.innerHTML = "Mehr laden";
        button.id = "load_more_posts";
        button.dataset.totalPages = totalPages;
        button.dataset.nextPage = 2;
        button.addEventListener("click", function () {
            fetch("https://api.s2010456022.student.kwmhgb.at/wp-json/wp/v2/kwm_cloth?per_page=3&page=" + this.dataset.nextPage)
                .then(response => response.json())
                .then(posts => {
                    renderPosts(posts);
                    button.dataset.nextPage++;
                })
        });
        resources.append(button);
    }
}

function renderPosts(posts) {
    let posts_container = document.getElementById("posts");
    for (let post of posts) {
        let post_container = document.createElement("div");
        post_container.classList.add("post");
        post_container.dataset.resourceid = post.id;
        post_container.innerHTML = post.title.rendered;
        posts_container.append(post_container);
    }
}

function setFrom(color) {
    login_state.classList.remove('red');
    login_state.classList.remove('green');
    login_state.classList.add(color);
}

submit_post.addEventListener('click', event => {
    event.preventDefault(); // Prevent "Submit Action"
    console.log('Submit clicked');

    const requestOptions = {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + localStorage.token,
            "Content-Type": "application/json",
        },
        redirect: 'follow',
        body: JSON.stringify({
            title: post_title.value,
            excerpt: post_text.value,
            status: 'publish',
            content: post_content.value,
        }),
    };

    fetch("https://api.s2010456022.student.kwmhgb.at/wp-json/wp/v2/posts", requestOptions)
        .then(response => {
            if(response.status === 201){
                console.error(response);
                return false;
            }
            return response;
        })
        .then(response => {
            renderPosts([response.json()]);
        });
});*/
