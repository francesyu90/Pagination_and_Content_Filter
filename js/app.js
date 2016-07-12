var studentItems = document.getElementsByClassName("student-item");
var defaultStudentItems = document.getElementsByClassName("student-item");
var numOfPages = 0;
var currentPage = 0;

//  calculate the number of pages needed based on the number of students
var calculateNumOfPages = function(){
    return Math.ceil(studentItems.length/10);
}

//  generate a list of pagination links (li elements only)
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

// append li elements to ul
var appendLinks = function(links) {
    var ul = document.createElement("ul");
    for(var i = 0; i < numOfPages; i++){
        ul.appendChild(links[i]);
        ul.appendChild (document.createTextNode (" "));
    }
    return ul;
}

// create pagination and add it to the page
var createPagination = function() {
    numOfPages = calculateNumOfPages();
    var pagination = document.createElement("div");
    var page = document.querySelector(".page");
    var links = createLinks();
    var ul = appendLinks(links);
    pagination.appendChild(ul);
    pagination.classList.add("pagination");
    page.appendChild(pagination);
}

//  show students according to which pagination link is clicked
var paginationOnClick = function() {
    $(".pageLink").on("click", function(event){
        $(this).siblings().children().each(function(){
            if($(this).first().hasClass("active")) $(this).first().removeClass("active");
        });
        $(this).children().first().addClass("active");
        currentPage = parseInt($(this).children().first().text());
        $(studentItems).slice(0, (currentPage-1)*10).hide();
        $(studentItems).slice(currentPage*10, numOfPages*10).hide();
        $(studentItems).slice((currentPage-1)*10, currentPage*10).show();
    });
}

// create search bar and add it to the page
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


var searchBarOnClick = function() {
    $(".student-search button").on("click", function(){
        var targetText = $(this).prev().val().toLowerCase().trim();
        $(this).prev().val("");
        if(targetText === "") {
            currentPage = 0;
            studentItems = defaultStudentItems;
            resetstudentItems();
        } else {
            var matchedCount = 0;
            var list = [];
            $(studentItems).each(function(){
                if($(this).is(":contains('" + targetText + "')")){
                    matchedCount++;
                    list.push(this);
                    $(this).show();
                }else{
                    $(this).hide();
                }
            });
            $(".pagination").remove();
            if(matchedCount == 0){
                alert("No results found!");
            } else if (matchedCount >= 10){
                studentItems = list;
                currentPage = 0;
                resetstudentItems();
            }
        }
    })  
}

var resetstudentItems = function(){
    createPagination();
    paginationOnClick();
    $(".pageLink")[currentPage].click();
}

var includeSearchBar = function(){
    createSearchBar();
    searchBarOnClick();
}

$(document).ready(function(){
    resetstudentItems();
    includeSearchBar();
});



