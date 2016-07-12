var studentList = document.getElementsByClassName("student-item");
var numOfPages = Math.ceil(studentList.length/10);
var currentPage = 0;

var createLinks = function(){
    var links = [];
    for(var i = 0; i < numOfPages; i++) {
        var li = document.createElement("li");
        li.classList.add("pageLink");
        var anchor = document.createElement("a");
        anchor.innerHTML = i + 1;
        li.appendChild(anchor);
        links.push(li);
    }
    return links;
}

var appendLinks = function(links) {
    var ul = document.createElement("ul");
    for(var i = 0; i < numOfPages; i++){
        ul.appendChild(links[i]);
        ul.appendChild (document.createTextNode (" "));
    }
    return ul;
}

var createPagination = function() {
    var pagination = document.createElement("div");
    var page = document.querySelector(".page");
    var links = createLinks();
    var ul = appendLinks(links);
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
        $(studentList).slice(0, (currentPage-1)*10).hide();
        $(studentList).slice(currentPage*10, numOfPages*10).hide();
        $(studentList).slice((currentPage-1)*10, currentPage*10).show();
    });
}

var createSearchBar = function() {
    var pageHeader = $(".page-header");
    var searchBar = document.createElement("div");
    searchBar.classList.add("student-search");
    var searchField = document.createElement("input");
    $(searchField).attr("placeholder", "Search for students...");
    var searchButton = document.createElement("button");
    searchButton.innerHTML = "Search";
    searchBar.appendChild(searchField);
    searchBar.appendChild (document.createTextNode (" "));
    searchBar.appendChild(searchButton);
    pageHeader.append(searchBar);
}

$(document).ready(function(){
    createPagination();
    createSearchBar();
    paginationOnClick();
    $(".pageLink")[currentPage].click();
});



