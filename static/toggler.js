document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("darkModeToggle");
    const body = document.body;

    // Check if the user has a saved preference
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "enabled") {
        body.classList.add("dark-mode");
    }

    toggleButton.addEventListener("click", function() {
        if (body.classList.contains("dark-mode")) {
            body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        } else {
            body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
        }
    });
});
