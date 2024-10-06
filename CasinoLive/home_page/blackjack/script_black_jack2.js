printSaldo('#saldoFake',0,1);
printSaldo('#saldo',0,1);
attivaNavbar('username','black-jack',1);

const colLogOut= document.querySelector('.navCas-col7');
const logOutIcon=document.querySelector('.nav-log-out');
colLogOut.addEventListener('mouseenter', function() {
  logOutIcon.style.backgroundImage ="url(/CasinoLive/image/icon-log-out2.gif)";
});

colLogOut.addEventListener('mouseleave', function() {
  logOutIcon.style.backgroundImage ="url(/CasinoLive/image/icon-log-out2.png)";
});


////////////////////////////////////"media query"
let widthPlayer=0;
let widthPlayer1=0;
let widthDealer=0;

const tavoloPlayerSpace=document.querySelector('#player-area');
const divPadreChipsLaptop = document.getElementById('chipsCtnLargeDevices');
const divPadreChipsDevices = document.getElementById('chipsCtnSmallDevices');
const divFiglioChips = document.getElementById("chips");
const tavoloGioco= document.getElementById('tavoloDaGioco');
const tavoloGameDeck = document.getElementById('gameDeck');
const tavoloDealerSpace=document.getElementById('dealer-area');
const descrizioneDeck=document.getElementById("deckCarteRestantiDescrizione");
const playerSpace=document.querySelector('.player-cards-ctn');
const totalGameInterface=document.querySelector('#gameInterfaceArea');

document.addEventListener("DOMContentLoaded", function(){inizializzazioneDivDeck();});
document.addEventListener("DOMContentLoaded", function(){inizializzazioneDivChips();});
window.addEventListener('resize', function(){spostaDivDeck();});
window.addEventListener('resize', function(){spostaDivChips();});
window.addEventListener('resize', function(){resizeGame();});
document.firstElementChild.style.zoom = "reset";
/*
document.addEventListener('touchmove', function(event) {
  event = event.originalEvent || event;
  if(event.scale > 1) {
    event.preventDefault();
  }
}, false);*/

function inizializzazioneDivDeck(){
  if (window.innerWidth <= 530 ||window.innerHeight<=530) {
    var temp = tavoloGioco.removeChild(tavoloDealerSpace);
    tavoloGioco.insertBefore(temp, tavoloGameDeck);
} } 


function spostaDivDeck() {
  if (window.innerWidth <= 530 ||window.innerHeight<=530) {
    descrizioneDeck.innerHTML="";
    var temp1 = tavoloGioco.removeChild(tavoloDealerSpace);
    tavoloGioco.insertBefore(temp1, tavoloGameDeck);
  }  
  else {
    descrizioneDeck.innerHTML="Carte nel <br> mazzo";
    var temp2 = tavoloGioco.removeChild(tavoloGameDeck);
    tavoloGioco.insertBefore(temp2, tavoloDealerSpace);
} }




function inizializzazioneDivChips(){
  if (window.innerWidth <= 530) {
    divFiglioChips.classList.add('chip-container-orizzontale');
    divPadreChipsDevices.appendChild(divFiglioChips);
  } else {
    divFiglioChips.classList.add('chip-container-verticale');
    divPadreChipsLaptop.appendChild(divFiglioChips);
} }

function spostaDivChips() {

  if (window.innerWidth <= 530) {
    if(divFiglioChips.classList.contains('chip-container-verticale')){
      divFiglioChips.classList.remove('chip-container-verticale');
      divFiglioChips.classList.add('chip-container-orizzontale');
      divPadreChipsDevices.appendChild(divFiglioChips);
  } } 
  else {
    if(divFiglioChips.classList.contains('chip-container-orizzontale')){
      divFiglioChips.classList.remove('chip-container-orizzontale');
      divFiglioChips.classList.add('chip-container-verticale');
      divPadreChipsLaptop.appendChild(divFiglioChips);
} } }


function resizeGame(){                                       //int = 0 se si mette nell' event listner , int=1 se chiamata da UpdateUI
  tavoloWeight=tavoloPlayerSpace.clientWidth
  let CardsElement;
  if(widthPlayer>=tavoloWeight){
    CardsElement=document.getElementById("player-cards");
    CardsElement.style.justifyContent="flex-start";
  }
  if(widthPlayer<tavoloWeight){
    CardsElement=document.getElementById("player-cards");
    CardsElement.style.justifyContent="center";
  }
  if(widthPlayer1>=tavoloWeight){
    CardsElement=document.getElementById("new-cards");
    CardsElement.style.justifyContent="flex-start";
  }
  if(widthPlayer1<tavoloWeight ){
    CardsElement=document.getElementById("new-cards");
    CardsElement.style.justifyContent="center";
  }
  if(widthDealer>=tavoloWeight){
    CardsElement= document.getElementById("dealer-cards");
    CardsElement.style.justifyContent="flex-start";
  } 
  if(widthDealer<tavoloWeight ){
    CardsElement= document.getElementById("dealer-cards");
    CardsElement.style.justifyContent="center";
  } 
  return;
}



////////////////////////////////////////////////////////////////



let DEBUG=false;
// Dichiarazione delle variabili
/*const divPadreChipsLaptop = document.getElementById('chipsCtnLargeDevices');
const divPadreChipsDevices = document.getElementById('chipsCtnSmallDevices');
const divFiglioChips = document.getElementById("chips");
const tavoloGioco= document.getElementById('tavoloDaGioco');
const tavoloGameDeck = document.getElementById('gameDeck');
const tavoloDealerSpace=document.getElementById('dealer-area');
const descrizioneDeck=document.getElementById("deckCarteRestantiDescrizione");*/
const puntata=document.getElementById('bet');
const saldo=document.getElementById('saldo');
const saldoInterface= document.getElementById('saldoFake');
const insurance=document.getElementById('insurance');
const insurancePlaceHolder=document.getElementById('insurancePlaceHolder');
const messageElement = document.getElementById("message");
const resultInterface= document.getElementById("resultInterface");
const moneyInterface= document.getElementById("moneyInterface");
const betContainer= document.getElementById("betContainer");
const saldoContainer= document.getElementById("saldoContainer");
const carteDelGiocatore = document.getElementById("player-cards");
const userRow1=document.getElementById("userRow1");
const userRow2=document.getElementById("userRow2");

