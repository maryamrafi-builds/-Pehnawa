/* =================================
   1. WISHLIST HEART
================================= */

function toggleWishlist(button) {

    const heart = button.querySelector("i");

    heart.classList.toggle("fa-regular");
    heart.classList.toggle("fa-solid");

    button.classList.toggle("active");

    updateWishlistCount();
}


/* =================================
   2. SCROLL REVEAL ANIMATION
================================= */

document.documentElement.classList.add("js");

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(

    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);
            }

        });

    },

    {
        threshold: 0.15
    }

);

revealElements.forEach(function(element) {

    observer.observe(element);

});


/* =================================
   3. ADD TO CART
================================= */

function addToCart(productName) {

    window.location.href =
        "add_to_cart.jsp?product=" +
        encodeURIComponent(productName);

}


/* =================================
   4. UPDATE CART COUNT
================================= */

function updateCartCount() {

    const cartCount = document.getElementById("cart_count");

    if (!cartCount) return;

    fetch("cart_count.jsp", {
        cache: "no-store"
    })

    .then(response => response.text())

    .then(count => {

        cartCount.textContent = count.trim();

    })

    .catch(error => {

        console.error("Cart count error:", error);

    });

}


/* =================================
   5. UPDATE WISHLIST COUNT
================================= */

function updateWishlistCount() {

    const wishCount = document.getElementById("wish_count");

    if (!wishCount) return;

    const selectedHearts = document.querySelectorAll(
        ".wishlist.active"
    ).length;

    wishCount.textContent = selectedHearts;

}


/* =================================
   6. USER ACCOUNT AND DROPDOWN
================================= */

function updateAccountStatus() {

    const accountLink = document.getElementById("account-link");

    const profileName = document.getElementById("profile-name");

    const profileEmail = document.getElementById("profile-email");

    const profileAvatar = document.getElementById("profile-avatar");

    const profileMenu = document.getElementById("profile-menu");

    if (!accountLink) return;

    fetch("user_status.jsp", {
        cache: "no-store"
    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Could not load account status");
        }

        return response.text();

    })

    .then(data => {

        data = data.trim();

        /* USER IS LOGGED IN */

        if (data.startsWith("IN|")) {

            const parts = data.split("|");

            const userName = parts[1] || "";

            const userEmail = parts[2] || "";

            const initial = userName.trim()
                ? userName.trim().charAt(0).toUpperCase()
                : "U";


            // Update the existing user icon

            accountLink.textContent = initial;

            accountLink.classList.add("profile-circle");

            accountLink.dataset.loggedIn = "true";

            Object.assign(accountLink.style, {

                width: "30px",
                height: "30px",
                minWidth: "30px",

                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",

                backgroundColor: "#245C56",
                color: "#ffffff",

                borderRadius: "50%",
                padding: "0",

                fontSize: "14px",
                fontWeight: "bold",
                lineHeight: "1",

                textDecoration: "none",
                boxSizing: "border-box"

            });

            accountLink.href = "login.html";

            accountLink.title = "My Profile";


            // Update dropdown information

            if (profileName) {
                profileName.textContent = userName;
            }

            if (profileEmail) {
                profileEmail.textContent = userEmail;
            }

            if (profileAvatar) {
                profileAvatar.textContent = initial;
            }

        }

        /* USER IS NOT LOGGED IN */

        else {

            accountLink.innerHTML =
                '<i class="fa-regular fa-user"></i>';

            accountLink.classList.remove("profile-circle");

            accountLink.dataset.loggedIn = "false";

            accountLink.removeAttribute("style");

            accountLink.href = "login.html";

            accountLink.title = "Login";

            if (profileMenu) {
                profileMenu.classList.remove("show");
            }

        }

    })

    .catch(error => {

        console.error("Account status error:", error);

    });

}


/* =================================
   7. DROPDOWN CLICK FUNCTIONALITY
================================= */

document.addEventListener("DOMContentLoaded", function() {

    const accountLink = document.getElementById("account-link");

    const profileMenu = document.getElementById("profile-menu");

    if (!accountLink || !profileMenu) return;


    // Open menu when logged-in user clicks icon

    accountLink.addEventListener("click", function(event) {

        if (accountLink.dataset.loggedIn === "true") {

            event.preventDefault();

            event.stopPropagation();

            profileMenu.classList.toggle("show");

        }

    });


    // Close menu when user clicks outside

    document.addEventListener("click", function(event) {

        if (
            !profileMenu.contains(event.target) &&
            !accountLink.contains(event.target)
        ) {

            profileMenu.classList.remove("show");

        }

    });

});


/*
   8. INITIALIZE PAGE
 */

document.addEventListener("DOMContentLoaded", function() {

    updateCartCount();

    updateWishlistCount();

    updateAccountStatus();

});