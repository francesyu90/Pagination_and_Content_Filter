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
        li.classList.add("pageLink");
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
}

var paginationOnClick = function() {
    $(".pageLink").on("click", function(event){
        $(this).siblings().children().each(function(){
            if($(this).first().hasClass("active")) $(this).first().removeClass("active");
        });
        $(this).children().first().addClass("active");
        currentPage = parseInt($(this).children().first().text());
        $(".student-item").slice(0, (currentPage-1)*10).hide();
        $(".student-item").slice(currentPage*10, numOfPages*10).hide();
        $(".student-item").slice((currentPage-1)*10, currentPage*10).show();

    });
}

$(document).ready(function(){
    createPagination();
    paginationOnClick();
    $(".pageLink")[currentPage].click();
});



