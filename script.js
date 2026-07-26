const PROJECTS = [
  {
    title: "Werewolf",
    file: "games/werewolf.rbxl",
    url: "https://www.roblox.com/games/106897612141160/Werewolf",
    description: "A social deduction game with unique roles, special abilities, and dynamic events. It is my first and biggest project.",
    details: `The game features complex mechanics such as:
- Matchmaking
- Trading system
- Shop & inventory
- Gambling mechanics
- Voting & role system
- Leveling system
- Gamepasses
...and much more.`,
    tags: ["Full game"],
    category: "games",
    colors: ["#8b7bb2", "#3d7181"],
    images: [
      { src: "images/Werewolf_1.jpg", alt: "Werewolf 1", label: "werewolf-01.jpg" },
      { src: "images/Werewolf_2.jpg", alt: "Werewolf 2", label: "werewolf-02.jpg" },
      { src: "images/Werewolf_3.jpg", alt: "Werewolf 3", label: "werewolf-03.jpg" },
      { src: "images/Werewolf_4.jpg", alt: "Werewolf 4", label: "werewolf-04.jpg" },
      { src: "images/Werewolf_5.jpg", alt: "Werewolf 5", label: "werewolf-05.jpg" }
    ],
    featured: true
  },
  {
    title: "Guess the Anime Song",
    file: "games/guess-the-anime-song.rbxl",
    url: "https://www.roblox.com/games/90224044482373/Guess-The-Anime-Song",
    description: "A feature-rich mini-game where players guess anime songs while surviving rising lava.",
    details: `The core mechanic revolves around playing short song clips while players try to survive the rising lava by correctly guessing the song. There are also many different systems, including:
- Tower customization
- Song picking
- Titles unlocking
- Shop & inventory
- Emotes
- Daily rewards
- Coins collecting
- Morphs
...and more.`,
    tags: ["Mini game"],
    category: "games",
    colors: ["#9c718e", "#5e567f"],
    images: [
      { src: "images/GTAS_1.jpg", alt: "GTAS 1", label: "gtas-01.jpg" },
      { src: "images/GTAS_2.jpg", alt: "GTAS 2", label: "gtas-02.jpg" },
      { src: "images/GTAS_3.jpg", alt: "GTAS 3", label: "gtas-03.jpg" },
      { src: "images/GTAS_4.jpg", alt: "GTAS 4", label: "gtas-04.jpg" }
    ]
  },
  {
    title: "Paint Characters Keyboard",
    file: "systems/paint-characters-keyboard.rbxl",
    url: "",
    description: "ASMR Keyboard to paint a character image by walking on the keys with a color selection system.",
    details: `I also implemented useful features such as:
- Color hint product
- Complete color product
- Complete image product
- Paint progress display
- Keys left display
- Money collecting`,
    tags: ["System"],
    category: "systems",
    colors: ["#a17689", "#737ca1"],
    images: [
      { src: "images/Keyboard_1.png", alt: "Keyboard", label: "paint-keyboard-01.jpg" },
      { src: "images/Keyboard_2.png", alt: "Keyboard", label: "paint-keyboard-02.jpg" },
      { src: "images/Keyboard_3.png", alt: "Keyboard", label: "paint-keyboard-03.jpg" }
    ]
  },
  {
    title: "Color Clues",
    file: "systems/color-clues.rbxl",
    url: "https://www.roblox.com/games/120558251554089/Color-Clues",
    description: "Color guessing game where players have to guess the correct color based on clues given by another player.",
    tags: ["Mini game"],
    category: "games",
    colors: ["#a17689", "#737ca1"],
    images: [
      { src: "images/Color_1.png", alt: "Color Clues", label: "color-clues-01.jpg" },
      { src: "images/Color_2.png", alt: "Color Clues", label: "color-clues-02.jpg" },
      { src: "images/Color_3.png", alt: "Color Clues", label: "color-clues-03.jpg" }
    ]
  },
  {
    title: "Avatar maker for other people",
    file: "systems/avatar-maker.rbxl",
    url: "",
    description: "A system that lets users create avatars from items in another player’s inventory, displayed using the Roblox API.",
    tags: ["System"],
    category: "systems",
    colors: ["#4d7a76", "#454c74"],
    images: [
      { src: "images/Avatar_maker.jpg", alt: "Avatar maker for other people", label: "avatar-maker.jpg" },
    ]
  },
  {
    title: "Admin Panel",
    file: "systems/admin-panel.rbxl",
    url: "",
    description: "A customizable admin panel featuring moderation and utility commands.",
    tags: ["System"],
    category: "systems",
    colors: ["#a17689", "#737ca1"],
    images: [
      { src: "images/Admin_panel.jpg", alt: "Admin Panel", label: "admin-panel.jpg" },
    ]
  },
];

