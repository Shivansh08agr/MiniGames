const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let score = 0;

document.querySelector(".score").textContent = score;

fetch("tile.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });


function shuffleCards() {
  let currentIndex = cards.length;
  while (currentIndex) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex --;
    let temp = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temp;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
    <div class="front">
    <img src= "${card.image}" class="front-image"> </img>
    </div>
    <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard(){
    if(firstCard===this) return;
    this.classList.add("flipped");
    if(!firstCard){
        firstCard=this;
        return;
    }
    secondCard=this;
    checkTheMatch();
}

function checkTheMatch(){
    if(firstCard.dataset.name===secondCard.dataset.name){
        score+=10;
        document.querySelector(".score").textContent = score;
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        firstCard=null;
        secondCard=null;
    }
    else{
        setTimeout(()=>{
        firstCard.classList.remove("flipped")
        secondCard.classList.remove("flipped")
        firstCard=null;
        secondCard=null;
    }, 500)  
    }
}

const restart= document.querySelector(".restart");
restart.addEventListener("click", Restart);
function Restart(){
    firstCard=null;
    secondCard=null;
    shuffleCards();
    score=0;
    document.querySelector(".score").textContent = score;
    gridContainer.innerHTML="";
    generateCards();
}