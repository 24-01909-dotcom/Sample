/* =========================
   GLOBAL VARIABLES
========================= */

let currentProvider = "";


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}


/* =========================
   SEARCH PROVIDERS
========================= */

function searchProviders() {

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const location =
        document.getElementById("locationInput")
        .value
        .toLowerCase()
        .trim();

    const cards =
        document.querySelectorAll(".provider-card");

    let found = 0;

    cards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const category =
            card.dataset.category.toLowerCase();

        const cardLocation =
            card.dataset.location.toLowerCase();

        const matchesSearch =
            search === "" ||
            name.includes(search) ||
            category.includes(search);

        const matchesLocation =
            location === "" ||
            cardLocation.includes(location);

        if (matchesSearch && matchesLocation) {

            card.style.display = "block";
            found++;

        } else {

            card.style.display = "none";

        }

    });

    const noResults =
        document.getElementById("noResults");

    noResults.style.display =
        found === 0 ? "block" : "none";

    document.getElementById("providers")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   QUICK SEARCH
========================= */

function quickSearch(category) {

    document.getElementById("searchInput").value =
        category;

    document.getElementById("categoryFilter").value =
        "all";

    filterProviders();

    document.getElementById("providers")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   FILTER
========================= */

function filterProviders() {

    const selected =
        document.getElementById("categoryFilter").value;

    const cards =
        document.querySelectorAll(".provider-card");

    let found = 0;

    cards.forEach(card => {

        if (
            selected === "all" ||
            card.dataset.category === selected
        ) {

            card.style.display = "block";
            found++;

        } else {

            card.style.display = "none";

        }

    });

    document.getElementById("noResults").style.display =
        found === 0 ? "block" : "none";
}


/* =========================
   FAVORITES
========================= */

function toggleFavorite(button) {

    button.classList.toggle("active");

    const icon = button.querySelector("i");

    if (button.classList.contains("active")) {

        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");

        showToast("Provider added to favorites.");

    } else {

        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");

        showToast("Provider removed from favorites.");

    }
}


/* =========================
   PROVIDER PROFILE
========================= */

function viewProvider(providerName) {

    currentProvider = providerName;

    document.getElementById("profileName")
        .textContent = providerName;

    const card =
        document.querySelector(
            `[data-name="${providerName}"]`
        );

    if (card) {

        const service =
            card.querySelector(".service").textContent;

        document.getElementById("profileService")
            .textContent = service;

    }

    document.getElementById("profileModal")
        .classList.add("show");
}


/* =========================
   INQUIRY
========================= */

function openInquiry(providerName) {

    currentProvider = providerName;

    document.getElementById("selectedProvider")
        .textContent = providerName;

    document.getElementById("inquiryModal")
        .classList.add("show");
}


function sendInquiry(event) {

    event.preventDefault();

    closeModal("inquiryModal");

    showToast(
        "Your inquiry has been sent successfully!"
    );

    event.target.reset();
}


/* =========================
   LOGIN
========================= */

function openLogin() {

    document.getElementById("loginModal")
        .classList.add("show");
}


function login(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    closeModal("loginModal");

    showToast(
        "Welcome back! Login successful."
    );

    console.log("Logged in user:", email);

    event.target.reset();
}


/* =========================
   REGISTER
========================= */

function openRegister() {

    document.getElementById("registerModal")
        .classList.add("show");
}


function register(event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value;

    const role =
        document.getElementById("registerRole").value;

    closeModal("registerModal");

    showToast(
        "Account created successfully!"
    );

    console.log(
        "Registered:",
        name,
        role
    );

    event.target.reset();
}


/* =========================
   SWITCH MODALS
========================= */

function switchToRegister() {

    closeModal("loginModal");

    openRegister();
}


function switchToLogin() {

    closeModal("registerModal");

    openLogin();
}


/* =========================
   CLOSE MODAL
========================= */

function closeModal(id) {

    document.getElementById(id)
        .classList.remove("show");
}


/* =========================
   CONTACT FORM
========================= */

function submitContact(event) {

    event.preventDefault();

    showToast(
        "Thank you! Your message has been sent."
    );

    event.target.reset();
}


/* =========================
   TOAST MESSAGE
========================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);
}


/* =========================
   CLOSE MODAL WHEN CLICKING
   OUTSIDE
========================= */

window.addEventListener("click", function(event) {

    const modals =
        document.querySelectorAll(".modal");

    modals.forEach(modal => {

        if (event.target === modal) {
            modal.classList.remove("show");
        }

    });

});


/* =========================
   NAV LINK AUTO CLOSE
========================= */

document.querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            document
                .getElementById("navLinks")
                .classList.remove("active");

        });

    });