const root = document.documentElement;
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeButton = document.querySelector(".theme-toggle");
const projectGrid = document.querySelector("#project-grid");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) root.dataset.theme = savedTheme;

function updateThemeLabel() {
  const isDark = root.dataset.theme === "dark";
  themeButton.setAttribute("aria-label", isDark ? "Activer le thème clair" : "Activer le thème sombre");
}
updateThemeLabel();

themeButton.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", root.dataset.theme);
  updateThemeLabel();
});

function closeMenu() {
  menuButton.classList.remove("active");
  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Ouvrir le menu");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.classList.toggle("active");
  navLinks.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  document.body.classList.toggle("menu-open", isOpen);
});

navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMenu();
    menuButton.focus();
  }
});

function projectCard(project, index) {
  const slides = project.images.map((image, imageIndex) => `
    <div class="project-slide ${imageIndex === 0 ? "active" : ""} ${image.src ? "has-image" : ""}"
         data-slide="${imageIndex}" aria-hidden="${imageIndex !== 0}"
         ${image.src ? `role="button" aria-label="Agrandir ${image.alt}" tabindex="${imageIndex === 0 ? "0" : "-1"}"` : ""}>
      ${image.src ? `<img src="${image.src}" alt="${image.alt}">` : ""}
      <div class="project-placeholder" aria-hidden="${image.src ? "true" : "false"}">
        <div class="visual-orbit" aria-hidden="true"></div>
        <div class="visual-blocks" aria-hidden="true"><i></i><i></i><i></i></div>
        <span>${image.label}</span>
      </div>
    </div>
  `).join("");
  const hasMultipleImages = project.images.length > 1;
  const hasDetails = typeof project.details === "string" && project.details.trim().length > 0;
  const detailsId = `project-details-${index}`;

  return `
    <article class="project-card reveal ${project.featured ? "featured" : ""}" data-category="${project.category}" data-project-index="${index}">
      <div class="project-gallery" data-gallery data-current="0" style="--project-a:${project.colors[0]};--project-b:${project.colors[1]}">
        <div class="project-slides">${slides}</div>
        ${hasMultipleImages ? `
          <button class="gallery-arrow gallery-prev" type="button" aria-label="Image précédente de ${project.title}">←</button>
          <button class="gallery-arrow gallery-next" type="button" aria-label="Image suivante de ${project.title}">→</button>
          <span class="gallery-count" aria-live="polite">01 / ${String(project.images.length).padStart(2, "0")}</span>
        ` : ""}
        <span class="project-number" aria-hidden="true">0${index + 1}</span>
      </div>
      <div class="project-info">
        <span class="project-file">~/projects/${project.file}</span>
        <h3>${project.title}</h3>
        <div class="project-description">
          <p>${project.description}${hasDetails ? ` <button class="details-toggle" type="button" aria-expanded="false" aria-controls="${detailsId}">More details</button>` : ""}</p>
          ${hasDetails ? `
            <div class="project-details" id="${detailsId}" hidden>
              <p>${project.details}</p>
            </div>
          ` : ""}
        </div>
        <div class="project-tags">${project.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
        <div class="project-links">
          ${project.url
            ? `<a href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="Voir le projet ${project.title}">View project ↗</a>`
            : `<span class="project-link-disabled" title="Ajoutez l’URL dans script.js">View project ↗</span>`}
        </div>
      </div>
    </article>`;
}

projectGrid.innerHTML = PROJECTS.map(projectCard).join("");

projectGrid.querySelectorAll(".project-slide img").forEach(image => {
  image.addEventListener("error", () => {
    const slide = image.closest(".project-slide");
    slide.classList.remove("has-image");
    slide.removeAttribute("role");
    slide.removeAttribute("tabindex");
    slide.removeAttribute("aria-label");
    image.remove();
  });
});

