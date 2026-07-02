const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const form = document.getElementById('application-form');
const formStatus = document.querySelector('.form-status');
const aiToggle = document.querySelector('.ai-toggle');
const aiPanel = document.querySelector('.ai-panel');
const aiForm = document.getElementById('ai-form');
const aiInput = document.getElementById('ai-input');
const aiMessages = document.getElementById('ai-messages');
const aiChips = document.querySelectorAll('.chip');

const whatsappNumber = '27833820068';
const whatsappLink = document.querySelector('.whatsapp-float');
if (whatsappLink) {
  whatsappLink.href = `https://wa.me/${whatsappNumber}`;
}

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('active');
});

navMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      isValid = false;
      field.style.borderColor = '#d9534f';
    } else {
      field.style.borderColor = '#e6e8ed';
    }
  });

  if (!isValid) {
    formStatus.textContent = 'Please complete all required fields before submitting.';
    return;
  }

  formStatus.textContent = 'Thank you. Your application has been received and our team will contact you shortly.';
  form.reset();
});

const addMessage = (text, type = 'bot') => {
  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;
  aiMessages.appendChild(message);
  aiMessages.scrollTop = aiMessages.scrollHeight;
};

const getBotReply = (question) => {
  const normalized = question.toLowerCase().trim();

  if (!normalized) {
    return 'I can help you with room prices, WiFi, security, applications, location, viewing bookings and contact details.';
  }

  if (/(price|cost|rent|monthly|room|shared)/.test(normalized)) {
    return 'Room prices start from R4,800 per month for shared rooms at LSN Classics.';
  }

  if (/(wifi|internet|network|data)/.test(normalized)) {
    return 'Yes, high-speed WiFi is included in the monthly rent so students can study, attend classes and stay connected with ease.';
  }

  if (/(security|secure|safe|cctv|guard|access|monitor)/.test(normalized)) {
    return 'The residence is secure with controlled access, CCTV monitoring and professional management to give students and parents peace of mind.';
  }

  if (/(apply|application|register|admission|enrol|enroll)/.test(normalized)) {
    return 'You can apply by completing the application form on this website or by contacting our team directly for help with availability and the next steps.';
  }

  if (/(location|near|campus|university|college|alice|eastern|town)/.test(normalized)) {
    return 'LSN Classics is based in Alice, Eastern Cape and is conveniently located near campus areas and major transport routes.';
  }

  if (/(view|visit|tour|inspection|booking)/.test(normalized)) {
    return 'You can book a viewing by contacting us directly on the phone or WhatsApp details shown on this site.';
  }

  if (/(contact|email|phone|whatsapp|call|address|hours)/.test(normalized)) {
    return 'You can contact us at lsnclassics@gmail.com, call +27 43 051 2738 or reach us on WhatsApp at +27 83 382 0068.';
  }

  if (/(parking|laundry|kitchen|study|furnished|visitor|guest|amenit)/.test(normalized)) {
    return 'Our residence includes secure parking, laundry facilities, study spaces, a modern kitchen and furnished rooms designed for comfort and academic success.';
  }

  if (/(hello|hi|hey|help|thanks|thank you|who are you|what can you do)/.test(normalized)) {
    return 'Hello! I can help with room options, prices, WiFi, security, applications, location, viewing bookings and contact details. Ask me anything about LSN Classics.';
  }

  return 'I can help with room prices, WiFi, security, the application process, location, viewing bookings, amenities and contact details. If you want, ask me a specific question and I will answer it here.';
};

aiToggle?.addEventListener('click', () => {
  const isOpen = aiPanel.classList.toggle('open');
  aiToggle.setAttribute('aria-expanded', String(isOpen));
});

aiChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const value = chip.textContent.trim();
    addMessage(value, 'user');
    window.setTimeout(() => {
      addMessage(getBotReply(value), 'bot');
    }, 250);
  });
});

aiForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = aiInput.value.trim();
  if (!value) return;
  addMessage(value, 'user');
  aiInput.value = '';
  window.setTimeout(() => {
    addMessage(getBotReply(value), 'bot');
  }, 250);
});
