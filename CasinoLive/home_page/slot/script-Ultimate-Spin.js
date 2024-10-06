const welcomeImg=document.querySelector('#welcomeImg');
const navbarInt=document.querySelector('#navbarCasino');
const body=document.querySelector('#body');
const gameCtn= document.querySelector('.game-container');
const gameInt=document.querySelector('.game-interface');
const slotInt=document.querySelector('.slot-interface');
const slot_machine = document.querySelector('.slot-machine');

const reels = document.querySelectorAll('.reel'); //l' array parte da 0
const spinButton = document.getElementById('spin-button');
const stopButton1= document.getElementById('stopButton1');
const stopButton2= document.getElementById('stopButton2');
const stopButton3= document.getElementById('stopButton3');
const stopButton4= document.getElementById('stopButton4');
const stopButton5= document.getElementById('stopButton5');
const result = document.getElementById('result');
const annullaButton= document.getElementById('annullaUltimaChip');
const annullaImg=document.querySelector('#annullaGiocata');
const saldoBetContainer= document.querySelector('.table-game-saldo-col');
const saldo=document.getElementById('saldo');
const puntata=document.getElementById('puntata');
const autoSpin=document.querySelector('#autoSpin'); 

//*******************'Media query'****************************** */


//qua va messo (non sono giusti ti metto le classi della robba)
 /*
per coprire il messaggio 
 .info-user-ctn.style.display=none;
 .slot-machine.display="grid";

per far vedere il messaggio 
 .info-user-ctn.style.display=block;
 .slot-machine.display="none";

 qua va bene cosi non dobbiamo cambaire altre proprietà

 il messaggio va messo come prima nel div di classe infoUser
*/


resizeSlot();

window.addEventListener('resize', function() {
  resizeSlot();   
});

function resizeSlot(){  
  let winSize=checkWindowDim();
  let winH=winSize.height;
  let winW=winSize.width;
  let gameIntH;

  if(winW<140){
    stopButton1.innerHTML='S';
    stopButton2.innerHTML='S';
    stopButton3.innerHTML='S';
    stopButton4.innerHTML='S';
    stopButton5.innerHTML='S';
  }
  else if(stopButton1.innerHTML==='S'){
    stopButton1.innerHTML='Stop';
    stopButton2.innerHTML='Stop';
    stopButton3.innerHTML='Stop';
    stopButton4.innerHTML='Stop';
    stopButton5.innerHTML='Stop';
  }

  if(winSize.width < winSize.height){//se la finestra è piu alta che stretta
    winW=winSize.width-(winSize.width/100)*10;
    winH=60+winW;
    gameCtn.style.width=winW+'px';
    gameCtn.style.height=winH+'px';
    gameIntH=(winH/100)*25;
    if(gameIntH<100){
      gameIntH=100;
    }
    gameInt.style.height=gameIntH+'px';
  }
  else{                                             //se la fnestra è piu stretta che alta
    winW=winSize.width-(winSize.width/100)*10;
    if(winSize.height<=580 && winSize.height>470)
      winH=winSize.height-(winSize.height/100)*14;

    else if(winSize.height<=470 && winSize.height>360)
      winH=winSize.height-(winSize.height/100)*18; 

    else if(winSize.height<=360 && winSize.height>260)
      winH=winSize.height-(winSize.height/100)*20 -10;
          
    else if(winSize.height<=360 && winSize.height>260)
      winH=winSize.height-(winSize.height/100)*20 -15;

    else if (winSize.height<=260)
      winH=winSize.height-(winSize.height/100)*20 -25;
    else
      winH=60+winSize.height-(winSize.height/100)*10;

    gameCtn.style.width=winW+'px';
    gameCtn.style.height=winH+'px';
    gameIntH=(winH/100)*24;
    if(gameIntH<100){
      gameIntH=100;
    }
    gameInt.style.height=gameIntH+'px';
  }

  //let slotDim=checkSlotDim();
  let gameCtnDim=checkGameCtnDim();
  //let gameIntHeight=gameInt.clientHeight;

  let impoWidth=gameCtnDim.gameWidth-10;
  slotInt.style.width=impoWidth+'px';

  let impoHeight=gameCtnDim.gameHeight-gameIntH+50;
  slotInt.style.height=impoHeight;
  let Wreel=impoWidth/5;
  let Hreel=impoHeight/3;
  if(Wreel>Hreel){
    $('.reel-button').css('width', Hreel+'px');
    $('.reel-button').css('height', Hreel+'px');
    slotInt.style.height=Hreel*3+'px'
    gameInt.style.height=gameIntH+'px';
    gameCtn.style.height='auto';
  }
  else{
    $('.reel-button').css('width', Wreel+'px');
    $('.reel-button').css('height', Wreel+'px');
    slotInt.style.height=Wreel*3+'px';
    gameInt.style.height=gameIntH+'px';
    gameCtn.style.height='auto';  
    }
} 


/*******************navbar****/

attivaNavbar('username','slot-machine',2);

const colLogOut= document.querySelector('.navCas-col7');
const logOutIcon=document.querySelector('.nav-log-out');
colLogOut.addEventListener('mouseenter', function() {
  logOutIcon.style.backgroundImage ="url(/CasinoLive/image/icon-log-out2.gif)";
});

