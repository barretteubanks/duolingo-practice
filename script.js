

function setButton() {
    console.log("Running practice button script");

    // Skip creating link if link already created
    var link = document.getElementById("practice-link");
    if (link == null) {

        // Create link to practice page
        var link = document.createElement("a");
        link.id = "practice-link";
        link.href = "https://www.duolingo.com/practice";

        // Create image and add it to link
        var image = document.createElement("img");
        image.src = chrome.runtime.getURL("./icon128.png");
        image.style.width = "100px";
        link.appendChild(image);
        var addLink = true;
    }


    // Anchor link to edge of sidebar by offsetting fixed position by sidebar width
    var homeLink = document.querySelector("[data-test='home-nav']");
    if (homeLink != null) {
        var sidebar = homeLink.parentElement.parentElement.parentElement;
        var width = sidebar.offsetWidth + 20;
    } else {
        var width = 20;
    }
    link.style = `bottom:20px; left: ${width}px; position: fixed; z-index: 9999;`;

    // Add link to screen when on skill path screen
    var skillPath = document.querySelector("[data-test='skill-path']");
    if (skillPath != null && addLink) {
        skillPath.appendChild(link);
    }

}



// Load button when window loads up
window.addEventListener("load", function() {
    setButton();
}, false);

// Change button position when window resized
window.addEventListener("resize", function() {
    setButton();
}, false);

// Reload button after page navigation detected by service worker
chrome.runtime.onMessage.addListener(function(request) {
    if (request && request.type === 'page-rendered') {
      setTimeout(setButton, 500);
    }
});



