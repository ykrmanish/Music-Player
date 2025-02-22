"use script";

const pausePlayButton = document.querySelector(".pausePlay");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
const audio = document.querySelector(".audio");
const progressBar = document.getElementById("progress-bar");
const currentAudioTime = document.querySelector(".current-time");
const totalAudioTime = document.querySelector(".total-time");
const dragArea = document.querySelector(".container");
const currentTask = document.querySelector(".current-task h4");
const musicName = document.querySelector(".audio-name");
const fileInput = document.querySelector("#file-input");
const background = document.querySelector(".background");
const repeatButton = document.querySelector(".repeat");
const magicButton = document.querySelector(".magic");
const shuffleButton = document.querySelector(".shuffle");
const albumArt = document.querySelector(".album-img");
const albumArtBox = document.querySelector(".album-art");

let songNumber = 0;

const songs = {
  song0: `./Assets/files/audio/0/Distant Echoes -  Narvent, VXLLAIN, and VØJ.mp3`,
  song1: `./Assets/files/audio/1/Euphoria - KORUSE, Narvent, and VØJ.mp3`,
  song2: `./Assets/files/audio/2/Fainted - Narvent.mp3`,
  song3: `./Assets/files/audio/3/Goth - Sidewalks and Skeletons.mp3`,
  song4: `./Assets/files/audio/4/i feel lost - Aaron Hibell.mp3`,
  song5: `./Assets/files/audio/5/I Need You - M83.mp3`,
  song6: `./Assets/files/audio/6/Silent Tears - VXLLAIN.mp3`,
};

const formatDuration = function (duration) {
  if (isNaN(duration) || duration === Infinity) return "00:00";

  const min = String(Math.trunc(duration / 60)).padStart(2, 0);
  const sec = String(Math.trunc(duration % 60)).padStart(2, 0);

  return `${min}:${sec}`;
};

const playSong = function (index) {
  audio.src = songs[`song${songNumber}`];
  musicName.textContent = songs[`song${songNumber}`].split("/").pop().replace(".mp3", "");
  audio.play();
  pausePlayButton.innerHTML =
    '<img src="./Assets/images/pause-solid.svg" alt="pause">';
  albumArt.src = `./Assets/files/audio/${songNumber}/art.jpg`;
  currentTask.textContent = "Now Playing";
};

const playNext = function () {
  songNumber = (songNumber + 1) % Object.keys(songs).length; // Ensures looping back to first song
  playSong(songNumber);
};

nextButton.addEventListener("click", playNext);

audio.addEventListener("timeupdate", function () {
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;
  totalAudioTime.textContent = formatDuration(audio.duration);
  currentAudioTime.textContent = formatDuration(audio.currentTime);
});

progressBar.addEventListener("input", function () {
  audio.currentTime = progressBar.value;
});

const pausePlay = function () {
  if (audio.paused) {
    audio.play();
    currentTask.textContent = "Now Playing";

    pausePlayButton.innerHTML = "";

    const html = '<img src="./Assets/images/pause-solid.svg" alt="pause">';

    pausePlayButton.insertAdjacentHTML("afterbegin", html);
  } else {
    audio.pause();
    currentTask.textContent = "Paused";

    pausePlayButton.innerHTML = "";

    const html = '<img src="./Assets/images/play-solid.svg" alt="play">';

    pausePlayButton.insertAdjacentHTML("afterbegin", html);
  }
};

const playPrevious = function () {
  if (audio.currentTime > 1) {
    audio.currentTime = 0;
  } else {
    songNumber = (songNumber - 1 + Object.keys(songs).length) % Object.keys(songs).length;
    playSong(songNumber);
  }
  audio.play();
};

// Drag and Drop Music Play

["dragover", "dragleave", "drop"].forEach((eventType) => {
  dragArea.addEventListener(eventType, function (e) {
    e.preventDefault();
    if (eventType === "dragover") {
      // dragArea.style.borderColor = "whitesmoke";
      background.classList.add("blur");
      currentTask.textContent = "Drop and Play";
    } // Highlight effect
    if (eventType === "dragleave") {
      background.classList.remove("blur");
      // dragArea.style.borderColor = "#333"; // Reset border
      currentTask.textContent = "Now Playing";
    }
  });
});

