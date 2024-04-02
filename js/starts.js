document.addEventListener('DOMContentLoaded', function() {
    // Use existing canvas or create a new one if it doesn't exist
    let canvas = document.getElementById('starCanvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        document.body.prepend(canvas);
        canvas.id = 'starCanvas';
    }
    const ctx = canvas.getContext('2d');
    
    // Function to set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Adjust canvas size on window resize
    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();
    
    let stars = []; // Array to hold the static stars
    let movingStars = []; // Array to hold moving stars

    // Function to create stars
    // Function to create stars, including shooting stars
function createStars(count) {
    stars = [];
    movingStars = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.55
        });
        if (Math.random() > 0.91) { // Some stars are shooting stars
            const startX = Math.random() * canvas.width;
            const startY = Math.random() * canvas.height;
            const endX = Math.random() * canvas.width;
            const endY = Math.random() * canvas.height;
            const speed = Math.random() *1.5 -0.6; // Random speed
            movingStars.push({
                x: startX,
                y: startY,
                endX: endX,
                endY: endY,
                size: Math.random() * 1.5,
                speed: speed
            });
        }
    }
}


    // Function to move the moving stars
    function moveStars() {
        movingStars.forEach(star => {
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
    }

    // Function to draw the stars
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FFFFFF"; // Color of the stars
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
        movingStars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Main animation loop
    function animate() {
        moveStars();
        drawStars();
        requestAnimationFrame(animate);
    }

    createStars(1000); // Initialize with 550 stars
    animate(); // Start the animation loop
});
