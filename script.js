// ==========================================
// 1. ATTRACTION SEARCH + FILTER
// ==========================================

const searchInput = document.getElementById("attractionSearch");
const categoryFilter = document.getElementById("categoryFilter");
const attractionCards = document.querySelectorAll(".attraction-card");
const noResults = document.getElementById("noResults");

function filterAttractions() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    let visibleCards = 0;

    attractionCards.forEach(function(card) {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const description = card.querySelector("p").textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch =
            title.includes(searchText) ||
            description.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
            visibleCards++;
        } else {
            card.style.display = "none";
        }
    });

    if (visibleCards === 0) {
        noResults.classList.remove("hidden");
    } else {
        noResults.classList.add("hidden");
    }
}

if (searchInput && categoryFilter) {
    searchInput.addEventListener("input", filterAttractions);
    categoryFilter.addEventListener("change", filterAttractions);
}


// ==========================================
// 2. FOOD SEARCH + FILTER
// ==========================================

const foodSearch = document.getElementById("foodSearch");
const foodCategoryFilter =
    document.getElementById("foodCategoryFilter");

const foodCards =
    document.querySelectorAll(".food-card");

const noFoodResults =
    document.getElementById("noFoodResults");

function filterFood() {
    const searchText =
        foodSearch.value.toLowerCase().trim();

    const selectedCategory =
        foodCategoryFilter.value;

    let visibleCards = 0;

    foodCards.forEach(function(card) {
        const title =
            card.querySelector("h3").textContent.toLowerCase();

        const description =
            card.querySelector("p").textContent.toLowerCase();

        const category =
            card.dataset.category;

        const matchesSearch =
            title.includes(searchText) ||
            description.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
            visibleCards++;
        } else {
            card.style.display = "none";
        }
    });

    if (visibleCards === 0) {
        noFoodResults.classList.remove("hidden");
    } else {
        noFoodResults.classList.add("hidden");
    }
}

if (foodSearch && foodCategoryFilter) {
    foodSearch.addEventListener("input", filterFood);
    foodCategoryFilter.addEventListener(
        "change",
        filterFood
    );
}


// ==========================================
// 3. FAVORITES + LOCAL STORAGE
// ==========================================

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");

const favoriteList =
    document.getElementById("favoriteList");

const favoriteMessage =
    document.getElementById("favoriteMessage");

let favorites =
    JSON.parse(localStorage.getItem("saigonFavorites")) || [];

function updateFavoriteButtons() {

    favoriteButtons.forEach(function(button) {

        const card =
            button.closest(".attraction-card");

        if (!card) return;

        const name =
            card.querySelector("h3").textContent;

        if (favorites.includes(name)) {

            button.textContent =
                "♥ Added to Favorites";

            button.classList.add("active");

        } else {

            button.textContent =
                "♡ Add to Favorites";

            button.classList.remove("active");
        }
    });
}

function updateFavorites() {

    if (favoriteList) {

        favoriteList.innerHTML = "";

        if (favorites.length === 0) {

            if (favoriteMessage) {
                favoriteMessage.style.display = "block";
            }

        } else {

            if (favoriteMessage) {
                favoriteMessage.style.display = "none";
            }

            favorites.forEach(function(place) {

                const listItem =
                    document.createElement("li");

                listItem.textContent = place;

                favoriteList.appendChild(listItem);
            });
        }
    }

    localStorage.setItem(
        "saigonFavorites",
        JSON.stringify(favorites)
    );

    updateFavoriteButtons();
}

favoriteButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const card =
            button.closest(".attraction-card");

        const attractionName =
            card.querySelector("h3").textContent;

        if (favorites.includes(attractionName)) {

            favorites =
                favorites.filter(function(item) {
                    return item !== attractionName;
                });

        } else {

            favorites.push(attractionName);
        }

        updateFavorites();
    });
});

updateFavorites();


// ==========================================
// 4. DARK MODE
// ==========================================

const darkModeButton =
    document.getElementById("darkModeButton");

