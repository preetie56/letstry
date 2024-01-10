// Initial References
const moves = document.getElementById("moves");
const container = document.querySelector(".container");
const startButton = document.getElementById("start-button");
const coverScreen = document.querySelector(".cover-screen");
const result = document.getElementById("result");
let currentElement = "";
let movesCount, imagesArr = [];



// Popups
// Popups
const popup1 = () => {
  document.getElementById('popup1').style.display = 'block';
  setTimeout(() => {
    document.getElementById('popup1').style.display = 'none';
  }, 3000); // Close popup after 3 seconds (adjust as needed)
};

// Show popup1 when the user scrolls down the page
let hasScrolled = false;
window.onscroll = () => {
  if (!hasScrolled) {
    popup1();
    hasScrolled = true; // Set flag to ensure popup1 is shown only once
  }
};

// ... (rest of your code)


const popup2 = () => {
  document.getElementById('popup2').style.display = 'block';
  setTimeout(() => {
    document.getElementById('popup2').style.display = 'none';
  }, 3000);
};

const popup3 = () => {
  document.getElementById('popup3').style.display = 'block';
  setTimeout(() => {
    document.getElementById('popup3').style.display = 'none';
  }, 3000);
};

// Show popup1 when the user scrolls
window.onscroll = () => {
  popup1();
  window.onscroll = null; // Unbind the event after the first scroll
};

// Random number for image
const randomNumber = () => Math.floor(Math.random() * 19);

// Specify the order of image pieces
const specifiedOrder = [
  0, 1, 2, 3, 4,
  10, 11, 12, 13, 14,
  20, 21, 22, 23, 24,
  30, 31, 32, 33, 34
];

// Shuffle an array using Fisher-Yates algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Fill array with specified values for images
const randomImages = () => {
  imagesArr = [...specifiedOrder];
  shuffleArray(imagesArr);
};

// Get row and column value from data-position
const getCoords = (element) => {
  const [row, col] = element.getAttribute("data-position").split("_");
  return [parseInt(row), parseInt(col)];
};

// Row1, col1 are image coordinates while row2 and col2 are blank image coordinates
const checkAdjacent = () => true;

// Generate Grid
const gridGenerator = () => {
  let count = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      let div = document.createElement("div");
      div.setAttribute("data-position", `${i}_${j}`);
      div.addEventListener("click", selectImage);
      div.classList.add("image-container");
      div.style.margin = "5px";

      let imgIndex = imagesArr[count];
      let imgSrc = `imgpiece-${imgIndex < 10 ? "0" : ""}${imgIndex}.jpg`;
      let imgClass = imgIndex === 34 ? "target" : "";

      div.innerHTML = `<img src="${imgSrc}" class="image ${imgClass}" data-index="${imgIndex}"/>`;

      count += 1;
      container.appendChild(div);
    }
  }
};

// Click the image
const selectImage = (e) => {
  e.preventDefault();
  currentElement = e.target;
  let targetElement = document.querySelector(".target");
  let currentParent = currentElement.parentElement;
  let targetParent = targetElement.parentElement;

  const [row1, col1] = getCoords(currentParent);
  const [row2, col2] = getCoords(targetParent);

  currentElement.remove();
  targetElement.remove();

  let currentIndex = parseInt(currentElement.getAttribute("data-index"));
  let targetIndex = parseInt(targetElement.getAttribute("data-index"));

  currentElement.setAttribute("data-index", targetIndex);
  targetElement.setAttribute("data-index", currentIndex);

  currentParent.appendChild(targetElement);
  targetParent.appendChild(currentElement);

  let currentArrIndex = imagesArr.indexOf(currentIndex);
  let targetArrIndex = imagesArr.indexOf(targetIndex);

  [imagesArr[currentArrIndex], imagesArr[targetArrIndex]] = [
    imagesArr[targetArrIndex],
    imagesArr[currentArrIndex],
  ];

  // Check moves count for displaying popup2
  if (movesCount === 20 && !popup2Shown) {
    popup2();
    popup2Shown = true; // Set flag to ensure popup2 is shown only once
  }

  // Check if the game is won
  if (imagesArr.join("") === "012345101112131420212223243031323334") {
    setTimeout(() => {
      coverScreen.classList.remove("hide");
      container.classList.add("hide");
      result.innerText = `Total Moves: ${movesCount}`;
      startButton.innerText = "Restart Game";
    }, 1000);

    // Show popup3 when the game is won
    popup3();
  }

  movesCount += 1;
  moves.innerText = `Moves: ${movesCount}`;
};
// Show/Hide Original Image
const originalImage = document.getElementById("originalImage");

function toggleOriginalImage() {
  originalImage.style.display = (originalImage.style.display === 'none' || originalImage.style.display === '') ? 'block' : 'none';
}

// Add event listener to the "Show Image" button
const showImageButton = document.getElementById("show");
showImageButton.addEventListener("click", toggleOriginalImage);

// Start button click should display the container
coverScreen.addEventListener("click", () => {
  container.classList.remove("hide");
  coverScreen.classList.add("hide");
  container.innerHTML = "";
  imagesArr = [];
  randomImages();
  gridGenerator();
  movesCount = 0;

  // Reset flag for popup2
  popup2Shown = false;

  // Show popup1 when the game starts
  popup1();
});

// Display the start screen first
window.onload = () => {
  coverScreen.classList.remove("hide");
  container.classList.add("hide");
};

// Flag to track if popup2 has been shown
let popup2Shown = false;
