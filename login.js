    let email=document.getElementById("email");
    let password=document.getElementById("password");

    document.getElementById("emailMessage");
    document.getElementById("passwordMessage");


email.addEventListener("blur", function () {

    if (email.value == "") {
        emailMessage.textContent = "Email is required";
    }

    else if (!email.value.includes("@")) {
        emailMessage.textContent = "Please enter a valid email";
    }

    else {
        emailMessage.textContent = "";
    }

});



password.addEventListener("blur", function () {

    if (password.value === "") {
        passwordMessage.textContent = "Password is required.";
    }
    else if (password.value.length < 8) {
        passwordMessage.textContent =
            "Password must be at least 8 characters.";
    }
    else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password.value)) {
         passwordMessage.textContent =
            "Password must contain at least one number and one special character.";
    }
    else {
        passwordMessage.textContent = "";
    }

});


// SIGN UP BUTTON
function data() {

    let valid = true;

    // Email
    if (email.value === "") {
        emailMessage.textContent = "Email is required.";
        valid = false;
    }
    else if (!email.value.includes("@")) {
        emailMessage.textContent = "Please enter a valid email.";
        valid = false;
    }

    // Password
    if (password.value === "") {
        passwordMessage.textContent = "Password is required.";
        valid = false;
    }
    else if (password.value.length < 8) {
        passwordMessage.textContent =
            "Password must be at least 8 characters.";
        valid = false;
    }
    else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password.value)) {
        passwordMessage.textContent =
            "Password must contain at least one number and one special character.";
        valid = false;
    }

    // Everything is correct, success alert must now come after the database confirms that the account was saved
   
    return valid;
}