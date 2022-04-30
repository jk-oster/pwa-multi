<section id="login">
    <header>
        <nav>
            <ul>
                <li>
                    <a href="#/home" class="back">Zurück</a>
                </li>
                <li>
                    <a href="#/login"><h2>Login</h2></a>
                </li>
                <li>
                    <p>Kein Menüeintrag hier</p>
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <p><span id="login_state" class=""></span>
            <span id="user_display_name"></span>
        </p>
        <form action="" id="frm_login">
            <label for="username">%{username}</label>
            <input type="text" id="username" placeholder="username">
            <label for="password">%{password}</label>
            <input type="password" id="password" placeholder="*********">
            <button id="btn_login">%{login}</button>
        </form>
        <p id="msg_error" class="error"></p>
    </main>
</section>