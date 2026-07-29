document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const body = document.body;
    
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        // Default is dark mode based on initial HTML class
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    });

    // Dynamic AI Motivation Quotes
    const quotes = [
        "Success is the sum of small efforts, repeated day in and day out.",
        "The secret of getting ahead is getting started.",
        "Don't stop until you're proud.",
        "Focus on the step in front of you, not the whole staircase.",
        "Small daily improvements are the key to staggering long-term results."
    ];

    const quoteElement = document.getElementById('motivational-quote');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.textContent = `"${randomQuote}"`;

    // Simple Task Completion Animation
    const checkboxes = document.querySelectorAll('.custom-checkbox input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.closest('.task-item');
            if (this.checked) {
                taskItem.style.opacity = '0.5';
                taskItem.style.textDecoration = 'line-through';
            } else {
                taskItem.style.opacity = '1';
                taskItem.style.textDecoration = 'none';
            }
        });
        });
    });

    // Interactivity for dummy buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(btn => {
        if (btn.id !== 'themeToggleBtn') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Feature coming soon in the next phase!');
            });
        }
    });

    // Pomodoro Timer Logic
    const timerBtn = document.querySelector('.timer-nav');
    const pomodoroModal = document.getElementById('pomodoroModal');
    const closeTimerBtn = document.getElementById('closeTimerBtn');
    const startTimerBtn = document.getElementById('startTimerBtn');
    const resetTimerBtn = document.getElementById('resetTimerBtn');
    const timeLeftDisplay = document.getElementById('timeLeft');
    const circle = document.querySelector('.progress-ring__circle');
    
    // Circle math
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = 0;

    let timerInterval;
    let timeLeft = 25 * 60; // 25 minutes in seconds
    let isRunning = false;

    function setProgress(percent) {
        const offset = circumference - percent / 100 * circumference;
        circle.style.strokeDashoffset = offset;
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        if (seconds < 10) seconds = `0${seconds}`;
        timeLeftDisplay.textContent = `${minutes}:${seconds}`;
        
        // Update circle progress
        const percent = ((25 * 60 - timeLeft) / (25 * 60)) * 100;
        setProgress(percent);
    }

    timerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        pomodoroModal.classList.add('active');
    });

    closeTimerBtn.addEventListener('click', () => {
        pomodoroModal.classList.remove('active');
    });

    startTimerBtn.addEventListener('click', () => {
        if (!isRunning) {
            isRunning = true;
            startTimerBtn.textContent = 'Pause';
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    isRunning = false;
                    startTimerBtn.textContent = 'Start Focus';
                    alert("Focus session complete! Take a break.");
                }
            }, 1000);
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            startTimerBtn.textContent = 'Resume';
        }
    });

    resetTimerBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        isRunning = false;
        timeLeft = 25 * 60;
        startTimerBtn.textContent = 'Start Focus';
        updateTimerDisplay();
    });

    // Bottom Navigation interactions (minus timer)
    const navItems = document.querySelectorAll('.nav-item:not(.timer-nav)');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
});
