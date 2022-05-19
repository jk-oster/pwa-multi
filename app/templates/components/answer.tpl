<% console.log(this) %>

<% if(!this.isSelf) { %>
<article class="msg-container filterable answer msg-remote" id="answer_&{id}"  data-user="&{userId}" >
    <div class="msg-box">
        <img class="user-img" src="&{userImg}" />
        <div class="flr">
            <div class="messages">
                <p class="msg">
                    &{answer}
                </p>
            </div>
            <span class="timestamp"><span class="username">&{user}</span>&bull;<span class="posttime">&{date}</span></span>
        </div>
    </div>
</article>
<% } %>

<% if(this.isSelf) { %>
<article class="msg-container filterable answer  msg-self"  id="answer_&{id}"  data-user="&{userId}" >
    <div class="msg-box">
        <div class="flr">
            <div class="messages">
                <p class="msg">
                    &{answer}
                </p>
            </div>
            <span class="timestamp"><span class="username">&{user}</span>&bull;<span class="posttime">&{date}</span></span>
        </div>
        <img class="user-img" src="&{userImg}" />
    </div>
</article>
<% } %>

<!--div id="answer_&{id}" data-user="&{userId}" class="answer card filterable mb-1">
    <div class="card-body">
        <p>&{answer}</p>
        <p class="mb-0"><small>&{date} <i>&{user}</i></small></p>
    </div>
</div-->