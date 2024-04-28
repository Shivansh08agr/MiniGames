// x=1, O=0;
let lastChance= 1;
let draw = true;
let x=[];
let c=[];
const Wmsg= document.querySelector(".winning-message");
const msg= document.querySelector(".msg");
const winning_combo= [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7]
];

const boxes= document.querySelectorAll(".cell");
boxes.forEach(box=>box.addEventListener("click", addClass));

function addClass(e){
  if(draw == false) return;
  const box= e.target; //very imp to do...to e.target is triggered
  if(lastChance==1){
    box.innerHTML= `<img src="../Tic Tac Toe/img/cross.png">`
    lastChance=0;
    box.classList.add("cross");
    x.push(box.dataset.no);
    x.sort();
    let xWon = false;
    for (let i = 0; i < winning_combo.length; i++) {
      const element = winning_combo[i];
      let count=0;
      let p1=0, p2=0;
      while(p1 < element.length && p2 < x.length) {
        if(element[p1] == x[p2]) {
          p1++;
          p2++;
          count++;
        }
        else if(element[p1] > x[p2]) p2++;
        else p1++;
      }

      if(count == 3) {
        xWon = true;
        draw= false;
        Wmsg.classList.add("show");
        msg.textContent= "Player A Won";
        break;
      }
    }
  }
  else{
    box.innerHTML= `<img src="../Tic Tac Toe/img/circle.png">`
    lastChance=1;
    box.classList.add("circle");
    c.push(box.dataset.no);
    console.log(c);
    c.sort();
    let oWon = false;
    for (let i = 0; i < winning_combo.length; i++) {
      const element = winning_combo[i];
      let count=0;
      let p1=0, p2=0;
      while(p1 < element.length && p2 < c.length) {
        if(element[p1] == c[p2]) {
          p1++;
          p2++;
          count++;
        }
        else if(element[p1] > c[p2]) p2++;
        else p1++;
      }

      if(count == 3) {
        oWon = true;
        draw= false;
        Wmsg.classList.add("show");
        msg.textContent= "Player B Won";
        break;
      }
    }
  }
  if(draw==true && x.length==5 && c.length==4){
    draw= false;
    Wmsg.classList.add("show");
    msg.textContent= "Match Drawn";
  }
}
const restart= document.querySelector("#restartButton");
restart.addEventListener("click", ()=>{
  setTimeout(()=>{
    location.reload();
}, 90);
})