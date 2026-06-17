const CONTACT_EMAIL = "Kiroshinm12142@gmail.com";

const siteNav = document.querySelector(".site-nav");
const navSlider = document.querySelector(".nav-slider");
const navLinks = document.querySelectorAll(".site-nav a");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
const revealItems = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll("[data-tilt-card]");
const particleCanvas = document.getElementById("particle-canvas");
const contactForm = document.getElementById("contact-form");
const formStatus = document.querySelector(".form-status");
const sections = document.querySelectorAll("main section[id]");

if (siteNav && navSlider && navLinks.length > 0) {
  let activeLink = navLinks[0];

  const moveNavSlider = (link) => {
    if (!siteNav || !navSlider || !link) {
      return;
    }

    const navBounds = siteNav.getBoundingClientRect();
    const linkBounds = link.getBoundingClientRect();
    const offsetLeft = linkBounds.left - navBounds.left;

    navSlider.style.width = `${linkBounds.width}px`;
    navSlider.style.transform = `translateX(${offsetLeft}px)`;
    navSlider.style.opacity = "1";
  };

  const setActiveNavLink = (link) => {
    if (!link) {
      return;
    }

    activeLink = link;
    navLinks.forEach((item) => {
      item.classList.toggle("is-active", item === link);
    });
    moveNavSlider(link);
  };

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => moveNavSlider(link));
    link.addEventListener("focus", () => moveNavSlider(link));
    link.addEventListener("click", () => setActiveNavLink(link));
  });

  siteNav.addEventListener("mouseleave", () => moveNavSlider(activeLink));

  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio);

        if (visibleEntries.length === 0) {
          return;
        }

        const currentId = visibleEntries[0].target.id;
        const matchingLink = Array.from(navLinks).find(
          (link) => link.getAttribute("href") === `#${currentId}`
        );

        if (matchingLink) {
          setActiveNavLink(matchingLink);
        }
      },
      {
        threshold: [0.25, 0.45, 0.65],
        rootMargin: "-20% 0px -45% 0px",
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  setActiveNavLink(activeLink);
  window.addEventListener("resize", () => moveNavSlider(activeLink));
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
    }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 90}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

tiltCards.forEach((card) => {
  const strength = 14;

  card.addEventListener("mousemove", (event) => {
    const bounds = card.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;
    const offsetY = event.clientY - bounds.top;
    const rotateY = ((offsetX / bounds.width) - 0.5) * strength;
    const rotateX = ((offsetY / bounds.height) - 0.5) * -strength;

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});

if (particleCanvas) {
  const context = particleCanvas.getContext("2d");
  const particles = [];
  const particleCount = 70;

  const resizeCanvas = () => {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  };

  const createParticle = () => ({
    x: Math.random() * particleCanvas.width,
    y: Math.random() * particleCanvas.height,
    radius: Math.random() * 2.2 + 0.8,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
  });

  const connectParticles = () => {
    for (let index = 0; index < particles.length; index += 1) {
      for (let next = index + 1; next < particles.length; next += 1) {
        const dx = particles[index].x - particles[next].x;
        const dy = particles[index].y - particles[next].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 120) {
          continue;
        }

        const alpha = 1 - distance / 120;
        context.strokeStyle = `rgba(196, 226, 255, ${alpha * 0.14})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(particles[index].x, particles[index].y);
        context.lineTo(particles[next].x, particles[next].y);
        context.stroke();
      }
    }
  };

  const animateParticles = () => {
    context.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0 || particle.x > particleCanvas.width) {
        particle.speedX *= -1;
      }

      if (particle.y < 0 || particle.y > particleCanvas.height) {
        particle.speedY *= -1;
      }

      context.beginPath();
      context.fillStyle = "rgba(220, 238, 255, 0.7)";
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });

    connectParticles();
    window.requestAnimationFrame(animateParticles);
  };

  resizeCanvas();

  for (let index = 0; index < particleCount; index += 1) {
    particles.push(createParticle());
  }

  animateParticles();
  window.addEventListener("resize", resizeCanvas);
}