const infoUser=document.querySelector('#infoUser');
const infoCtn=document.querySelector('.info-user-ctn');
const buttons = document.querySelectorAll('button:not(#insChoice)');


let wasChipLarge=false;
function infoIns(){
  totalGameInterface.style.alignItems='center';
  totalGameInterface.style.justifyContent='center';
  if(divPadreChipsLaptop.style.display!='none'){
    wasChipLarge=true;
  }
  divPadreChipsLaptop.style.display='none';
  tavoloGioco.style.display="none";
  infoCtn.style.display="block";
  infoUser.innerHTML="Devi decidere se assicurare o meno la partita per proseguire";
  setTimeout(function(){ //se sbagli a mettere il parametro rimane display=none
    if(wasChipLarge)
      divPadreChipsLaptop.style.display='block';
    infoCtn.style.display="none";
    tavoloGioco.style.display="flex";
    totalGameInterface.style.alignItems='stretch';
    totalGameInterface.style.justifyContent='space-between';
    wasChipLarge=false;
  },2000);
}

function printInfo(str){
  if(str==='bet'){
    totalGameInterface.style.alignItems='center';
    totalGameInterface.style.justifyContent='center';
    tavoloGioco.style.display="none";
    infoCtn.style.display="block";
    infoUser.innerHTML="Devi scommettere per giocare";
    if(divPadreChipsLaptop.style.display!='none'){
      wasChipLarge=true;
    }
    divPadreChipsLaptop.style.display='none';
    setTimeout(function(){
      if(wasChipLarge)
        divPadreChipsLaptop.style.display='block';
      infoCtn.style.display="none";
      tavoloGioco.style.display="flex";
      totalGameInterface.style.alignItems='stretch';
      totalGameInterface.style.justifyContent='space-between';
      wasChipLarge=true;
    },2000);
  }
  else if(str==='insurance'){
    doubleDownButton.disabled=false;
    hitButton.disabled=false;
    standButton.disabled=false;
    newGameButton.disabled=false;
  
    hitButton.removeEventListener("click", playerHit);
    standButton.removeEventListener("click", playerStand);
    newGameButton.removeEventListener("click", startNewGame);
    doubleDownButton.removeEventListener("click",doubleDown);
  
    doubleDownButton.classList.add('fake-disabled');
    hitButton.classList.add('fake-disabled');
    standButton.classList.add('fake-disabled');
    newGameButton.classList.add('fake-disabled');

    buttons.forEach((button) => {
      button.addEventListener('click', infoIns);
    });
  }
}



let splitButton=document.getElementById('split-button');
let doubleDownButton = document.getElementById("double-down-button");
let newGameButton = document.getElementById("new-game-button");
let standButton = document.getElementById("stand-button");
let hitButton = document.getElementById("hit-button");
let annullaButtom= document.getElementById('annullaUltimaChip');

const split_timeout=4000;
let dealerHasFinished=false;
var isNewDeck=false;
var bet2;
let firstBet;
var split=false;
var choosing=false;
var doubledown=false;
var betValue=0;
var dealerScore = 0;
var playerScore = 0;
var dealerHand = [];
let dealerHandSet=new Set();
var playerHand = [];
let playerHandSet=new Set();
var newHand=[];
let newHandSet=new Set();
var lastBet=0;
var lastBets=new Array();
var gameOver = false;
var dealerTurn = false;
var betting=true;
var have_splitted=false;
var dealerBlackJack=false;

// Creazione del mazzo di carte
var deck = [];

var suits = ["hearts", "diamonds", "clubs", "spades"];
var ranks = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];

splitButton.disabled=true;
newGameButton.classList.add('fake-disabled');
doubleDownButton.disabled=true;
hitButton.disabled=true;
standButton.disabled=true;


let show_istruzioni=false;      //serve per far in modo che se riclicco sulla navbar spariscono le istruzioni 


$('.navCas-col5').click(function(){
  if(show_istruzioni){
    $('.game-container').css('display','flex');
    $('#istruzioniCtn').css('display','none');
    show_istruzioni=false; 
  }
  else{
    $('.game-container').css('display','none');
    $('#istruzioniCtn').css('display','block');
    show_istruzioni=true; 
    printUsername('#istr-name',2);
  }
});

$('.close-istruzioni').click(function(){
  if(show_istruzioni){
    $('.game-container').css('display','flex');
    $('#istruzioniCtn').css('display','none');
    show_istruzioni=false; 
  }
});




//const insurance=document.getElementById('insurance');
//const insurancePlaceHolder=document.getElementById('insurancePlaceHolder');
//////////////////////////////////////////////////////assicurazione
function insuranceSpawn() {
  let insurance_code=
  '<div id="insuranceInMessage" class="ins-in-mess-ctn"  >'+
    '<div class="ins-in-mess-interface">'+
      'Assicura puntata'+
      '<button class="btn-custom"  onclick="insuranceChoice(true)">Si</button>'+
      '<button class="btn-custom" onclick="insuranceChoice(false)">No</button>'+
    '</div>'+
  '</div>';
  //lo facciamo da codice perche non siamo sicuri della struttura finale della pag html

  let dim=dimensioniFinestra();
  if((dim.altezza<=310)&&(dim.larghezza<=250) ){
    divPadreChipsDevices.style.display='none';
    userRow2.style.display='flex';
  }
  //se entrambe le cose sono vere è vero anche il prossimo if, stampa lui 
  //se la dim <=250 il place holder non c'è da css
  if(dim.larghezza<=350){
    messageElement.innerHTML=insurance_code;
  }
  else{
    insurancePlaceHolder.hidden=true;
    insurance.hidden = false;
  }
  doubleDownButton.disabled=true;
  hitButton.disabled=true;
  standButton.disabled=true;
  printInfo('insurance');   //sta in questo file
}

