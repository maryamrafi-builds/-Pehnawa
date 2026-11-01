
/* =====================================
   1. PRODUCT FILTERING
===================================== */

function filterProducts(category, button) {
    const products = document.querySelectorAll(".product-card");
    let count = 0;

    products.forEach(function(product) {
        if (
            category === "all" ||
            product.dataset.category === category
        ) {
            product.style.display = "";
            count++;
        } else {
            product.style.display = "none";
        }
    });

    // Change the active category button
    document.querySelectorAll(".category-btn").forEach(
        function(btn) {
            btn.classList.remove("active");
        }
    );

    button.classList.add("active");

    // Update the product count
    const productCount = document.getElementById("product-count");

    if (productCount) {
        productCount.textContent =
            count + (count === 1 ? " Product" : " Products");
    }
}


/* =====================================
   2. PRODUCT SCROLL ANIMATION
===================================== */

document.addEventListener("DOMContentLoaded", function() {
    const products = document.querySelectorAll(".product-card");

    products.forEach(function(product) {
        product.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    products.forEach(function(product) {
        observer.observe(product);
    });
});


/* =====================================
   3. WISHLIST
   Save selected products in localStorage
===================================== */

function getWishlist() {
    try {
        const wishlist = JSON.parse(
            localStorage.getItem("pehnawaWishlist") || "[]"
        );

        return Array.isArray(wishlist) ? wishlist : [];
    } catch (error) {
        console.error("Could not read wishlist:", error);
        return [];
    }
}


function toggleWishlist(button, productId) {
    if (!productId) {
        console.error("A unique product ID is required.");
        return;
    }

    let wishlist = getWishlist();

    const icon = button.querySelector("i");

    if (wishlist.includes(productId)) {
        // Remove product from wishlist
        wishlist = wishlist.filter(function(id) {
            return id !== productId;
        });

        button.classList.remove("active", "liked");

        if (icon) {
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
        }

    } else {
        // Add product to wishlist
        wishlist.push(productId);

        button.classList.add("active", "liked");

        if (icon) {
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
        }
    }

    localStorage.setItem(
        "pehnawaWishlist",
        JSON.stringify(wishlist)
    );

    updateWishlistCount();
}


/* Update the wishlist number in the header */

function updateWishlistCount() {
    const wishCount = document.getElementById("wish_count");

    if (!wishCount) return;

    wishCount.textContent = getWishlist().length;
}


/* Restore selected hearts when the page opens */

function loadWishlistHearts() {
    const wishlist = getWishlist();

    document.querySelectorAll(".wishlist-btn").forEach(
        function(button) {
            // Read the product ID from the onclick attribute
            const onclickText = button.getAttribute("onclick") || "";

            const match = onclickText.match(
                /toggleWishlist\(this,\s*['"]([^'"]+)['"]\)/
            );

            if (!match) return;

            const productId = match[1];
            const selected = wishlist.includes(productId);
            const icon = button.querySelector("i");

            button.classList.toggle("active", selected);
            button.classList.toggle("liked", selected);

            if (icon) {
                icon.classList.toggle("fa-solid", selected);
                icon.classList.toggle("fa-regular", !selected);
            }
        }
    );
}


/* =====================================
   4. ADD TO CART
===================================== */



function addToBag(productName) {

    fetch("add_to_cart.jsp?product=" + encodeURIComponent(productName), {
        cache: "no-store"
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Failed to add product to cart");
        }

        return response.text();
    })
    .then(function() {

        // Update the cart count in the header
        return fetch("cart_count.jsp", {
            cache: "no-store"
        });
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Failed to update cart count");
        }

        return response.text();
    })
    .then(function(count) {

        // Display the updated count
        const cartCount = document.getElementById("cart_count");

        if (cartCount) {
            cartCount.textContent = count.trim();
        }

        // Scroll smoothly to the top/header
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    })
    .catch(function(error) {
        console.error("Cart error:", error);
    });
}




/* =====================================
   5. UPDATE CART COUNTER
===================================== */

function updateCartCount() {
    const cartCount = document.getElementById("cart_count");

    if (!cartCount) return;

    fetch("cart_count.jsp", {
        cache: "no-store"
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Could not load cart count");
            }

            return response.text();
        })
        .then(function(count) {
            cartCount.textContent = count.trim();
        })
        .catch(function(error) {
            console.error("Cart count error:", error);
        });
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