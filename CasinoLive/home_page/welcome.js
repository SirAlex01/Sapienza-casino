

$(document).ready(function() {
    attivaNavbar('username','welcome',1);
    //let contactContainer =document.getElementsByClassName("hp-contact-us-container")[0];
    //let ricaricaLargeDev= document.getElementById("placeRicaricaLargeDev");
    //let ricaricaSmallDev= document.getElementById("placeRicaricaSmallDev");
    
    let contactContainer =document.getElementById("hpContactUsContainer");
    let ricaricaLargeDev= document.getElementById("placeRicaricaLargeDev");
    let ricaricaSmallDev= document.getElementById("placeRicaricaSmallDev");
    let ricaricaSaldoButton= document.getElementById("ricaricaSaldo");

    
    ricaricaSaldoButton.addEventListener("click",gotoRicarica);//event listner per la ricarica
    function gotoRicarica(){
        location.href='./ricarica/ricarica.php';
    }


    inizializzazioneDivRicarica();
    window.addEventListener('resize', spostaDivRicarica);
    
    function inizializzazioneDivRicarica(){//si paret che è settato tutto su large
        //se lo schermo è grande non faccio nulla
        if (window.innerWidth <= 600 ) {            //se lo schermo è piccolo sposto
          var temp = ricaricaLargeDev.removeChild(ricaricaSaldoButton);
          ricaricaLargeDev.style.display="none";
          ricaricaSmallDev.style.display="block";
          ricaricaSmallDev.appendChild(temp);
    } } 
      
    function spostaDivRicarica() {
        if (window.innerWidth <= 600) {
            if (ricaricaLargeDev.childElementCount > 0){            //se il bottone si trovano in alto e deve essere spostato
                var temp1 = ricaricaLargeDev.removeChild(ricaricaSaldoButton);
                ricaricaLargeDev.style.display="none";
                ricaricaSmallDev.style.display="block";
                ricaricaSmallDev.appendChild(temp1);
            }
            //se sono gia in basso non facico nulla
        }  
        else {
            if (ricaricaSmallDev.childElementCount > 0){            //se i bottoni si trovano in basso e devono essere spostati
                var temp2 = ricaricaSmallDev.removeChild(ricaricaSaldoButton);
                ricaricaLargeDev.style.display="flex";
                ricaricaSmallDev.style.display="none";
                ricaricaLargeDev.appendChild(temp2);
            }
    }   }        //se sono gia in alto non facico nulla 
  
      
    
    let orginal_contact_code=
    '<button id="contact-us-btn" title="contact-us" class="btn-custom">' +
    '   <div class="hp-contact-us-inside-button" ' +
    '   onmouseenter="document.querySelector(\'.hp-contact-us-img-btn\').src=\'../image/contact-us.gif\';" ' +
    '   onmouseleave="document.querySelector(\'.hp-contact-us-img-btn\').src=\'../image/contact-us-img.png\';">' +
    '       Contattaci' +
    '       <img class="hp-contact-us-img-btn" src="../image/contact-us-img.png" alt=" ">' +
    '   </div>' +
    '</button>';
    

    let new_contact_code= 
    '<div class="contact-window">' +
    '   <form class="contact-us-form" id="contactForm" method="POST">' +
    '       <div  id="textAreaCtn" class="text-area-ctn">'+
    '           <textarea id="contactTextArea" class="contact-us-text-area" placeholder="massimo 500 caratteri" maxlength="500"></textarea>' +
    '       </div>'+
    '       <div id="messageButtonInterface" class="message-button-intreface"> '+
    '           <button id="sendMessageButton" title="send_contact" type="submit" class="btn-invia">Invia</button>' +
    '           <button id="annullaContactUsButton" title="annulla" type="button" class="annulla-contact-us-button">'+
    '               <div class="annulla-img-green" id="annullaContactUsImg"> </div>'+
    '           </button>'+
    '       </div>' +
    '   </form>' +
    '</div>';

    //let response_code= '<div class="contact-result" id="contactResult"> </div>';

    aggiorna_home_page();



    function aggiorna_home_page(){      
        
        $("#contact-us-btn").click(function() {

            contactContainer.innerHTML = new_contact_code;
            contactContainer.style.width = "100%";
            contactContainer.style.display="block";
            let textAreaBorder=document.getElementById("textAreaCtn");
            let textArea = document.getElementById("contactTextArea");
            let maxChars = parseInt(textArea.getAttribute("maxlength"));
            
            
            
            $("#annullaContactUsButton").click(function(event){
                contactContainer.innerHTML = orginal_contact_code;
                contactContainer.style.width = "";
                contactContainer.style.display="flex";
                aggiorna_home_page();                
            return false;
            });


            textArea.addEventListener("input", function() {         //adattamento degli stili della text area in base al testo inserito 
                this.style.height = "auto";
                //this.style.height = (this.scrollHeight + 2) + "px";

                var currentChars = this.value.length;
                if(currentChars==0){
                    textAreaBorder.style.borderColor= "black";
                }
                else{
                    if (currentChars >= maxChars) {
                        textAreaBorder.style.borderColor = "red";
                    } else {
                        textAreaBorder.style.borderColor = "green";
                    }
                }
            });
                


            $("#contactForm").submit(function(event){

                //controllo del testo inserito 
                let textAreaContent = $("#contactTextArea").val();
                
                if(textAreaContent.length<5){
                    
                    contactContainer.innerHTML= '<div class="contact-result" id="contactResult"> <br> Inserire un Testo valido</div>';
                    
                    setTimeout(function() {
                        contactContainer.innerHTML = orginal_contact_code;
                        contactContainer.style.width = "";
                        contactContainer.style.display="flex";
                        aggiorna_home_page();
                    }, 1800);


                    return false;
                    
                }


                //se tutto va bene posso inviare il testo al server
                $.ajax({
                    type: "POST",
                    url: "./welcome_contact.php",
                    data: "contact_message=" + textAreaContent,
                    headers: {"Content-type": "application/x-www-form-urlencoded"},
                    dataType: "json",//ci si aspetta che la risposta dal server sia in formato JSON. 
                //debug
                    //dataType: "text",

                    success: function(risposta) {                                  //Se la risposta del server  è in formato JSON,
                        
                        //$risposta = array('email'=>' ','successo'=>false,'conn_error'=>true,'db_error'=>false,'messaggio_per_js'=>$error_message);
                        
                        let EMAIL = risposta.email;    
                        let success = risposta.successo;        
                        let conn_error = risposta.conn_error;
                        let no_in_db_error = risposta.db_error;
                        let messaggio = risposta.messaggio_per_js;
        
                        if(success){
                            contactContainer.innerHTML= '<div class="contact-result" id="contactResult">  Messaggio inviato con successo!!<br> ti auguriamo il massimo divertimento con il nostro Casinò </div>';
                        }
                        if(conn_error){
                            contactContainer.innerHTML= '<div class="contact-result" id="contactResult"> <br> OPs, sembra si sia verificato un problema con il server, <br> ritorneremo a breve !</div>';
                        }
                        if(no_in_db_error){
                            contactContainer.innerHTML= '<div class="contact-result" id="contactResult"> <br> OPs, sembra si sia verificato un problema con il server,<br> riprova fra un pò </div>';
                        }


                        setTimeout(function() {
                            contactContainer.innerHTML = orginal_contact_code;
                            contactContainer.style.width = "";
                            contactContainer.style.display="flex";
                            aggiorna_home_page();
                        }, 1800);


                        //DEGUB
                        console.log(risposta);
                    }
        
                    ,                                    //Se la risposta del server non è in formato JSON, o c'è un errore di connesione
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.log("Errore durante la richiesta AJAX:");
                            console.log("Stato HTTP: " + jqXHR.status());
                            console.log("Messaggio di errore: " + errorThrown);
                        //DEBUG
                        }
                    
                });
        
                return false;
            });

        });
    }

});

