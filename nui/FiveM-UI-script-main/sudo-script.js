

const ProgsPreview = document.getElementById("prog-preview")
const ProgressBar = document.querySelectorAll("#progs")
let cloneNode = null
let cloneNodeIdx  = null


// overall progress bar animation duration depends on the below const variable animationDuration
const animationDuration = 5000
const targettedWidth = 250

const bars = document.querySelectorAll('.bar');
const progress = document.querySelectorAll('.progress');


ProgressBar.forEach((Prog)=>{
    
  Prog.addEventListener('click', (e)=>{
       cloneNodeIdx = Prog.getAttribute('data-color-index');
      if(cloneNode){
          ProgsPreview.removeChild(cloneNode)
      }
      cloneNode = Prog.cloneNode(true)
      cloneNode.removeAttribute("id")

      cloneNode.classList.add("w-4/5")
      ProgsPreview.appendChild(cloneNode)
      
      
      switch(parseInt(cloneNodeIdx)){
        case 1 : ProgressTheme1(cloneNode);  break;
        case 2 : ProgressTheme2(cloneNode, "radial-1", "radial-none");  break;
        case 3 : ProgressTheme2(cloneNode, "radial-2", "radial-none-2");  break;
        case 4 : ProgressTheme3(cloneNode);  break;
      }

    
       
  })
})

bars.forEach((bar, index) => {
  const randomWidth = Math.floor((Math.random() * 65) + 10);
  bar.style.width = `${randomWidth}%`;

  progress[index].addEventListener('mouseover', () => {
    const randomTiming = Math.floor((Math.random() * 2) + 2);
    
    bar.style.transitionDuration = `${randomTiming}s`;
    bar.style.width = '100%';
  });
})



// changed separated functions for animation as of now it only needs these 3 functions

const ProgressTheme1 = (ProgressNode) => {
  const target = 90
  let start = 0
  const progressbar = ProgressNode.querySelectorAll("progress")[0]
  const container = ProgressNode.querySelectorAll(".progress")[0]
  
  progressbar.classList.remove("p1") ; progressbar.classList.add("p1-none")
  progressbar.style.width = `${start}%`

  const counter = document.createElement('div')
  container.appendChild(counter)
  container.classList.add("GTA","text-2xl","mt-2")

  let increment = (target - start) / (animationDuration / 10)

  let interval = setInterval(()=>{
    start += increment
    progressbar.style.width = `${start}%`
    counter.innerText = parseInt(start+10)
    if(start > target){
      clearInterval(interval)
    }
  },10)
}


const ProgressTheme2 = (ProgressNode , radial, radial_none) => {
  let target = 500
  const circle = ProgressNode.querySelectorAll("circle")[0]
  const innerElement = ProgressNode.querySelectorAll(".inner")[0]
  ProgressNode.querySelectorAll(".percentage-num")[0].innerText = ''
  const loadingNum = document.createElement("div")
   loadingNum.classList.add("self-center","GTA","text-2xl")
  
  innerElement.appendChild(loadingNum)

  
  circle.classList.remove(radial)
  circle.classList.add(radial_none)
  circle.style.strokeDashoffset = 500

  let increment = ( target  - 250) / (animationDuration / 10)
  let init = 0
  let interval = setInterval(()=>{
    target -= increment
    circle.style.strokeDashoffset = target
    init = init + increment
    loadingNum.innerText = parseInt(( init * 100 ) / 250)
   if( target <= 250){
        clearInterval(interval)
   }
  }, 10)
}

const ProgressTheme3 = (ProgressNode) => {
  const target = 100
  let start = 0
 
  const currentElement = ProgressNode.querySelectorAll(".range")[0]
  currentElement.classList.remove("range")
  currentElement.classList.add("range-none")

  currentElement.setAttribute("style", `--p:${start}`)

  let increment = (target - start) / ( animationDuration / 10)

  let interval = setInterval(()=>{

    start += increment
    currentElement.setAttribute("style", `--p:${parseInt(start)}`)

    if(start >= target){
      clearInterval(interval)
    }

  },10)
}