function insuranceChoice(scelta) {
  doubleDownButton.disabled=true;
  hitButton.disabled=true;
  standButton.disabled=true;
  newGameButton.disabled=true;
  
  totalGameInterface.style.alignItems='stretch';
  totalGameInterface.style.justifyContent='space-between';

  doubleDownButton.classList.remove('fake-disabled');
  hitButton.classList.remove('fake-disabled');
  standButton.classList.remove('fake-disabled');
  newGameButton.classList.remove('fake-disabled');

  hitButton.addEventListener("click", playerHit);
  standButton.addEventListener("click", playerStand);
  newGameButton.addEventListener("click", startNewGame);
  doubleDownButton.addEventListener("click",doubleDown);

  buttons.forEach((button)=>{
    button.removeEventListener('click', infoIns);
  });

  let dim=dimensioniFinestra();
  //se la dimensione della finestra ì <=250 semplicemente verrà sovrascritto il contenuto di messageelement
  if((dim.altezza<=310)&&(dim.larghezza<=250) ){
    divPadreChipsDevices.style.display='flex';
    userRow2.style.display='none';
  }
  else if(dim.larghezza>350){
    insurance.hidden = true;
    insurancePlaceHolder.hidden=false;
  }
  else{
    if(scelta){
      messageElement.innerHTML="Hai scelto di assicurare la puntata";
    }
    else{
      messageElement.innerHTML="Non hai assicurato la puntata";
    }
  }
  choosing=false;

  if (scelta) {
   // console.log("L'utente ha selezionato Sì.");

    if (dealerBlackJack) {
      dealerTurn=true;
      pagaBet(betValue);
      updateScores(dealerHand);
      updateUI(dealerHand);
      messageElement.innerHTML='Il banco ha blackjack, l\'assicurazione paga!';
      messageElement.innerHTML+=' Non hai perso nulla!';

      textAnimation(resultInterface);
      boxShadowAnimation(resultInterface);
      betting=true;
      puntata.innerHTML=0;
      scrollPos('down',$('.money-int-scroll'));
      textAnimation(betContainer);
      boxShadowAnimation(moneyInterface);
      betValue=0;
      newGameButton.disabled=false;
      return;
    }
    else {
      pagaBet(betValue/(-2));
      messageElement.innerHTML='Assicurazione persa!';
      messageElement.innerHTML+=' persi: '+(betValue/(2)).toFixed(2)+'!';
      boxShadowAnimation(resultInterface);
    }

  } else {
  //  console.log("L'utente ha selezionato No.");
  }
  hitButton.disabled=false;
  standButton.disabled=false;
  if(parseFloat(saldoFake.innerText)>=betValue) {
    doubleDownButton.disabled=false;
    if (playerHand[0].value==playerHand[1].value)
      splitButton.disabled=false;
  }
}


function drawCard(hand) {
//  console.log('prova')

  let deck_card=$("#first-deck-card");
  let last_card;
  updateScores(hand);
  updateUI(hand);

  if (JSON.stringify(hand)==JSON.stringify(newHand))
    last_card=$('#new-cards #last-card');
  
  else if (JSON.stringify(hand)==JSON.stringify(dealerHand))
    last_card=$('#dealer-cards #last-card');
  else last_card=$('#player-cards #last-card');
  //console.log(deck_card);
  deck_card.fadeOut(1000);
  last_card.fadeIn(1000);
  setTimeout(print_deck,1000);
}

///////////////////////////////////////////////////////////////////////////////////////////split
function splitHand() {
  hitButton.disabled=true;
  standButton.disabled=true;
  doubleDownButton.disabled=true;
  playerSpace.style.boxShadow="inset 0 0 5px grey";
  
  messageElement.innerHTML='Stai Gicando la prima mano!';
  boxShadowAnimation(resultInterface);
  splitButton.disabled=true;
  split=true;
  newHand.push(playerHand.pop());
  bet2=betValue;                                    //ora serve solo a settare la puntata a schermo, ovvimanet per la seocnda mano non puoi puntar enmeno della prima
  puntata.innerHTML=(bet2+betValue);
  textAnimation(betContainer);
  scrollPos('down',$('.money-int-scroll'));
  boxShadowAnimation(moneyInterface);
  //animazione per le scritte
  pagaBet(-betValue);                                         //pago una partita
  
  playerHand.push(deck.pop());
  drawCard(playerHand);
  setTimeout(function() {
  newHand.push(deck.pop());
  drawCard(newHand);
  },1000);
  setTimeout(function() {
  hitButton.disabled=false;
  standButton.disabled=false;
  if (parseFloat(saldoFake.innerText)>=betValue)
    doubleDownButton.disabled=false;
  updateScores(playerHand);
  },2000);
}



function playNewHand() {
  if (!have_splitted) { 
    function getHandReady() {                                                             // all' inzio è hav_splitted= false
      carteDelGiocatore.style.display="none";
      //console.log(saldo.innerText);
      messageElement.innerHTML='Stai Giocando la seconda mano!';
      boxShadowAnimation(resultInterface);
      updateScores(newHand);//aggiornano il punteggio per la seconda mano
      doubledown= true;
      if (parseFloat(saldoFake.innerText)>=bet2)
        doubleDownButton.disabled=false;
      hitButton.disabled=false;
      standButton.disabled=false;
   // console.log(betValue,bet2);
      firstBet=betValue;
      betValue=bet2;
      have_splitted=true;
    }
    if(playerScore>21) setTimeout(getHandReady,1000);
    else getHandReady();

  }
  else if(have_splitted){
    hitButton.disabled=true;
    standButton.disabled=true;
    carteDelGiocatore.style.display="flex";
    bet2=betValue;
    betValue=firstBet;
   // console.log(saldo.innerText,betValue,bet2);
    split=false;
    updateScores(playerHand);
    if (playerScore==21 && playerHand.length==2 && !dealerBlackJack){
      pagaBet(betValue*(5/2));
      messageElement.innerHTML = "Il giocatore vince la prima mano! BlackJack!";
      messageElement.innerHTML+=' Vinti: '+(betValue*(5/2)).toFixed(2)+'!';

      animVittoria(playerHandSet);
      animSconfitta(dealerHandSet);
      boxShadowAnimation(resultInterface);
      betValue=0;
    }
    /*
    console.log(bet2);
    console.log(betValue);
    console.log(newHand);
    console.log(playerHand);
    */
    let prova=dealerPlay(playerHand);
    console.log(prova);
    boxShadowAnimation(resultInterface);
    //aggiornamento stili
    let hasFinishedDealer=setInterval(()=> {
      if (dealerHasFinished) {
        dealerHasFinished=false;
        setTimeout(()=> {
          updateScores(newHand);
          have_splitted=false;

          if (playerScore==21 && newHand.length==2 && !dealerBlackJack){
            pagaBet(bet2*(5/2));
            messageElement.innerHTML = "Il giocatore vince la seconda mano! BlackJack!";
            messageElement.innerHTML+=' Vinti: '+(bet2*(5/2)).toFixed(2)+'!';
            animVittoria(newHandSet);
            animSconfitta(dealerHandSet);
            boxShadowAnimation(resultInterface);
            betting=true;
            betValue=0;
            puntata.innerHTML=0;
            textAnimation(betContainer);
            scrollPos('down',$('.money-int-scroll'));
            boxShadowAnimation(moneyInterface);
            newHand=[];
            return;
          }
          betValue=bet2;
          checkForGameOver(newHand);
          messageElement.innerHTML+=' Fine della seconda mano!';
          boxShadowAnimation(resultInterface);
          //console.log(saldo.innerText);
          bet2=0;
          newHand=[];
          clearInterval(hasFinishedDealer);
        },4000);
      }
    },1000);
  }
}