dragArea.addEventListener("drop", function (e) {
  e.preventDefault();
  background.classList.remove("blur");
  currentTask.textContent = "Now Playing";

  const file = e.dataTransfer.files[0];

  if (file && file.type.startsWith("audio/")) {
    const fileURL = URL.createObjectURL(file);
    audio.src = fileURL;
    musicName.textContent = file.name.replace(".mp3", "");
    pausePlay();
  } else {
    alert("Please drop only audio file.");
  }
});

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];

  if (file && file.type.startsWith("audio/")) {
    const fileURL = URL.createObjectURL(file);
    audio.src = fileURL;
    musicName.textContent = file.name.replace(".mp3", "");
    pausePlay();
  } else {
    alert("Please select only audio file.");
  }
});
pausePlayButton.addEventListener("click", pausePlay);
previousButton.addEventListener("click", playPrevious);
// nextButton.addEventListener("click", playNext)

repeatButton.addEventListener("click", function () {
  audio.loop = !audio.loop;
  if (audio.loop) {
    repeatButton.innerHTML = "";
    const html = '<img src="./Assets/images/repeat-1.png" alt="repeat-1" />';
    repeatButton.insertAdjacentHTML("afterbegin", html);
  } else {
    repeatButton.innerHTML = "";
    const html = '<img src="./Assets/images/repeat-solid.svg" alt="repeat" />';
    repeatButton.insertAdjacentHTML("afterbegin", html);
  }
});

// Shuffle
shuffleButton.addEventListener("click", function () {
  audio.shuffle = !audio.shuffle;
  if (audio.shuffle) {
    shuffleButton.innerHTML = "";
    const html =
      '<img src="./Assets/images/shuffle-solid.svg" alt="shuffle" />';
    shuffleButton.insertAdjacentHTML("afterbegin", html);
  } else {
    shuffleButton.innerHTML = "";
    const html =
      '<img src="./Assets/images/shuffle-off.png" alt="shuffle off"/>';
    shuffleButton.insertAdjacentHTML("afterbegin", html);
  }
});

// Glitter Effect

const colors = [
  "#8a2be2",
  "#e6e6fa",
  "#9370db",
  "#ffffff",
  "#ff69b4",
  "#ee82ee",
  "#da70d6",
]; // Purple, white, pink, and violet colors
const glitterCount = 350; // Number of glitter particles

function createGlitter() {
  for (let i = 0; i < glitterCount; i++) {
    const glitter = document.createElement("div");
    glitter.classList.add("glitter");
    document.body.appendChild(glitter);

    const size = Math.random() * 5 + 2;
    glitter.style.width = `${size}px`;
    glitter.style.height = `${size}px`;

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    glitter.style.left = `${x}px`;
    glitter.style.top = `${y}px`;

    const color = colors[Math.floor(Math.random() * colors.length)];
    glitter.style.backgroundColor = color;
    glitter.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;

    const duration = Math.random() * 3 + 2;
    glitter.style.animation = `move ${duration}s linear infinite`;

    glitter.addEventListener("mouseover", () => {
      glitter.style.transform = "scale(2)";
      glitter.style.opacity = "0";
      setTimeout(() => {
        glitter.remove();
        createGlitter(); // Replace the removed glitter
      }, 300);
    });
  }
}

function moveGlitter(event) {
  const glitters = document.querySelectorAll(".glitter");
  glitters.forEach((glitter) => {
    const x = event.clientX;
    const y = event.clientY;
    const glitterX = parseFloat(glitter.style.left);
    const glitterY = parseFloat(glitter.style.top);

    const dx = x - glitterX;
    const dy = y - glitterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      glitter.style.left = `${glitterX - dx * 0.05}px`;
      glitter.style.top = `${glitterY - dy * 0.05}px`;
    }
  });
}

// window.onload = createGlitter;
let magicClickCount = 0;
const maxMagicClicks = 1;

function createGlitterLimited() {
  if (magicClickCount < maxMagicClicks) {
    createGlitter();
    magicClickCount++;
  } else {
    resetGlitter();
    magicClickCount = 0;
  }
}

function resetGlitter() {
  const glitters = document.querySelectorAll(".glitter");
  glitters.forEach((glitter) => glitter.remove());
}

magicButton.addEventListener("click", createGlitterLimited);
document.addEventListener("mousemove", moveGlitter);
albumArtBox.addEventListener("click", function(){
  if (albumArtBox.style.borderRadius === "0px") {
    albumArtBox.style.borderRadius = "50%"; // Make it rounded again
  } else {
    albumArtBox.style.borderRadius = "0px"; // Make it square
  }
})
audio.addEventListener("ended", playNext);
playSong(songNumber);
