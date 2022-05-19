<section id="wrapper">
    <header class="sticky-top overflow-hidden">
        <nav>
            <ul class="nav justify-content-between">
                <li class="nav-item">
                    <a class="nav-link" href="#/app" class="back"><i
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
        <div class="row justify-content-center">
            <img id="img_avatar" src="&{image}" alt="Profile picture" style="max-height: 30%; max-width: 30%;">
        </div>
        <form>
            <div class="row">
                <div class="mb-3 col-6">
                    <label for="avatar" class="form-label">%{choose_profile_pic}</label>
                    <input type="file" class="form-control"
                           id="avatar" name="avatar"
                           accept="image/png, image/jpeg, image/jpg">
                </div>
                <div class="mb-3 col-6">
                    <label for="lang" class="form-label">%{select_lang}</label>
                    <select name="sort" id="lang" class="form-select">
                        <option value="en" <% if(this.lang === 'en'){ %> selected <% } %> >English</option>
                        <option value="de" <% if(this.lang === 'de'){ %> selected <% } %> >Deutsch</option>
                    </select>
                </div>
            </div>


            <div class="mb-3">
                <label for="name" class="form-label">%{username}</label>
                <input type="text" class="form-control" name="name" id="name" value="&{nickname}">
            </div>

            <div class="mb-3">
                <label for="description" class="form-label">%{profile_description}</label>
                <textarea id="description" class="form-control" rows="3">&{description}</textarea>
            </div>

            <button id="save_and_back" class="btn btn-primary">%{save_and_back} <i
                        class="fa-solid fa-floppy-disk"></i></button>
        </form>
    </main>
</section>
