javascript
/* =========================================
   ATHLETE360 — DASHBOARD JAVASCRIPT
   ========================================= */


/* =========================================
   AUTHENTICATION
   ========================================= */

function checkLogin() {

    const role = localStorage.getItem("athlete360Role");
    const email = localStorage.getItem("athlete360Email");

    if (!role || !email) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("coachEmail").textContent = email;
    document.getElementById("coachRole").textContent = role;

}


/* =========================================
   ATHLETE STORAGE
   ========================================= */

function getAthletes() {

    const savedAthletes =
        localStorage.getItem("athlete360Athletes");

    if (!savedAthletes) {
        return [];
    }

    try {
        return JSON.parse(savedAthletes);
    } catch (error) {

        console.error(
            "Could not read athlete data:",
            error
        );

        return [];
    }
}


function saveAthletes(athletes) {

    localStorage.setItem(
        "athlete360Athletes",
        JSON.stringify(athletes)
    );

}


/* =========================================
   AGE CALCULATION
   ========================================= */

function calculateAge(dateOfBirth) {

    if (!dateOfBirth) {
        return "—";
    }

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age =
        today.getFullYear() -
        birthDate.getFullYear();

    const monthDifference =
        today.getMonth() -
        birthDate.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < birthDate.getDate()
        )
    ) {
        age--;
    }

    return age;
}


/* =========================================
   DASHBOARD STATISTICS
   ========================================= */

function updateStatistics() {

    const athletes = getAthletes();

    const rugby =
        athletes.filter(
            athlete => athlete.sport === "Rugby"
        ).length;

    const netball =
        athletes.filter(
            athlete => athlete.sport === "Netball"
        ).length;

    const otherSports =
        athletes.length - rugby - netball;


    document.getElementById("totalAthletes").textContent =
        athletes.length;

    document.getElementById("rugbyCount").textContent =
        rugby;

    document.getElementById("netballCount").textContent =
        netball;

    document.getElementById("otherSportsCount").textContent =
        otherSports;

}


/* =========================================
   ATHLETE TABLE
   ========================================= */

