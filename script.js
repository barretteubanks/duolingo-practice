
function setButton() {
    // Exit function if not on skill path
    var skillPath = document.querySelector("[data-test='skill-path']");
    if (skillPath == null) {
        return
    }

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
    var height = 20;
    var width = 20;
    var homeLink = document.querySelector("[data-test='home-nav']");
    if (homeLink != null) {
        var sidebar = homeLink.parentElement.parentElement.parentElement;
        // Navbar at bottom of screen with small viewport
        if (homeLink.parentElement.parentElement.offsetHeight < 100) {
            height = homeLink.parentElement.parentElement.offsetHeight + 20;
        } else {
            width = sidebar.offsetWidth + 20;
        }    
    }
    link.style = `bottom: ${height}px; left: ${width}px; position: fixed;`;


    // Add link to screen when created
    if (addLink) {
        skillPath.appendChild(link);
    }

}

// Set button when changes detected on page
observer = new MutationObserver(function(mutations) {
    setTimeout(setButton, 500);
    // Restart observers in case coming from page that didn't have elements to watch
    startObservers()
})

function startObservers() {
    try {
        // Detect switch to and from most screens
        node = document.getElementById("root").childNodes[1].firstChild.childNodes[1]
        observer.observe(node, {childList: true})
    } catch { }
    try {
        // Detect switch to and from shop screen
        node = document.querySelector("[data-test='home']").lastChild
        observer.observe(node, {childList: true})
    } catch { }
    try {
        // Detect switch to and from section screen on small viewport
        node = document.getElementById("root").childNodes[5]
        observer.observe(node, {childList: true})
    } catch { }
}


// Load button and start mutation observers when page loads
window.addEventListener("load", function() {
    setButton();

    // Detect when title changes (such as when switching languages)
    observer.observe(document.querySelector("title"), {childList: true})
    // Detect changes to whole screen (such as starting lesson or practice)
    observer.observe(document.getElementById("root"), {childList: true})

    // Observe for changes to sections of screen
    startObservers()

}, false);


// Change button position when window resized
window.addEventListener("resize", function() {
    setButton();
}, false);

