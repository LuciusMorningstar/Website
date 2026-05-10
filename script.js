const modal = document.getElementById("loginModal");
const btn = document.getElementById("loginBtn");
const span = document.querySelector(".close");
const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMessage");

btn.onclick = function(e) {
    e.preventDefault();
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
    errorMsg.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        errorMsg.style.display = "none";
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    
    if (user === "Superuser" && pass === "Superpassword") {
        alert("Доступ дозволено. Вітаємо у лавах Мисливців!");
        modal.style.display = "none";
        form.reset();
        errorMsg.style.display = "none";
    } else {
        errorMsg.textContent = "Такий користувач у системі не зареєстрований";
        errorMsg.style.display = "block";
    }
});