//////////////////////////////////////////////////////////////////deck
function newDeck() {
  isNewDeck=true;
  deck=[]
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      let card = {
        suit: suits[i],
        rank: ranks[j],
        value: Math.min(j + 1, 10)
      };
      deck.push(card);
    }
  }
}

// Mischiare il mazzo
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

function print_deck(){
  //stampiamo le carte del deck
  const carteDelDeck = document.getElementById("carteResidue");
  carteDelDeck.innerHTML = "";

  let numCarteDeck= deck.length; 
  const lunghezzaCarteDeck = document.getElementById("deckCarteRestanti");
  lunghezzaCarteDeck.innerHTML="";
  lunghezzaCarteDeck.innerHTML=numCarteDeck;
  
  for (let i = 0; i < numCarteDeck; i++) {
    let cardImageElement = document.createElement("div");
    cardImageElement.classList.add("deck-single-card");
    if (i==0) 
      cardImageElement.setAttribute('id','first-deck-card');
    cardImageSrc = "./images/covered.png";
    cardImageElement.style.backgroundImage = `url(${cardImageSrc})`;
    carteDelDeck.appendChild(cardImageElement);
  }
}




/////////////////////////////////////////////////////////////////// Inizio nuovo gioco
function startNewGame() {
  if (betValue==0) {
    printInfo('bet');
    return;
  }

  //"media query"
  if (window.innerWidth <= 530 &&  !(descrizioneDeck.innerHTML==="")) {
      descrizioneDeck.innerHTML=" ";
  }
  playerSpace.style.boxShadow="inset 0 0 0px grey";
  //
  
  //printInfo('bet');     // la funzine sta in questo file
  //ho problemi perche il bottone è bloccato ogni volta che tocca bettare

  if (gameOver && !choosing) {
   // console.log(saldo.innerText);

   disabilitaAnnullamento();
   newGameButton.disabled=true;
   
    pagaBet(-betValue);
    for (let i=0;i<lastBets.length;i++) lastBets.pop();

    if(deck.length<=20) 
      newDeck();

    //Leva le carte dopo le mani split
    updateUI(newHand);

    betting = false;
    gameOver = false;
    doubledown= true;
    dealerBlackJack=false;
    dealerHasFinished=false;
    dealerTurn=false;

    messageElement.innerHTML = "Inizia il gioco!";
    boxShadowAnimation(resultInterface);

    if (isNewDeck) {
      shuffleDeck();
      isNewDeck=false;
    }

    // Reset del punteggio
    dealerScore = 0;
    playerScore = 0;
    
    // Reset delle carte
    dealerHand = [];
    playerHand = [];

    updateUI(playerHand);
    updateUI(newHand);
    print_deck();
    // Assegnazione delle prime due carte
    
    playerHand.push(deck.pop());
    drawCard(playerHand);
    
    /*
    if(DEBUG){
      playerHand.pop();
      playerHand.push({suit:"clubs",rank:"10",value:10});
      drawCard(playerHand);
    }
    */

    setTimeout(function() {
    dealerHand.push(deck.pop());
    drawCard(dealerHand);
    },700);

    setTimeout(function() {
    playerHand.push(deck.pop());

    /*
    if(DEBUG){
      playerHand.pop();
      playerHand.pop();
      playerHand.push({suit:"hearts",rank:"9",value:9});
      playerHand.push({suit:"hearts",rank:"9",value:9});
      drawCard(playerHand);
    }*/

    drawCard(playerHand);
    },1400);
    setTimeout(function() {  
    dealerHand.push(deck.pop());
    drawCard(dealerHand);
    },2100);

    /*
    if(DEBUG){
      dealerHand.pop();
      dealerHand.pop();
      dealerHand.push({suit:"hearts",rank:"ace",value:1});
      dealerHand.push({suit:"hearts",rank:"10",value:10});
      drawCard(dealerHand);
    }
*/

    setTimeout(function() {
     /* 
      let DEBUG=true;

    if (DEBUG) {
      dealerHand.pop();
      dealerHand.pop();
      dealerHand.push({suit:"clubs",rank:"ace",value:1});
      dealerHand.push({suit:"clubs",rank:"10",value:10});
      updateScores(dealerHand);
      updateUI(dealerHand);
    }
    */
    /*
    
    if (DEBUG) {
      playerHand.pop();
      playerHand.pop();
      playerHand.push({suit:"clubs",rank:"9",value:9});
      playerHand.push({suit:"hearts",rank:"9",value:9});
      
      updateScores(playerHand);
      updateUI(playerHand);
      DEBUG=false;
    }*/

    if ((dealerHand[0].value==1 && dealerHand[1].value==10) || (dealerHand[1].value==1 && dealerHand[0].value==10))
      dealerBlackJack=true;

    //console.log(playerScore,dealerBlackJack);
    if (playerScore==21) {
      if (dealerBlackJack) { 
        playerStand(); 
        hitButton.disabled=true;
        standButton.disabled=true;
        doubleDownButton.disabled=true;
        return; 
      }
      messageElement.innerHTML = "Il giocatore vince! BlackJack!";
      animVittoria(playerHandSet);
      animSconfitta(dealerHandSet);
      boxShadowAnimation(resultInterface);
      pagaBet(betValue*(5/2));
      messageElement.innerHTML+=' Vinti: '+(betValue*(5/2)).toFixed(2)+'!';
      betValue=0;
      puntata.innerHTML=0;
      textAnimation(betContainer);
      scrollPos('down',$('.money-int-scroll'));
      boxShadowAnimation(moneyInterface);
      betting=true;                                 //ricomincia il gioco
      setButtonPostGameOver();
      return;
    }

    if (playerHand[0].value==playerHand[1].value && !split && parseFloat(saldoFake.innerText)>=betValue) {
      splitButton.disabled=false;
    }
    
    if (dealerHand[0].rank=="ace" && playerScore!=21 && parseFloat(saldoFake.innerText)>=betValue/2) {
      choosing=true;
      insuranceSpawn();
      return;
    }

    hitButton.disabled=false;
    standButton.disabled=false;
    if(parseFloat(saldoFake.innerText)>=betValue)
      doubleDownButton.disabled=false;
    },2100);

  }
  
}



