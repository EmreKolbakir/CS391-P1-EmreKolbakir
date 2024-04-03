document.addEventListener('DOMContentLoaded', () => {
    const scheduleHeader = document.getElementById('weekly-schedule-header');
    const scheduleContainer = document.getElementById('weekly-schedule');

    // Clear previous contents
    scheduleHeader.innerHTML = '<div class="hour-label-placeholder"></div>';
    scheduleContainer.innerHTML = '';

    // Create headers for the days of the week
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = day;
        scheduleHeader.appendChild(dayHeader);
    });

    // Generate time slots for the schedule from 8 AM to 5 PM only
    const hoursOfDay = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17'];
    hoursOfDay.forEach(hour => {
        // Create hour labels on the left side for each hour
        const hourLabel = document.createElement('div');
        hourLabel.className = 'hour-label';
        hourLabel.textContent = `${hour}:00`;
        scheduleContainer.appendChild(hourLabel);

        daysOfWeek.forEach(day => {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.dataset.hour = hour;
            timeSlot.dataset.day = day;
            timeSlot.contentEditable = 'true'; // Make the time slot editable
            timeSlot.setAttribute('role', 'textbox'); // ARIA role for accessibility
            timeSlot.setAttribute('aria-multiline', 'false'); // ARIA attribute
            
            // Load any saved events
            loadEvent(timeSlot, day, hour);

            // Event listener for saving on 'Enter'
            timeSlot.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    event.preventDefault(); // Prevent newline on Enter key
                    saveEvent(this, day, hour);
                }
            });

            // Double-click to remove an event
            timeSlot.addEventListener('dblclick', function() {
                removeEvent(this, day, hour);
            });

            scheduleContainer.appendChild(timeSlot);
        });
    });
});

function loadEvent(timeSlot, day, hour) {
    const eventKey = `event_${day}_${hour}`;
    const eventTitle = localStorage.getItem(eventKey);
    if (eventTitle) {
        timeSlot.textContent = eventTitle;
        timeSlot.classList.add('event-scheduled');
    }
}

function saveEvent(timeSlot, day, hour) {
    const eventKey = `event_${day}_${hour}`;
    const title = timeSlot.textContent.trim();
    if (title) {
        localStorage.setItem(eventKey, title);
        timeSlot.blur(); // Remove focus after saving
        timeSlot.classList.add('event-scheduled');
    }
}

function removeEvent(timeSlot, day, hour) {
    const eventKey = `event_${day}_${hour}`;
    localStorage.removeItem(eventKey);
    timeSlot.textContent = '';
    timeSlot.classList.remove('event-scheduled');
}
