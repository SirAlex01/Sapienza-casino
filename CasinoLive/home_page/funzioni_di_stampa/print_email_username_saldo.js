
function printEmail(idName,animNumber)   {  

  let divSaldo=document.querySelector(idName);
  if(divSaldo!=null){
    $.ajax({
      type: "POST",
      url: '/CasinoLive/home_page/funzioni_di_stampa/stampa_email_username.php',
      data:  { },
      dataType: "json",//ci si aspetta che la risposta dal server sia in formato JSON. 
      //debug
      //dataType: "text",

      success: function(risposta) {                                  //Se la risposta del server  è in formato JSON,
          
          //$risposta = array('successo'=>true,'conn_error'=>false,'db_error'=>false);
          
          let success = risposta.successo;        
          let conn_error = risposta.conn_error;
          let email=risposta.email;
          let username=risposta.username;

          if(success){
            divSaldo.innerHTML= email;
            textAnimationNavbar(divSaldo,animNumber);
          }
          if(conn_error){
            divSaldo.innerHTML+= 'Errore';
            textAnimationNavbar(divSaldo,animNumber);
          }
    
          //console.log(risposta);
      }
      ,                                    //Se la risposta del server non è in formato JSON, o c'è un errore di connesione
      error: function(risposta,jqXHR, textStatus, errorThrown) {
          console.log("Errore durante la richiesta AJAX:");
          console.log("Stato HTTP: " + jqXHR.status);
          console.log("Messaggio di errore: " + errorThrown);
        //console.log(risposta);
      
          divSaldo.innerHTML+= 'Errore';
          textAnimationNavbar(divSaldo,animNumber);
      } 
    });
  }
}



function printUsername(idName,animNumber)   { 

  let divSaldo=document.querySelector(idName);
  if(divSaldo!=null){
    $.ajax({
      type: "POST",
      url: '/CasinoLive/home_page/funzioni_di_stampa/stampa_email_username.php',
      data:  {decision :'email'},
      dataType: "json",//ci si aspetta che la risposta dal server sia in formato JSON. 
      //debug
      //dataType: "text",

      success: function(risposta) {                                  //Se la risposta del server  è in formato JSON,
          
          //$risposta = array('successo'=>true,'conn_error'=>false,'db_error'=>false);
          
          let success = risposta.successo;        
          let conn_error = risposta.conn_error;
          let email=risposta.email;
          let username=risposta.username;

          if(success){
            divSaldo.innerHTML= username;
            textAnimationNavbar(divSaldo,animNumber);
          }
          if(conn_error){
            divSaldo.innerHTML+= 'Errore';
            textAnimationNavbar(divSaldo,animNumber);
          }
        //console.log(risposta);
      }
      ,                                    //Se la risposta del server non è in formato JSON, o c'è un errore di connesione
      error: function(risposta,jqXHR, textStatus, errorThrown) {
          console.log("Errore durante la richiesta AJAX:");
          console.log("Stato HTTP: " + jqXHR.status);
          console.log("Messaggio di errore: " + errorThrown);
        //console.log(risposta);
      
          divSaldo.innerHTML+= 'Errore';
          textAnimationNavbar(divSaldo,animNumber);
      } 
    });
  }
}







function printSaldo(idName,int,animNumber){
  let divSaldo=document.querySelector(idName);
  if(divSaldo!=null){
  $.ajax({
    type: "POST",
    url: '/CasinoLive/home_page/funzioni_di_stampa/stampa_saldo.php',
    data:  { },
    dataType: "json",//ci si aspetta che la risposta dal server sia in formato JSON. 
    //debug
    //dataType: "text",

    success: function(risposta) {                                  //Se la risposta del server  è in formato JSON,
        //$risposta = array('successo'=>true,'conn_error'=>false,'db_error'=>false);
        let success = risposta.successo;        
        let conn_error = risposta.conn_error;
        let saldo=risposta.saldo;

        if(success){
          let saldo_finale=parseFloat(parseFloat(saldo)+int).toFixed(2);
          divSaldo.innerHTML= saldo_finale;
          textAnimationNavbar(divSaldo,animNumber);          
        }
        if(conn_error){
          divSaldo.innerHTML+= 'Errore';
          textAnimationNavbar(divSaldo,animNumber);
        }
       //console.log(risposta);
    }
    ,                                    //Se la risposta del server non è in formato JSON, o c'è un errore di connesione
    error: function(risposta,jqXHR, textStatus, errorThrown) {
        console.log("Errore durante la richiesta AJAX:");
        console.log("Stato HTTP: " + jqXHR.status);
        console.log("Messaggio di errore: " + errorThrown);
        
      //console.log(risposta);
      divSaldo.innerHTML+= 'Errore';
      textAnimationNavbar(divSaldo,animNumber);
    } 
  });
  }
}







