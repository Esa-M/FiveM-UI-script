

const ProgsPreview = document.getElementById("prog-preview")
const ProgressBar = document.querySelectorAll("#progs")
let cloneNode = null
let cloneNodeIdx  = null




const targettedWidth = 100



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
        


        if(parseInt(cloneNodeIdx) == 0){
           

            const progressBarRandomTime ={
              zero : 20,
            }
            let bar = cloneNode.querySelectorAll(".bar")
            let progress = cloneNode.querySelectorAll(".progress")

            bar = bar[0] , progress = progress[0]
            bar.style.width = `${progressBarRandomTime.zero}%`
            progress.style.backgroundColor = "transparent"
            const animationDuration = 20000

            let increment = (targettedWidth - progressBarRandomTime.zero ) / ( animationDuration / 10 )

            let interval = setInterval(()=>{
              progressBarRandomTime.zero += increment
              bar.style.width = `${progressBarRandomTime.zero}%`
              

              if( progressBarRandomTime.zero >= targettedWidth){
                clearInterval(interval)
              }

            }, 10)
          
        }

        if(parseInt(cloneNodeIdx) == 1){
           

          const progressBarRandomTime ={
            zero : 20,
          }
          let bar = cloneNode.querySelectorAll(".bar")
          let progress = cloneNode.querySelectorAll(".progress")

          bar = bar[0] , progress = progress[0]
          bar.style.width = `${progressBarRandomTime.zero}%`
          progress.style.height ='h-16'
          progress.style.backgroundColor = "transparent"

          const animationDuration = 20000

          let increment = (targettedWidth - progressBarRandomTime.zero ) / ( animationDuration / 10 )

          let interval = setInterval(()=>{
            progressBarRandomTime.zero += increment
            bar.style.width = `${progressBarRandomTime.zero}%`
            

            if( progressBarRandomTime.zero >= targettedWidth){
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