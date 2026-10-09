/* ============================================
   Kyle Lowell Pronto — Portfolio Interactivity
   ============================================ */

(function () {
  'use strict';

  /* ---------- Navbar scroll state ---------- */
  const nav = document.getElementById('nav');
  const toTop = document.getElementById('toTop');
  const onScroll = () => {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    if (window.scrollY > 600) toTop.classList.add('visible');
    else toTop.classList.remove('visible');

    updateActiveLink();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nav-link').forEach((l) =>
    l.addEventListener('click', () => navLinks.classList.remove('open'))
  );

  /* ---------- Active link via IntersectionObserver ---------- */
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const linkMap = new Map();
  document.querySelectorAll('.nav-link').forEach((link) => {
    const id = link.getAttribute('href').replace('#', '');
    linkMap.set(id, link);
  });

  const linkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
          const l = linkMap.get(id);
          if (l) l.classList.add('active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((s) => linkObserver.observe(s));

  function updateActiveLink() {
    // fallback: already handled by IO
  }

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Typewriter effect ---------- */
  const roles = [
    'Aspiring Cloud Engineer ☁️',
    'DevOps & CI/CD Enthusiast 🚀',
    'Full-Stack Developer 💻',
    'Terraform & AWS Explorer 🛠️',
    'BSIT Student at PUP 🎓'
  ];
  const twEl = document.getElementById('typewriter');
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  function typeTick() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      twEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        return setTimeout(typeTick, 1800);
      }
      return setTimeout(typeTick, 60 + Math.random() * 50);
    } else {
      charIndex--;
      twEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
      return setTimeout(typeTick, 35);
    }
  }
  typeTick();

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll(
    '.section-head, .about-grid > *, .skill-column, .project, .edu-grid > *, .contact-card, .arch-wrapper, .hero-text, .hero-visual'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('show'), i * 40);
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((t) => revealObserver.observe(t));

  /* ---------- Cloud Architecture lab ---------- */
  const SVG_NS = 'http://www.w3.org/2000/svg';
  function buildSvg(d) {
    const el = document.createElementNS(SVG_NS, 'svg');
    el.setAttribute('viewBox', '0 0 24 24');
    el.setAttribute('fill', 'none');
    el.setAttribute('stroke', 'currentColor');
    el.setAttribute('stroke-width', '2');
    el.setAttribute('stroke-linecap', 'round');
    el.setAttribute('stroke-linejoin', 'round');
    el.innerHTML = d;
    return el;
  }
  // icon descriptors (path-only)
  const archIcons = [
    '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>'
  ];

  const archData = [
    {
      title: 'User / Client',
      sub: 'Initiates HTTPS request',
      body:
        'A user on a laptop, phone, or desktop makes an HTTPS request to the application — e.g. logging in, browsing a Pokédex, or submitting a booking. The request travels over the public internet toward the AWS edge.'
    },
    {
      title: 'CDN + WAF (CloudFront + AWS WAF)',
      sub: 'Global edge + firewall layer',
      body:
        'Requests first hit CloudFront edge locations for cached content (cutting latency) and pass through a Web Application Firewall that drops common exploits — SQLi, XSS, bad bots — before they ever reach the VPC.'
    },
    {
      title: 'ALB + Route 53',
      sub: 'DNS and load balancing tier',
      body:
        'Route 53 resolves the domain, then an Application Load Balancer in public subnets routes traffic across healthy EC2 instances in the Auto Scaling group across multiple Availability Zones for redundancy.'
    },
    {
      title: 'EC2 Auto Scaling (App Tier)',
      sub: 'Dockerized Spring Boot / Node APIs',
      body:
        'Application servers run in private subnets behind the ALB — containers built with multi-stage Dockerfiles, running as non-root users, launched from Golden AMIs by an Auto Scaling group that scales on CPU or request rate.'
    },
    {
      title: 'RDS + S3 + Secrets',
      sub: 'Persistence and object storage',
      body:
        'RDS (PostgreSQL/MySQL) runs in a private subnet with automated backups and encryption at rest. Uploads and static assets live in an encrypted, versioned S3 bucket. Secrets and keys come from Secrets Manager or Parameter Store.'
    }
  ];

  const nodes = document.querySelectorAll('.arch-node');
  const descIcon = document.getElementById('descIcon');
  const descTitle = document.getElementById('descTitle');
  const descSub = document.getElementById('descSub');
  const descBody = document.getElementById('descBody');
  const archDesc = document.getElementById('arch-desc') || document.querySelector('.arch-desc');

  function setActive(i, { animate = false } = {}) {
    nodes.forEach((n) => n.classList.remove('active'));
    const node = nodes[i];
    if (!node) return;
    node.classList.add('active');
    const d = archData[i];
    const iconSvg = buildSvg(archIcons[i]);
    if (animate && archDesc) {
      archDesc.style.transition = 'opacity .2s ease';
      archDesc.style.opacity = '0';
      setTimeout(() => {
        descIcon.textContent = '';
        descIcon.appendChild(iconSvg);
        descTitle.textContent = d.title;
        descSub.textContent = d.sub;
        descBody.textContent = d.body;
        archDesc.classList.add('active');
        archDesc.style.opacity = '1';
      }, 220);
    } else {
      descIcon.textContent = '';
      descIcon.appendChild(iconSvg);
      descTitle.textContent = d.title;
      descSub.textContent = d.sub;
      descBody.textContent = d.body;
      archDesc.classList.add('active');
    }
    // scroll into view
    const routeEl = document.querySelector('.arch-route-scroll');
    if (routeEl && node) {
      const nodeLeft = node.offsetLeft - 20;
      routeEl.scrollTo({ left: nodeLeft, behavior: 'smooth' });
    }
  }

  nodes.forEach((node, i) => {
    node.addEventListener('click', () => setActive(i, { animate: true }));
  });

  /* ---------- Trace button: animate each step ---------- */
  const traceBtn = document.getElementById('traceBtn');
  const resetBtn = document.getElementById('resetTrace');
  let tracing = false;

  traceBtn.addEventListener('click', () => {
    if (tracing) return;
    tracing = true;
    traceBtn.disabled = true;
    let i = 0;
    const step = () => {
      if (i >= archData.length) {
        tracing = false;
        traceBtn.disabled = false;
        return;
      }
      setActive(i, { animate: true });
      i++;
      setTimeout(step, 1800);
    };
    step();
  });

  resetBtn.addEventListener('click', () => {
    tracing = false;
    traceBtn.disabled = false;
    nodes.forEach((n) => n.classList.remove('active'));
    archDesc.classList.remove('active');
    setActive(0);
  });

  // initial state
  setActive(0);

  /* ---------- Smooth scrollbar styling fallback for Firefox via CSS var ---------- */
  // (handled mostly in CSS; nothing else needed here.)
})();
