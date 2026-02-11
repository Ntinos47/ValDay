document.body.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const backBtn = document.getElementById("backBtn");
const mainContainer = document.getElementById("mainContainer");
const successMessage = document.getElementById("successMessage");

let hasMoved = false;
let heartInterval;
let textIndex = 0;
let slideshowInterval; // Variable to control the slideshow

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
  noBtn.innerText = noTexts[textIndex];
  textIndex++;

  if (textIndex >= noTexts.length) {
      // Loop the last 4 messages
      textIndex = noTexts.length - 4; 
  }

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

  // Clear any existing interval to prevent speed-ups
  if (slideshowInterval) clearInterval(slideshowInterval);

  slideshowInterval = setInterval(() => {
      // Remove active class from current
      slides[slideIndex].classList.remove('active');
      
      // Calculate next index
      slideIndex = (slideIndex + 1) % slides.length;
      
      // Add active class to next
      slides[slideIndex].classList.add('active');
  }, 2500); // Change image every 2.5 seconds
}

yesBtn.addEventListener("click", () => {
  mainContainer.style.display = "none";
  successMessage.style.display = "flex";
  heartInterval = setInterval(createHeart, 300);
  startSlideshow(); // Start photo animation
});

backBtn.addEventListener("click", () => {
  successMessage.style.display = "none";
  mainContainer.style.display = "block";
  
  clearInterval(heartInterval);
  clearInterval(slideshowInterval); // Stop photo animation
  
  hasMoved = false;
  textIndex = 0;
  noBtn.innerText = "Όχι 😢"; 
  noBtn.classList.remove("smooth-move");
  noBtn.style.position = "";
  noBtn.style.top = "";
  noBtn.style.left = "";
});

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  const size = Math.random() * 10 + 15 + "px"; 
  heart.style.setProperty('--heart-size', size);
  heart.style.animationDuration = Math.random() * 3 + 3 + "s";
  document.body.appendChild(heart);
  setTimeout(() => { heart.remove(); }, 6000);
}

setInterval(createHeart, 1000);