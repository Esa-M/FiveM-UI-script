

const ProgsPreview = document.getElementById("prog-preview")
const ProgressBar = document.querySelectorAll("#progs")
let cloneNode = null
let cloneNodeIdx = null

const animationDuration = 5000
const targettedWidth = 250


ProgressBar.forEach((Prog) => {

  Prog.addEventListener('click', (e) => {
    cloneNodeIdx = Prog.getAttribute('data-color-index');
    if (cloneNode) {
      ProgsPreview.removeChild(cloneNode)
    }
    cloneNode = Prog.cloneNode(true)
    cloneNode.removeAttribute("id")

    cloneNode.classList.add("w-4/5")
    ProgsPreview.appendChild(cloneNode)

    if (parseInt(cloneNodeIdx) == 0) {
      const progressBarRandomTime = {
        zero: 0,
      }
      let bar = cloneNode.querySelectorAll(".bar")[0];
      let progress = cloneNode.querySelectorAll(".progress")[0];
      progress.classList.add("loading");
      progress.style.width = `${targettedWidth}px`;
      progress.style.backgroundColor = "transparent";
      bar.style.width = `${progressBarRandomTime.zero}%`;

      const loadingNum = document.createElement("div");
      loadingNum.classList.add("GTA", "text-2xl", "loadingNum", "self-center");
      bar.appendChild(loadingNum);

      let increment = (targettedWidth - progressBarRandomTime.zero) / (animationDuration / 10);

      let interval = setInterval(() => {
        progressBarRandomTime.zero += increment;
        bar.style.width = `${progressBarRandomTime.zero}%`;
        loadingNum.innerText = parseInt(((parseInt(bar.style.width)) * 100) / targettedWidth);
        if (progressBarRandomTime.zero >= targettedWidth) {
          clearInterval(interval);
        }
      }, 10);
    }

    if (parseInt(cloneNodeIdx) == 1) {
      const progressBarRandomTime = {
        zero: 0,
      }
      let bar = cloneNode.querySelectorAll(".bar")[0]
      let progress = cloneNode.querySelectorAll(".progress")[0]
      progress.classList.add("loading")
      progress.style.width = `${targettedWidth}px`
      progress.style.backgroundColor = "transparent"
      bar.style.width = `${progressBarRandomTime.zero}%`
      let increment = (targettedWidth - progressBarRandomTime.zero) / (animationDuration / 10)
      const loadingNum = document.createElement("div")
      loadingNum.classList.add("GTA")
      loadingNum.classList.add("text-2xl")
      loadingNum.classList.add("loadingNum")
      loadingNum.classList.add("self-center")
      bar.appendChild(loadingNum)

      let interval = setInterval(() => {
        progressBarRandomTime.zero += increment
        bar.style.width = `${progressBarRandomTime.zero}%`
        loadingNum.innerText = parseInt(((parseInt(bar.style.width)) * 100) / 250)
        if (progressBarRandomTime.zero >= targettedWidth) {
          clearInterval(interval)
        }
      }, 10)
    }

    if (parseInt(cloneNodeIdx) == 2) {
      let target = 500
      const circle = cloneNode.querySelectorAll(".radial-1")[0]
      // const innerElement = cloneNode.querySelectorAll(".inner")[0]
      const loadingNum = cloneNode.querySelectorAll(".percentage-num")[0]
      // const loadingNum = document.createElement("div")
      // loadingNum.classList.add("self-center")
      // loadingNum.classList.add("GTA")
      // loadingNum.classList.add("text-2xl")
      // innerElement.appendChild(loadingNum)
      circle.classList.remove("radial-1")
      circle.classList.add("radial-none-1")
      circle.style.strokeDashoffset = 500

      let increment = (target - 250) / (animationDuration / 10)
      let init = 0
      let interval = setInterval(() => {
        target -= increment
        circle.style.strokeDashoffset = target
        init = init + increment
        loadingNum.innerText = parseInt((init * 100) / 250)
        if (target <= 250) {
          clearInterval(interval)
        }
      }, 10)
    }

    if (parseInt(cloneNodeIdx) == 3) {
      let target = 500
      const circle = cloneNode.querySelectorAll(".radial-2")[0]
      // const innerElement = cloneNode.querySelectorAll(".inner")[0]
      const loadingNum = cloneNode.querySelectorAll(".percentage-num")[0]
      // const loadingNum = document.createElement("div")
      // loadingNum.classList.add("self-center")
      // loadingNum.classList.add("GTA")
      // loadingNum.classList.add("text-2xl")
      // innerElement.appendChild(loadingNum)
      circle.classList.remove("radial-1")
      circle.classList.add("radial-none-2")
      circle.style.strokeDashoffset = 500
      let increment = (target - 250) / (animationDuration / 10)
      let init = 0
      let interval = setInterval(() => {
        target -= increment
        circle.style.strokeDashoffset = target
        init = init + increment
        loadingNum.innerText = parseInt((init * 100) / 250)
        if (target <= 250) {
          clearInterval(interval)
        }
      }, 10)
    }

    if (parseInt(cloneNodeIdx) == 4) {
      const targetWidth = 100
      let currentWidth = 0
      const currentElement = cloneNode.querySelectorAll(".range")[0]
      // currentElement.classList.remove("range")
      // currentElement.classList.add("range")
      currentElement.setAttribute("style", `--p:${currentWidth}`)
      let increment = (targetWidth - currentWidth) / (animationDuration / 10)
      let interval = setInterval(() => {
        currentWidth += increment
        currentElement.setAttribute("style", `--p:${parseInt(currentWidth)}`)
        if (currentWidth >= targetWidth) {
          clearInterval(interval)
        }
      }, 10)
    }
  })
})




const bars = document.querySelectorAll('.bar');
const progress = document.querySelectorAll('.progress');

bars.forEach((bar, index) => {
  const randomWidth = Math.floor((Math.random() * 65) + 10);
  bar.style.width = `${randomWidth}%`;
  progress[index].addEventListener('mouseover', () => {
    const randomTiming = Math.floor((Math.random() * 2) + 2);
    bar.style.transitionDuration = `${randomTiming}s`;
    bar.style.width = '100%';
  });
})