
/* =========================================
   ATHLETE360 — TESTING CENTRE JAVASCRIPT
   ========================================= */


/* =========================================
   TEST DATABASE
   ========================================= */

const TEST_LIBRARY = {

    Speed: [

        {
            name: "10m Sprint",
            unit: "seconds",
            direction: "lower"
        },

        {
            name: "20m Sprint",
            unit: "seconds",
            direction: "lower"
        },

        {
            name: "30m Sprint",
            unit: "seconds",
            direction: "lower"
        },

        {
            name: "40m Sprint",
            unit: "seconds",
            direction: "lower"
        },

        {
            name: "Flying 10m",
            unit: "seconds",
            direction: "lower"
        }

    ],


    Agility: [

        {
            name: "5-10-5 Shuttle",
            unit: "seconds",
            direction: "lower"
        },

        {
            name: "T-Test",
            unit: "seconds",
            direction: "lower"
        },

        {
            name: "Illinois Agility Test",
            unit: "seconds",
            direction: "lower"
        }

    ],


    Power: [

        {
            name: "Vertical Jump",
            unit: "centimetres",
            direction: "higher"
        },

        {
            name: "Countermovement Jump",
            unit: "centimetres",
            direction: "higher"
        },

        {
            name: "Broad Jump",
            unit: "metres",
            direction: "higher"
        }

    ],


    Strength: [

        {
            name: "Back Squat",
            unit: "kg",
            direction: "higher"
        },

        {
            name: "Bench Press",
            unit: "kg",
            direction: "higher"
        },

        {
            name: "Deadlift",
            unit: "kg",
            direction: "higher"
        },

        {
            name: "Pull-ups",
            unit: "reps",
            direction: "higher"
        },

        {
            name: "Push-ups",
            unit: "reps",
            direction: "higher"
        }

    ],


    Conditioning: [

        {
            name: "Beep Test",
            unit: "level",
            direction: "higher"
        },

        {
            name: "Yo-Yo Intermittent Recovery Test",
            unit: "score",
            direction: "higher"
        },

        {
            name: "Cooper Test",
            unit: "metres",
            direction: "higher"
        },

        {
            name: "Bronco Test",
            unit: "seconds",
            direction: "lower"
        }

    ],


    Mobility: [

        {
            name: "Shoulder Mobility",
            unit: "centimetres",
            direction: "higher"
        },

        {
            name: "Hip Mobility",
            unit: "centimetres",
            direction: "higher"
        },

        {
            name: "Ankle Mobility",
            unit: "centimetres",
            direction: "higher"
        },

        {
            name: "Hamstring Mobility",
            unit: "centimetres",
            direction: "higher"
        },

        {
            name: "Thoracic Mobility",
            unit: "degrees",
            direction: "higher"
        }

    ]

};


/* =========================================
   LOGIN CHECK
   ========================================= */

function checkLogin() {

    const role =
        localStorage.getItem("athlete360Role");

    const email =
        localStorage.getItem("athlete360Email");


    if (!role || !email) {

        window.location.href =
            "login.html";

        return false;

    }


    const coachEmail =
        document.getElementById("coachEmail");

    const coachRole =
        document.getElementById("coachRole");


    if (coachEmail) {
        coachEmail.textContent = email;
    }

    if (coachRole) {
        coachRole.textContent = role;
    }


    return true;

}


/* =========================================
   ATHLETE STORAGE
   ========================================= */

function getAthletes() {

    const saved =
        localStorage.getItem(
            "athlete360Athletes"
        );


    if (!saved) {
        return [];
    }


    try {

        return JSON.parse(saved);

    } catch (error) {

        console.error(
            "Could not read athletes:",
            error
        );

        return [];

    }

}


/* =========================================
   TEST STORAGE
   ========================================= */

function getTests() {

    const saved =
        localStorage.getItem(
            "athlete360Tests"
        );


    if (!saved) {
        return [];
    }


    try {

        return JSON.parse(saved);

    } catch (error) {

        console.error(
            "Could not read tests:",
            error
        );

        return [];

    }

}


function saveTests(tests) {

    localStorage.setItem(
        "athlete360Tests",
        JSON.stringify(tests)
    );

}


/* =========================================
   LOAD ATHLETES
   ========================================= */