////////////////////////////////////////////////////////////////raddoppia
function doubleDown() {
  if (!gameOver && !betting && doubledown && !choosing) {  
    doubledown=false;
    doubleDownButton.disabled=true;
    splitButton.disabled=true;
    pagaBet(-betValue);
    puntata.innerHTML=parseFloat(puntata.innerHTML)+betValue;
    betValue*=2;
    if (!have_splitted) {
      playerHand.push(deck.pop());
      drawCard(playerHand);
      if (!checkForGameOver(playerHand)) {
        if (split) setTimeout(playerStand,1000);
        else playerStand();
      }
    }
    else {
      newHand.push(deck.pop());
      drawCard(newHand);
      playerStand();
    }
  }
}




////////////////////////////////////////////////////////////////////// aggiornamneto UI
function updateUI(hand) {
  // Aggiornamento del punteggio del dealer
  var isDealerHand=false;
  var isNewHand=false;

  if (JSON.stringify(hand)==JSON.stringify(dealerHand)) {
    isDealerHand=true;
  }
  else if (JSON.stringify(hand)==JSON.stringify(newHand)) {
    isNewHand=true;
  }

  // Aggiornamento delle carte del dealer
  let CardsElement;
  widthPlayer=0;
  widthPlayer1=0;
  widthDealer=0;
  if (isDealerHand) {
    CardsElement= document.getElementById("dealer-cards");
    dealerHandSet.clear();
  }
  else if (isNewHand){
     CardsElement=document.getElementById("new-cards");
     newHandSet.clear();
    }
  else {
    CardsElement=document.getElementById("player-cards");
    playerHandSet.clear();
  }
  //console.log(CardsElement);
  CardsElement.innerHTML = "";

  //console.log(isDealerHand);
  for (let i = 0; i < hand.length; i++) {
    let cardElementShadow= document.createElement('div');
    cardElementShadow.classList.add('card-shadow');
    
    let cardElement = document.createElement("div");
    cardElement.classList.add("card");

    let cardImageElement = document.createElement("div");
    let cardImageSrc;
    cardElement.removeAttribute('id');
    if (i==hand.length-1 && (i!=1 || !isDealerHand)) {
      cardElement.setAttribute("style","display:none");
      cardElement.setAttribute("id","last-card");
    }
    if (isDealerHand && i == 1 && !dealerTurn) {
      cardImageSrc = "./images/covered.png";
    } else {
      cardImageSrc = "./images/"+hand[i].rank+"_of_"+hand[i].suit+".png";
    }
    cardImageElement.style.backgroundImage = `url(${cardImageSrc})`;
    cardImageElement.classList.add("card-image");
    
    cardElement.appendChild(cardImageElement);
    cardElementShadow.appendChild(cardElement);
    CardsElement.appendChild(cardElementShadow);

    if (isDealerHand) {
      dealerHandSet.add(cardImageElement);
      widthDealer+=cardElementShadow.clientWidth;
    }
    else if (isNewHand){ 
      newHandSet.add(cardImageElement);
      widthPlayer1+=cardElementShadow.clientWidth;
    }
    else {
      playerHandSet.add(cardImageElement);
      widthPlayer+=cardElementShadow.clientWidth;
    }
    resizeGame();
    console.log(playerHandSet,newHandSet,dealerHandSet);
  }

  return true;
}


////////////////////////////////////////////////////////////////// Aggiornamento del punteggio del dealer e del giocatore
function updateScores(hand) {
  var isdealerHand=false;
  if (JSON.stringify(hand)==JSON.stringify(dealerHand)) {
    isdealerHand=true;
  }
  let hasAce = false;
  var score=0;
  // Calcolo del punteggio del dealer
  for (let i = 0; i < hand.length; i++) {
    if(!isdealerHand || i!=1 || dealerTurn)
      score += hand[i].value;
    if (hand[i].rank == "ace") {
      hasAce = true;
    }
  }
  if (hasAce && score <= 11) {
    if (!isdealerHand || dealerHand[0].rank == "ace" || dealerTurn)
      score += 10;
  }
  
  if (isdealerHand) dealerScore=score;
  else playerScore=score;

  let ScoreElement = isdealerHand? $("#dealer-score"):$('#player-score');
  ScoreElement.html('Punteggio: '+score);

}




