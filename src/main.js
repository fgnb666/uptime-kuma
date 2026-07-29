import "./style.css";

// ============================================
// Blog Post Data
// ============================================
const posts = [
  {
    id: 1,
    title: "从零开始搭建个人博客：我的技术选型与思考",
    excerpt: "记录我从选择框架到部署上线的全过程，分享技术选型背后的考量与经验教训。",
    date: "2026-07-28",
    tag: "tech",
    emoji: "🚀",
    readTime: "8 分钟",
  },
  {
    id: 2,
    title: "Vue 3 组合式 API 实战：封装一个可复用的表格组件",
    excerpt: "深入解析 Composition API 的设计哲学，手把手教你构建企业级表格组件。",
    date: "2026-07-25",
    tag: "tech",
    emoji: "⚡",
    readTime: "12 分钟",
  },
  {
    id: 3,
    title: "我的第一个开源项目获得了 500 个 Star",
    excerpt: "从灵光一闪到收获社区认可，分享开源路上的收获、挑战与感悟。",
    date: "2026-07-20",
    tag: "project",
    emoji: "🌟",
    readTime: "6 分钟",
  },
  {
    id: 4,
    title: "使用 Docker Compose 构建高效的开发环境",
    excerpt: "告别繁琐的环境配置，用容器化的方式统一团队开发环境。",
    date: "2026-07-15",
    tag: "tech",
    emoji: "🐳",
    readTime: "10 分钟",
  },
  {
    id: 5,
    title: "2026 年中总结：技术人的成长与焦虑",
    excerpt: "半年的技术探索、项目经历和心态变化，写给同样在路上的你。",
    date: "2026-07-10",
    tag: "life",
    emoji: "📝",
    readTime: "7 分钟",
  },
  {
    id: 6,
    title: "用 Go 编写一个高性能的任务队列",
    excerpt: "从设计到实现，用 300 行代码打造一个轻量级的消息队列系统。",
    date: "2026-07-05",
    tag: "project",
    emoji: "🔧",
    readTime: "15 分钟",
  },
];

// ============================================
// DOM References
// ============================================
const themeToggle = document.getElementById("themeToggle");
const postsGrid = document.getElementById("postsGrid");
const filterBtns = document.querySelectorAll(".filter-btn");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");
const header = document.querySelector(".header");
const progressBar = document.getElementById("progressBar");
const contactForm = document.getElementById("contactForm");

// ============================================
// Theme Management
// ============================================
function getTheme() {
  return localStorage.getItem("theme") || "light";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

// Set initial theme
setTheme(getTheme());

themeToggle.addEventListener("click", () => {
  const current = getTheme();
  setTheme(current === "dark" ? "light" : "dark");
});

// ============================================
// Render Blog Posts
// ============================================
function renderPosts(filter = "all") {
  const filtered = filter === "all"
    ? posts
    : posts.filter((p) => p.tag === filter);

  postsGrid.innerHTML = filtered
    .map(
      (post) => `
    <article class="post-card" data-aos="fade-up">
      <div class="post-card-image">
        <span>${post.emoji}</span>
      </div>
      <div class="post-card-body">
        <div class="post-card-meta">
          <span class="post-card-date">📅 ${post.date}</span>
          <span class="post-card-tag">${getTagLabel(post.tag)}</span>
        </div>
        <h3 class="post-card-title">${post.title}</h3>
        <p class="post-card-excerpt">${post.excerpt}</p>
        <div class="post-card-footer">
          <span class="post-card-readtime">☕ ${post.readTime}</span>
          <span class="post-card-link">
            阅读全文
            <svg viewBox="0 0 24 24" width="14" height="14">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </article>
  `
    )
    .join("");

  // Trigger animations after render
  requestAnimationFrame(() => {
    document.querySelectorAll("[data-aos]").forEach((el) => {
      el.classList.add("aos-animate");
    });
  });
}

function getTagLabel(tag) {
  const labels = {
    tech: "技术",
    life: "生活",
    project: "项目",
  };
  return labels[tag] || tag;
}

// ============================================
// Posts Filter
// ============================================
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderPosts(btn.dataset.filter);
  });
});

// ============================================
// Mobile Menu
// ============================================
mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active");
  navLinks.classList.toggle("open");
});

// Close menu on link click
navLinks.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuBtn.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

// ============================================
// Header Scroll Effect
// ============================================
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  header.classList.toggle("scrolled", scrollY > 50);

  // Progress bar
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollY / docHeight) * 100;
  progressBar.style.width = `${Math.min(progress, 100)}%`;

  // Scroll-based animations
  animateOnScroll();
});

// ============================================
// Scroll Animation (AOS)
// ============================================
function animateOnScroll() {
  const elements = document.querySelectorAll("[data-aos]:not(.aos-animate)");
  const windowHeight = window.innerHeight;

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight * 0.85) {
      el.classList.add("aos-animate");
    }
  });
}

// Initial check on load
window.addEventListener("load", () => {
  animateOnScroll();
  animateCounters();
});

// ============================================
// Counter Animation
// ============================================
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");
  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.count);
    const duration = 2000;
    const step = Math.ceil(target / 60);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = current;
    }, duration / 60);
  });
}

// ============================================
// Contact Form
// ============================================
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector(".btn-submit");
  const originalText = btn.innerHTML;
  btn.innerHTML = "✅ 已发送！";
  btn.style.pointerEvents = "none";

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.pointerEvents = "";
    contactForm.reset();
  }, 3000);
});

// ============================================
// Intersection Observer for section animations
// ============================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

// Observe sections
document.querySelectorAll(".section-header, .about-content, .contact-content").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// ============================================
// Initialize
// ============================================
renderPosts("all");
