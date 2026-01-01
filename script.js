// ==================== //
// GMRD Landing Page JS //
// ==================== //

// Smooth Scroll
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    // Fecha menu mobile se estiver aberto
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.remove("active");
    updateMobileMenuIcon(false);
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");

function updateMobileMenuIcon(isOpen) {
  const menuIcon = mobileMenuBtn.querySelector(".menu-icon");
  const closeIcon = mobileMenuBtn.querySelector(".close-icon");
  
  if (isOpen) {
    menuIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
  } else {
    menuIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  }
}

mobileMenuBtn.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active");
  updateMobileMenuIcon(isOpen);
});

// Fecha menu ao clicar em um link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    scrollToSection(targetId);
  });
});

// Fecha menu mobile ao clicar fora
document.addEventListener("click", (e) => {
  if (
    navMenu.classList.contains("active") &&
    !navMenu.contains(e.target) &&
    !mobileMenuBtn.contains(e.target)
  ) {
    navMenu.classList.remove("active");
    updateMobileMenuIcon(false);
  }
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.background = "rgba(22, 49, 85, 0.98)";
    navbar.style.boxShadow = "0 4px 20px rgba(132, 147, 166, 0.1)";
  } else {
    navbar.style.background = "rgba(22, 49, 85, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Typewriter Effect - Hero Title
const text = "Transformamos Suas Ideias em Realidade Digital";
const target = document.getElementById("typewriter");

let index = 0;
const speed = 65;

function typeWriter() {
  if (index < text.length) {
    target.textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, speed);
  } 
}

// Inicia após pequeno delay
setTimeout(typeWriter, 300);

// Reveal Animations (Intersection Observer)
const observerOptions = {
  threshold: 0.12,
  rootMargin: "0px 0px -35px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Contact Form
const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.from_name.value.trim();
  const email = form.reply_to.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    showToast("Preencha todos os campos corretamente.", false);
    return;
  }

  const subject = encodeURIComponent("Novo contato via site GMRD");
  const body = encodeURIComponent(
    `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`
  );

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (!isMobile) {
    // DESKTOP → perguntar Gmail ou mailto
    const useGmail = confirm(
      "Deseja enviar a mensagem pelo Gmail?\n\n" +
      "OK → Gmail Web\n" +
      "Cancelar → Aplicativo de e-mail"
    );

    if (useGmail) {
      window.open(
        `https://mail.google.com/mail/?view=cm&to=gmrdsystems@gmail.com&su=${subject}&body=${body}`,
        "_blank"
      );
      showToast("Abrindo Gmail…", true);
    } else {
      window.location.href =
        `mailto:gmrdsystems@gmail.com?subject=${subject}&body=${body}`;
      showToast("Abrindo aplicativo de e-mail…", true);
    }

  } else {
    // MOBILE → mailto (único confiável)
    window.location.href =
      `mailto:gmrdsystems@gmail.com?subject=${subject}&body=${body}`;

    showToast("Abrindo aplicativo de e-mail…", true);
  }

  form.reset();
});

function showToast(message, success = true) {
  toast.textContent = message;
  toast.classList.remove("error", "success");
  toast.classList.add("show", success ? "success" : "error");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
