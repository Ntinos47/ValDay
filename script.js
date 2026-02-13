document.body.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const backBtn = document.getElementById("backBtn");
const mainContainer = document.getElementById("mainContainer");
const successMessage = document.getElementById("successMessage");

// Popup Elements
const popupOverlay = document.getElementById("popupOverlay");
const closePopupBtn = document.getElementById("closePopupBtn");

let hasMoved = false;
let heartInterval;
let textIndex = 0;
let slideshowInterval; 

// New variables for popup logic
let hoverCount = 0; 
let currentThreshold = 10; 
let sadMode = false;

const noTexts = [
  "Είσαι σίγουρη;",
  "Ξανασκέψου το...",
  "Μήπως κάνεις λάθος;",
  "Τελευταία ευκαιρία!",
  "Έλα τώρα...",
  "Μην είσαι τέτοια!",
  "Σε παρακαλώ...",
  "Μου ραγίζεις την καρδιά 💔",
  "Θα βάλω τα κλάματα! 😭",
  "Δεν το δέχομαι!",
  "Αποκλείεται!",
  "ΠΑΤΑ ΤΟ ΝΑΙ ΛΕΜΕ! ❤️"
];

function moveButton() {
  // Logic for Popup / Sad Mode
  hoverCount++;
  if (hoverCount === currentThreshold) {
      popupOverlay.style.display = "flex";
      sadMode = true; 
      
      // Burst of sadness immediately!
      for(let i = 0; i < 15; i++) {
          setTimeout(() => createFallingItem('sad'), i * 100);
      }
  }

  // Text Logic
  noBtn.innerText = noTexts[textIndex];
  textIndex++;

  if (textIndex >= noTexts.length) {
      textIndex = noTexts.length - 4; 
  }

  // Movement Logic
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const btnRect = noBtn.getBoundingClientRect();
  const btnWidth = btnRect.width;
  const btnHeight = btnRect.height;
  
  const maxLeft = windowWidth - btnWidth - 20;
  const maxTop = windowHeight - btnHeight - 20;

  const randomLeft = Math.max(20, Math.floor(Math.random() * maxLeft));
  const randomTop = Math.max(20, Math.floor(Math.random() * maxTop));

  if (!hasMoved) {
      const initialLeft = btnRect.left;
      const initialTop = btnRect.top;

      noBtn.style.left = initialLeft + "px";
      noBtn.style.top = initialTop + "px";
      noBtn.style.position = "fixed";
      
      hasMoved = true;

      setTimeout(() => {
          noBtn.classList.add("smooth-move");
          noBtn.style.left = randomLeft + "px";
          noBtn.style.top = randomTop + "px";
      }, 10);

  } else {
      noBtn.style.left = randomLeft + "px";
      noBtn.style.top = randomTop + "px";
  }
}

// Close Popup Logic
closePopupBtn.addEventListener("click", () => {
    popupOverlay.style.display = "none";
    hoverCount = 0;
    currentThreshold = 8; // Make it happen slightly faster next time
});

noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault(); 
  moveButton();
});
noBtn.addEventListener("click", moveButton);

// Function to cycle images
function startSlideshow() {
  const slides = document.querySelectorAll('.slide-img');
  let slideIndex = 0;

  if (slideshowInterval) clearInterval(slideshowInterval);

  slideshowInterval = setInterval(() => {
      slides[slideIndex].classList.remove('active');
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add('active');
  }, 2500); 
}

yesBtn.addEventListener("click", () => {
  mainContainer.style.display = "none";
  successMessage.style.display = "flex";
  sadMode = false;
  heartInterval = setInterval(() => createFallingItem('heart'), 300);
  startSlideshow(); 
});

backBtn.addEventListener("click", () => {
  successMessage.style.display = "none";
  mainContainer.style.display = "block";
  
  clearInterval(heartInterval);
  clearInterval(slideshowInterval); 
  
  // Reset all states
  hasMoved = false;
  textIndex = 0;
  hoverCount = 0;
  currentThreshold = 10; 
  sadMode = false;

  noBtn.innerText = "Όχι 😢"; 
  noBtn.classList.remove("smooth-move");
  noBtn.style.position = "";
  noBtn.style.top = "";
  noBtn.style.left = "";
});

// Unified Falling Item Function (Hearts & Sad Faces)
function createFallingItem(type) {
  const item = document.createElement("div");
  item.classList.add("falling-item");
  
  item.style.left = Math.random() * 100 + "vw";
  const size = Math.random() * 10 + 15 + "px"; 
  item.style.setProperty('--heart-size', size);
  item.style.animationDuration = Math.random() * 3 + 3 + "s";

  if (type === 'heart') {
      const heartShape = document.createElement("div");
      heartShape.classList.add("heart-shape");
      item.appendChild(heartShape);
  } else if (type === 'sad') {
      item.innerText = "😢";
  }

  document.body.appendChild(item);
  setTimeout(() => { item.remove(); }, 6000);
}

// Background Animation Loop
setInterval(() => {
    if (sadMode) {
        // If sad mode is on, mostly sad faces, some hearts
        if (Math.random() > 0.6) {
            createFallingItem('sad');
        } else {
            createFallingItem('heart');
        }
    } else {
        // Normal mode: just hearts
        createFallingItem('heart');
    }
}, 400); // Default speed