if (darkModeButton) {

    const savedTheme =
        localStorage.getItem("saigonTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        darkModeButton.textContent = "☀️";
    }

    darkModeButton.addEventListener("click", function() {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        if (isDark) {

            darkModeButton.textContent = "☀️";

            localStorage.setItem(
                "saigonTheme",
                "dark"
            );

        } else {

            darkModeButton.textContent = "🌙";

            localStorage.setItem(
                "saigonTheme",
                "light"
            );
        }
    });
}


// ==========================================
// 5. BUILD YOUR SAIGON
// ==========================================



let selectedVibe = null;
let selectedBudget = null;
let selectedTime = null;


// ==========================================
// VIBE SELECTION
// ==========================================

const vibeCards = document.querySelectorAll(".vibe-card");

vibeCards.forEach(function(card) {

    card.addEventListener("click", function() {

        vibeCards.forEach(function(item) {
            item.classList.remove("selected");
        });

        card.classList.add("selected");

        selectedVibe = card.dataset.vibe;

    });

});


// ==========================================
// BUDGET SELECTION
// ==========================================

const budgetButtons =
    document.querySelectorAll(".budget-option");

budgetButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        budgetButtons.forEach(function(item) {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedBudget = button.dataset.budget;

    });

});


// ==========================================
// TIME SELECTION
// ==========================================

const timeButtons =
    document.querySelectorAll(".time-option");

timeButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        timeButtons.forEach(function(item) {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedTime = Number(button.dataset.time);

    });

});


// ==========================================
// SAIGON EXPERIENCES
// ==========================================

const saigonExperiences = {

    night: {

        icon: "🌃",

        title: "The Night Seeker",

        description:
            "You don't just visit Saigon. You experience it after dark.",

        places: [
            {
                time: "6:00 PM",
                name: "Nguyen Hue Walking Street",
                description: "Start your evening with Saigon's city lights."
            },

            {
                time: "7:30 PM",
                name: "Ben Thanh Market",
                description: "Explore local food and the evening atmosphere."
            },

            {
                time: "9:00 PM",
                name: "Bui Vien Walking Street",
                description: "Experience the energy of Saigon nightlife."
            },

            {
                time: "10:30 PM",
                name: "Rooftop View",
                description: "Finish the night with a view above the city."
            }
        ],

        scores: {
            night: 95,
            food: 80,
            photo: 90,
            history: 45,
            slow: 30
        }

    },


    foodie: {

        icon: "🍜",

        title: "The Local Foodie",

        description:
            "You came to Saigon for the food — and we're not stopping at one dish.",

        places: [
            {
                time: "11:00 AM",
                name: "Local Vietnamese Café",
                description: "Start with Vietnamese coffee and a light breakfast."
            },

            {
                time: "12:30 PM",
                name: "Ben Thanh Market",
                description: "Taste local dishes and traditional street food."
            },

            {
                time: "3:00 PM",
                name: "Nguyen Hue",
                description: "Walk through the heart of downtown Saigon."
            },

            {
                time: "6:00 PM",
                name: "Bui Vien",
                description: "Finish with more street food and nightlife."
            }
        ],

        scores: {
            night: 70,
            food: 100,
            photo: 80,
            history: 50,
            slow: 55
        }

    },


    photo: {

        icon: "📸",

        title: "The City Storyteller",

        description:
            "Your camera is going to need more storage.",

        places: [
            {
                time: "9:00 AM",
                name: "Notre-Dame Cathedral",
                description: "Capture one of Saigon's most iconic landmarks."
            },

            {
                time: "10:00 AM",
                name: "Central Post Office",
                description: "Explore the city's beautiful colonial architecture."
            },

            {
                time: "4:30 PM",
                name: "Nguyen Hue Walking Street",
                description: "Photograph Saigon as the city comes alive."
            },

            {
                time: "6:00 PM",
                name: "Landmark 81",
                description: "Finish with a modern skyline view."
            }
        ],

        scores: {
            night: 70,
            food: 55,
            photo: 100,
            history: 75,
            slow: 50
        }

    },


    history: {

        icon: "🏛️",

        title: "The Time Traveler",

        description:
            "Walk through the places that shaped modern Saigon.",

        places: [
            {
                time: "9:00 AM",
                name: "War Remnants Museum",
                description: "Learn about Vietnam's modern history."
            },

            {
                time: "11:00 AM",
                name: "Independence Palace",
                description: "Explore one of the city's most important landmarks."
            },

            {
                time: "1:00 PM",
                name: "Central Post Office",
                description: "Discover Saigon's architectural heritage."
            },

            {
                time: "3:00 PM",
                name: "Ben Thanh Market",
                description: "Experience a historic part of everyday Saigon."
            }
        ],

        scores: {
            night: 30,
            food: 65,
            photo: 80,
            history: 100,
            slow: 60
        }

    },


    slow: {

        icon: "☕",

        title: "The Slow Explorer",

        description:
            "No rushing. Just coffee, old streets and Saigon waking up.",

        places: [
            {
                time: "8:00 AM",
                name: "Local Vietnamese Café",
                description: "Start the morning with traditional coffee."
            },

            {
                time: "9:30 AM",
                name: "Book Street",
                description: "Take a quiet walk through one of the city's cultural corners."
            },

            {
                time: "11:00 AM",
                name: "Nguyen Hue",
                description: "Enjoy the city at a relaxed pace."
            },

            {
                time: "12:30 PM",
                name: "Local Lunch Spot",
                description: "Finish with a relaxed Vietnamese meal."
            }
        ],

        scores: {
            night: 25,
            food: 70,
            photo: 75,
            history: 60,
            slow: 100
        }

    }

};