colLogOut.addEventListener('mouseleave', function() {
  logOutIcon.style.backgroundImage ="url(/CasinoLive/image/icon-log-out2.png)";
});
/*comparsa e scomparsa dell' immagine iniziale
const welcomeImg=document.querySelector('#welcomeImg');
const navbarInt=document.querySelector('#navbarCasino');
const gameCtn= document.querySelector('.game-container');
const body=document.querySelector('#body');

/*commentare il cambio immagine se si vuole*/
body.style.backgroundImage='none';
welcomeImg.style.display='block';
navbarInt.style.display='none';
gameCtn.style.display='none';

opacity=1;
let intervalId= setInterval(function(){
  opacity-=0.025;
  if(opacity<=0.5){
    welcomeImg.style.display='none';
    navbarInt.style.display='block';
    gameCtn.style.display='flex';
    body.style.backgroundImage="url('../../image/sfondo-roma-caricamento1.jpg')";
    welcomeImg.style.opacity=1;
    clearInterval(intervalId);
  }
  welcomeImg.style.opacity=opacity;
},100);



//inizio programma

$('.reel-button').click(jackpotFunction);
$('.reel-button').attr('disabled',true);
printSaldo('#saldo',0,2);
$('.chip-img-btn').click(bet);

//gestione del pulsante per il cambio di modalità di gioco
const modeButton=$('#changeMode');
var isFirstSpin=true;
var dynamicMode=false;      //si parte in statica           true=dyn attiva   --- false=statica attiva
$(modeButton).click(function changeMode() {
  if (isSpinning) return;
  if (dynamicMode) {
    isFirstSpin=true;
    dynamicMode=false;
    $('#changeModeImg').css('background-image','url(../../image/Static-Mode.png)');
    last_stop_clicked=-1;
    last_stopped=-1;
  }
  else {
    if (last_stop_clicked!=-1) return;//se è stato stoppata una colonna returna
    dynamicMode=true;
    $('#changeModeImg').css('background-image','url(../../image/Dynamic-Mode.png)');
  }
})

const symbols = ['tavoletta','tempio','elmo','scudo','carro','torre','guerriero','catapulta','bonus','wild'];
//const symbols_distr=[124,124,62,62,31,31,31,16,7,8]; //array che rappresenta la frequenza di comparsa di un simbolo
const symbols_distr=[8,8,5,5,4,4,2,2,1,1]; //array che rappresenta la frequenza di comparsa di un simbolo
const jackpot_multipliers=[10,25,50,75,100];
const jackpot_multipliers_dist=[10,5,3,2,1];

var jackpot=false;
let lastBet=0;
let lastBets=new Array();
var betting=true;
let isSpinning = false;
let firstSpin=true;
let interval;
let timeoutId;
var betValue=0;
let stopButtons=[stopButton1,stopButton2,stopButton3,stopButton4,stopButton5]; 
let numStoppedCol=0;            //serve per poter stoppare solo una colonna alla volta
let stoppedReel= new Set();     //ci sono i reel bloccati 
let last_stopped=-1;             //indice ultima colonna bloccata  0=valore neutro 
let last_stop_clicked=-1;        //indice dell' ultima colonna dove si è premuto il pulsante stop 
let play_count=false;           //serve per capire se devo controllare o meno per questo turno cosa preme l' utente
let auto_spin_value=false;
let isBigWin=false;
let additionalBet=0;
let autoSpinTimeout;
let show_istruzioni=false;      //serve per far in modo che se riclicco sulla navbar spariscono le istruzioni 


