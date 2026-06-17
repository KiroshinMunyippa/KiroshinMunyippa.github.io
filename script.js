document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const desktopNav = document.querySelector(".site-nav");
  const navSlider = document.querySelector(".nav-slider");
  const navLinks = document.querySelectorAll(".site-nav a, .mobile-menu a");
  const sections = Array.from(document.querySelectorAll("section[id]"));

  function closeMenu() {
    if (!menuToggle || !mobileMenu) return;

    mobileMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!menuToggle || !mobileMenu) return;

    mobileMenu.classList.add("active");
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }

  function moveSlider(activeLink) {
    if (!desktopNav || !navSlider || !activeLink) return;

    const navRect = desktopNav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    desktopNav.style.setProperty("--slider-x", `${linkRect.left - navRect.left}px`);
    desktopNav.style.setProperty("--slider-w", `${linkRect.width}px`);
  }

  function setActive(href) {
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === href);
    });

    const desktopLink = document.querySelector(`.site-nav a[href="${href}"]`);
    moveSlider(desktopLink);
  }

  function updateActiveOnScroll() {
    let current = "#home";
    const triggerPoint = window.innerHeight * 0.35;

    sections.forEach(function (section) {
      const rect = section.getBoundingClientRect();

      if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
        current = `#${section.id}`;
      }
    });

    setActive(current);
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      if (mobileMenu.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileMenu.addEventListener("click", function (event) {
      if (event.target === mobileMenu) {
        closeMenu();
      }
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      const href = link.getAttribute("href");

      setActive(href);
      closeMenu();

      setTimeout(updateActiveOnScroll, 500);
    });
  });

  window.addEventListener("scroll", updateActiveOnScroll, { passive: true });

  window.addEventListener("resize", function () {
    updateActiveOnScroll();

    if (window.innerWidth > 900) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  setTimeout(function () {
    if (window.location.hash) {
      setActive(window.location.hash);
    } else {
      setActive("#home");
    }

    updateActiveOnScroll();
  }, 200);
});