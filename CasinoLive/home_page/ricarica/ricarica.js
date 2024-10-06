$(document).ready(function() {
let minHeight=200;
let minWidth=185;

attivaNavbar('username','ricarica',2);

const button50=document.getElementById("ricarica-50");
const button150=document.getElementById("ricarica-150");
const button300=document.getElementById("ricarica-300");
const button700=document.getElementById("ricarica-700");

const img50 =  button50.querySelector('.ricarica50-img-btn');
const img150 = button150.querySelector('.ricarica150-img-btn');
const img300 = button300.querySelector('.ricarica300-img-btn');
const img700 = button700.querySelector('.ricarica700-img-btn');

resizeFunction();
window.addEventListener('resize',function(){
     resizeFunction()});

button50.addEventListener('mouseenter', function(event) {
    img50.src = '../../image/ricarica-icon-gif.gif';
});

button50.addEventListener('mouseleave', function(event) {
    img50.src = '../../image/ricarica-icon.png';
});

button150.addEventListener('mouseenter', function(event) {
    img150.src = '../../image/money-150.gif';
});

button150.addEventListener('mouseleave', function(event) {
    img150.src = '../../image/money-150-removebg.jpg';
});

button300.addEventListener('mouseenter', function(event) {
    img300.src = '../../image/money-300.gif';
});

button300.addEventListener('mouseleave', function(event) {
    img300.src = '../../image/money-300-removebg.png';
});

button700.addEventListener('mouseenter', function(event) {
    img700.src = '../../image/money-700.gif';
});

button700.addEventListener('mouseleave', function(event) {
    img700.src = '../../image/money-700-removebg.png';
});



function ricarica50(){
    effettuaRicarica(50);
}
function ricarica150(){
    effettuaRicarica(150);
}
function ricarica300(){
    effettuaRicarica(300);
}
function ricarica700(){
    effettuaRicarica(700);
}


function resizeFunction(){
    let ricSize=ricaricaSize();
    let ricAlt=ricSize.height;

    if(ricAlt>minHeight){
        img50.style.display="block";
        img150.style.display="block";
        img300.style.display="block";        
        img700.style.display="block";
    }
    else{
        img50.style.display="none";
        img150.style.display="none";
        img300.style.display="none";        
        img700.style.display="none";
    }
};


effettuaRicarica(0);
button50.addEventListener("click",ricarica50);
button150.addEventListener("click",ricarica150);
button300.addEventListener("click",ricarica300);
button700.addEventListener("click",ricarica700);
});


function effettuaRicarica(quota_da_ricaricare){
    const contactContainer=document.getElementById("message");
    const divBottoni = document.querySelector('#bottoniDiRicarica');
    const divImgSostitutiva = document.querySelector('#divImgSostituto');
    const immagineSostitutiva = document.querySelector('#message-img');
    //se tutto va bene posso inviare il testo al server
    $.ajax({
    type: "POST",
    url: "./ricarica_saldo.php",
    data:  {importo_ricarica: quota_da_ricaricare},//"importo_ricarica=" + quota_da_ricaricare,
    headers: {"Content-type": "application/x-www-form-urlencoded"},
    dataType: "json",//ci si aspetta che la risposta dal server sia in formato JSON. 
    //debug
    //dataType: "text",

    success: function(risposta) {                                  //Se la risposta del server  è in formato JSON,
        
        //$risposta = array('email'=>$email,'successo'=>true,'conn_error'=>false,'db_error'=>false,'Ricarica avvenuta con successo, il saldo totale è:'+$saldo_nuovo);
        

        let EMAIL = risposta.email;    
        let success = risposta.successo;        
        let conn_error = risposta.conn_error;
        let no_in_db_error = risposta.db_error;
        let saldo_aggiornato = risposta.saldo;
        saldo_aggiornato = parseFloat(parseFloat(saldo).toFixed(2)) ;
        
        if(success){ 
            if(quota_da_ricaricare==0){
                contactContainer.innerHTML= ' <br>Ciao    '+EMAIL+'     , Il tuo saldo disponibile &eacute : <div class="saldo-in-message"> '+saldo_aggiornato+' </div><br>vuoi aggiornarlo? ';
                textAnimation(contactContainer);
            }
            else{
                contactContainer.innerHTML= '<br>Saldo Aggiornato con successo , il tuo saldo &eacute: <div class="saldo-in-message"> '+saldo_aggiornato+' </div><br> Buon divertimento nel nostro casino!';
                textAnimation(contactContainer);
                stampaMessaggioOk(divBottoni,divImgSostitutiva,immagineSostitutiva);
            }
        }
        if(conn_error){
            contactContainer.innerHTML= ' <br> OPs, sembra si sia verificato un problema con il server, <br> ritorneremo a breve !';
            textAnimation(contactContainer);
        }
        if(no_in_db_error){
            contactContainer.innerHTML= '<br> OPs, sembra si sia verificato un problema con il server,<br> riprova fra un pò ';
            textAnimation(contactContainer);
        }

        //DEGUB
        console.log(risposta);

        printSaldo('#navSaldo',0,2);

    }

    ,                                    //Se la risposta del server non è in formato JSON, o c'è un errore di connesione
    error: function(risposta,jqXHR, textStatus, errorThrown) {
            console.log("Errore durante la richiesta AJAX:");
            console.log("Stato HTTP: " + jqXHR.status);
            console.log("Messaggio di errore: " + errorThrown);
        //DEBUG
        console.log(risposta);
        const divBottoni = document.querySelector('#bottoniDiRicarica');
        const divImgSostitutiva = document.querySelector('#divImgSostituto');
        const immagineSostitutiva = document.querySelector('#message-img');

        contactContainer.innerHTML= '<br> OPs,si è verificato un problema,<br>      Conattaci, Ritorneremo Presto  </div>';
        textAnimation(contactContainer);
        stampaMessaggioNonOk(divBottoni,divImgSostitutiva,immagineSostitutiva);

    }
    
});
}