$('.navCas-col6').click(function(){
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


fill_reel();//all' inzio i reel vanno riempiti 
spinButton.addEventListener('click', spin);

disabilitaPulsantiStop();
//spinButton.disabled=true;
spinButton.classList.add('fake-disabled');
//per spinnare utilizziamo un array in cui i simboli più frequenti compaiono di più
var extract=[];
var total=0;
for (let i=0;i<symbols.length;i++) {
  for (let j=0;j<symbols_distr[i];j++)
    //i simboli verranno estratti in base alla loro distribuzione. Extract li contiene nelle proporzioni attese
    extract.push(symbols[i]);
  //total serve per calcolare la probabilità di comparsa del simbolo i-esimo che è symbols_dist[i]/total, l'inverso il numero atteso di estrazionioni
  total+=symbols_distr[i];
}


//******************FUNZIONI************************** */
function showMessage() {
  console.log('prova');
  console.log($('.info-user-ctn'));
  console.log($('.slot-machine'));

 //per far vedere il messaggio 
  $('.slot-machine').css('display','none');
  $('.info-user-ctn').css('display','block');

  setTimeout(()=>{
    //per coprire il messaggio 
    $('.info-user-ctn').css('display','none');
    $('.slot-machine').css('display','grid');
    },2000);
}

function spin() {
  
  //for (let i=0;i<symbols.length;i++) console.log(symbols[i],symbol_multiplier(symbols[i]));
  if (auto_spin_value && betValue!=0) spinButton.disabled=true;
  if (betValue==0) {
    spinButton.disabled=false;
    showMessage();
  }
  //autoSpin.disabled=false;
  //console.log(saldo.innerHTML,isSpinning,betting);
  if (betValue==0 || isSpinning) {
    return;
  }
  isSpinning = true;
  disabilitaAnnullamento();
  spinButton.classList.add('fake-disabled');
  disabilitaPulsantiStop();
  /*if (isSpinning) {
    stopSpin();
    return; //stop più rapido deciso dall'utente
  }*/

  if (isBigWin) {
    slot_machine.style.backgroundImage = "none";
    isBigWin=false;
  }

  /* inizializzazione delle variabili legate ai pulsanti di stop*/
  //last stopped impedisce che si stoppi la stessa colonna due volte di fila
  //e salva il valore di last_stop_clicked quando viene destoppata
  let durataSpin=2000;
  if (dynamicMode) { 
    abilitaPulsantiStop();
    last_stopped=-1;
    last_stop_clicked=-1;
    durataSpin*=5/2;
  }
  else {
    if (isFirstSpin) isFirstSpin=false;
    else {
      disabilitaPulsantiStop();
      last_stopped=last_stop_clicked;
      last_stop_clicked=-1;
    }
  }
  betting=false;
  if (additionalBet!=0) {
    pagaBet(-betValue-additionalBet);
    additionalBet=0;
  }
  else 
    pagaBet(-betValue);

  interval = setInterval(() => {
    if (isSpinning) {
      for (let i = 0; i < reels.length; i++) {
        //estrai un simbolo e inseriscilo nel rullo i-simo ogni 100s. i 20-esimi estratti sono i definitivi.
        //è importante notare che di fatto la loro probabilità d'estrazione è sempre la stessa
        if(!stoppedReel.has(i)){
          let randomSymbol = extract[Math.floor(Math.random() * extract.length)];
          let content =reels[i].querySelector('.content');
          content.innerHTML = '<img src=./symbols/' + randomSymbol + '.png>';
        }
        else {
          console.log(reels[i].querySelector('.content').innerHTML);
          let symbol
          if(reels[i].querySelector('.content').innerHTML.length>50){
             symbol=reels[i].querySelector('.content').innerHTML.slice(44,-6);
             reels[i].querySelector('.content').innerHTML='<img src=./symbols/' + symbol + 'png>'; 
          }
          else{
              symbol=reels[i].querySelector('.content').innerHTML.slice(20,-6);
              reels[i].querySelector('.content').innerHTML='<img src=./symbols/' + symbol + '.png>'; 
            }

        }
      }
    }
  }, 100);
  timeoutId = setTimeout(stopSpin, durataSpin);
}
//let DEBUG=true;

function stopSpin() {//chiama solo chechwinning in pratica
  // DEBUG INIZIALIZZA QUI I RULLI CHE DESIDERI TESTARE
  /*
  let DEBUG=true;
  if (DEBUG){
  let content =reels[0].querySelector('.content');
  content.innerHTML = '<img src=./symbols/bonus.png>';
  content =reels[3].querySelector('.content');
  content.innerHTML = '<img src=./symbols/wild.png>';
   content =reels[6].querySelector('.content');
  content.innerHTML = '<img src=./symbols/bonus.png>';
   content =reels[9].querySelector('.content');
  content.innerHTML = '<img src=./symbols/wild.png>';
   content =reels[12].querySelector('.content');
  content.innerHTML = '<img src=./symbols/bonus.png>';
  DEBUG=false;
  }
  */
  
  stoppedReel.clear();
  evidenziaStopBtn(-1);//metto un indice che non esiste, cosi ripristina tutto

  if (isSpinning) { //questo non ho capito se va tolto o no
    clearTimeout(timeoutId);
    clearInterval(interval);
    isSpinning = false;
    betting=true;
  }
  checkWinning();
}
  
function symbol_multiplier(symbol) {
  for (let i=0;i<symbols.length;i++) {
    if (symbol==symbols[i]) {
      //per assegnare il moltiplicatore al simbolo faccio 1/probabilità (cioè il valore atteso
      //delle estrazioni per vederlo uscire e ci levo 0.5 per pagare un pochino di meno
      //altrimenti la slot sarebbe perfettamente equilibrata alla probabilità dei simboli
      // ma invece deve essere meno probabile (i veri casinò fanno così)
      //bonus non paga (se connette con il wild)
      if (symbol=='bonus') return 0;
      let multiplier=total/symbols_distr[i];
      if (i>symbols.length/2)
        multiplier++;
      else
        multiplier--;
      return Math.round(multiplier);
    }
  }
  
  return 1;
}

var reelsContent;
var lines;
var winreels;

/*
LOGICA:
la formula del pagamento della bet:
WIN=BET*(SOMMA DEI LINE_MULT*SYMB_MULT)/N_LINES

line_mult=moltiplicatore della linea
symb_mult=moltiplicatore del simbolo vincente della linea

3 WILD=JACKPOT
*/

/*
MOLTIPLICATORE DELLA LINEA
1x se ci sono 3 elementi uguali
1.5x se ci sono 4 elementi uguali 
2x se ci sono 5 elementi uguali

il wild diventa qualsiasi elemento gli sia affianco
*/
function line_multiplier(ll,l,c,r,rr) {
  // vengono definiti i 5 elementi dal più a sinistra al più a destra della riga 
  //confronta gli elementi a bucket di 3
  function same_contents(reel1,reel2,reel3) {
    //console.log(reel1,reel2,reel3);
    if (reel1=='bonus' || reel2=='bonus' || reel3=='bonus')
      return false;
    if (reel1==reel2 && reel2==reel3) { 
      return true;
    }
    else if (reel1=='wild' && (reel2==reel3 || reel2=='wild' || reel3=='wild')) return true;
    else if (reel2=='wild' && (reel1==reel3 || reel3=='wild')) return true;
    else if (reel3=='wild' && (reel1==reel2)) return true;
    //console.log('fail');
    return false;
  }
  
  let el1=reelsContent[ll];
  let el2=reelsContent[l];
  let el3=reelsContent[c];
  let el4=reelsContent[r];
  let el5=reelsContent[rr];

  let countBonus=0;
  if (el1=='bonus') countBonus++; 
  if (el2=='bonus') countBonus++; 
  if (el3=='bonus') countBonus++; 
  if (el4=='bonus') countBonus++; 
  if (el5=='bonus') countBonus++; 

  //jackpot quando una linea ha 3 o più bonus
  if (countBonus>=3) {
    jackpot=true;
    winreels=new Set();
    //if elemento veramente==='bonus'
    if (el1=='bonus') 
      winreels.add(ll);
    if (el2=='bonus') 
      winreels.add(l);
    if (el3=='bonus') 
      winreels.add(c);
    if (el4=='bonus') 
      winreels.add(r); 
    if (el5=='bonus') 
      winreels.add(rr);
    return 0;
  }

  //confronto prima i primi tre (e arrivo al quarto e al quinto)
  if (same_contents(el1,el2,el3)) {
    //se gli elementi sono in una linea vincente li metto in winreels
    winreels.add(ll);
    winreels.add(l);
    winreels.add(c);
    if (same_contents(el2,el3,el4) && same_contents(el1,el3,el4) && same_contents(el1,el2,el4)) {
      winreels.add(r);
      if (same_contents(el3,el4,el5) && same_contents(el1,el2,el5) && same_contents(el1,el3,el5) && same_contents(el1,el4,el5) && same_contents(el2,el3,el5) && same_contents(el2,el4,el5)) {
        winreels.add(rr);
        //5 elementi di fila-> 1
        return 2.5;
      }
      //4 elementi di fila->0.75
      else return 2;
    }
    //3 elementi di fila->0.5
    else return 1.5;
  } 
  //confronto i primi tre a partire dal secondo
  else if (same_contents(el2,el3,el4)) {
    winreels.add(l);
    winreels.add(c);
    winreels.add(r);
    if (same_contents(el3,el4,el5) && same_contents(el2,el4,el5) && same_contents(el2,el3,el5)) {
      winreels.add(rr);
      return 2;
    }
    else return 1.5;
  }
  //confronto gli ultimi tre della riga
  else if (same_contents(el3,el4,el5)) {
    winreels.add(c);
    winreels.add(r);
    winreels.add(rr);
    return 1.5;
  }
  return 0;
}

function createLine(ll,l,c,r,rr) {
  //se c'è stato un jackpot non ha senso calcolare tutte le linee
  if (jackpot) {
    return;
  }
  //line: oggetto con simbolo e moltiplicatore
  //console.log(winreels,symbol_multiplier('wild'));

  let winreels_prec= new Set();
  winreels.forEach(function(value){winreels_prec.add(value)});
  //console.log(winreels_prec);
  let line_mult=line_multiplier(ll,l,c,r,rr);
  let symb_mult=symbol_multiplier(reelsContent[c]);
  //console.log(winreels);
  //se al centro c'è un wild, devo controllare tutte le possibili configurazioni 
  //o comunque restituire il moltiplicatore di un simbolo che non sia il wild
  //a meno che non ci siano 5 wild nella linea (molto molto raro e comunque configurabile come big win)
  //il codice è lungo, noioso e skippabile
  if (reelsContent[c]=='wild') {
    //conto i wild
    let countWild=1;
    let l_el=reelsContent[l];
    let r_el=reelsContent[r];
    let ll_el=reelsContent[ll];
    let rr_el=reelsContent[rr];
    if (l_el=='wild') countWild++;
    if (r_el=='wild') countWild++;
    if (ll_el=='wild') countWild++;
    if (rr_el=='wild') countWild++;
    
    switch(countWild) {
      case 1:
        //console.log(reelsContent[l]==reelsContent[ll] );
        //console.log(reelsContent[r]==reelsContent[rr]);
        if (l_el==ll_el && r_el==rr_el) {
          //console.log(symbol_multiplier(r_el),symbol_multiplier(l_el));
          if (symbol_multiplier(r_el)>symbol_multiplier(l_el)) {
            symb_mult=symbol_multiplier(r_el);
            if (!winreels_prec.has(ll)) winreels.delete(ll);
            if (!winreels_prec.has(l)) winreels.delete(l);
            winreels.add(r);
            winreels.add(rr);
          }
          else 
            symb_mult=symbol_multiplier(l_el);
        }
        else if (l_el==ll_el)
          symb_mult=symbol_multiplier(l_el);
        else if (r_el==rr_el)
          symb_mult=symbol_multiplier(r_el);
        else if(r_el==l_el)
          symb_mult=symbol_multiplier(l_el);
        break;
      case 2:
        if (ll_el=='wild') {
          if (symbol_multiplier(r_el)>symbol_multiplier(l_el) && r_el==rr_el) {
            symb_mult=symbol_multiplier(r_el);
            if (!winreels_prec.has(ll)) winreels.delete(ll);
            if (!winreels_prec.has(l)) winreels.delete(l);
            winreels.add(r);
            winreels.add(rr);  
          }
          else 
            symb_mult=symbol_multiplier(l_el);
        }
        else if (rr_el=='wild') {
          if (symbol_multiplier(r_el)>symbol_multiplier(l_el) && l_el==ll_el) {
            symb_mult=symbol_multiplier(r_el);
            if (!winreels_prec.has(ll)) winreels.delete(ll);
            if (!winreels_prec.has(l)) winreels.delete(l);
            winreels.add(r);
            winreels.add(rr);
          }
          else if (symbol_multiplier(l_el)>symbol_multiplier(r_el) && l_el==ll_el)
            symb_mult=symbol_multiplier(l_el);
          else
            symb_mult=symbol_multiplier(r_el);

        }
        else if (l_el=='wild') {
          if (symbol_multiplier(r_el)>symbol_multiplier(ll_el) || (r_el==rr_el && r_el!=ll_el && r_el!='bonus')) {
            symb_mult=symbol_multiplier(r_el);
            if (!winreels_prec.has(ll)) winreels.delete(ll);
            winreels.add(r);
            if (symbol_multiplier(r_el)==symbol_multiplier(rr_el)) {
              winreels.add(rr);
              line_mult=1.5;
            }
          }
          else
            symb_mult=symbol_multiplier(ll_el);
        }
        else if (r_el=='wild') {         
          if (symbol_multiplier(rr_el)>symbol_multiplier(l_el) && l_el!=ll_el && l_el!='bonus-') {
            symb_mult=symbol_multiplier(rr_el);
            if (!winreels_prec.has(l)) winreels.delete(l);
            winreels.add(rr);
          }
          else
            symb_mult=symbol_multiplier(l_el);
        }
        break;
      case 3:
        if (ll_el=='wild' && l_el=='wild') {
          symb_mult=symbol_multiplier(r_el);
        }        
        else if (ll_el=='wild' && r_el=='wild') {
          symb_mult=symbol_multiplier(l_el);
        }
        else if (ll_el=='wild' && rr_el=='wild') {
          if (symbol_multiplier(r_el)>symbol_multiplier(l_el)) {
            symb_mult=symbol_multiplier(r_el);
            if (!winreels_prec.has(l)) winreels.delete(l);
            if (!winreels_prec.has(ll)) winreels.delete(ll);
            winreels.add(r);
            winreels.add(rr);
          }
          else
            symb_mult=symbol_multiplier(l_el);
        }
        else if (l_el=='wild' && r_el=='wild') {
          if (symbol_multiplier(rr_el)>symbol_multiplier(ll_el)) {
            symb_mult=symbol_multiplier(rr_el);
            if (!winreels_prec.has(ll)) winreels.delete(ll);
            winreels.add(rr);
          }
          else
            symb_mult=symbol_multiplier(ll_el);
        }
        else if (l_el=='wild' && rr_el=='wild') {
          symb_mult=symbol_multiplier(r_el);
          if (symbol_multiplier(r_el)!=symbol_multiplier(ll_el) && r_el!='bonus') {
            if (!winreels_prec.has(ll)) winreels.delete(ll);
            line_mult=1.5;
            winreels.add(r);
            winreels.add(rr);
          }
        }
        else if (r_el=='wild' && rr_el=='wild') {
          symb_mult=symbol_multiplier(l_el);
        }
        break;
      case 4:
        if (ll_el!='wild')
          symb_mult=symbol_multiplier(ll_el);
        else if (l_el!='wild')
          symb_mult=symbol_multiplier(l_el);
        else if (r_el!='wild')
          symb_mult=symbol_multiplier(r_el);
        else if (rr_el!='wild')
          symb_mult=symbol_multiplier(rr_el);
        break;
      case 5:
        bigWin();
        break;
    }
  }


  //creazione dell'elemento line
  let line={ 
    line_mult: line_mult,
    symb_mult: symb_mult
  };
  console.log(line,lines.length);
  lines.push(line);
}


function checkWinning() {
  if (dynamicMode) disabilitaPulsantiStop();
  reelsContent=[];
  winreels=new Set();
  lines=[];
  // ottieni il contenuto dei rulli
  for (let i = 0; i < reels.length; i++) {
    let contenuto=reels[i].querySelector('.content').innerHTML;
    contenuto=contenuto.slice(20,-6);
    //console.log(contenuto);
    reelsContent.push(contenuto);
  }  
  //crea la linea che coinvolge i 5 rulli indicizzati in quest'ordine
  createLine(0,3,6,9,12);
  createLine(1,4,7,10,13);
  createLine(2,5,8,11,14);

  createLine(0,3,7,11,14);
  createLine(1,4,6,10,13);
  createLine(1,4,8,10,13);
  createLine(2,5,7,9,12);

  createLine(0,4,6,10,12);
  createLine(2,4,8,10,14);

  createLine(0,3,7,9,12);
  createLine(2,5,7,11,14);

  createLine(1,4,7,9,12);
  createLine(1,4,7,11,14);
  createLine(0,3,7,10,13);
  createLine(2,5,7,10,13);

  createLine(1,3,6,9,13);
  createLine(1,5,8,11,13);

  createLine(0,4,8,10,12);
  createLine(2,4,6,10,14);

  createLine(1,4,6,9,12);
  createLine(1,4,8,11,14);
  createLine(0,3,6,10,13);
  createLine(2,5,8,10,13);

  //linee a forma delle iniziali
  createLine(2,3,8,9,14);
  createLine(6,7,8,11,14);
  
  createLine(1,3,7,9,13);
  createLine(1,5,7,11,13);

  createLine(0,4,7,10,12);
  createLine(2,4,7,10,14);
  createLine(0,4,7,10,14);
  createLine(2,4,7,10,12);

  //attento che winreels è un oggetto di tipo Set e ha metodi un po' particolari
  winreels.forEach(function(value){
    let reel_content=reels[value].querySelector('.content');
    let symbol=reel_content.innerHTML.slice(20,-6);
    reel_content.innerHTML='<img  class="symbol-vincenti" src="./symbols/'+symbol+'.gif"> </img>';
    //reels[value].querySelector('.content').innerHTML='<img src="./symbols/gladiator.gif">';
    //boxShadowAnimation(reels[value]);
  });
  //jackpot=true;

  if (jackpot) {
    //messaggio per l'utente
    //impediamo all'utente di spinnare o bettare
    jackpot=false;
    spinButton.disabled=true;
    betting=false;
    $('.chip-img-btn').attr('disabled',true);

    setTimeout(function prepareJackPot() {
    console.log(document.body.style['cursor']);

    $('.content').fadeOut('1000');

    setTimeout(()=>{

    $('.slot-interface').css('cursor',"url('../../image/mirino1.png'), auto;");

    $('.content').html('<img display="hidden" src="../../image/bersaglio0.png">');
    $('.content').fadeIn('500');
    $('.reel-button').attr('disabled',false);

    },1000);
    },2000);

  }
  else {
    let multiplier=0;
    //calcolo del moltiplicatore come nella formula
    for (let i=0;i<lines.length;i++) {
      multiplier+=lines[i].line_mult*lines[i].symb_mult;
    }
    let win=multiplier*betValue/31;
    //console.log('WIN=',win);
    pagaBet(parseFloat(win.toFixed(2)));
    
    if (isBigWin) result.innerHTML="<div>Grande vittoria!</div><div>"+win.toFixed(2)+"</div>";
    else result.innerHTML="<div>Hai Vinto :</div><div>"+win.toFixed(2)+"</div>";


    if (auto_spin_value)
      auto_spin();
    else {
      betting=true;
      betValue=0;
      puntata.innerHTML=' 0';
      for (let i=0;i<lastBets.length;i++) lastBets.pop();
      disabilitaAnnullamento();
    }



  }

}

function jackpotFunction(e){
  //recupero l'elemento content del reel premuto
  let pressed_reel_content=$(e.target).parent()[0];
  pressed_reel_content.innerHTML='<img src="../../image/bersaglio0_shot.png" >';
  $('.reel-button').attr('disabled',true);

  //console.log(pressed_reel_content);

  $('.content').fadeOut(1000);
  setTimeout(()=> {
  //creo i moltiplicatori e li inserisco nell'insieme da cui estrarli
  let extract_multipliers=[];
  for (let i=0;i<jackpot_multipliers.length;i++) {
    for (let j=0;j<jackpot_multipliers_dist[i];j++)
      extract_multipliers.push(jackpot_multipliers[i]);
  }

  //inserisco nei content dei reels i moltiplicatori
  for (let i=0;i<reels.length;i++) {
    let num=extract_multipliers[Math.floor(Math.random() * extract_multipliers.length)];
    if(num==10){
      reels[i].querySelector('.content').innerHTML='<img src=../../image/bonus_10.png title=10>';
    }
    if(num==25){
      reels[i].querySelector('.content').innerHTML='<img src=../../image/bonus_25.png title=25>';
    }
    if(num==50){
      reels[i].querySelector('.content').innerHTML='<img src=../../image/bonus_50.png title=50>'
    }
    if(num==75){
      reels[i].querySelector('.content').innerHTML='<img src=../../image/bonus_75.png title=75>'
    }
    if(num==100){
      reels[i].querySelector('.content').innerHTML='<img src=../../image/bonus_100.png title=100>'
    }
    
    //console.log(reels[i].querySelector('.content').innerHTML);
      //si paga tra i 10x e i 100x la bet
     //console.log(pressed_reel_content);
  }
  /*
  //debug jackpot
  reels[0].querySelector('.content').innerHTML='<img src=../../image/bonus_100.png title=100>';
  reels[1].querySelector('.content').innerHTML='<img src=../../image/bonus_75.png title=75>';
  //
  */
  console.log(pressed_reel_content);
  let jackpot_mult=parseInt( $(pressed_reel_content).find('img').attr('title'));
  console.log(jackpot_mult);
  if (jackpot_mult>=75) bigWin();
  let win=jackpot_mult*betValue;
  //document.body.style.cursor = "auto";//rimette a posto il cursore
  if (isBigWin) result.innerHTML="<div>Grande Vittoria!</div><div>"+win.toFixed(2)+"</div>";
  else result.innerHTML="<div>Hai Vinto :</div><div>"+win.toFixed(2)+"</div>";
  pagaBet(parseFloat(win.toFixed(2)));
  $('.content').fadeIn('500');

  },1000); 


  
  setTimeout(()=>{$('.content').fadeOut('500');},3500);
  //dopo 3s vengono reinseriti i reels 
  setTimeout(function restoreSlot() {
  
  fill_reel();
  $('.content').fadeIn('500');



  $('.chip-img-btn').attr('disabled',false);

  if (auto_spin_value) auto_spin();
  else {
    betting=true;
    betValue=0;
    puntata.innerHTML=' 0';
    for (let i=0;i<lastBets.length;i++) lastBets.pop();
    disabilitaAnnullamento();
    spinButton.classList.add('fake-disabled');
    spinButton.disabled=false;
  }
    
},4000);

}

function fill_reel(){
  //usata anche per ripristinare i rulli di prima dopo il jackpot
  if (reelsContent) {
    for(i=0;i<reels.length;i++){
      let content =reels[i].querySelector('.content');
      if (winreels.has(i)) content.innerHTML ='<img src="./symbols/'+reelsContent[i]+'.gif">';
      else content.innerHTML ='<img src="./symbols/'+reelsContent[i]+'.png">';
    }
  }
  else {
    for(i=0;i<reels.length;i++){
      let content =reels[i].querySelector('.content');
      content.innerHTML ='<img src="./symbols/wild.png">';
    }
  }
}


function checkSlotDim(){//controllo la dimensione della slot-machine
  let slot_size=slotInt.clientWidth;//larghezza del div
  let slot_size_height=slotInt.clientHeight;//altezza del div
  return{slot_width:slot_size, slot_height:slot_size_height };
}

function checkGameCtnDim() {
  // controllo la dimensione della finestra del browser
  let width = gameCtn.clientWidth; // larghezza della finestra
  let height = gameCtn.clientHeight; // altezza della finestra
  return {gameWidth: width, gameHeight: height};
}

function checkWindowDim() {
  // controllo la dimensione della finestra del browser
  let width = document.documentElement.clientWidth; // larghezza della finestra
  let height = document.documentElement.clientHeight; // altezza della finestra
  return {width: width, height: height};
}


function bet(e) {
  //console.log(gameOver,betting);
  let saldo_current=parseFloat($('#navSaldo').html());
  if (saldo_current==0) return;
  //console.log(betting,saldo_current,$('#navSaldo').html());
  if (betting && betValue<=saldo_current) {
    //spinButton.disabled=false;
    spinButton.classList.remove('fake-disabled');

    //console.log(e.target.getAttribute("title"));
    lastBet=parseInt(e.target.getAttribute("title").substring(5));
    if (betValue+lastBet>=saldo_current) {
      lastBet=saldo_current-betValue;
      betValue+=lastBet;
    }
    else{
      betValue+=lastBet;
    }
    if (lastBet!=0) lastBets.push(lastBet);
    printSaldo('#saldo',-betValue,2);
    puntata.innerHTML= betValue;
    abilitaAnnullamento();
    if (!dynamicMode) abilitaPulsantiStop();
  }
}


function pagaBet(betValue) {
  //gameOver = true;
  if (betValue!=0) {
    let result=((parseFloat(navSaldo.innerText))+betValue).toFixed(2);
    $.ajax({
      type: "POST",
      url: "../aggiorna_saldo.php",
      data:  "saldo_attuale=" + result ,
      headers: {"Content-type": "application/x-www-form-urlencoded"},
      dataType: "json",
      success: function(risposta){
          result=risposta.saldo_to_js;

          if(result===-1){
            //console.log(risposta);//va blocctao il gioco
            exit();
          }

          //console.log(risposta);
      }
    });
    saldo.innerHTML=result;
    printSaldo('#navSaldo',0,2);
    printSaldo('#saldo',0,2);
  }
}


function annulla_last_bet(){
  if(lastBets.length!=0){
    disabilitaAnnullamento();
    lastBet=lastBets.pop();
    if (betValue<=0) {
      betValue=0;
      return;
    }
    if((betValue-lastBet)==0){
        //spinButton.disabled=true;
        spinButton.classList.add('fake-disabled');
        disabilitaPulsantiStop();
        for (let i=0;i<lastBets.length;i++) 
          lastBets.pop();
    }
    let saldo_current=parseFloat((parseFloat(saldo.innerText)+ lastBet).toFixed(2));
    betValue-=lastBet;
    puntata.innerHTML=betValue;
    printSaldo('#saldo',-betValue,2);
    //printSaldo('#navSaldo',-betValue,2);

    textAnimation(saldoBetContainer);
    boxShadowAnimation(saldoBetContainer);
    if (lastBets.length!=0) abilitaAnnullamento();
  }
}

function auto_spin(){
  //l' utente lo può premere solo dopo che ha fatto almeno una be
  if(betValue!=0){
    let saldo_current=parseFloat($('#saldo').html());
    if (betValue>saldo_current) {
      betValue=saldo_current;
      for (let i=0;i<lastBets.length;i++) lastBets.pop();
      lastBets.push(betValue);
    }
    if (additionalBet==0) {
      puntata.innerHTML=betValue.toFixed(2);
      printSaldo('#saldo',-betValue,2);
    }
    abilitaAnnullamento();
    if(dynamicMode){
      autoSpinTimeout=setTimeout(spin,1300);
    }
    else{
      if (!isFirstSpin ) abilitaPulsantiStop();  //(!isFirstSpin && !dynamicMode)
        autoSpinTimeout=setTimeout(spin,2500);
    }
  }
}

function abilitaAnnullamento(){
  annullaButton.disabled=false;
  annullaImg.classList.remove("annulla-img-red");
  annullaImg.classList.add("annulla-img-green"); 
}
function disabilitaAnnullamento(){
  annullaButton.disabled=true;
  annullaImg.classList.remove("annulla-img-green");
  annullaImg.classList.add("annulla-img-red");
}

function abilitaPulsantiStop(){
  /*
  stopButton1.disabled=false;
  stopButton2.disabled=false;
  stopButton3.disabled=false;
  stopButton4.disabled=false;
  stopButton5.disabled=false;
  */
  stopButton1.classList.remove('fake-disabled');
  stopButton2.classList.remove('fake-disabled');
  stopButton3.classList.remove('fake-disabled');
  stopButton4.classList.remove('fake-disabled');
  stopButton5.classList.remove('fake-disabled');

}

function disabilitaPulsantiStop(){
  /*
  stopButton1.disabled=true;
  stopButton2.disabled=true;
  stopButton3.disabled=true;
  stopButton4.disabled=true;
  stopButton5.disabled=true;
  */
 stopButton1.classList.add('fake-disabled');
 stopButton2.classList.add('fake-disabled');
 stopButton3.classList.add('fake-disabled');
 stopButton4.classList.add('fake-disabled');
 stopButton5.classList.add('fake-disabled');

}


function bigWin(){
  setTimeout(function(){
    slot_machine.style.backgroundImage = "url('../../image/firework.gif')";
    isBigWin=true;
  },500);

}

function stopHandler(int){//possiamo stoppare solo una colonna alla volta 
  if (betValue==0) {
    showMessage();
    return;
  }
  console.log(last_stop_clicked,last_stopped,dynamicMode,$('#saldo').html(),betValue);
  if (dynamicMode) {
    if(isSpinning){
      if(int==last_stop_clicked){ //se l' utente riclicca lo stesso tasto stop, la colonna ritorna libera
        stoppedReel.clear();
        evidenziaStopBtn(-1);
        last_stopped=last_stop_clicked;
        last_stop_clicked=-1;
      }
      else if (last_stop_clicked!=-1 || int==last_stopped ) return;
      else if (parseFloat($('#saldo').html())>=betValue/10){               
        //printSaldo('#saldo',-(betValue/10),2);
        puntata.innerHTML= (parseFloat(puntata.innerHTML)+betValue/10).toFixed(2);
        pagaBet(-(betValue/10));   
        stopRequest(int);
      }
    }
  }
  else {
    if (!isSpinning && !isFirstSpin) {
      //serve ad aggiornare saldo e puntata senza modificare betValue e quindi senza pagare di più
      if(int==last_stop_clicked){ //se l' utente riclicca lo stesso tasto stop, la colonna ritorna libera
        betting=true;
        stoppedReel.clear();
        evidenziaStopBtn(-1);

        last_stop_clicked=-1;
        
       // console.log(saldo.innerHTML);

        printSaldo('#saldo',-betValue,2);
        

        puntata.innerHTML= betValue;
        abilitaAnnullamento();
        modeButton.disabled=false;
       // autoSpin.disabled=false;
        additionalBet=0;
      }
      else if (last_stop_clicked!=-1 || int==last_stopped) return;
      else if (betValue!=0 && parseFloat($('#saldo').html())>=betValue/2){
        additionalBet=betValue/2;
        
        //console.log(saldo.innerHTML);

        if (!auto_spin_value) printSaldo('#saldo',-betValue-additionalBet,2);
        else {
          if (parseFloat($('#navSaldo').html())>=betValue+additionalBet)
              printSaldo('#saldo',-betValue-additionalBet,2);
          else {
            additionalBet=0;
            return;
          }
        }

        betting=false;    
        puntata.innerHTML= (additionalBet+betValue).toFixed(2);
        disabilitaAnnullamento();
        modeButton.disabled=true;
        stopRequest(int);
       // autoSpin.disabled=true;

      }
    }
  }
}

function stopRequest(int){
  fill_stoppedReel(int);
  evidenziaStopBtn(int);  //messe qui cosi non ho lag
}

function fill_stoppedReel(int){
  if(int==0){
    stoppedReel.add(0); stoppedReel.add(1); stoppedReel.add(2);
    last_stop_clicked=0;
  }
  if(int==1){
    stoppedReel.add(3); stoppedReel.add(4); stoppedReel.add(5);
    last_stop_clicked=1;
  }
  if(int==2){
    stoppedReel.add(6); stoppedReel.add(7); stoppedReel.add(8);
    last_stop_clicked=2;
  }
  if(int==3){
    stoppedReel.add(9); stoppedReel.add(10); stoppedReel.add(11);
    last_stop_clicked=3;
  }
  if(int==4){
    stoppedReel.add(12); stoppedReel.add(13); stoppedReel.add(14);
    last_stop_clicked=4;
  }
}

function evidenziaStopBtn(int){
  for(let i=0;i<stopButtons.length;i++){
    stopButtons[i].style.backgroundColor='#dcc349';
    stopButtons[i].style.color='black';
    if(int===i){
      stopButtons[i].style.backgroundColor='#0000ff';
      stopButtons[i].style.color='#dcc349'; 
    }
  }
}


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



annullaButton.addEventListener("click",annulla_last_bet);
stopButton1.addEventListener('click',function(){stopHandler(0)});
stopButton2.addEventListener('click',function(){stopHandler(1)});
stopButton3.addEventListener('click',function(){stopHandler(2)});
stopButton4.addEventListener('click',function(){stopHandler(3)});
stopButton5.addEventListener('click',function(){stopHandler(4)});

autoSpin.addEventListener('click',function(){
  console.log(auto_spin_value);
  if(auto_spin_value) {
    auto_spin_value=false;
    $('.auto-spin-img').css('background-image','url("../../image/auto-spin.png")');
    clearTimeout(autoSpinTimeout);
    for (let i=0;i<lastBets.length;i++) lastBets.pop();
    disabilitaAnnullamento();
    spinButton.disabled=false;
    if (!isSpinning && betValue!=0 && !jackpot) {
      puntata.innerHTML=' 0';
      betValue=0;
      betting=true;
      printSaldo('#saldo',0,2);
      last_stop_clicked=-1;
      last_stopped=-1;
      evidenziaStopBtn(-1);
      spinButton.classList.add('fake-disabled');
      disabilitaPulsantiStop();
    }
  }
  else{
    auto_spin_value=true;
    $('.auto-spin-img').css('background-image','url("../../image/auto-spin.gif")');
  }
});