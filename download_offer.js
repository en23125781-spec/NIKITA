document.addEventListener("DOMContentLoaded", function () {
    fetch("fetch_offers.php")
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("offerList");
            data.forEach(offer => {
                let row = `<tr>
                    <td>${offer.company_name}</td>
                    <td>${offer.position}</td>
                    <td><a href="${offer.file_path}" download><button>Download</button></a></td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching offer letters:", error));
});
