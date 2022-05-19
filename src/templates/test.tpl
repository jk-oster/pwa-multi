<h1>Test Page</h1>
<p>I am here to test the templating engine and the data-binding</p>
<f:template name="components/test"></f:template>
<% if(this.check) { for(const a of this.arr){ %>
<a href="#">Hi, I am <% a %></a>
<!--sfsefsfsefsfsef-->
<f:template name="components/test"></f:template>
<% }} %>

<% if(this.check) { %>
    <p>Summe: <% this.arr.reduce((a,b) => a+b) %></p>
    <p>Mapping: <% this.arr.map(a => '<p>Ich wurde in einen p Tag gemappt' + a + '</p>').join('') %></p>
<% } %>

<input type="text" data-bind="input">
<select name="name" id="awd" data-bind="select">
    <option value="5">Option 5</option>
    <option value="10">Option 10</option>
    <option value="33">Option 33</option>
</select>
<p data-bind="text: input"></p>
<p data-bind="text: inputComputed"></p>
<p>Value des selects = <span data-bind="text: select"></span>€</p>


<!--

-->