document.addEventListener('DOMContentLoaded', () => {
    const scheduleHeader = document.getElementById('weekly-schedule-header');
    const scheduleContainer = document.getElementById('weekly-schedule');

    scheduleHeader.innerHTML = '<div class="hour-label-placeholder"></div>';
    scheduleContainer.innerHTML = '';

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = day;
        scheduleHeader.appendChild(dayHeader);
    });

    const hoursOfDay = ['09', '10', '11', '12', '13', '14', '15', '16', '17'];
    hoursOfDay.forEach(hour => {
        const hourLabel = document.createElement('div');
        hourLabel.className = 'hour-label';
        hourLabel.textContent = `${hour}:00`;
        scheduleContainer.appendChild(hourLabel);

        daysOfWeek.forEach(day => {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.dataset.hour = hour;
            timeSlot.dataset.day = day;
            timeSlot.contentEditable = 'true'; 
            timeSlot.setAttribute('role', 'textbox'); 
            timeSlot.setAttribute('aria-multiline', 'false'); 
            loadEvent(timeSlot, day, hour);

            timeSlot.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    event.preventDefault(); 
                    saveEvent(this, day, hour);
                }
            });

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
        timeSlot.blur(); 
        timeSlot.classList.add('event-scheduled');
    }
}

function removeEvent(timeSlot, day, hour) {
    const eventKey = `event_${day}_${hour}`;
    localStorage.removeItem(eventKey);
    timeSlot.textContent = '';
    timeSlot.classList.remove('event-scheduled');
}
