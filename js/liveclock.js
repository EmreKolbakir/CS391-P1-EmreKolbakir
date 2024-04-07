function updateClock() {
    const clockContainer = document.getElementById('clock-container');
    if (clockContainer) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const dateString = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        clockContainer.innerHTML = `<p>Current Time: ${timeString}</p><p>Date: ${dateString}</p>`;
    }
}

updateClock();
setInterval(updateClock, 1000);
