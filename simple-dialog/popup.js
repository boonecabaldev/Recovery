document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("btnClick");
    const message = document.getElementById("message");

    btn.addEventListener("click", function () {
        message.textContent = "You clicked the button!";
    });
});