///////////////////////////////////////////////////////////////////// Controllo se il gioco è finito
function checkForGameOver(playerHand) {
  
  if (gameOver) {
    return true;
  }
  if (JSON.stringify(playerHand)==JSON.stringify(newHand)) 
    handSet=newHandSet;
  else 
    handSet=playerHandSet;
    /*
  console.log('ZIOPERA' + JSON.stringify(playerHand))
  console.log(playerHandSet);
  console.log(handSet);
  */

 // console.log(playerHand);
 // console.log(dealerHand);
  if (playerScore > 21) {
    messageElement.innerHTML = "Hai sballato! Il dealer vince.";
    messageElement.innerHTML+=' Persi: '+(betValue).toFixed(2)+'!';
    console.log(have_splitted);
    
    if (split){ 
      //checkForFirstResult();
      playNewHand();
    }
    else {
      animSconfitta(handSet); 
      animVittoria(dealerHandSet);
      boxShadowAnimation(resultInterface);
      setButtonPostGameOver();
      betValue=0;
      puntata.innerHTML=0;
      textAnimation(betContainer);
      scrollPos('down',$('.money-int-scroll'));
      boxShadowAnimation(moneyInterface);
      betting=true;
    }

    return true;
  }
  
  if (dealerTurn) {
      if (dealerScore == playerScore && (!dealerBlackJack || playerHand.length==2)) {
        messageElement.innerHTML = "Pareggio!";
        animPareggio(handSet);
        animPareggio(dealerHandSet);
        boxShadowAnimation(resultInterface);
        pagaBet(betValue);
        messageElement.innerHTML+=' Non hai vinto nulla!';

        betValue=0;
        puntata.innerHTML=0;
        textAnimation(betContainer);
        scrollPos('down',$('.money-int-scroll'));
        boxShadowAnimation(moneyInterface);
        betting=true;
        setButtonPostGameOver();
        return true;
      } 
      else if (dealerScore < playerScore || dealerScore > 21) {
        messageElement.innerHTML = "Il giocatore vince!";
        animVittoria(handSet);
        animSconfitta(dealerHandSet);
        boxShadowAnimation(resultInterface);
        if (dealerScore>21) {
          messageElement.innerHTML+=" Il dealer ha sballato!";
          /*
          boxShadowAnimation(resultInterface);
          animVittoria(playerHandSet);
          animSconfitta(dealerHandSet);
          */
        } 
        pagaBet(2*betValue);
        messageElement.innerHTML+=' Vinti: '+(betValue*(2)).toFixed(2)+'!';
        betValue=0;
        puntata.innerHTML=0;
        textAnimation(betContainer);
        scrollPos('down',$('.money-int-scroll'));
        boxShadowAnimation(moneyInterface);

        betting=true;
        setButtonPostGameOver();
        return true;
      }
      else if (dealerScore>=17) {
        if (dealerScore > playerScore || dealerBlackJack) {
          messageElement.innerHTML = "Il dealer vince!";
          messageElement.innerHTML+=' Persi: '+(betValue).toFixed(2)+'!';
          animVittoria(dealerHandSet);
          animSconfitta(handSet);
          boxShadowAnimation(resultInterface);
          betValue=0;
          puntata.innerHTML=0;
          textAnimation(betContainer);
          scrollPos('down',$('.money-int-scroll'));
          boxShadowAnimation(moneyInterface);
          betting=true;
          setButtonPostGameOver();
          return true;
        }
      } 
      hitButton.disabled=true;
      standButton.disabled=true;
      doubleDownButton.disabled=true;
  }
}


///////////////////////////////////////////////////////////////////// Funzione che gestisce il turno del dealer
function dealerPlay(playerHand) {
  if (!dealerTurn) {
    dealerTurn = true;
  // Se il dealer ha un punteggio minore di 17, deve pescare carte
    updateScores(dealerHand);
    updateUI(dealerHand);
  }
  let dealer_playing = setInterval(function() {
    if (dealerScore < 17) {
      dealerHand.push(deck.pop());
      drawCard(dealerHand);
    }
    else {
      clearInterval(dealer_playing);
      dealerHasFinished=true;
      return checkForGameOver(playerHand);
    }
  },1000);
  
    // Aggiunge un breve ritardo per rendere più leggibile il gioco
  }



////////////////////////////////////////////////////////////////////////////// Funzione per il gioco del giocatore
function playerHit() {
  if (playerScore==21) { 
    playerStand(); 
    return;
  }
  if (!gameOver && !betting && !choosing) {
    splitButton.disabled=true;
    doubledown=false;
    doubleDownButton.disabled=true;

    if (!have_splitted) {
      playerHand.push(deck.pop());
      drawCard(playerHand);
      checkForGameOver(playerHand);
    }
    else {
      newHand.push(deck.pop());
      print_deck();
      drawCard(newHand);
      checkForGameOver(playerHand);
    }
  }
}

//////////////////////////////////////////////////////////// Funzione per terminare il turno del giocatore
function playerStand() {
  if (!gameOver && !betting && !choosing) {
    doubledown=false;
    doubleDownButton.disabled=true;
    hitButton.disabled=true;
    standButton.disabled=true;
    splitButton.disabled=true;
    //console.log(split);
    if (split) {
      //checkForFirstResult();
      playNewHand();
    }
    else dealerPlay(playerHand);
  }
}


//////////////////////////////////////////////////////// Inizializzazione del gioco(quando si preme una chip)

function bet(e) {
  //console.log(gameOver,betting);
  let current_bet=parseInt(e.target.getAttribute("title").substring(5));
  let saldo_current=saldo.innerText;
  saldo_current=parseFloat(saldo_current).toFixed(2);

  if (betting && betValue<=saldo_current) {  
    if (!gameOver) gameOver=true;
    if(current_bet+betValue>saldo_current) current_bet=saldo_current-betValue;
    lastBet=current_bet;
    if (lastBet!=0) lastBets.push(lastBet);
    betValue+=current_bet;
    newGameButton.classList.remove('fake-disabled');
    puntata.innerHTML=betValue.toFixed(2);
    saldoFake.innerHTML=(saldo_current-betValue).toFixed(2); 
    textAnimation(saldoContainer);
    textAnimation(betContainer);
    boxShadowAnimation(moneyInterface);
    abilitaAnnullamento();//va messo dopo altrimenti crea problemi
  }
}


///////////////////////////////////////////////////////////annulla ultima giocata
function annulla_last_bet(){
  if(lastBets.length!=0){
    disabilitaAnnullamento();
    lastBet=lastBets.pop();
    if (betValue<=0) {
      betValue=0;
      return;
    }
    if((betValue-lastBet)==0){
        newGameButton.classList.add('fake-disabled');
    }
    let saldo_fake_current=saldoFake.innerText;
    saldo_fake_current=(parseFloat(saldo_fake_current)+ lastBet).toFixed(2);
    betValue-=lastBet;
    puntata.innerHTML=betValue;
    saldoFake.innerHTML=(saldo_fake_current); 
    textAnimation(saldoContainer);
    textAnimation(betContainer);
    boxShadowAnimation(moneyInterface);
    if (lastBets.length!=0) abilitaAnnullamento();
  }
}
//si può ritirare solo una chips