// Qui dichiariamo la funzione printSaldo, che restituisce una promessa.
function promiseReturnSaldo(int) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: '/CasinoLive/home_page/funzioni_di_stampa/stampa_saldo.php',
      data:  {},
      dataType: "json",
      success: function(risposta) {
        let success = risposta.successo;
        let conn_error = risposta.conn_error;
        let saldo = risposta.saldo;
        if (success) {
          let saldo_finale = parseFloat(parseFloat(saldo)+ int).toFixed(2) ;        
          resolve({ saldo: saldo_finale });
        }
        if (conn_error) {
          reject(new Error('Errore , conn_error=true'));
        }
      },
      error: function(risposta, jqXHR, textStatus, errorThrown) {
        console.log("Errore durante la richiesta AJAX:");
        console.log("Stato HTTP: " + jqXHR.status);
        console.log("Messaggio di errore: " + errorThrown);

        reject(new Error('Errore durante la richiesta AJAX'));
      }
    });
  });
}
/*
// Qui dichiariamo la funzione myFunction, che utilizza la funzione printSaldo con await e gestisce eventuali errori con try-catch.
async function myFunction() {
  try {
    let money = await printSaldo('nulla', 0);
    let result = parseFloat((money.saldo + betValue).toFixed(2));
    // Utilizzare il valore di result qui
  } catch (error) {
    console.error(error);
  }
}
*/








/*
legenda:
 case 0 :   blu->celeste->blu
 case 1 :   rosso->blu->rosso
 case 2 : 

*/

