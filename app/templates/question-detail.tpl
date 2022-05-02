<section id="wrapper">
    <header class="sticky-top">
        <nav>
            <ul class="nav justify-content-between">
                <li class="nav-item">
                    <a class="nav-link" href="#/app" onclick="history.back()"><i class="fa-solid fa-arrow-left"></i>
                        %{back}</a>
                </li>
                <li class="nav-item">
                    <a href="#/profile" class="nav-link">%{profil} <i class="fa fa-circle-user"></i></a>
                </li>
            </ul>
        </nav>
        <div class="d-flex justify-content-center">
            <a class="nav-link" href="#/question"><h2>&{question}</h2></a>
        </div>
        <hr class="mt-0">
    </header>
    <main id="answer-container">
        <div class="d-flex justify-content-center">
            <div>
                <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        <!-- answers will be displayed here -->
    </main>
    <button id="load_more" class="btn btn-primary">%{load_more}</button>
    <button id="new_answer" class="btn btn-primary">%{new_answer}</button>
</section>

