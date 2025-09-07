document.getElementById("resume").addEventListener("change", function () {
    let file = this.files[0];
    if (file) {
        let fileURL = URL.createObjectURL(file);
        document.getElementById("preview").innerHTML = `<p>Resume Preview:</p> <a href="${fileURL}" target="_blank">${file.name}</a>`;
    }
});
