<section id="wrapper">
    <header>
        <nav>
            <ul class="nav justify-content-between">
                <li class="nav-item">
                    <a class="nav-link" href="#/profile" class="back" onclick="history.back()"><i
                                class="fa-solid fa-arrow-left"></i> %{back}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/profile"><h2>%{profil}</h2></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/home" id="logout">%{logout} <i
                                class="fa-solid fa-right-from-bracket"></i></a>
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <form>
            <img src="" alt="">

            <div class="mb-3">
                <label for="avatar" class="form-label">Choose a profile picture</label>
                <input type="file" class="form-control"
                       id="avatar" name="avatar"
                       accept="image/png, image/jpeg, image/jpg">
            </div>

            <div class="mb-3">
                <label for="name" class="form-label">Email address</label>
                <input type="text" class="form-control" name="name" id="name" value="&{name}">
            </div>

            <div class="mb-3">
                <label for="description" class="form-label">Example textarea</label>
                <textarea id="description" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <a id="save_and_back" class="btn btn-primary btn-alt" href="#/app">%{save_and_back} <i
                        class="fa-solid fa-floppy-disk"></i></a>
        </form>
    </main>
</section>