function renderAthletes(athletes = getAthletes()) {

    const tableBody =
        document.getElementById("athleteTableBody");

    const emptyState =
        document.getElementById("emptyState");


    tableBody.innerHTML = "";


    if (athletes.length === 0) {

        emptyState.style.display = "block";

        return;

    }


    emptyState.style.display = "none";


    athletes.forEach(athlete => {

        const row =
            document.createElement("tr");


        const initials =
            (
                (athlete.firstName || "").charAt(0) +
                (athlete.surname || "").charAt(0)
            ).toUpperCase();


        const age =
            calculateAge(
                athlete.dateOfBirth
            );


        const performance =
            athlete.performance || 0;


        row.innerHTML = `

            <td>

                <div class="athlete-name">

                    <div class="athlete-avatar">
                        ${initials}
                    </div>

                    <div>

                        <strong>
                            ${athlete.fullName}
                        </strong>

                        <small>
                            Athlete
                        </small>

                    </div>

                </div>

            </td>


            <td>
                ${athlete.sport || "—"}
            </td>


            <td>
                ${athlete.position || "—"}
            </td>


            <td>
                ${age}
            </td>


            <td>
                <span class="performance-value">
                    ${performance}
                </span>
            </td>


            <td>

                <span class="status-badge">
                    ${athlete.status || "Active"}
                </span>

            </td>


            <td>

                <button
                    class="view-button"
                    onclick="viewAthlete(${athlete.id})"
                >
                    View
                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* =========================================
   SEARCH & FILTER
   ========================================= */

function filterAthletes() {

    const searchInput =
        document.getElementById("athleteSearch");

    const sportFilter =
        document.getElementById("sportFilter");


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedSport =
        sportFilter.value;


    const athletes =
        getAthletes();


    const filtered =
        athletes.filter(athlete => {

            const matchesSearch =

                athlete.fullName
                    .toLowerCase()
                    .includes(search)

                ||

                (athlete.sport || "")
                    .toLowerCase()
                    .includes(search)

                ||

                (athlete.position || "")
                    .toLowerCase()
                    .includes(search);


            const matchesSport =
                selectedSport === "all" ||
                athlete.sport === selectedSport;


            return matchesSearch && matchesSport;

        });


    renderAthletes(filtered);

}


/* =========================================
   ATHLETE PROFILE
   ========================================= */

function viewAthlete(id) {

    window.location.href =
        "athlete.html?id=" + id;

}


/* =========================================
   ADD ATHLETE MODAL
   ========================================= */

function openAddAthleteModal() {

    document
        .getElementById("athleteModal")
        .classList.add("show");

}


function closeAddAthleteModal() {

    document
        .getElementById("athleteModal")
        .classList.remove("show");

    document
        .getElementById("athleteForm")
        .reset();

    updatePositionOptions();

}


/* =========================================
   SPORT → POSITION / EVENT OPTIONS
   ========================================= */

function updatePositionOptions() {

    const sport =
        document.getElementById("sport").value;

    const position =
        document.getElementById("position");


    const options = {

        Rugby: [
            "Prop",
            "Hooker",
            "Lock",
            "Flanker",
            "Number 8",
            "Scrumhalf",
            "Flyhalf",
            "Centre",
            "Wing",
            "Fullback"
        ],

        Netball: [
            "Goal Shooter",
            "Goal Attack",
            "Wing Attack",
            "Centre",
            "Wing Defence",
            "Goal Defence",
            "Goal Keeper"
        ],

        Hockey: [
            "Goalkeeper",
            "Defender",
            "Midfielder",
            "Forward"
        ],

        Athletics: [
            "100m",
            "200m",
            "400m",
            "800m",
            "1500m",
            "5000m",
            "10 000m",
            "Hurdles",
            "Long Jump",
            "High Jump",
            "Triple Jump",
            "Shot Put",
            "Discus",
            "Javelin",
            "Decathlon",
            "Heptathlon"
        ],

        Soccer: [
            "Goalkeeper",
            "Centre Back",
            "Fullback",
            "Wing Back",
            "Defensive Midfielder",
            "Central Midfielder",
            "Attacking Midfielder",
            "Winger",
            "Striker"
        ],

        Basketball: [
            "Point Guard",
            "Shooting Guard",
            "Small Forward",
            "Power Forward",
            "Centre"
        ],

        Tennis: [
            "Singles",
            "Doubles"
        ],

        Swimming: [
            "Freestyle",
            "Backstroke",
            "Breaststroke",
            "Butterfly",
            "Individual Medley"
        ],

        Boxing: [
            "Amateur",
            "Professional"
        ],

        "Strength & Conditioning": [
            "General Performance",
            "Strength",
            "Speed",
            "Power",
            "Conditioning"
        ],

        Other: [
            "General"
        ]

    };


    position.innerHTML =
        '<option value="">Select Position / Event</option>';


    if (!options[sport]) {
        return;
    }


    options[sport].forEach(option => {

        const element =
            document.createElement("option");

        element.value = option;
        element.textContent = option;

        position.appendChild(element);

    });

}


/* =========================================
   ADD ATHLETE
   ========================================= */

function addAthlete(event) {

    event.preventDefault();


    const firstName =
        document
            .getElementById("firstName")
            .value
            .trim();


    const surname =
        document
            .getElementById("surname")
            .value
            .trim();


    const dateOfBirth =
        document
            .getElementById("dateOfBirth")
            .value;


    const gender =
        document
            .getElementById("gender")
            .value;


    const sport =
        document
            .getElementById("sport")
            .value;


    const position =
        document
            .getElementById("position")
            .value;


    const team =
        document
            .getElementById("team")
            .value
            .trim();


    const dominantSide =
        document
            .getElementById("dominantSide")
            .value;


    const email =
        document
            .getElementById("athleteEmail")
            .value
            .trim();


    const athlete = {

        id: Date.now(),

        firstName: firstName,

        surname: surname,

        fullName:
            firstName + " " + surname,

        dateOfBirth:
            dateOfBirth,

        gender:
            gender,

        sport:
            sport,

        position:
            position,

        team:
            team,

        dominantSide:
            dominantSide,

        email:
            email,

        performance:
            0,

        status:
            "Active",

        createdAt:
            new Date().toISOString()

    };


    const athletes =
        getAthletes();


    athletes.push(athlete);


    saveAthletes(athletes);


    closeAddAthleteModal();


    updateStatistics();

    renderAthletes();


    alert(
        athlete.fullName +
        " has been added successfully."
    );

}


/* =========================================
   LOGOUT
   ========================================= */

function logout() {

    localStorage.removeItem(
        "athlete360Role"
    );

    localStorage.removeItem(
        "athlete360Email"
    );


    window.location.href =
        "login.html";

}


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
   ========================================= */

document.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "athleteModal"
            );


        if (
            event.target === modal
        ) {

            closeAddAthleteModal();

        }

    }
);


/* =========================================
   INITIALISE DASHBOARD
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        checkLogin();

        updateStatistics();

        renderAthletes();

        updatePositionOptions();

    }
);

