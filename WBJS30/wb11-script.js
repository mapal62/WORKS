/*local vs. public path*/
const mapalandroidShare = "
https://drive.google.com/drive/folders/1ac8-QRypU3o6bmWSxdPDECsrpSQD87tn?usp=sharing/";

/* element */
const player = document.querySelector(".container");
const video = player.querySelector("video");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const stat = player.querySelector(".status");

/* functions */
function togglePlay() {
  /*   if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
 */
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function updateButton() {
  const icon = this.paused ? "&#x23F5;" : "&#x23F8;";
  toggle.innerHTML = icon;
  stat.classList.toggle("play");
  stat.classList.toggle("pause");
}

function skip() {
  // console.log(this.dataset);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  console.log(percent);
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
/* event listeneres */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));//till the first false
progress.addEventListener("mousedown", () => mousedown = true);
player.addEventListener("mouseup", () => mousedown = false);//foolsafe
