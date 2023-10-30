document.addEventListener("DOMContentLoaded", function () {
            const contactForm = document.getElementById("contact-form");
            const contactTable = document.getElementById("contact-table");
            const errorDiv = document.getElementById("error");

            contactForm.addEventListener("submit", function (event) {
                event.preventDefault();
                errorDiv.textContent = "";

                const name = document.getElementById("name").value;
                const mobile = document.getElementById("mobile").value;
                const email = document.getElementById("email").value;

                if (!name.match(/^[A-Za-z\s'-]{1,20}$/)) {
                    errorDiv.innerHTML = "The name is invalid. It should contain only alphabets and spaces, up to 20 characters.<br><br>";
                    return;
                }

                if (!mobile.match(/^[0-9]{10}$/)) {
                    errorDiv.innerHTML = "The mobile number is invalid. It should contain only 10 digits.<br><br>";
                    return;
                }

                if (!email.match(/^.+@.+$/) || email.length > 40) {
                    errorDiv.innerHTML = "The email is invalid. It should be a valid email address, up to 40 characters.<br><br>";
                    return;
                }

                const newRow = contactTable.insertRow(-1);
                const nameCell = newRow.insertCell(0);
                const mobileCell = newRow.insertCell(1);
                const emailCell = newRow.insertCell(2);

                nameCell.textContent = name;
                mobileCell.textContent = mobile;
                emailCell.textContent = email;

                applyOddRowColor();

                contactForm.reset();
            });
        });

document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("contact-table");
    const nameHeader = table.querySelector(".sortable");
    let ascending = true;

    const searchInput = document.getElementById("search");
    const noResultDiv = document.getElementById("noResult");

    function applyOddRowColor() {
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach((row, index) => {
            if (index % 2 === 1) {
                row.style.backgroundColor = "#f2f2f2";
            } else {
                row.style.backgroundColor = "";
            }
        });
    }

    applyOddRowColor();

    nameHeader.addEventListener("click", () => {
        const tbody = table.querySelector("tbody");
        const rows = Array.from(tbody.querySelectorAll("tr"));

        rows.sort((a, b) => {
            const cellA = a.cells[0];
            const cellB = b.cells[0];

            if (cellA && cellB) {
                const nameA = cellA.textContent || '';
                const nameB = cellB.textContent || '';

                return ascending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            }

            return 0;
        });

        rows.forEach(row => tbody.appendChild(row));
        ascending = !ascending;

        applyOddRowColor();
    });

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        const rows = table.querySelectorAll("tbody tr");

        let matchFound = false;

        rows.forEach(row => {
            const mobileCell = row.cells[1];

            if (mobileCell) {
                const mobileText = mobileCell.textContent.trim().toLowerCase();

                if (mobileText.includes(searchTerm)) {
                    row.style.display = "";
                    matchFound = true;
                } else {
                    row.style.display = "none";
                }
            }
        });

        if (matchFound) {
            noResultDiv.style.display = "none";
        } else {
            noResultDiv.style.display = "block";
        }


    });
});

function applyOddRowColor() {
    const table = document.getElementById("contact-table");
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row, index) => {
        if (index % 2 === 1) {
            row.style.backgroundColor = "#f2f2f2";
        } else {
            row.style.backgroundColor = "";
        }
    });
}