function loadAthletes() {

    const select =
        document.getElementById(
            "athleteSelect"
        );


    const athletes =
        getAthletes();


    select.innerHTML = "";


    const defaultOption =
        document.createElement("option");

    defaultOption.value = "";

    defaultOption.textContent =
        athletes.length > 0
            ? "Select an athlete"
            : "No athletes available";


    select.appendChild(
        defaultOption
    );


    athletes.forEach(athlete => {

        const option =
            document.createElement("option");


        option.value =
            athlete.id;


        option.textContent =
            `${athlete.fullName} — ${athlete.sport}`;


        select.appendChild(option);

    });

}


/* =========================================
   CATEGORY SELECTION
   ========================================= */

let selectedCategory = "";


function selectCategory(category) {

    selectedCategory =
        category;


    const categoryCards =
        document.querySelectorAll(
            ".category-card"
        );


    categoryCards.forEach(card => {

        card.classList.remove(
            "selected"
        );


        if (
            card.dataset.category ===
            category
        ) {

            card.classList.add(
                "selected"
            );

        }

    });


    populateTests(category);

}


/* =========================================
   POPULATE TEST OPTIONS
   ========================================= */

function populateTests(category) {

    const testSelect =
        document.getElementById(
            "testSelect"
        );


    const unitSelect =
        document.getElementById(
            "testUnit"
        );


    testSelect.innerHTML = "";


    const defaultOption =
        document.createElement("option");

    defaultOption.value = "";

    defaultOption.textContent =
        "Select a test";


    testSelect.appendChild(
        defaultOption
    );


    const tests =
        TEST_LIBRARY[category] || [];


    tests.forEach(test => {

        const option =
            document.createElement("option");


        option.value =
            test.name;


        option.textContent =
            test.name;


        option.dataset.unit =
            test.unit;


        option.dataset.direction =
            test.direction;


        testSelect.appendChild(
            option
        );

    });


    testSelect.value = "";


    unitSelect.value = "";

}


/* =========================================
   AUTO-SET UNIT
   ========================================= */

function updateUnit() {

    const testSelect =
        document.getElementById(
            "testSelect"
        );


    const unitSelect =
        document.getElementById(
            "testUnit"
        );


    const selectedOption =
        testSelect.options[
            testSelect.selectedIndex
        ];


    if (
        selectedOption &&
        selectedOption.dataset.unit
    ) {

        unitSelect.value =
            selectedOption.dataset.unit;

    }

}


/* =========================================
   GET TEST INFORMATION
   ========================================= */

function getSelectedTest() {

    if (!selectedCategory) {
        return null;
    }


    const testSelect =
        document.getElementById(
            "testSelect"
        );


    const testName =
        testSelect.value;


    const tests =
        TEST_LIBRARY[
            selectedCategory
        ] || [];


    return tests.find(
        test => test.name === testName
    ) || null;

}


/* =========================================
   SAVE TEST
   ========================================= */

function saveTest(event) {

    event.preventDefault();


    const athleteId =
        document.getElementById(
            "athleteSelect"
        ).value;


    const testName =
        document.getElementById(
            "testSelect"
        ).value;


    const resultInput =
        document.getElementById(
            "testResult"
        ).value;


    const unit =
        document.getElementById(
            "testUnit"
        ).value;


    const date =
        document.getElementById(
            "testDate"
        ).value;


    const notes =
        document.getElementById(
            "testNotes"
        ).value.trim();


    if (!athleteId) {

        alert(
            "Please select an athlete."
        );

        return;

    }


    if (!selectedCategory) {

        alert(
            "Please select a test category."
        );

        return;

    }


    if (!testName) {

        alert(
            "Please select a test."
        );

        return;

    }


    if (
        resultInput === "" ||
        Number(resultInput) < 0
    ) {

        alert(
            "Please enter a valid result."
        );

        return;

    }


    if (!unit) {

        alert(
            "Please select a unit."
        );

        return;

    }


    const athlete =
        getAthletes().find(
            item =>
                String(item.id) ===
                String(athleteId)
        );


    if (!athlete) {

        alert(
            "Athlete could not be found."
        );

        return;

    }


    const selectedTest =
        getSelectedTest();


    const test = {

        id: Date.now(),

        athleteId:
            athlete.id,

        athleteName:
            athlete.fullName,

        sport:
            athlete.sport,

        category:
            selectedCategory,

        test:
            testName,

        result:
            Number(resultInput),

        unit:
            unit,

        direction:
            selectedTest
                ? selectedTest.direction
                : "higher",

        date:
            date,

        notes:
            notes,

        createdAt:
            new Date().toISOString()

    };


    const tests =
        getTests();


    tests.push(test);


    saveTests(tests);


    renderRecentTests();


    alert(
        `${athlete.fullName}'s ${testName} result has been saved.`
    );


    resetTestingForm();

}


