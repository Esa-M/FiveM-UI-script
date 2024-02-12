const ProgsPreview = document.getElementById("prog-preview")
const ProgressBar = document.querySelectorAll("#progs")
let cloneNode = null
let cloneNodeIdx = null
const animationDuration = 5000
const targettedWidth = 250

//get from local storage
const storedIndex = localStorage.getItem('selectedProgressBarIndex');

if (storedIndex !== null) {
  const selectedProgressBar = document.querySelector(`#progs[data-color-index="${storedIndex}"]`);

  if (selectedProgressBar) {
    cloneNodeIdx = storedIndex; /// index value --------
    cloneNode = selectedProgressBar.cloneNode(true);
    cloneNode.removeAttribute('id');
    cloneNode.classList.add('w-4/5');
    ProgsPreview.appendChild(cloneNode);

    startAnimation();
  }
}


window.addEventListener('message', (event) => {
  let data = event.data;
  if (data.type === 'StartProgressBar') {
    if (cloneNode) {
      startAnimation();
    }    
  } else if (data.type === 'ConfigureProgressBar') {
      let configBar = document.getElementById('menu-container');
      configBar.style.display = 'block';
  } else if (data.type === 'SetProgressBar') {

    /// Update here 
      document.getElementById('prog-preview').textContent = data.text;
      document.getElementById('prog-preview').style.backgroundColor =
          data.color;
  }
});


function startAnimation() {
  const progbarElement = document.getElementById("progbar");
  progbarElement.innerHTML = "";

  if (cloneNode) {
    const clonedProgbar = cloneNode.cloneNode(true);
    clonedProgbar.removeAttribute('id');
    clonedProgbar.classList.add('w-4/5');
    progbarElement.appendChild(clonedProgbar);

    switch (parseInt(cloneNodeIdx)) {
      case 1:
        animateProgressBarType1(clonedProgbar);
        break;
      case 2:
        animateProgressBarType2(clonedProgbar);
        break;
      case 3:
        animateProgressBarType3(clonedProgbar);
        break;
      case 4:
        animateProgressBarType4(clonedProgbar);
        break;
      case 5:
        animateProgressBarType5(clonedProgbar);
        break;
      default:
        break;
    }
  }
}

function animateProgressBarType1(progressBar) {
  const bar = progressBar.querySelector(".bar");
  let currentWidth = 0;
  const targetWidth = 100;
  const increment = (targetWidth - currentWidth) / (animationDuration / 10);

  const loadingNum = document.createElement("div");
  loadingNum.classList.add("GTA", "text-2xl", "loadingNum", "self-center");
  bar.appendChild(loadingNum);

  const interval = setInterval(() => {
    currentWidth += increment;
    bar.style.width = `${currentWidth}%`;
    loadingNum.innerText = parseInt((currentWidth * 100) / targetWidth);

    if (currentWidth >= targetWidth) {
      clearInterval(interval);
    }
  }, 10);
}


function animateProgressBarType2(progressBar) {
  const bar = progressBar.querySelector(".bar");
  let currentWidth = 0;
  const targetWidth = 100;
  const increment = (targetWidth - currentWidth) / (animationDuration / 10);

  const loadingNum = document.createElement("div");
  loadingNum.classList.add("GTA", "text-2xl", "loadingNum", "self-center");
  bar.appendChild(loadingNum);
  const interval = setInterval(() => {
    currentWidth += increment;
    bar.style.width = `${currentWidth}%`;
    loadingNum.innerText = parseInt((currentWidth * 100) / targetWidth);

    if (currentWidth >= targetWidth) {
      clearInterval(interval);
    }
  }, 10);
}

function animateProgressBarType3(progressBar) {
  let target = 500
  const circle = progressBar.querySelectorAll(".radial-1")[0]
  const loadingNum = progressBar.querySelectorAll(".percentage-num")[0]
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

function animateProgressBarType4(progressBar) {
  let target = 500
  const circle = progressBar.querySelectorAll(".radial-2")[0]
  const loadingNum = progressBar.querySelectorAll(".percentage-num")[0]
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

function animateProgressBarType5(progressBar) {
  const targetWidth = 100
  let currentWidth = 0
  const currentElement = progressBar.querySelectorAll(".range")[0]
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


function apply() {
  if (cloneNode) {
    const selectedProgressBarIndex = cloneNodeIdx;
    localStorage.setItem('selectedProgressBarIndex', selectedProgressBarIndex);

    const selectedData = {
      selectedProgressBarIndex: selectedProgressBarIndex,
    };

    axios.post(`https://${GetParentResourceName()}/StoreConfigData`, {
      selectedData: selectedData,
    })
      .then(response => {
        console.log('POST request successful', response);
      })
      .catch(error => {
        console.error('Error during POST request', error);
      });
  } else {
    alert('Please select a progress bar before applying.');
  }
}

function Cancel() {
  let editProgDiv = document.getElementById('menu-container');
  editProgDiv.style.display = 'none';

  axios.post(`https://${GetParentResourceName()}/StoreConfigData`)
    .then(response => {
      console.log('POST request successful', response);
    })
    .catch(error => {
      console.error('Error during POST request', error);
    });
}



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

    if (parseInt(cloneNodeIdx) == 1) {
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

    if (parseInt(cloneNodeIdx) == 2) {
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
      loadingNum.classList.add("GTA", "text-2xl", "loadingNum", "self-center");
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

    if (parseInt(cloneNodeIdx) == 3) {
      let target = 500
      const circle = cloneNode.querySelectorAll(".radial-1")[0]

      const loadingNum = cloneNode.querySelectorAll(".percentage-num")[0]
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

    if (parseInt(cloneNodeIdx) == 4) {
      let target = 500
      const circle = cloneNode.querySelectorAll(".radial-2")[0]
      const loadingNum = cloneNode.querySelectorAll(".percentage-num")[0]
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

    if (parseInt(cloneNodeIdx) == 5) {
      const targetWidth = 100
      let currentWidth = 0
      const currentElement = cloneNode.querySelectorAll(".range")[0]
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