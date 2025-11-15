// Loader hide
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  gsap.to(loader, { opacity: 0, duration: 0.6, onComplete: () => loader.remove() });
  AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });

  gsap.from('.project-img', {
    y: -60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.15
  });

  gsap.from('.hero-card', { y: 30, opacity: 0, duration: 0.8 });
  gsap.from('.profile .frame', { scale: 0.95, opacity: 0, duration: 0.8, delay: 0.15 });
});

function scrollTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') document.body.classList.add('light');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const active = document.body.classList.contains('light') ? 'light' : 'dark';
  localStorage.setItem('theme', active);
});

const projects = [
  {
    id: 'Dashbaord',
    title: 'A2Z Desktop Dashbaord',
    short: 'Dashbaord for Admin and Operation For A2Z e-commerce using API and Cubit',
      desc: `
    For Operations: The system allows adding new products, editing product information, and deleting products. 
    It also enables tracking orders, managing financial transactions, and communicating with customers. 
    <br><br>
    For Admin: The admin can view profits, sales, and revenue. They can add new employees, monitor the number of customers and staff, and access detailed business statistics.
  `,
    image: [
      'dashbaord_app/1.png', 'dashbaord_app/2.png', 'dashbaord_app/3.png',
      'dashbaord_app/4.png', 'dashbaord_app/5.png', 'dashbaord_app/6.png',
      'dashbaord_app/7.png', 'dashbaord_app/8.png', 'dashbaord_app/9.png',
      'dashbaord_app/10.png', 'dashbaord_app/11.png', 'dashbaord_app/12.png'
    ],
    repo: 'https://github.com/Project-A2Z/a2z-dashboard',
  },
  {
    id: 'NCI',
    title: 'NCI Post Graduate System',
    short: 'NCI is management system build using API integration and Provider',
    desc: `The NCI Student Management System is a complete platform designed to support students, supervisors, and administrators throughout the academic and graduation-project journey. The system allows students to access their academic information, communicate with supervisors, track graduation project progress, and manage their account securely.`,
    image: [
      'NCI_project/1.jpeg',
      'NCI_project/2.jpeg',
      'NCI_project/3.jpeg',
      'NCI_project/4.jpeg',
      'NCI_project/5.jpeg',
      'NCI_project/6.jpeg',
      'NCI_project/7.jpeg',
      'NCI_project/8.jpeg',
      'NCI_project/9.jpeg',
      'NCI_project/10.jpeg',
      'NCI_project/11.jpeg',
    ],
    repo: 'https://github.com/minadanielferwiz/graduation_project',
  },
  {
    id: 'Weather',
    title: 'Weather App',
    short: 'Weather App Using real Weather API',
    desc: 'Weather App for search and get current weather Using real Weather API',
    image: [
      'weather_app/1.jpeg',
      'weather_app/2.jpeg',
      'weather_app/3.jpeg',
      'weather_app/4.jpeg',
    ],
    repo: 'https://github.com/minadanielferwiz/weather_app',
  }
];

const grid = document.getElementById('projectsGrid');

projects.forEach(p => {
  const el = document.createElement('div');
el.className = "project-wrapper";  

const imgsHTML = Array.isArray(p.image)
  ? p.image.map((src, i) => `
      <img class="slide-img ${i === 0 ? "active" : ""}" src="${src}" alt="${p.title}">
    `).join('')
  : `<img class="slide-img active" src="${p.image}" alt="${p.title}">`;

el.innerHTML = `
  <!-- الصور فوق -->
  <div class="project-img slider">
    ${imgsHTML}
    <button class="slider-btn prev">‹</button>
    <button class="slider-btn next">›</button>
  </div>

  <!-- الكارد تحت -->
  <div class="card card-content">
    <h4>${p.title}</h4>
    <p class="muted">${p.short}</p>

    <div style="margin-top:12px;display:flex;gap:8px">
      <button class="btn btn-ghost details-btn" data-id="${p.id}">Details</button>
      <a class="btn btn-cta" href="${p.repo}" target="_blank">GitHub</a>
    </div>
  </div>
`;


  grid.appendChild(el);

  const slides = el.querySelectorAll('.slide-img');
  let index = 0;

  const updateSlide = () => {
    slides.forEach((img, i) => {
      img.classList.remove('active');
      if (i === index) {
        img.style.transition = "none";
        img.classList.add('active');
        void img.offsetWidth;
        img.style.transition = "";
      }
    });
  };

  el.querySelector('.next').addEventListener('click', () => {
    index = (index + 1) % slides.length;
    updateSlide();
  });

  el.querySelector('.prev').addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
  });
});



document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('formStatus');

  status.style.display = 'block';
  status.textContent = 'Sending...';

  const endpoint = 'https://formspree.io/f/xldagqvk';

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  });

  status.textContent = res.ok
    ? 'Message sent! I will reply soon.'
    : 'Failed to send message.';

  if (res.ok) e.target.reset();
});

// Hire Me button scroll to contact
document.getElementById('hireBtn').addEventListener('click', () => scrollTo('contact'));




function renderModalSlider(images){
  return `
    <div class="modal-slider">
      ${images
        .map((src, i) => `<img class="modal-slide ${i===0?'active':''}" src="${src}">`)
        .join('')}
      <button class="modal-slider-btn modal-prev">‹</button>
      <button class="modal-slider-btn modal-next">›</button>
    </div>
  `;
}

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalMedia = document.getElementById('modalMedia');
const modalRepo = document.getElementById('modalRepo');
const closeModal = document.getElementById('closeModal');

function renderModalSlider(images) {
  return `
    <div class="modal-slider">
      ${images.map((src,i)=>`<img class="modal-slide ${i===0?'active':''}" src="${src}">`).join('')}
      <button class="modal-slider-btn modal-prev">‹</button>
      <button class="modal-slider-btn modal-next">›</button>
    </div>
  `;
}

grid.addEventListener('click', (e) => {
  if(e.target.classList.contains('details-btn')){
    const id = e.target.dataset.id;
    const project = projects.find(p=>p.id===id);
    if(!project) return;

    modalTitle.textContent = project.title;
    modalDesc.innerHTML = `<p class="muted">${project.desc}</p>`;

    const images = Array.isArray(project.image) ? project.image : [project.image];
    modalMedia.innerHTML = renderModalSlider(images);

    modalRepo.href = project.repo;

    modal.classList.add('show');

    gsap.from('.modal .panel', {y:30, opacity:0, duration:0.4});

    const slides = modal.querySelectorAll('.modal-slide');
    let index = 0;

    const updateSlide = () => {
      slides.forEach((img, i) => {
        img.classList.remove('active');
        img.style.transition = 'none';
        void img.offsetWidth; 
        img.style.transition = '';
      });
      slides[index].classList.add('active');
    };

    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');

    nextBtn.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      updateSlide();
    });

    prevBtn.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      updateSlide();
    });

    updateSlide();


    let autoSlide = setInterval(() => { index = (index+1)%slides.length; updateSlide(); }, 2000);
    modal.addEventListener('click', ()=> clearInterval(autoSlide));
  }
});

closeModal.addEventListener('click', ()=> modal.classList.remove('show'));
modal.addEventListener('click', e=>{ if(e.target===modal) modal.classList.remove('show'); });