function ricaricaSize(){
    const ricaricaInt=document.querySelector('#ricaricaInterface');
    alt=ricaricaInt.clientHeight;
    larg=ricaricaInt.clientWidth;
    return {height:alt,width:larg};
}

function stampaMessaggioOk(divBottoni,divImgSostitutiva,immagineSostitutiva){
    divBottoni.style.display="none";
    divImgSostitutiva.style.display="block";
    immagineSostitutiva.classList.add("messaggio-ok");
    setTimeout(function() {
        immagineSostitutiva.classList.remove("messaggio-ok");
        divBottoni.style.display="flex";
        divImgSostitutiva.style.display="none";
    }, 5000);
}

function stampaMessaggioNonOk(divBottoni,divImgSostitutiva,immagineSostitutiva){
    divBottoni.style.display="none";
    divImgSostitutiva.style.display="block";
    immagineSostitutiva.classList.add("messaggio-non-ok");
    setTimeout(function() {
        immagineSostitutiva.classList.remove("messaggio-non-ok");
        divBottoni.style.display="flex";
        divImgSostitutiva.style.display="none";
    }, 700000);
}


/*nero->celeste->blu->bianco->nero    voto 7/10     considerando sempre che fanno schifo */
function textAnimation(div) {
    let duration = 3000; // durata dell'animazione in millisecondi
    let interval = 50; // intervallo di tempo tra le animazioni in millisecondi
    let startTime = new Date().getTime(); // tempo di inizio dell'animazione
    let nero = 'rgb(0, 0, 0)';
    let celeste = 'rgb(127, 191, 255)';
    let blu = 'rgb(0, 0, 255)';
  
    if (div !== null) {
      let animationInterval = setInterval(() => {
        let timePassed = new Date().getTime() - startTime; // tempo trascorso dall'inizio dell'animazione
        let progress = timePassed / duration; // progresso dell'animazione (da 0 a 1)
  
        if (progress >= 1) {
          // L'animazione è terminata, ripristina il colore originale del testo
          clearInterval(animationInterval);
          div.style.color = nero; // Cambia il colore del testo al valore finale che si vuole
        } else {
          // Modifica il colore del testo in base al progresso dell'animazione
          let redValue, greenValue, blueValue;
          if (progress < 0.25) {
            // Colore nero -> celeste
            redValue = 0;
            greenValue = Math.round(progress * 4 * 191);
            blueValue = Math.round(progress * 4 * 255);
          } else if (progress < 0.75) {
            // Colore celeste -> blu
            redValue = Math.round((progress - 0.25) * 4 * 255);
            greenValue = Math.round((progress - 0.25) * 4 * 191);
            blueValue = 255;
          } else {
            // Colore blu -> nero
            redValue = Math.round((1 - progress) * 4 * 255);
            greenValue = 0;
            blueValue = 0;
          }
          let textColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
          div.style.color = textColor;
        }
      }, interval);
    }
  }
