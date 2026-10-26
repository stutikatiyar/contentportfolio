// Mobile navigation menu toggle
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "×" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    });
  });
}

// Automatic footer copyright year
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Hero portrait running slideshow crossfade
const slides = document.querySelectorAll(".hero-slideshow .slide");
if (slides.length > 1) {
  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 3500);
}

// Category Filter Tabs for Essays & Shayari
const essayTabs = document.querySelectorAll(".essay-tab");
const essayCards = document.querySelectorAll(".essay-card");

essayTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    essayTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const category = tab.getAttribute("data-category");

    essayCards.forEach((card) => {
      if (category === "all" || card.getAttribute("data-category") === category) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Scroll Reveal Intersection Observer
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".section, .world-card, .project-card, .essay-card, .gallery-item, .manifesto").forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// Lightbox Modal for Gallery Images
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const caption = item.querySelector(".gallery-overlay span");
    if (img && lightbox) {
      lightboxImg.src = img.src;
      lightboxCaption.textContent = caption ? caption.textContent : "";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    }
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  });
}

// Project Inspection Modals
const projectData = {
  dermalens: {
    title: "DermaLens",
    tag: "AI / COMPUTER VISION",
    desc: "AI image enhancement and confidence validation middleware designed for medical image quality restoration and validation.",
    features: [
      "Real-time blurry & low-contrast dermatological image restoration using OpenCV.",
      "PyTorch ResNet-18 model feature extraction & prediction confidence scoring.",
      "FastAPI backend microservice delivering sub-150ms inference latency.",
      "Responsive React dashboard with side-by-side diagnostic image comparisons."
    ],
    tech: ["PyTorch", "OpenCV", "FastAPI", "React.js", "Python", "Tailwind CSS"],
    code: `@app.post("/api/v1/assess-quality")\nasync function assess_image(file: UploadFile = File(...)):\n    image_bytes = await file.read()\n    img = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)\n    blur_score = cv2.Laplacian(img, cv2.CV_64F).var()\n    \n    if blur_score < 100.0:\n        img = enhance_contrast_and_sharpness(img)\n    \n    confidence = model.predict_quality(img)\n    return {"quality_score": confidence, "enhanced": True}`
  },
  subtitler: {
    title: "Multilingual Subtitler",
    tag: "SPEECH AI / FULL-STACK",
    desc: "AI-powered captioning platform built for multilingual speech processing and Hinglish code-switching normalization.",
    features: [
      "Faster-Whisper integration delivering 4x faster speech-to-text inference.",
      "Custom NLP pipeline for Hindi-English (Hinglish) code-switching normalization.",
      "FFmpeg audio extraction and word-level timestamp synchronisation.",
      "Next.js / TypeScript studio interface for real-time subtitle timing edits."
    ],
    tech: ["Next.js", "TypeScript", "Faster-Whisper", "FFmpeg", "Python", "FastAPI"],
    code: `const transcribeAudio = async (filePath: string) => {\n  const audioBuffer = await extractAudioChannel(filePath);\n  const segments = await whisperModel.transcribe(audioBuffer, {\n    language: "auto",\n    task: "transcribe",\n    word_timestamps: true\n  });\n  return normalizeHinglishCodeSwitching(segments);\n};`
  }
};

const projectModal = document.getElementById("project-modal");
const pmTitle = document.getElementById("pm-title");
const pmTag = document.getElementById("pm-tag");
const pmDesc = document.getElementById("pm-desc");
const pmFeatures = document.getElementById("pm-features");
const pmTechList = document.getElementById("pm-tech-list");
const pmCode = document.getElementById("pm-code-snippet");
const pmClose = document.getElementById("project-modal-close");
const pmBackdrop = document.getElementById("project-modal-backdrop");

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    if (e.target.tagName === "A") return;
    const key = card.getAttribute("data-project");
    const data = projectData[key];

    if (data && projectModal) {
      pmTitle.textContent = data.title;
      pmTag.textContent = data.tag;
      pmDesc.textContent = data.desc;
      pmFeatures.innerHTML = data.features.map((f) => `<li>${f}</li>`).join("");
      pmTechList.innerHTML = data.tech.map((t) => `<span>${t}</span>`).join("");
      pmCode.textContent = data.code;
      projectModal.classList.add("open");
      projectModal.setAttribute("aria-hidden", "false");
    }
  });
});

[pmClose, pmBackdrop].forEach((el) => {
  if (el) {
    el.addEventListener("click", () => {
      projectModal.classList.remove("open");
      projectModal.setAttribute("aria-hidden", "true");
    });
  }
});

document.querySelectorAll(".pm-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".pm-tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".pm-tab-content").forEach((c) => c.classList.remove("active"));

    tab.classList.add("active");
    const target = tab.getAttribute("data-tab");
    document.getElementById(`pm-tab-${target}`)?.classList.add("active");
  });
});

// Audio Recitation Toggle for Shayari
document.querySelectorAll('.essay-card[data-category="shayari"] .essay-footer').forEach((footer) => {
  const btn = document.createElement("button");
  btn.className = "audio-toggle-btn";
  btn.innerHTML = `<span>▶</span> Listen`;
  footer.appendChild(btn);

  let isPlaying = false;
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    isPlaying = !isPlaying;
    btn.innerHTML = isPlaying ? `<span>⏸</span> Playing` : `<span>▶</span> Listen`;
    btn.style.color = isPlaying ? "#f0f3fa" : "var(--pop)";
  });
});