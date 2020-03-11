const cards = document.querySelectorAll('.memory-card');
const restartGameButton = document.getElementById('restart');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let countMatchedFlips = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch(){
    // matching cards 
    if (firstCard.dataset.framework === 
        secondCard.dataset.framework) {
            countMatchedFlips++;
            completedMatchedCard();
            disableCards();
            console.log('matched')
        } else {
            //no match
            unflipCards();
        }
}


function enableCards(){
    for(let i = 0; i < cards.length;i++){
        cards[i].addEventListener('click', flipCard);
    }
        
}


function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard ();
}


function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);     // matched 
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

function restartGame(){

    for(let i = 0; i < cards.length;i++){
    cards[i].classList.remove('flip');
    enableCards();
    gameOverScreenOff();
}
}

cards.forEach(card => card.addEventListener('click', flipCard));

restartGameButton.addEventListener('click', restartGame);




function completedMatchedCard(){
    if(countMatchedFlips === 8){
        gameOverScreenOn();
    } return;
}


function gameOverScreenOn() {
    document.getElementById("overlay").style.display = "flex";
}
function gameOverScreenOff() {
    document.getElementById("overlay").style.display = "none";
}