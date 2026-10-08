// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Mobile menu ----------
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav__toggle");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("nav--open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

document.querySelectorAll(".nav__links a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("nav--open");
    toggle.setAttribute("aria-expanded", false);
  })
);

// ---------- Highlight the nav link for the section in view ----------
const navLinks = [...document.querySelectorAll(".nav__links a")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) =>
        a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`)
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

// ---------- Reveal on scroll ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------- Card spotlight follows the cursor ----------
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  });
});

// ---------- Live local time ----------
const timeEl = document.getElementById("local-time");
const updateTime = () => {
  timeEl.textContent = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timeEl.dataset.tz,
  }).format(new Date());
};
updateTime();
setInterval(updateTime, 30_000);

// ---------- Copy email ----------
document.querySelectorAll("[data-copy]").forEach((btn) => {
  const label = btn.querySelector(".copy-label");
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      label.textContent = "Copied ✓";
    } catch {
      window.location.href = `mailto:${btn.dataset.copy}`;
      return;
    }
    setTimeout(() => (label.textContent = "Copy email"), 2000);
  });
});