function abilitaAnnullamento(){
  annullaButtom.disabled=false;
  let annullaImg= document.getElementById('annullaGiocata');
  annullaImg.classList.remove("annulla-img-red");
  annullaImg.classList.add("annulla-img-green"); 
}
function disabilitaAnnullamento(){
  annullaButtom.disabled=true;
  let annullaImg= document.getElementById('annullaGiocata');
  annullaImg.classList.remove("annulla-img-green");
  annullaImg.classList.add("annulla-img-red");
}


//////////////////////////////////////////////////////////////////////////////////aggioramento saldo in db
function pagaBet(betValue) {//se passata con 0 stampa il saldo e basta 
  //gameOver = true;
  newGameButton.disabled=true;
  if (betValue!=0) {
    let temp=saldo.innerText;
    let result=(parseFloat(temp)+betValue).toFixed(2);
    $.ajax({
      type: "POST",
      url: "../aggiorna_saldo.php",
      data:  "saldo_attuale=" + result ,
      headers: {"Content-type": "application/x-www-form-urlencoded"},
      dataType: "json",
      success: function(risposta){
          result=risposta.saldo_to_js;

          if(result===-1){
           // console.log(risposta);//va blocctao il gioco
            exit();
          }

          //console.log(risposta);
      },
      error: function(jqXHR, textStatus, errorThrown,risposta) {
        console.log("Errore durante la richiesta AJAX:");
        console.log("Stato HTTP: " + jqXHR.status);
        console.log("Messaggio di errore: " + errorThrown);
        //console.log(jqXHR.responseText);
     //DEBUG
     }
    });
    saldo.innerHTML=result;
    saldoFake.innerHTML=result;
    printSaldo('#navSaldo',0,1);
    textAnimation(saldoContainer);
    boxShadowAnimation(moneyInterface);
    scrollPos('up',$('.money-int-scroll'));
  }
}



/////////////////////////////////////////////////////////////////////  funzioni di supporto
function textAnimation(div) {
  let duration = 3000; // durata dell'animazione in millisecondi
  let interval = 50; // intervallo di tempo tra le animazioni in millisecondi
  let startTime = new Date().getTime(); // tempo di inizio dell'animazione

  if (div !== null) {
    let animationInterval = setInterval(() => {
      let timePassed = new Date().getTime() - startTime; // tempo trascorso dall'inizio dell'animazione
      let progress = timePassed / duration; // progresso dell'animazione (da 0 a 1)

      if (progress > 0.75) {
        // L'animazione è terminata, ripristina il colore originale del testo
        clearInterval(animationInterval);
        div.style.color = '#000'; // Cambia il colore del testo al valore originale
      } else {
        // Modifica il colore del testo in base al progresso dell'animazione
        let redValue = 255 - Math.round(progress * 255);
        let greenValue = Math.round(progress * 255);
        let blueValue = 0;
        let textColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
        div.style.color = textColor;
        div.style.borderColor = '#000000';
      }
    }, interval);
  }
}

function boxShadowAnimation(div){
  let duration = 4000; // durata dell'animazione in millisecondi
  let interval = 50; // intervallo di tempo tra le animazioni in millisecondi
  let startTime = new Date().getTime(); // tempo di inizio dell'animazione

  if (div !== null) {
      let boxShadowSize;
      let animationInterval = setInterval(() => {
      let timePassed = new Date().getTime() - startTime; // tempo trascorso dall'inizio dell'animazione
      let progress = timePassed / duration; // progresso dell'animazione (da 0 a 1)

      if (progress > 0.75) {                                                              //0.75 per in quel punto sin( 4*pi*x )=0 ma con andamento decrescente
          // L'animazione è terminata, ripristina il valore originale dell'ombra
          clearInterval(animationInterval);
          let close_animation_interval= setInterval(()=>{
          let boxcolor='rgb(0,255,0)'; 
          if(boxShadowSize<1){
              boxShadowSize=0;
              div.style.boxShadow = `${boxcolor} 0 0 0 ${boxShadowSize}px inset`;
              clearInterval(close_animation_interval);
          }
          else{
              boxShadowSize=boxShadowSize-0.2;
              div.style.boxShadow = `${boxcolor} 0 0 0 ${boxShadowSize}px inset`;
          }
          },interval);
      } 
      else {
        let redValue;
        let greenValue;
        let boxShadowColor;
        // Modifica la dimensione dell'ombra in base al progresso dell'animazione
         redValue = 255 - Math.round(progress * 255);
         greenValue = Math.min(Math.round(progress * 350),255);             //(progress * -x-), il val di -x- fa diventare verde prima la shadow
         boxShadowColor = `rgb(${redValue}, ${greenValue}, 0)`;
         boxShadowSize = (Math.sin(6*progress * Math.PI * 2)*3 ); // dimensione dell'ombra (oscillazione sinusoidale)
         div.style.boxShadow = `${boxShadowColor} 0 0 0 ${boxShadowSize}px inset`;
      }
    }, interval);
  }
}


