function validateForm() 
{
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;

if (username.trim() !== "Admin") {
    alert("Invalid username");
    return false;
}
if (password.trim() !== "Admin123") {
    alert("Invalid password");
    return false;
}

// If all validations pass, return true to allow form submission
return true;
}
