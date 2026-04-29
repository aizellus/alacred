const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".topnav");
const form = document.querySelector(".apply-form");
const toast = document.querySelector(".toast");
const revealItems = document.querySelectorAll(".reveal");
const page = document.body.dataset.page;

if (nav) {
  nav.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const activeMap = {
      home: "./index.html",
      about: "./about.html",
      credentials: "./credentials.html",
      standards: "./standards.html",
      industries: "./industries.html",
      founding: "./founding-50.html",
      apply: "./apply.html",
    };

    if (activeMap[page] === href) {
      link.classList.add("is-active");
    }
  });
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (form && toast) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    toast.textContent = "Application request captured. Route this form to your CRM or inbox next.";
    toast.classList.add("is-visible");
    form.reset();
    window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 3200);
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
