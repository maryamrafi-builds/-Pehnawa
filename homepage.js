function toggleWishlist(button) {
    const heart = button.querySelector("i");

    heart.classList.toggle("fa-regular");
    heart.classList.toggle("fa-solid");
    button.classList.toggle("active");
    // Update the wishlist number
    updateWishlistCount();
}
// animation

/* Scroll reveal animation */

document.documentElement.classList.add("js"); //add css class name 'js' After this JavaScript runs,<html> becomes <html class="js">

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {

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

revealElements.forEach(function (element) {
    observer.observe(element);
});

function addToCart(productName) {
    window.location.href =
        "add_to_cart.jsp?product=" +
        encodeURIComponent(productName);
}

//update add to cart icon automatically

function updateCartCount() {
    fetch("cart_count.jsp")
        .then(response => response.text())
        .then(count => {
            document.getElementById("cart_count").textContent =
                count.trim();
        });
       
}

document.addEventListener("DOMContentLoaded", updateCartCount);

//displays the first letter of the username


function updateAccountStatus() {
    const accountLink = document.getElementById("account-link");

    if (!accountLink) return;

    fetch("user_status.jsp", { cache: "no-store" })
        .then(response => response.text())
        .then(data => {
            data = data.trim();

            if (data.startsWith("IN|")) {
                const userName = data.substring(3).trim();
                const initial = userName
                    ? userName.charAt(0).toUpperCase()
                    : "U";

                // Show the first letter
                accountLink.innerHTML = initial;

                // Apply the circle directly
                accountLink.classList.add("profile-circle");

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
            } else {
                accountLink.innerHTML =
                    '<i class="fa-regular fa-user"></i>';

                accountLink.classList.remove("profile-circle");
                accountLink.removeAttribute("style");
                accountLink.href = "login.html";
                accountLink.title = "Login";
            }
        })
        .catch(error => console.error("Account status error:", error));
}

document.addEventListener("DOMContentLoaded", updateAccountStatus);

// wishlist count

function updateWishlistCount() {
    const wishCount = document.getElementById("wish_count");

    if (!wishCount) {
        return;
    }

    const selectedHearts = document.querySelectorAll(
        ".wishlist.active"
    ).length;

    wishCount.textContent = selectedHearts;
}

// Set the correct count when the page loads
document.addEventListener("DOMContentLoaded", updateWishlistCount);
