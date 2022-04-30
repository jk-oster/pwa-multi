"use strict";
console.log('hello world');

const answer = await Notification.requestPermission();
console.log(answer);

// Check if serviceworker is supported
if ('serviceWorker' in navigator) {
    try {
        // register Serviceworker
        await navigator.serviceWorker.register('./serviceworker.js');
        console.log("serviceWorker registered");
    } catch (error) {
        console.log("serviceWorker registration failed", error);
    }
} else console.log('serviceWorker is not supported');

const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

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

// Hab ich schon einen Token
if (window.localStorage.getItem('token')) {
    setFrom('green');
    user_display_name.innerHTML = 'Willkommen zurück, ' + window.localStorage.getItem('user_display_name');
    console.log(`Fetch token`);
    submit_post_form.classList.remove("hidden");

} else {
    btn_login.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent "Submit Action"
        submit_post_form.classList.add("hidden");

        const credentials = {
            username: username.value,
            password: password.value,
        };

        fetch("https://api.s2010456022.student.kwmhgb.at/wp-json/jwt-auth/v1/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
        })
            .then(response => {
                if (response.status !== 200) {
                    alert('Fehlgeschlagen: ' + response.status)
                    console.error(response);
                    setFrom('red');
                    user_display_name.innerHTML = '';
                }
                return response;
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                window.localStorage.setItem('token', response.token);
                window.localStorage.setItem('user_display_name', response.user_display_name);

                submit_post_form.classList.remove("hidden");
                setFrom('green');
                user_display_name.innerHTML = 'Willkommen zurück, ' + window.localStorage.getItem('user_display_name');

            })
            .catch(error => console.log('Error: ', error));
    });
}

btn_logout.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent "Submit Action"
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user_display_name');

    setFrom('red');
    user_display_name.innerHTML = '';
    submit_post_form.classList.add("hidden");


});

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
});