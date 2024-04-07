document.addEventListener('DOMContentLoaded', function() {
    const todoButton = document.getElementById('todoButton');
    const programButton = document.getElementById('programButton');
    const linksButton = document.getElementById('linksButton');
    const homeButton = document.getElementById('homeButton');

    if (todoButton) {
        todoButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '../pages/todo.html'; 
        });
    }

    if (programButton) {
        programButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Button clicked"); 
            window.location.href = '../pages/program.html'; 
        });
    }
    

    if (linksButton) {
        linksButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '../pages/links.html'; 
        });
    }

    if (homeButton) {
        homeButton.addEventListener('click', function() {
            window.location.href = '../pages/home.html'; 
        });
    }
});
