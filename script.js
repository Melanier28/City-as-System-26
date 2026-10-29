
// Subway station

const timeButtons = document.querySelectorAll(".time-button");

const peopleContainer = document.getElementById("people");
const stationTime = document.getElementById("station-time");
const sceneCaption = document.getElementById("scene-caption");

const commuterCount = document.getElementById("commuter-count");
const rushingCount = document.getElementById("rushing-count");
const crowdLevel = document.getElementById("crowd-level");

const observationTitle = document.getElementById("observation-title");
const observationText = document.getElementById("observation-text");

const cameraButton = document.getElementById("camera-button");
const cameraStatus = document.getElementById("camera-status");
const platformScene = document.getElementById("platform-scene");

const trackedCount = document.getElementById("tracked-count");
const walkingCount = document.getElementById("walking-count");
const waitingCount = document.getElementById("waiting-count");


const stationData = {
    morning: {
        time: "10 AM",
        title: "Morning Rush",
        commuters: 149,
        rushing: 57,
        crowd: "High",
        peopleShown: 18,
        color: "#465563",
        caption: "Commuters heading to work and school.",
        observationTitle: "The morning rush",
        observation:
            "The platform becomes busier as people travel to work and school. Commuters navigate around one another, often moving quickly toward train doors and staircases."
    },

    afternoon: {
        time: "3 PM",
        title: "Afternoon Lull",
        commuters: 78,
        rushing: 12,
        crowd: "Low",
        peopleShown: 8,
        color: "#596b78",
        caption: "More space to wait and move around.",
        observationTitle: "A quieter rhythm",
        observation:
            "With fewer commuters passing through, people have more room to wait and move. The platform feels less congested, and fewer people appear to be rushing."
    },

    evening: {
        time: "7 PM",
        title: "Evening Rush",
        commuters: 194,
        rushing: 75,
        crowd: "Very high",
        peopleShown: 27,
        color: "#394653",
        caption: "Crowds gather near boarding areas.",
        observationTitle: "The evening rush",
        observation:
            "The platform reaches its busiest period in this example dataset. More people move through the space, and crowds can gather near staircases and train doors."
    }
};

// Different clothing colors for the commuters

const clothingColors = [
    "#e76f51",
    "#e9c46a",
    "#457b9d",
    "#a8dadc",
    "#b8a1d9",
    "#f4f1de",
    "#d1495b",
    "#84a98c"
];

// Create the commuters

function createPeople(numberOfPeople) {
    peopleContainer.innerHTML = "";

    for (let i = 0; i < numberOfPeople; i++) {
        const person = document.createElement("div");

        person.classList.add("person");

        // Randomly classify each commuter

        const isWalking = Math.random() < 0.6;

        if (isWalking) {
            person.classList.add("walking");
        } else {
            person.classList.add("waiting");
        }

        // Create the tracking box

        const trackingBox = document.createElement("div");
        trackingBox.classList.add("tracking-box");
        person.appendChild(trackingBox);

        // Create the movement arrow

        const movementArrow = document.createElement("span");
        movementArrow.classList.add("movement-arrow");
        movementArrow.textContent = "↑";
        person.appendChild(movementArrow);

        // Spread people across the platform

        const x = 3 + (i * 37) % 94;

        person.style.left = x + "%";
        person.style.top = `${Math.random() * 10 + 75}%`;

        // Give each commuter a different clothing color

        person.style.backgroundColor =
            clothingColors[i % clothingColors.length];

        // Slightly change animation timing

        person.style.animationDelay = (i % 6) * -0.2 + "s";

        // Some commuters face slightly different directions

        person.style.transform =
            i % 2 === 0 ? "scaleX(1)" : "scaleX(-1)";

        peopleContainer.appendChild(person);
    }

    updateCameraStats();
}

// Update the camera's movement statistics

function updateCameraStats() {
    const people = document.querySelectorAll(".person");
    const walkingPeople = document.querySelectorAll(".person.walking");
    const waitingPeople = document.querySelectorAll(".person.waiting");

    trackedCount.textContent = people.length;
    walkingCount.textContent = walkingPeople.length;
    waitingCount.textContent = waitingPeople.length;
}

// Update the station when a time button is clicked

