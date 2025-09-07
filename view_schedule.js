document.addEventListener("DOMContentLoaded", function () {
    const scheduleList = document.getElementById("schedule-list");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // Fetch data from PHP file
    fetch("fetch_schedule.php")
        .then(response => response.json())
        .then(data => {
            displaySchedules(data);
        });

    function displaySchedules(schedules) {
        scheduleList.innerHTML = "";
        schedules.forEach(schedule => {
            const card = document.createElement("div");
            card.classList.add("schedule-card");
            card.innerHTML = `
                <h2>${schedule.company_name}</h2>
                <p><strong>Position:</strong> ${schedule.position}</p>
                <p><strong>Date:</strong> ${schedule.date}</p>
                <p><strong>Location:</strong> ${schedule.location}</p>
                <p class="status ${schedule.status.toLowerCase()}">${schedule.status}</p>
            `;
            scheduleList.appendChild(card);
        });
    }

    // Filter schedules based on status
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.getAttribute("data-filter");

            fetch("fetch_schedule.php")
                .then(response => response.json())
                .then(data => {
                    const filteredSchedules = filter === "all" 
                        ? data 
                        : data.filter(schedule => schedule.status === filter);
                    displaySchedules(filteredSchedules);
                });
        });
    });
});
