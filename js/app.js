var body = document.body;
var pagination = document.createElement("div");
var ul = document.createElement("ul");
var page = document.querySelector(".page");
var links = [];
var studentList = document.getElementsByClassName("student-item");
var numOfPages = Math.ceil(studentList.length/10);
var currentPage = 0;

var createLinks = function(){
    for(var i = 0; i < numOfPages; i++) {
        var li = document.createElement("li");
        var anchor = document.createElement("a");
        anchor.innerHTML = i + 1;
        li.appendChild(anchor);
        links.push(li);
    }
}

var appendLinks = function() {
    for(var i = 0; i < numOfPages; i++){
        ul.appendChild(links[i]);
        ul.appendChild (document.createTextNode (" "));
    }
}

var createPagination = function() {
    createLinks();
    appendLinks();
    pagination.appendChild(ul);
    pagination.classList.add("pagination");
    page.appendChild(pagination);
    var li = $(".pagination li")[currentPage];
    var anchor = $(li).children()[0];
    anchor.classList.add("active");
}

$(document).ready(function(){
    createPagination();
});


