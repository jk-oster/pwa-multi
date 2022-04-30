<section id="wrapper">
    <header>
        <nav>
            <ul>
                <li>
                    <a href="#/login" class="back">Zurück</a>
                </li>
                <li>
                    <a href="#/profile"><h2>Profil</h2></a>
                </li>
                <li>
                    <a href="#/home" id="logout">Ausloggen</a>
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <form>
            <img src="" alt="">
            <label for="avatar">Choose a profile picture</label>
            <input type="file"
                   id="avatar" name="avatar"
                   accept="image/png, image/jpeg, image/jpg">
            <h3>
                <label for="name"></label>
                <input type="text" name="name" id="name" value="&{name}">
            </h3>
            <div>
                <label for="description"></label>
                <textarea name="" id="description" cols="30" rows="4" value="&{description}"></textarea>
            </div>
            <button type="submit">
                <a href="#/app">Speichern & zurück zur App</a>
            </button>
        </form>
    </main>
</section>
