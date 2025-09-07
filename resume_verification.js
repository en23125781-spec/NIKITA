function openForm() {
    document.getElementById("uploadForm").style.display = "block";
}

function closeForm() {
    document.getElementById("uploadForm").style.display = "none";
}

// Fetch and display uploaded documents from the database
function loadDocuments() {
    fetch("fetch_documents.php")
    .then(response => response.json())
    .then(data => {
        console.log("Fetched documents:", data); // ✅ Debug line
        let table = document.getElementById("documentTable");
        table.innerHTML = "";
        data.forEach(doc => {
            console.log("Resume path:", doc.resume); // ✅ Debug each row
            const resumePath = doc.resume ? `/TNPA/${doc.resume}` : "#";




            let row = `<tr>
                <td>${doc.docType || "N/A"}</td>
                <td><a href="${resumePath}" target="_blank">View</a></td>
                <td>${doc.status || "Pending"}</td>
                <td>
                    <button onclick="deleteDocument('${doc.student_id}')">Delete</button>
                </td>
            </tr>`;
            table.innerHTML += row;
        });
    })
    .catch(error => {
        console.error("Error fetching documents:", error);
    });

}



document.getElementById("uploadDocumentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("docType", document.getElementById("docType").value);
    formData.append("fileUpload", document.getElementById("fileUpload").files[0]);

    fetch("upload_document.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadDocuments();
    });

    closeForm();
});

// Load documents on page load
document.addEventListener("DOMContentLoaded", loadDocuments);