/***********   queste 3 sotto vanno usate con un div di classe card-image   *****/
/*
function animVittoria(div){
  let duration = 4000; // durata dell'animazione in millisecondi
  let interval = 40; // intervallo di tempo tra le animazioni in millisecondi
  let startTime = new Date().getTime(); // tempo di inizio dell'animazione

  if (div !== null) {
      let animationInterval = setInterval(() => {
      let timePassed = new Date().getTime() - startTime; // tempo trascorso dall'inizio dell'animazione
      let progress = timePassed / duration; // progresso dell'animazione (da 0 a 1)

      let boxShadowColor;
      let alpha;

      if(progress<0.5){
        alpha = 0+Math.round(progress * 2);      
        boxShadowColor = `rga(0, 255, 0 , ${alpha})`;
        div.style.boxShadow = `0 0 0 2.5px ${boxShadowColor} `;
      }
      else if (progress > 0.5) {                                                              //0.75 per in quel punto sin( 4*pi*x )=0 ma con andamento decrescente
          // L'animazione è terminata, ripristina il valore originale dell'ombra
          if(progress>1)
            clearInterval(animationInterval);

          alpha = 1-Math.round(progress * 2);      
          boxShadowColor = `rga(0, 255, 0 , ${alpha})`;
          div.style.boxShadow = `0 0 0 2.5px ${boxShadowColor} `;
      } 
    }, interval);
  }
}
*//*
function animVittoria(divs){
  console.log(divs);
  divs.forEach((div) => {
    console.log(div);
    if (div !== null) {
      animVerde(div);
    }
  });
}

function animVerde(div){
  let duration = 40000; // durata dell'animazione in millisecondi
  let interval = 40; // intervallo di tempo tra le animazioni in millisecondi
  let startTime = new Date().getTime(); // tempo di inizio dell'animazione
  let progress=0;

  let animationInterval = setInterval(() => {
    let timePassed = new Date().getTime() - startTime; // tempo trascorso dall'inizio dell'animazione
     progress = timePassed / duration; // progresso dell'animazione (da 0 a 1)

    let boxShadowColor;
    let alpha;
    let progress_fake;
    if(progress<0.5){
      progress_fake=progress * 2;
      alpha = 0+Math.round(progress_fake);      
      boxShadowColor = `rgba(0, 255, 0 , ${alpha})`;
      div.style.boxShadow = `0 0 0 2.5px ${boxShadowColor} `;
    }
    else if (progress > 0.5) {                                                              //0.75 per in quel punto sin( 4*pi*x )=0 ma con andamento decrescente
        // L'animazione è terminata, ripristina il valore originale dell'ombra
        if(progress>1)
        clearInterval(animationInterval);

        progress_fake=(progress-0.5) * 2;
        alpha = 1-Math.round( progress_fake);      
        boxShadowColor = `rgba(0, 255, 0 , ${alpha})`;
        div.style.boxShadow = `0 0 0 2.5px ${boxShadowColor} `;
        console.log(alpha);
      
    } 
  }, interval);
}*/

function animVittoria(divs) {
  divs.forEach((div) => {
    if (div !== null) {
      let duration = 6000; // durata dell'animazione in millisecondi
      let startTime = new Date().getTime(); // tempo di inizio dell'animazione
      let alpha = 0;
    
      function animate() {
        let timePassed = new Date().getTime() - startTime; // tempo trascorso dall'inizio dell'animazione
        let progress = timePassed / duration; // progresso dell'animazione (da 0 a 1)
    
        if (progress < 0.5) {
          alpha = progress * 2;
        } else if (progress > 0.5) {
          progress = progress - 0.5;
          alpha = 1 - progress * 2;
        }
    
        let boxShadowColor = `rgba(0, 255, 0 , ${alpha.toFixed(2)})`;
        div.style.boxShadow = `0 0 0 2.5px ${boxShadowColor} `;
    
        if (progress < 1) {
          window.requestAnimationFrame(animate);
        }
      }
    
      window.requestAnimationFrame(animate);
    
    }
  });
}





function animSconfitta(divs){
  divs.forEach((div) => {
    if (div !== null) {
      let duration = 6000; // durata dell'animazione in millisecondi
      let startTime = new Date().getTime(); // tempo di inizio dell'animazione
      let alpha = 0;

      function animate() {
        let timePassed = new Date().getTime() - startTime; // tempo trascorso dall'inizio dell'animazione
        let progress = timePassed / duration; // progresso dell'animazione (da 0 a 1)
    
        if (progress < 0.5) {
          alpha = progress * 2;
        } else if (progress > 0.5) {
          progress = progress - 0.5;
          alpha = 1 - progress * 2;
        }
    
        let boxShadowColor = `rgba(255, 0, 0 , ${alpha.toFixed(2)})`;
        div.style.boxShadow = `0 0 0 2.5px ${boxShadowColor} `;
    
        if (progress < 1) {
          window.requestAnimationFrame(animate);
        }
      }
      window.requestAnimationFrame(animate);
    }
  });
}



function animPareggio(divs){
  divs.forEach((div) => {
    if (div !== null) {
      let duration = 6000; // durata dell'animazione in millisecondi
      let startTime = new Date().getTime(); // tempo di inizio dell'animazione
      let alpha = 0;
    
      function animate() {
        let timePassed = new Date().getTime() - startTime; // tempo trascorso dall'inizio dell'animazione
        let progress = timePassed / duration; // progresso dell'animazione (da 0 a 1)
    
        if (progress < 0.5) {
          alpha = progress * 2;
        } else if (progress > 0.5) {
          progress = progress - 0.5;
          alpha = 1 - progress * 2;
        }
        
        let boxShadowColor = `rgba(220, 195, 73 , ${alpha.toFixed(2)})`;
        div.style.boxShadow = `0 0 0 2.5px ${boxShadowColor} `;
    
        if (progress < 1) {
          window.requestAnimationFrame(animate);
        }
      }
    
      window.requestAnimationFrame(animate);
    
    }
  });
}

function scrollPos(str,div){
  div = div.get(0);
  if(str=='up' || str=='down'){
    if(str=='up'){
      div.scrollTop=0;
    }
    else{
        div.scrollTop = div.scrollHeight - div.clientHeight;
    }
  }
  return;
}


function setButtonPostGameOver(){
  hitButton.disabled=true;
  standButton.disabled=true;
  doubleDownButton.disabled=true;
  splitButton.disabled=true;
  newGameButton.disabled=false;
  newGameButton.classList.add('fake-disabled');
}


function dimensioniFinestra(){
  let width=window.innerWidth;
  let height =window.innerHeight;
  return {larghezza:width, altezza:height };
}


// Aggiunta degli event listener ai pulsanti

hitButton.addEventListener("click", playerHit);
standButton.addEventListener("click", playerStand);
newGameButton.addEventListener("click", startNewGame);
doubleDownButton.addEventListener("click",doubleDown);
splitButton.addEventListener("click",splitHand);

let chips=document.getElementById("chips").getElementsByTagName("button");
for (let i=0;i<5;i++) {
  chips[i].addEventListener("click",bet);
}
annullaButtom.addEventListener("click",annulla_last_bet);
