function loadContent(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById("section-content").innerHTML = data;
        })
        .catch(error => console.error('Error loading content:', error));
}
