<section id="question-detail">
    <nav>
        <ul class="nav justify-content-between">
            <li class="nav-item col-6">
                <label for="search" class="form-label visually-hidden">%{search}</label>
                <input type="search" id="search" class="form-control" placeholder="%{search}" aria-label="Search" />
            </li>
            <li class="nav-item col-6">
                <label for="sort" class="form-label visually-hidden">%{sort}</label>
                <select name="sort" id="sort" class="form-select">
                    <option value="asc" selected>%{asc}</option>
                    <option value="desc">%{desc}</option>
                </select>
            </li>
        </ul>
    </nav>
    <section>
        <button id="new_question" class="card question my-1 container-fluid" >
            <div class="card-body d-flex justify-content-center container-fluid">
                <h5 class="card-title m-0">%{new_question} <i class="fa-solid fa-circle-question"></i></h5></i>
            </div>
        </button>
        <div id="question_container" style="height: 100%;">
            <f:template name="components/loading-spinner"></f:template>
            <!-- add cards dynamically -->
        </div>
    </section>
    <button id="load_more" class="btn btn-primary">%{load_more}</button>
</section>