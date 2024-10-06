let risposta_global;
let start_id;


$(document).ready(function() {
  const errorContainer=document.getElementById("messaggiDiErrore");
  attivaNavbar('email','error-page',1);

  $.ajax({
  type: "POST",
  url: "./print_errors.php",
  data:  {stampa_errori: true},//"importo_ricarica=" + quota_da_ricaricare,
  headers: {"Content-type": "application/x-www-form-urlencoded"},
  dataType: "json",//ci si aspetta che la risposta dal server sia in formato JSON. 
  //debug
  //dataType: "text",

  success: function(risposta) {                                  //Se la risposta del server  è in formato JSON,
      
      //$risposta = array('email'=>$email,'successo'=>true,'conn_error'=>false,'db_error'=>false,'Ricarica avvenuta con successo, il saldo totale è:'+$saldo_nuovo);
      
      let EMAIL = risposta.email;
      let db_vuoto = risposta.db_vuoto;    
      let success = risposta.successo;        
      let conn_error = risposta.conn_error;
      let no_in_db_error = risposta.db_error;
      let messaggio_errore = risposta.messaggio_errore;

      if(success){

        if(db_vuoto){
          let user_message=messaggio_errore[0].messaggio;
          errorContainer.innerHTML+= '<div class="comunication"> <div class="nulla-in-db">  '+user_message +'  <br></div> </div>';
        }
        else{
          risposta_global=risposta;
          start_id=risposta.messaggio_errore[0].id;

          for(var i=0;i<messaggio_errore.length;i++){
              let user_email=messaggio_errore[i].email;
              let user_message=messaggio_errore[i].messaggio;
              let user_orario=messaggio_errore[i].ora;
              let com_id=messaggio_errore[i].id;
              errorContainer.innerHTML+= '<div id="comunication-'+i+'" class="comunication"> '+
                                        '   <div class="com-id-ora-email-erase-ctn">'+
                                        '     <div class="id-erase-ctn">'+
                                        '       <div id="ComIdNum" class="com-id-num" > n° -'+ i+' </div>'+
                                        '       <div id='+com_id+' class="com-erase">'+
                                        '         <div class="com-erase-img"> </div>'+
                                        '       </div>'+
                                        '     </div>'+
                                        '     <div class="com-orario">'+
                                        '        ora: <br>'+user_orario +
                                        '     </div>'+
                                        '     <div class="com-email">'+
                                        '         email: <br>'+ user_email  +
                                        '     </div>'+
                                        '   </div>'+
                                        '   <div class="com-errore">  '+
                                        '      messaggio: <br> '+user_message +'<br>'+
                                        '   </div> '+
                                        '</div>';
          }
          //facciamo un secondo ciclo per gli eventListerner(dentro uno non sono riuscito metteva solo all' ultimo)
          const eraseButtons= document.querySelectorAll('.com-erase');
          eraseButtons.forEach(div=>{
              div.addEventListener('click',()=>{
                const id_number=parseInt(div.getAttribute('id'));
                eraseLine(id_number);
              });
          });

          const  eraseButtonsImage= document.querySelectorAll('.com-erase-img');
          eraseButtonsImage.forEach(div=>{
            div.addEventListener('mouseenter',()=>{
              div.style.backgroundImage = "url('../../image/trash-icon.gif')";
            });
            div.addEventListener('mouseleave',()=>{
              div.style.backgroundImage = "url('../../image/trash-icon.png')"; 
            });
          });

          textAnimation(errorContainer);
        }

        //DEGUB
       // console.log(risposta);
      }


      if(conn_error){
          errorContainer.innerHTML+= '<div class="comunication"> <br> OPs, sembra si sia verificato un problema con il server, <br> ritorneremo a breve !</div>';
          textAnimation(errorContainer);
      }
      if(no_in_db_error){
          errorContainer.innerHTML+= '<div class="comunication"><br> OPs, sembra si sia verificato un problema con il server,<br> riprova fra un pò </div>';
          textAnimation(errorContainer);
      }
      
      //DEGUB
      //console.log(risposta);
  }

  ,                                    //Se la risposta del server non è in formato JSON, o c'è un errore di connesione
  error: function(risposta,jqXHR, textStatus, errorThrown) {
          console.log("Errore durante la richiesta AJAX:");
          console.log("Stato HTTP: " + jqXHR.status);
          console.log("Messaggio di errore: " + errorThrown);
      //DEBUG
      //console.log(risposta);
    
      errorContainer.innerHTML+= ' <div class="comunication"> OPs,si è verificato un problema </div>';
      textAnimation(errorContainer);
  }
  
  });





  function eraseLine(numero_id){

    $.ajax({
      type: "POST",
      url: "./erase_error.php",
      data:  {id: numero_id},
      headers: {"Content-type": "application/x-www-form-urlencoded"},
      dataType: "json",//ci si aspetta che la risposta dal server sia in formato JSON. 
      //debug
      //dataType: "text",

      success: function(risposta) {                                  //Se la risposta del server  è in formato JSON,
          
          //$risposta = array('successo'=>true,'conn_error'=>false,'db_error'=>false);
          
          let success = risposta.successo;        
          let conn_error = risposta.conn_error;
          let no_in_db_error = risposta.db_error;

          if(success){
            errorContainer.innerHTML= '<div class="comunication"> <br>Messaggio Eliminato correttamente <br> La pagina si ricaricherà automaticamente  </div>';
            console.log(risposta);
            textAnimation(errorContainer);
            setTimeout(()=>location.reload(),2500);
            
          }
          if(conn_error){
              errorContainer.innerHTML+= '<div class="comunication"> <br> OPs, sembra si sia verificato un problema con il server, <br> ritorneremo a breve !</div>';
              textAnimation(errorContainer);
          }
          if(no_in_db_error){
              errorContainer.innerHTML+= '<div class="comunication"><br> OPs, sembra si sia verificato un problema con il server,<br> riprova fra un pò </div>';
              textAnimation(errorContainer);
          }
          
          //DEGUB
          //console.log(risposta);
      }

      ,                                    //Se la risposta del server non è in formato JSON, o c'è un errore di connesione
      error: function(risposta,jqXHR, textStatus, errorThrown) {
              console.log("Errore durante la richiesta AJAX:");
              console.log("Stato HTTP: " + jqXHR.status);
              console.log("Messaggio di errore: " + errorThrown);
          //DEBUG
          //console.log(risposta);
      
          errorContainer.innerHTML+= ' <div class="comunication"> OPs,si è verificato un problema </div>';
          textAnimation(errorContainer);
      } 
    });
  }
});
    


















    //blue->celeste->blue
    
function textAnimation(div) {
  let duration = 3000; // durata dell'animazione in millisecondi
  let interval = 50; // intervallo di tempo tra le animazioni in millisecondi
  let startTime = new Date().getTime(); // tempo di inizio dell'animazione
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
}

