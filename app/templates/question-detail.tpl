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
    <main>
        <div id="answer-container">
            <f:template name="components/loading-spinner"></f:template>
            <!-- answers will be displayed here -->
        </div>
    </main>
    <footer class="fixed-bottom">
        <div class="py-1 mx-1 row">
            <div contenteditable="true" class="edit col-10 white border rounded p-1" id="new_answer_text"></div>
            <button class="btn btn-primary col-2 align-self-end" id="send">
                <span class="visually-hidden">Send</span>
                <i class="fa-solid fa-paper-plane"></i>
            </button>
        </div>
    </footer>
</section>