function setGallerySlide(gallery, next) {
  const slides = [...gallery.querySelectorAll(".project-slide")];
  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === next;
    slide.classList.toggle("active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
    if (slide.classList.contains("has-image")) slide.tabIndex = isActive ? 0 : -1;
  });
  gallery.dataset.current = String(next);
  gallery.querySelector(".gallery-count").textContent =
    `${String(next + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
}

const lightbox = document.querySelector("#project-lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const lightboxCount = lightbox.querySelector(".lightbox-count");
const lightboxPrev = lightbox.querySelector(".lightbox-prev");
const lightboxNext = lightbox.querySelector(".lightbox-next");
let lightboxImages = [];
let lightboxIndex = 0;
let lightboxTitle = "";

function updateLightbox() {
  const image = lightboxImages[lightboxIndex];
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = `${lightboxTitle} · ${image.label || image.alt}`;
  lightboxCount.textContent =
    `${String(lightboxIndex + 1).padStart(2, "0")} / ${String(lightboxImages.length).padStart(2, "0")}`;
  const hasMultiple = lightboxImages.length > 1;
  lightboxPrev.hidden = !hasMultiple;
  lightboxNext.hidden = !hasMultiple;
}

function openLightbox(slide) {
  const card = slide.closest(".project-card");
  const project = PROJECTS[Number(card.dataset.projectIndex)];
  lightboxImages = project.images
    .map((image, originalIndex) => ({ ...image, originalIndex }))
    .filter(image => image.src && card.querySelector(`[data-slide="${image.originalIndex}"]`)?.classList.contains("has-image"));
  if (!lightboxImages.length) return;

  const clickedIndex = Number(slide.dataset.slide);
  lightboxIndex = Math.max(0, lightboxImages.findIndex(image => image.originalIndex === clickedIndex));
  lightboxTitle = project.title;
  updateLightbox();
  lightbox.showModal();
  document.body.classList.add("lightbox-open");
  lightbox.querySelector(".lightbox-close").focus();
}

function moveLightbox(direction) {
  lightboxIndex = (lightboxIndex + direction + lightboxImages.length) % lightboxImages.length;
  updateLightbox();
}

projectGrid.addEventListener("click", event => {
  const arrow = event.target.closest(".gallery-arrow");
  if (arrow) {
    const gallery = arrow.closest("[data-gallery]");
    const slides = [...gallery.querySelectorAll(".project-slide")];
    const direction = arrow.classList.contains("gallery-next") ? 1 : -1;
    const current = Number(gallery.dataset.current);
    const next = (current + direction + slides.length) % slides.length;
    setGallerySlide(gallery, next);
    return;
  }

  const zoomableSlide = event.target.closest(".project-slide.has-image");
  if (zoomableSlide) openLightbox(zoomableSlide);

  const detailsButton = event.target.closest(".details-toggle");
  if (detailsButton) {
    const details = document.querySelector(`#${detailsButton.getAttribute("aria-controls")}`);
    const willOpen = detailsButton.getAttribute("aria-expanded") !== "true";
    detailsButton.setAttribute("aria-expanded", String(willOpen));
    detailsButton.textContent = willOpen ? "Close details" : "More details";
    details.hidden = !willOpen;
  }
});

projectGrid.addEventListener("keydown", event => {
  const slide = event.target.closest(".project-slide.has-image");
  if (slide && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openLightbox(slide);
  }
});

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightboxPrev.addEventListener("click", () => moveLightbox(-1));
lightboxNext.addEventListener("click", () => moveLightbox(1));
lightbox.addEventListener("click", event => {
  if (event.target === lightbox || event.target.classList.contains("lightbox-shell")) lightbox.close();
});
lightbox.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" && lightboxImages.length > 1) moveLightbox(-1);
  if (event.key === "ArrowRight" && lightboxImages.length > 1) moveLightbox(1);
});
lightbox.addEventListener("close", () => {
  document.body.classList.remove("lightbox-open");
  lightboxImage.src = "";
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
    const filter = button.dataset.filter;
    let visible = 0;
    document.querySelectorAll(".project-card").forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible += 1;
    });
    document.querySelector("#project-count").textContent = String(visible).padStart(2, "0");
  });
});

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach(element => element.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => revealObserver.observe(element));
}

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-42% 0px -52%" });
sections.forEach(section => sectionObserver.observe(section));

document.querySelector("#year").textContent = new Date().getFullYear();
function updateClock() {
  document.querySelector("#local-time").textContent = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris"
  }).format(new Date());
}
updateClock();
setInterval(updateClock, 60_000);
