    let username=document.getElementById("username");
    let email=document.getElementById("email");
    let phone=document.getElementById("phone");
    let password=document.getElementById("password");

    document.getElementById("usernameMessage");
    document.getElementById("emailMessage");
    document.getElementById("phoneMessage");
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

username.addEventListener("blur",function(){
       if (username.value === "") {
        usernameMessage.textContent = "Username is required.";
    }
    else if (!/^[A-Za-z]/.test(username.value)) {
        usernameMessage.textContent = "Username must start with a letter.";
    }
    else {
        usernameMessage.textContent = "";
    }
});


phone.addEventListener("blur", function () {

    if (phone.value === "") {
        phoneMessage.textContent = "Phone number is required.";
    }
    else if (!/^\d{11}$/.test(phone.value)) {
        phoneMessage.textContent = "Phone number must contain 11 digits.";
    }
    else {
        phoneMessage.textContent = "";
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

    // Username
    if (username.value === "") {
        usernameMessage.textContent = "Username is required.";
        valid = false;
    }
    else if (!/^[A-Za-z]/.test(username.value)) {
        usernameMessage.textContent = "Username must start with a letter.";
        valid = false;
    }

    // Email
    if (email.value === "") {
        emailMessage.textContent = "Email is required.";
        valid = false;
    }
    else if (!email.value.includes("@")) {
        emailMessage.textContent = "Please enter a valid email.";
        valid = false;
    }

    // Phone
    if (phone.value === "") {
        phoneMessage.textContent = "Phone number is required.";
        valid = false;
    }
    else if (!/^\d{11}$/.test(phone.value)) {
        phoneMessage.textContent =
            "Phone number must contain 11 digits.";
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