// ==========================================
// GENERATE EXPERIENCE
// ==========================================

const generateButton =
    document.getElementById("generateItinerary");

generateButton.addEventListener("click", function() {

    if (!selectedVibe) {

        alert("Choose your Saigon vibe first!");

        return;
    }

    if (!selectedBudget) {

        alert("Choose your budget!");

        return;
    }

    if (!selectedTime) {

        alert("Choose how much time you have!");

        return;
    }

    generateExperience();

});


// ==========================================
// GENERATE FUNCTION
// ==========================================

function generateExperience() {

    const experience =
        saigonExperiences[selectedVibe];

    const result =
        document.getElementById("saigon-result");

    result.classList.remove("hidden");


    // ICON

    document.getElementById("resultIcon").textContent =
        experience.icon;


    // TITLE

    document.getElementById("resultTitle").textContent =
        experience.title;


    // DESCRIPTION

    document.getElementById("resultDescription").textContent =
        experience.description;


    // BUDGET

    document.getElementById("resultBudget").textContent =
        "💰 " + selectedBudget;


    // TIME

    let timeText;

    if (selectedTime === 120) {
        timeText = "2 Hours";
    }

    else if (selectedTime === 240) {
        timeText = "Half Day";
    }

    else {
        timeText = "Full Day";
    }

    document.getElementById("resultTime").textContent =
        "⏱ " + timeText;


    // ==============================
// BUILD YOUR SAIGON - PLACES
// ==============================

// PLACES

const placesContainer =
    document.getElementById("resultPlaces");

placesContainer.innerHTML = "";


// Decide how many places to show
let numberOfPlaces;

if (selectedTime === 120) {
    numberOfPlaces = 2;
}
else if (selectedTime === 240) {
    numberOfPlaces = 4;
}
else {
    numberOfPlaces = 6;
}


// Take only the needed places
const selectedPlaces =
    experience.places.slice(0, numberOfPlaces);


// Starting time
let startHour = 9;


// Create places
selectedPlaces.forEach(function(place, index) {

    const placeElement =
        document.createElement("div");

    placeElement.className = "story-stop";


    // Every stop is about 1.5 hours apart
    let totalMinutes =
        startHour * 60 + (index * 90);


    let hour =
        Math.floor(totalMinutes / 60);

    let minutes =
        totalMinutes % 60;


    let ampm = hour >= 12 ? "PM" : "AM";

    let displayHour = hour % 12;

    if (displayHour === 0) {
        displayHour = 12;
    }


    let timeText =
        displayHour +
        ":" +
        String(minutes).padStart(2, "0") +
        " " +
        ampm;


    placeElement.innerHTML = `

        <div class="stop-time">
            ${timeText}
        </div>

        <div class="stop-line"></div>

        <div class="stop-content">

            <h4>
                ${place.name}
            </h4>

            <p>
                ${place.description}
            </p>

        </div>

    `;


    placesContainer.appendChild(placeElement);

});



    // SCORES

    document.getElementById("nightScore").style.width =
        experience.scores.night + "%";

    document.getElementById("foodScore").style.width =
        experience.scores.food + "%";

    document.getElementById("photoScore").style.width =
        experience.scores.photo + "%";

    document.getElementById("historyScore").style.width =
        experience.scores.history + "%";

    document.getElementById("slowScore").style.width =
        experience.scores.slow + "%";


    // SCROLL

    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}

