<section id="question-detail">
    <nav>
        <li>
            <label for="filter">%{filter}</label>
            <select name="filter" id="filter">
                <!-- add filter options dynamically -->
            </select>
        </li>
        <li>
            <button>&{sort}</button>
        </li>
    </nav>
    <section>
        <button id="new_question">%{new_question}</button>
        <div id="question_container">
            <!-- add cards dynamically -->
            <div class="question">Wer bist du?</div>
        </div>
    </section>
    <div>
        <li>
            <button id="load_more">%{load_more}</button>
        </li>
    </div>
</section>