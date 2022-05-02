<section id="wrapper">
    <header class="sticky-top overflow-hidden">
        <nav>
            <ul class="nav justify-content-between">
                <li class="nav-item">
                    <a class="nav-link" href="#/profile" class="back" onclick="history.back()"><i
                                class="fa-solid fa-arrow-left"></i> %{back}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/home" id="logout">%{logout} <i
                                class="fa-solid fa-right-from-bracket"></i></a>
                </li>
            </ul>
        </nav>
        <div class="d-flex justify-content-center">
            <a class="nav-link" href="#/profile"><h2><i class="fa-solid fa-circle-user"></i> %{profil}</h2></a>
        </div>
        <hr class="mt-0">
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
                <textarea id="description" class="form-control" rows="3"></textarea>
            </div>

            <button id="save_and_back" class="btn btn-primary">%{save_and_back} <i
                        class="fa-solid fa-floppy-disk"></i></button>
        </form>
    </main>
</section>