// ==========================================
// SEND ITINERARY BY EMAIL
// ==========================================

const sendButton = document.getElementById("sendItinerary");

sendButton.addEventListener("click", function () {

    const email = document.getElementById("customerEmail").value.trim();

    if (!email) {
        alert("Please enter your email.");
        return;
    }

    sendButton.textContent = "Sending...";
    sendButton.disabled = true;

    // Convert selected time to readable text
    let durationText;

    if (selectedTime === 120) {
        durationText = "2 Hours";
    } else if (selectedTime === 240) {
        durationText = "Half Day";
    } else if (selectedTime === 480) {
        durationText = "Full Day";
    }

    // Convert budget
    let budgetText;

    if (selectedBudget === "$") {
        budgetText = "Under $20";
    } else if (selectedBudget === "$$") {
        budgetText = "$20-$50";
    } else if (selectedBudget === "$$$") {
        budgetText = "Over $50";
    } else {
        budgetText = selectedBudget;
    }

    const places = document.querySelectorAll("#resultPlaces .story-stop");

let itineraryText = "";

places.forEach(function(place, index) {

    const time = place.querySelector(".stop-time")?.textContent.trim();
    const name = place.querySelector("h4")?.textContent.trim();
    const description = place.querySelector("p")?.textContent.trim();

    itineraryText +=
        `${time}\n` +
        `${name}\n` +
        `${description}\n\n`;
});


const templateParams = {
    email: email,
    name: "Saigon Explorer",
    vibe: selectedVibe,
    budget: budgetText,
    duration: durationText,
    itinerary: itineraryText
};

    console.log("Sending:", templateParams);

    emailjs.send(
        "service_q0fp1yq",
        "template_cxlrgrw",
        templateParams
    )
    .then(function (response) {

        console.log("EMAIL SENT!", response);

        document.getElementById("emailMessage").textContent =
            "✓ Your itinerary has been sent successfully!";

        sendButton.textContent = "Send My Itinerary →";
        sendButton.disabled = false;

    })
    .catch(function (error) {

        console.error("EMAIL ERROR:", error);

        document.getElementById("emailMessage").textContent =
            "✕ Failed to send email.";

        sendButton.textContent = "Send My Itinerary →";
        sendButton.disabled = false;

    });

});
// ==========================================
// SURPRISE ME
// ==========================================

const surpriseButton = document.getElementById("surpriseMe");

surpriseButton.addEventListener("click", function () {

    // Random Vibe
    const vibes = [
        "night",
        "foodie",
        "photo",
        "history",
        "slow"
    ];

    selectedVibe =
        vibes[Math.floor(Math.random() * vibes.length)];


    // Update Vibe cards
    vibeCards.forEach(function (card) {

        card.classList.remove("selected");

        if (card.dataset.vibe === selectedVibe) {
            card.classList.add("selected");
        }

    });


    // Random Budget
    const budgets = [
        "Under $20",
        "$20-$50",
        "Over $50"
    ];

    selectedBudget =
        budgets[Math.floor(Math.random() * budgets.length)];


    // Update Budget buttons
    budgetButtons.forEach(function (button) {

        button.classList.remove("selected");

        if (button.dataset.budget === selectedBudget) {
            button.classList.add("selected");
        }

    });


    // Random Time
    const times = [120, 240, 480];

    selectedTime =
        times[Math.floor(Math.random() * times.length)];


    // Update Time buttons
    timeButtons.forEach(function (button) {

        button.classList.remove("selected");

        if (Number(button.dataset.time) === selectedTime) {
            button.classList.add("selected");
        }

    });


    // Generate the random itinerary
    generateExperience();

});