function updateStation(time) {
    const data = stationData[time];

    // Update the active button

    timeButtons.forEach(function(button) {
        button.classList.remove("active");

        if (button.dataset.time === time) {
            button.classList.add("active");
        }
    });

    // Update the time and station information

    stationTime.textContent = data.time + " — " + data.title;

    commuterCount.textContent = data.commuters;
    rushingCount.textContent = data.rushing;
    crowdLevel.textContent = data.crowd;

    sceneCaption.textContent = data.caption;

    observationTitle.textContent = data.observationTitle;
    observationText.textContent = data.observation;

    // Change the platform's atmosphere

    platformScene.style.background = data.color;

    // Show more or fewer commuters

    createPeople(data.peopleShown);
}

// Make each time button interactive

timeButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const selectedTime = button.dataset.time;

        updateStation(selectedTime);
    });
});

// Turn the security camera on and off

cameraButton.addEventListener("click", function() {
    platformScene.classList.toggle("camera-on");

    if (platformScene.classList.contains("camera-on")) {
        cameraStatus.textContent = "● UNDER OBSERVATION";

        cameraButton.setAttribute(
            "aria-label",
            "Turn security camera off"
        );

        cameraButton.setAttribute("aria-pressed", "true");
    } else {
        cameraStatus.textContent = "● CAMERA OFF";

        cameraButton.setAttribute(
            "aria-label",
            "Turn security camera on"
        );

        cameraButton.setAttribute("aria-pressed", "false");
    }
});

// Load the morning scene when the website opens

updateStation("morning");


// OMNY entry

const entryScreen = document.getElementById("entry-screen");
const stationSite = document.getElementById("station-site");

const paymentCards = document.querySelectorAll(".payment-card");

const readerScreen = document.getElementById("reader-screen");
const readerMessage = document.getElementById("reader-message");
const readerFeedback = document.getElementById("reader-feedback");

const tapButton = document.getElementById("tap-button");
const continueButton = document.getElementById("continue-button");

let selectedCard = null;

// Hidden outcomes for each card
// Card 1: valid
// Card 2: expired
// Card 3: declined
// Card 4: valid

const cardStatuses = [
    "valid",
    "expired",
    "declined",
    "valid"
];

// Let the user choose a card

paymentCards.forEach(function(card) {
    card.addEventListener("click", function() {

        // Clear the previous selection

        paymentCards.forEach(function(otherCard) {
            otherCard.classList.remove("selected");
            otherCard.setAttribute("aria-pressed", "false");
        });

        // Select the new card

        card.classList.add("selected");
        card.setAttribute("aria-pressed", "true");

        selectedCard = Number(card.dataset.card);

        // Reset the reader to its starting appearance

        readerScreen.className = "reader-screen";
        readerMessage.textContent = "READY TO TAP";

        readerFeedback.textContent =
            "Card selected. Tap to enter.";

        // Allow the user to tap again

        tapButton.disabled = false;

        // Hide Continue until a valid card is tapped

        continueButton.hidden = true;
    });
});

// Simulate tapping the card

tapButton.addEventListener("click", function() {
    if (selectedCard === null) {
        return;
    }

    const status = cardStatuses[selectedCard];

    if (status === "valid") {

        // Successful tap

        readerScreen.className = "reader-screen success";
        readerMessage.textContent = "GO";

        readerFeedback.textContent =
            "Payment accepted. You may enter.";

        continueButton.hidden = false;
        tapButton.disabled = true;

    } else if (status === "expired") {

        // Expired card

        readerScreen.className = "reader-screen failure";
        readerMessage.textContent = "INSUFFICIENT FUNDS";

        readerFeedback.textContent =
            "This card has insufficient funds. Choose another card and try again.";

        continueButton.hidden = true;
        tapButton.disabled = true;

    } else if (status === "declined") {

        // Declined card

        readerScreen.className = "reader-screen failure";
        readerMessage.textContent = "CARD NOT ACCEPTED";

        readerFeedback.textContent =
            "Payment declined. Choose another card and try again.";

        continueButton.hidden = true;
        tapButton.disabled = true;
    }
});

// Enter the station after a successful tap

continueButton.addEventListener("click", function() {
    entryScreen.hidden = true;
    stationSite.hidden = false;

    // Start the page at the top

    window.scrollTo(0, 0);
});
