const ProgsPreview = document.getElementById("prog-preview")
const ProgressBar = document.querySelectorAll("#progs")
let cloneNode = null
let cloneNodeIdx = null
let progressId = null
const animationDuration = 5000
const targettedWidth = 250
const bars = document.querySelectorAll('.bar');
const progress = document.querySelectorAll('.progress');
const storedIndex = localStorage.getItem('selectedProgressBarIndex');

if (storedIndex !== null) {
  const selectedProgressBar = document.querySelector(`#progs[data-bar-index="${storedIndex}"]`);
  if (selectedProgressBar) {
    progressId = storedIndex;
    cloneNode = selectedProgressBar.cloneNode(true);
    cloneNodeIdx = selectedProgressBar.getAttribute('data-color-index');
    cloneNode.removeAttribute('id');
    cloneNode.classList.add('w-4/5');
    ProgsPreview.appendChild(cloneNode);
    // Delay the start of animation
    setTimeout(() => startAnimation(), 100);
  }
}


window.addEventListener('message', (event) => {
  let data = event.data;
  if (data.type === 'StartProgressBar') {
    if (cloneNode) {
      startAnimation() 
    }
  } else if (data.type === 'ConfigureProgressBar') {
    let configBar = document.getElementById('menu-container');
    configBar.style.display = 'block';
  } else if (data.type === 'SetProgressBar') {
    document.getElementById('prog-preview').textContent = data.text;
    document.getElementById('prog-preview').style.backgroundColor = data.color;
  }
});


function startAnimation() {
  const progbarElement = document.getElementById("progbar");
  progbarElement.innerHTML = "";
  const ProgDuration = 10000

  if (cloneNode) {
    const clonedProgbar = cloneNode.cloneNode(true);
    clonedProgbar.removeAttribute('id');
    clonedProgbar.classList.add('w-4/5');
    progbarElement.appendChild(clonedProgbar);

    switch (parseInt(cloneNodeIdx)) {
      case 1: ProgressTheme1(clonedProgbar, ProgDuration); break;
      case 2: ProgressTheme2(clonedProgbar, ProgDuration, "radial-1", "radial-none-1"); break;
      case 3: ProgressTheme2(clonedProgbar, ProgDuration, "radial-2", "radial-none-2"); break;
      case 4: ProgressTheme3(clonedProgbar, ProgDuration); break;
    }
  }
}

ProgressBar.forEach((Prog) => {

  Prog.addEventListener('click', (e) => {
    cloneNodeIdx = Prog.getAttribute('data-color-index');
    progressId = Prog.getAttribute('data-bar-index');
    if (cloneNode) {
      ProgsPreview.removeChild(cloneNode)
    }
    cloneNode = Prog.cloneNode(true)
    cloneNode.removeAttribute("id")

    cloneNode.classList.add("w-4/5")
    ProgsPreview.appendChild(cloneNode)

    console.log(cloneNodeIdx, cloneNode, animationDuration);

    switch (parseInt(cloneNodeIdx)) {
      case 1: ProgressTheme1(cloneNode, animationDuration); break;
      case 2: ProgressTheme2(cloneNode, animationDuration, "radial-1", "radial-none-1"); break;
      case 3: ProgressTheme2(cloneNode, animationDuration, "radial-2", "radial-none-2"); break;
      case 4: ProgressTheme3(cloneNode, animationDuration); break;
    }
  })
})


const ProgressTheme1 = (ProgressNode, duration) => {
  const target = 90
  let start = 0
  const progressbar = ProgressNode.querySelectorAll("progress")[0]
  const container = ProgressNode.querySelectorAll(".progress")[0]

  progressbar.classList.remove("p1"); progressbar.classList.add("p1-none")
  progressbar.style.width = `${start}%`

  const counter = document.createElement('div')
  container.appendChild(counter)
  container.classList.add("GTA", "text-2xl", "mt-2")

  let increment = (target - start) / (duration / 10)

  let interval = setInterval(() => {
    start += increment
    progressbar.style.width = `${start}%`
    counter.innerText = parseInt(start + 10)
    if (start > target) {
      clearInterval(interval)
    }
  }, 10)
}


const ProgressTheme2 = (ProgressNode, duration, radial, radial_none) => {
  let target = 500
  const circle = ProgressNode.querySelectorAll("circle")[0]
  const innerElement = ProgressNode.querySelectorAll(".inner")[0]
  ProgressNode.querySelectorAll(".percentage-num")[0].innerText = ''
  const loadingNum = document.createElement("div")
  loadingNum.classList.add("self-center", "GTA", "text-2xl")

  innerElement.appendChild(loadingNum)

  circle.classList.remove(radial)
  circle.classList.add(radial_none)
  circle.style.strokeDashoffset = 500

  let increment = (target - 250) / (duration / 10)
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

const ProgressTheme3 = (ProgressNode, duration) => {
  const target = 100
  let start = 0
  const currentElement = ProgressNode.querySelectorAll(".range")[0]
  currentElement.classList.remove("range")
  currentElement.classList.add("range-none")
  currentElement.setAttribute("style", `--p:${start}`)
  let increment = (target - start) / (duration / 10)

  let interval = setInterval(() => {
    start += increment
    currentElement.setAttribute("style", `--p:${parseInt(start)}`)
    if (start >= target) {
      clearInterval(interval)
    }

  }, 10)
}

function apply() {
  if (cloneNode) {
    const selectedProgressBarIndex = progressId;
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

bars.forEach((bar, index) => {
  const randomWidth = Math.floor((Math.random() * 65) + 10);
  bar.style.width = `${randomWidth}%`;
  progress[index].addEventListener('mouseover', () => {
    const randomTiming = Math.floor((Math.random() * 2) + 2);
    bar.style.transitionDuration = `${randomTiming}s`;
    bar.style.width = '100%';
  });
})