function textAnimationNavbar(div,int){
  let duration = 3000; // durata dell'animazione in millisecondi
  let interval = 50; // intervallo di tempo tra le animazioni in millisecondi
  let startTime = new Date().getTime(); // tempo di inizio dell'animazione
  
  let nero = 'rgb(0, 0, 0)';
  let blu = 'rgb(0, 0, 255)';
  let rosso='rgb(255,0,0)';

  switch(int){
    
    case 1:

    if (div !== null) {
      div.style.color=blu; //inizializzo il testo al colore blu, potrei non farlo 
      let animationInterval = setInterval(() => {
      let timePassed = new Date().getTime() - startTime; // tempo trascorso dall'inizio dell'animazione
      let progress = timePassed / duration; // progresso dell'animazione (da 0 a 1)

      let celeste = 'rgb(127, 191, 255)';

        if (progress >= 1) {
          // L'animazione è terminata, ripristina il colore originale del testo
          clearInterval(animationInterval);
          div.style.color = blu; // Cambia il colore del testo al valore finale che si vuole
        } else {
          // Modifica il colore del testo in base al progresso dell'animazione
          let redValue, greenValue, blueValue;
          if (progress < 0.50) {
            // Colore blu  -> nero
            redValue = Math.min(127,Math.round(progress*2*255));
            greenValue = Math.min(191,Math.round(progress*2*255));
            blueValue = 255;
          } else if (progress > 0.50) {
            // Colore nero -> blu
            redValue = 127-Math.round((progress-0.5)*2*127);
            greenValue = 191-Math.round((progress-0.5)*2*191);
            blueValue = 255;
          }

          let textColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
          div.style.color = textColor;
        }
      }, interval);
    }
    break;


    case 2:
      if (div !== null) {
        div.style.color=blu; //inizializzo il testo al colore blu, potrei non farlo 
        let animationInterval = setInterval(() => {
        let timePassed = new Date().getTime() - startTime; // tempo trascorso dall'inizio dell'animazione
        let progress = timePassed / duration; // progresso dell'animazione (da 0 a 1)


          if (progress >= 1) {
            // L'animazione è terminata, ripristina il colore originale del testo
            clearInterval(animationInterval);
            div.style.color = rosso; // Cambia il colore del testo al valore finale che si vuole
          } else {
            // Modifica il colore del testo in base al progresso dell'animazione
            let redValue, greenValue, blueValue;
            if (progress < 0.50) {
              // Colore blu  -> nero
              redValue = 255-Math.round(progress*150);
              greenValue = Math.round(progress*120);
              blueValue = 0;
            } else if (progress > 0.50) {
              // Colore nero -> blu
              redValue = 180+Math.round((progress-0.5)*150);
              greenValue =60-Math.round((progress-0.5)*120);
              blueValue =0;
            }

            let textColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
            div.style.color = textColor;
          }
        }, interval);
      }

      break;
/*
      case 3:

      if (div !== null) {
        div.style.color=blu; //inizializzo il testo al colore blu, potrei non farlo 
        let animationInterval = setInterval(() => {
        let timePassed = new Date().getTime() - startTime; // tempo trascorso dall'inizio dell'animazione
        let progress = timePassed / duration; // progresso dell'animazione (da 0 a 1)

        let celeste = 'rgb(127, 191, 255)';

          if (progress >= 1) {
            // L'animazione è terminata, ripristina il colore originale del testo
            clearInterval(animationInterval);
            div.style.color = blu; // Cambia il colore del testo al valore finale che si vuole
          } else {
            // Modifica il colore del testo in base al progresso dell'animazione
            let redValue, greenValue, blueValue;
            if (progress < 0.50) {
              // Colore blu  -> nero
              redValue = Math.min(127,Math.round(progress*2*255));
              greenValue = Math.min(191,Math.round(progress*2*255));
              blueValue = 255;
            } else if (progress > 0.50) {
              // Colore nero -> blu
              redValue = 127-Math.round((progress-0.5)*2*127);
              greenValue = 191-Math.round((progress-0.5)*2*191);
              blueValue = 255;
            }

            let textColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
            div.style.color = textColor;
          }
        }, interval);
      }

      break;
*/





  }
}



/*

function textAnimationNavbar(div,int){
  let duration = 3000; // durata dell'animazione in millisecondi
  let interval = 50; // intervallo di tempo tra le animazioni in millisecondi
  let startTime = new Date().getTime(); // tempo di inizio dell'animazione
  
  switch(int){
    case 0:
      let nero = 'rgb(0, 0, 0)';
      let blu = 'rgb(0, 0, 255)';


      if (div !== null) {
        div.style.color=blu; //inizializzo il testo al colore blu, potrei non farlo 
        let animationInterval = setInterval(() => {
        let timePassed = new Date().getTime() - startTime; // tempo trascorso dall'inizio dell'animazione
        let progress = timePassed / duration; // progresso dell'animazione (da 0 a 1)

        let celeste = 'rgb(127, 191, 255)';

          if (progress >= 1) {
            // L'animazione è terminata, ripristina il colore originale del testo
            clearInterval(animationInterval);
            div.style.color = blu; // Cambia il colore del testo al valore finale che si vuole
          } else {
            // Modifica il colore del testo in base al progresso dell'animazione
            let redValue, greenValue, blueValue;
            if (progress < 0.50) {
              // Colore blu  -> nero
              redValue = Math.min(127,Math.round(progress*2*255));
              greenValue = Math.min(191,Math.round(progress*2*255));
              blueValue = 255;
            } else if (progress > 0.50) {
              // Colore nero -> blu
              redValue = 127-Math.round((progress-0.5)*2*127);
              greenValue = 191-Math.round((progress-0.5)*2*191);
              blueValue = 255;
            }

            let textColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
            div.style.color = textColor;
          }
        }, interval);
      }
      break;
    
    case 1:

    
      




  }
}

*/