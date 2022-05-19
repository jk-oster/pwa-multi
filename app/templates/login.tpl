<section id="login">
    <header class="justify-content-center sticky-top">
        <nav>
            <ul class="nav justify-content-between">
                <li class="nav-item">
                    <a class="nav-link" href="#/home"><i class="fa-solid fa-arrow-left"></i> %{back}</a>
                </li>
                <li class="nav-item">
                    <p class="nav-link ml-"></p>
                </li>
            </ul>
        </nav>
        <div class="d-flex justify-content-center">
            <a class="nav-link" href="#/login"><h2><i class="fa-solid fa-right-to-bracket"></i> Login</h2></a>
        </div>
        <hr class="mt-0">
    </header>
    <main>
        <div class="container">
            <div class="row  justify-content-center">
                <div class="col col-lg-6 col-sm-12">
                    <div>
                        <h3 id="user_display_name"></h3>
                        <form id="frm_login">
                            <div class="mb-3">
                                <label for="username" class="form-label">%{username}</label>
                                <input type="text" id="username" class="form-control" placeholder="username" autocomplete="username">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">%{password}</label>
                                <input type="password" class="form-control" id="password" placeholder="*********" autocomplete="current-password">
                            </div>
                            <div id="msg_error" class="alert alert-danger visually-hidden" role="alert"></div>
                            <button id="btn_login" class="btn btn-primary">%{login}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</section>