/* =========================================
   CHECK PERSONAL RECORD
   ========================================= */

function isPersonalRecord(test, allTests) {

    const athleteTests =
        allTests.filter(item =>

            String(item.athleteId) ===
            String(test.athleteId)

            &&

            item.test ===
            test.test

            &&

            item.unit ===
            test.unit

        );


    if (athleteTests.length <= 1) {
        return true;
    }


    if (test.direction === "lower") {

        const best =
            Math.min(
                ...athleteTests.map(
                    item => Number(item.result)
                )
            );

        return Number(test.result) === best;

    }


    const best =
        Math.max(
            ...athleteTests.map(
                item => Number(item.result)
            )
        );


    return Number(test.result) === best;

}


/* =========================================
   RENDER RECENT TESTS
   ========================================= */

function renderRecentTests() {

    const tableBody =
        document.getElementById(
            "testsTableBody"
        );


    const emptyState =
        document.getElementById(
            "noTestsState"
        );


    const tests =
        getTests();


    tableBody.innerHTML = "";


    if (tests.length === 0) {

        emptyState.style.display =
            "block";

        return;

    }


    emptyState.style.display =
        "none";


    const sortedTests =
        [...tests].sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        );


    const recentTests =
        sortedTests.slice(0, 20);


    recentTests.forEach(test => {

        const row =
            document.createElement("tr");


        const initials =
            getInitials(
                test.athleteName
            );


        const personalRecord =
            isPersonalRecord(
                test,
                tests
            );


        row.innerHTML = `

            <td>

                <div class="test-athlete">

                    <div class="test-athlete-avatar">
                        ${initials}
                    </div>

                    <strong>
                        ${test.athleteName}
                    </strong>

                </div>

            </td>


            <td>

                <span class="category-badge">
                    ${test.category}
                </span>

            </td>


            <td>
                ${test.test}
            </td>


            <td>

                <span class="result-value">
                    ${formatResult(test.result)}
                    ${test.unit}
                </span>

            </td>


            <td>

                <span class="test-date">
                    ${formatDate(test.date)}
                </span>

            </td>


            <td>

                ${
                    personalRecord
                    ? `<span class="pr-badge">PERSONAL BEST</span>`
                    : "—"
                }

            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* =========================================
   FORMAT RESULT
   ========================================= */

function formatResult(result) {

    const number =
        Number(result);


    if (Number.isInteger(number)) {
        return number;
    }


    return number.toFixed(2);

}


/* =========================================
   FORMAT DATE
   ========================================= */

function formatDate(dateString) {

    if (!dateString) {
        return "—";
    }


    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-ZA",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================
   GET INITIALS
   ========================================= */

function getInitials(name) {

    if (!name) {
        return "?";
    }


    const parts =
        name.trim().split(" ");


    if (parts.length === 1) {

        return parts[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        parts[0].charAt(0) +
        parts[parts.length - 1].charAt(0)
    ).toUpperCase();

}


/* =========================================
   RESET FORM
   ========================================= */

function resetTestingForm() {

    const form =
        document.getElementById(
            "testingForm"
        );


    form.reset();


    selectedCategory = "";


    document
        .querySelectorAll(
            ".category-card"
        )
        .forEach(card => {

            card.classList.remove(
                "selected"
            );

        });


    const testSelect =
        document.getElementById(
            "testSelect"
        );


    testSelect.innerHTML = `
        <option value="">
            Select a category first
        </option>
    `;

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
   INITIALISE TESTING CENTRE
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        if (!checkLogin()) {
            return;
        }


        loadAthletes();


        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        document.getElementById(
            "testDate"
        ).value = today;


        document.getElementById(
            "testSelect"
        ).addEventListener(
            "change",
            updateUnit
        );


        renderRecentTests();

    }
);

