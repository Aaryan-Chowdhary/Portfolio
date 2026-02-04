const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  if (window.scrollY > 500) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

// Dark Mode Toggle
themeToggle.addEventListener('click', () => {
  const isDark = body.getAttribute('data-theme') === 'dark';
  body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.querySelector('i').className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Initialize Theme with safety check for tracking prevention
try {
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) icon.className = savedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
} catch (e) {
  console.warn("Storage access blocked by browser tracking prevention.");
}

// Initialize AOS and GSAP
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });

  gsap.from(".info-home h1", { opacity: 0, y: 30, duration: 1, delay: 4.2 });
  gsap.from(".info-home h3", { opacity: 0, y: 30, duration: 1, delay: 4.4 });
  gsap.from(".btnn", { opacity: 0, y: 30, duration: 1, delay: 4.6 });
  gsap.from(".home img", { opacity: 0, scale: 0.8, duration: 1.2, delay: 4.2 });
});

// reveal elements logic removed as AOS is now used

const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.display = "none"; // Initially hidden

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
});

const typingElement = document.querySelector('.info-home h3');
const words = ["Full Stack Developer", "Data Analyst", "App Developer", "Web Enthusiast", "Gamer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const currentWord = words[wordIndex];
  let displayedText = currentWord.substring(0, charIndex);

  typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, typingSpeed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, typingSpeed / 2);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(type, 1000);
  }
}



document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay = 0) {
    if (!element) return;
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);
  showElement(mainIcon, 800);
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx * 400);
  });
  showElement(designerText, 2800);

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      type(); // Start typing only after preloader is gone
    }, 500);
    if (mainPage) mainPage.classList.add("visible");
  }, 4000);
});

// EmailJS Contact Form Functionality
(function () {
  // Replace with your Public Key from EmailJS
  emailjs.init("1b6aJlsW9cx-DwQiX");
})();

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const btn = contactForm.querySelector('.btn-send');
    const originalBtnText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // These IDs should be replaced with your actual IDs from EmailJS
    const serviceID = 'service_e4k9u54';
    const templateID = 'template_ikuh1id';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.textContent = 'Message Sent!';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = originalBtnText;
          btn.disabled = false;
        }, 3000);
      }, (err) => {
        btn.textContent = 'Error sending';
        alert(JSON.stringify(err));
        setTimeout(() => {
          btn.textContent = originalBtnText;
          btn.disabled = false;
        }, 3000);
      });
  });
}
