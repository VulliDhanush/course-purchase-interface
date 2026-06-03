// ==========================================
// PROGRAM DATA CONFIGURATION
// ==========================================
const programData = {
    web: {
        title: "Web Development Internship Program",
        badge: "Popular",
        duration: "1 Month / 2 Months",
        location: "Virtual / Remote",
        stipend: "Certificate & Incentives",
        startDate: "05/11/2023",
        theme: "web",
        curriculum: [
            "Week 1: Advanced HTML5, Semantic Markup, CSS Grid & Flexbox layouts",
            "Week 2: JavaScript ES6+, DOM manipulation, Async/Await & Fetching APIs",
            "Week 3: Component-based design, UI state management & CSS frameworks (Tailwind)",
            "Week 4: Production builds, Vercel/GitHub pages deployment & performance audit"
        ]
    },
    app: {
        title: "App Development Internship Program",
        badge: "Hot",
        duration: "1 Month / 2 Months",
        location: "Virtual / Remote",
        stipend: "Certificate & Incentives",
        startDate: "05/11/2023",
        theme: "app",
        curriculum: [
            "Week 1: Cross-platform Framework Architecture (React Native / Flutter setup)",
            "Week 2: Responsive layout widgets, screen styling, and routing/navigation flows",
            "Week 3: State Management (Context API / Redux), local databases, and hardware sensors access",
            "Week 4: Performance tuning, debugging, APK compilation, and Play Store release strategies"
        ]
    },
    python: {
        title: "Python Programming Internship Program",
        badge: "Trending",
        duration: "1 Month / 2 Months",
        location: "Virtual / Remote",
        stipend: "Certificate & Incentives",
        startDate: "05/11/2023",
        theme: "python",
        curriculum: [
            "Week 1: Python Core Syntax, algorithms, Object-Oriented Programming (OOP) concepts",
            "Week 2: Data Manipulation (Pandas, NumPy) and scripting utility tasks",
            "Week 3: Web scrapers (BeautifulSoup/Scrapy) and third-party REST API integration",
            "Week 4: Backend web server design (Flask/FastAPI) and SQL database connectivity"
        ]
    },
    java: {
        title: "Java Programming Internship Program",
        badge: "Enterprise",
        duration: "1 Month / 2 Months",
        location: "Virtual / Remote",
        stipend: "Certificate & Incentives",
        startDate: "05/11/2023",
        theme: "java",
        curriculum: [
            "Week 1: Java SDK environments, Object-Oriented Principles, Polymorphism & Inheritance",
            "Week 2: Data Structures, Collections Framework, Multithreading, and Stream API",
            "Week 3: Database Connectivity (JDBC/Hibernate) and writing transactional queries",
            "Week 4: Web architecture concepts, introduction to Spring Boot Framework & REST Services"
        ]
    }
};

// ==========================================
// DOM SELECTORS
// ==========================================
const modal = document.getElementById('details-modal');
const closeBtn = document.querySelector('.modal-close-btn');
const viewDetailsBtns = document.querySelectorAll('.btn-view-details');

const modalTitle = document.getElementById('modal-title');
const modalBadge = document.getElementById('modal-badge');
const modalDuration = document.getElementById('modal-duration');
const modalLocation = document.getElementById('modal-location');
const modalStipend = document.getElementById('modal-stipend');
const modalStartDate = document.getElementById('modal-startdate');
const curriculumList = document.getElementById('curriculum-list');

const applicationForm = document.getElementById('application-form');
const successState = document.getElementById('success-state');
const successName = document.getElementById('success-name');
const successProgram = document.getElementById('success-program');
const btnSuccessClose = document.getElementById('btn-success-close');

let currentActiveProgram = null;

// ==========================================
// MODAL ACTIONS
// ==========================================
function openModal(programId) {
    const data = programData[programId];
    if (!data) return;

    currentActiveProgram = data;

    // Reset modal classes
    const cardModal = modal.querySelector('.modal-card');
    cardModal.className = 'modal-card'; // Reset
    cardModal.classList.add(`modal-theme-${data.theme}`);

    // Populate data
    modalTitle.textContent = data.title;
    modalBadge.textContent = data.badge;
    modalDuration.textContent = data.duration;
    modalLocation.textContent = data.location;
    modalStipend.textContent = data.stipend;
    modalStartDate.textContent = data.startDate;

    // Clear and add curriculum items
    curriculumList.innerHTML = '';
    data.curriculum.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        curriculumList.appendChild(li);
    });

    // Reset Form & Success State
    applicationForm.reset();
    resetFormErrors();
    applicationForm.classList.remove('hidden');
    successState.classList.add('hidden');

    // Show modal overlay
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Release background scroll
    currentActiveProgram = null;
}

// Reset form validation styling
function resetFormErrors() {
    const inputs = applicationForm.querySelectorAll('.input-group');
    inputs.forEach(group => group.classList.remove('invalid'));
}

// ==========================================
// FORM VALIDATION & SUBMISSION
// ==========================================
function validateInput(inputElement) {
    const group = inputElement.closest('.input-group');
    if (!group) return true;

    let isValid = true;
    
    if (inputElement.required && !inputElement.value.trim()) {
        isValid = false;
    } else if (inputElement.type === 'email' && inputElement.value.trim()) {
        // Regex validation for email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(inputElement.value.trim());
    } else if (inputElement.type === 'tel' && inputElement.value.trim()) {
        // Simple digit check for phone
        const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
        isValid = phoneRegex.test(inputElement.value.trim());
    }

    if (isValid) {
        group.classList.remove('invalid');
    } else {
        group.classList.add('invalid');
    }

    return isValid;
}

// Attach event listeners to input elements for real-time validation feedback
applicationForm.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('blur', () => validateInput(element));
    element.addEventListener('input', () => {
        if (element.closest('.input-group').classList.contains('invalid')) {
            validateInput(element);
        }
    });
});

applicationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let isFormValid = true;
    applicationForm.querySelectorAll('input, select').forEach(element => {
        const isElementValid = validateInput(element);
        if (!isElementValid) isFormValid = false;
    });

    if (isFormValid) {
        const nameVal = document.getElementById('applicant-name').value;
        showSuccess(nameVal);
    }
});

function showSuccess(name) {
    // Hide Form, Show success
    applicationForm.classList.add('hidden');
    successState.classList.remove('hidden');
    successName.textContent = name;
    successProgram.textContent = currentActiveProgram ? currentActiveProgram.title : 'Selected program';

    // Shoot Confetti!
    if (typeof confetti === 'function') {
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1100 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, animate a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }
}

// ==========================================
// EVENT LISTENERS BINDING
// ==========================================

// Click handlers for cards "View Details" button
document.querySelectorAll('.internship-card').forEach(card => {
    const btn = card.querySelector('.btn-view-details');
    const programId = card.getAttribute('data-id');

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(programId);
    });
});

// Close modal handlers
closeBtn.addEventListener('click', closeModal);
btnSuccessClose.addEventListener('click', closeModal);

// Close on clicking overlay backdrop
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
