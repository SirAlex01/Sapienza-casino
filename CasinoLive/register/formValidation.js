$(document).ready(function() {

    let form_reg_container=document.getElementById("form-reg-container");

    let reg_ok_array = [true, true, true, true];
    //define ok_array order
    //[email_ok, username_ok, password_ok, eta_ok];
    let reg_email_ok=0;
    let reg_username_ok=1;
    let reg_password_ok=2;
    let reg_eta_ok=3;

    let reg_original_code='<form id="reg_form"  method="POST" class="reg-form" name="myForm">' +
    '<div class="reg-form-title">' +
    '    <h1>Registrati!</h1>' +
    '</div>' +
    '<div class="reg-email-cnt">' +
    '    <label for="inputEmail" class="label">Inserire Email:</label><br>' +
    '    <input type="email" id="reg-email" name="inputEmail" class="reg-email-txt" required autofocus><br>' +
    '</div>' +
    '<div class="reg-username-cnt">' +
    '    <label for="inputUsername" class="label">Inserire Username:</label><br>' +
    '    <input id="reg-username" type="text" name="inputUsername" class="reg-username-txt" autofocus/>' +
    '</div>' +
    '<div class="reg-pass-cnt">' +
    '    <label for="inputPassword" class="label">Inserire Password:</label><br>' +
    '    <input id="reg-password" type="password" name="inputPassword" class="reg-pass-txt" required autocomplete="off">' +
    '</div>' +
    '<table class="reg-eta-cnt">' +
    '    <tr class="row-eta">' +
    '        <td class="col-eta">' +
    '            <label for="inputEta" class="label">Inserire et&aacute;:</label><br>' +
    '            <input id="reg-eta" min="0" type="number" name="inputEta" class="reg-eta-number" data-defaul="0" autofocus/>' +
    '        </td>' +
    '        <td class="col-info-eta">' +
    '            <img title="Devi avere pi&uacute; di 18 anni" class="info-img" src="./image/info-icon.png" onclick="showTitle(this);">' +
    '        </td>' +
    '    </tr>' +
    '</table><br>' +
    '<div class="reg-send-btn">' +
    '    <button type="submit" class="btn btn-custom">Sign-in!</button>' +
    '</div>' +
    '</form>';
   

    let reg_str_info = {
        reg_email_str: "",
        reg_username_str: "",
        reg_password_str: "",
        reg_eta_str: ""
    };


    let reg_emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let reg_specialChars = /[@%^&*()_+\-=\[\]{};':"\\|<>\/?]/;
    let reg_uppercaseChars = /[A-Z]/;
    let reg_numberChars = /[0-9]/;



    $("#reg_form").submit(function(event){
        //appena il form viene inviato parte questo codice

        let reg_email = $("#reg-email").val();    //prendo i valori nei campi
        let reg_eta = $("#reg-eta").val();
        let reg_password=$("#reg-password").val();
        let reg_username=$("#reg-username").val();
 


            
        // resetta le stringhe di errore
        reg_str_info.reg_email_str = "";
        reg_str_info.reg_username_str = "";
        reg_str_info.reg_password_str = "";
        reg_str_info.reg_eta_str = "";

        // resetta il valore dell'ok_array
        reg_ok_array = [true, true, true, true];

        //controllo email
        if(reg_email === ""){
            reg_ok_array[reg_email_ok]=false;
            reg_str_info.reg_email_str='<div class="reg-error-str" >Inserire un email valida</div>';
        }
        else{
            if(!reg_emailRegex.test(reg_email)){// test return ->true se collima
                reg_ok_array[reg_email_ok]=false;
                reg_str_info.reg_email_str='<div class="reg-error-str" >Inserire email valida***</div>';
            }
        }

        //contorollo username
        if (reg_username === "") {
            reg_ok_array[reg_username_ok]=false;
            reg_str_info.reg_username_str='<div class="reg-error-str" >L\' Username non può essere vuoto</div>';
        }

        //controllo password
        if(reg_password === ""){
            reg_ok_array[reg_password_ok]=false;
            reg_str_info.reg_password_str='<div class="reg-error-str" >La password non può essere vuota</div>';
        }
        else{//password non vuota
            if(reg_specialChars.test(reg_password)){
                reg_ok_array[reg_password_ok]=false;
                reg_str_info.reg_password_str='<div class="reg-error-str" >La password non può contenere caratteri speciali</div>';
            }
            else{//la pass non contiene caratteri speciali
                if(!reg_uppercaseChars.test(reg_password)){
                    reg_ok_array[reg_password_ok]=false;
                    reg_str_info.reg_password_str='<div class="reg-error-str" >La password deve contenre caratteri maiuscoli</div>';
                }
                else{//la password contiene caratteri maiuscoli 
                    if(!reg_numberChars.test(reg_password)){
                        reg_ok_array[reg_password_ok]=false;
                        reg_str_info.reg_password_str='<div class="reg-error-str" >La password deve contenere almeno un numero</div>';
                        }
                    }
                }
        }

        //controllo età
        if(reg_eta === ""){
            reg_ok_array[reg_eta_ok]=false;
            reg_str_info.reg_eta_str='<div class="reg-error-str" >Inserire l\'età</div>';
        }
        else{
            if(isNaN(reg_eta) || parseInt(reg_eta) < 1 || parseInt(reg_eta) > 120){
                reg_ok_array[reg_eta_ok]=false;
                reg_str_info.reg_eta_str='<div class="reg-error-str" >Inserire un\'età valida (1-120)</div>';
            }
            else if(reg_eta<18){
                reg_ok_array[reg_eta_ok]=false;
                reg_str_info.reg_eta_str='<div class="reg-error-str" >Per iscriverti DEVI ESSERE MAGGIORENNE</div>';
            }   

        }



        if(reg_ok_array[reg_email_ok] === false || reg_ok_array[reg_username_ok] === false || reg_ok_array[reg_password_ok] === false || reg_ok_array[reg_eta_ok] === false ){ //se c'è stato qualche errore
        
            // se i campi non sono stati inseriti correttamente, mostra un messaggio di errore
            form_reg_container.innerHTML = '<div class="reg-error-container">'+ reg_str_info.reg_email_str+'<br>'+reg_str_info.reg_eta_str+'<br>'+reg_str_info.reg_password_str+'<br>'+reg_str_info.reg_username_str+'</div>';
        
            // attiva il timer per ripristinare il form dopo 3 secondi
            setTimeout(function() {
                form_reg_container.innerHTML = reg_original_code;
            }, 3000);

            // impedisce l'invio del form, lo fa perche ritorna prima di mandare la richiesta
            return false;
        }


        //se è tutto ok faccio partire la richiesta
        $.ajax({
            type: "POST",
            url: "./register/registration.php",
            data: "r_email=" + reg_email+"&r_eta="+reg_eta+"&r_password="+reg_password+"&r_username="+reg_username,
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            dataType: "json",//ci si aspetta che la risposta dal server sia in formato JSON. 
        //debug
        //dataType: "text",
            success: function(risposta) {                                  //Se la risposta del server  è in formato JSON,
               
                let conn_error = risposta.conn_error;
                let reg_error = risposta.registr_error;
                let success = risposta.successo;
                let USERNAME = risposta.nome_utente;
                let messaggio = risposta.messaggio;

                if(success){
                    form_reg_container.innerHTML = '<div class="reg-error-str"> Ciao '+ USERNAME + ' hai completato la registrazione con Successo<br> puoi effettuare l\'accesso qui vicino </div>'; 
                    focus_on_login();
                }

                if(conn_error){
                    form_reg_container.innerHTML = '<div class="reg-error-str">OPS.. sembra si sia veririficato un problema di connessione, riprova'+messaggio+'</div>'; 
                }

                if(reg_error){
                    form_reg_container.innerHTML = '<div class="reg-error-str"> Ciao '+ USERNAME+', questa email risulta gi&aacute registrata, effettua il Log-in qui vicino</div>';         
                    focus_on_login();
                }

                setTimeout(function() {
                    form_reg_container.innerHTML = reg_original_code;
                }, 3000);

                //DEGUB
                console.log(risposta);
            }

            ,                                    //Se la risposta del server non è in formato JSON, o c'è un errore di connesione
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log("Errore durante la richiesta AJAX:");
                   console.log("Stato HTTP: " + jqXHR.status());
                   console.log("Messaggio di errore: " + errorThrown);
                //DEBUG

                    form_reg_container.innerHTML = '<div class="reg-error-str"> OPs... Si è verificato un errore, Contattaci, ritorneremo Presto! </div>';         
                    setTimeout(function() {
                        form_reg_container.innerHTML = reg_original_code;
                    }, 1300);
                
                //gestione dell' errore di risposta da parte del server
            }
            
         });


         

        return false;//blocca la normale esecuzione, la richiesta già è stata inviata non deve essere mandata nuovamente
    });
});





function focus_on_login() {
    const loginContainer = document.getElementById('form-login-container');
    let duration = 10000; // durata dell'animazione in millisecondi
    let interval = 50; // intervallo di tempo tra le animazioni in millisecondi
    let startTime = new Date().getTime(); // tempo di inizio dell'animazione

    if (loginContainer !== null) {
      //let originalBoxShadow = window.getComputedStyle(loginContainer).getPropertyValue('box-shadow'); // valore iniziale dell'ombra
    

        let redValue;
        let greenValue;
        let boxShadowColor;
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
                loginContainer.style.boxShadow = `${boxcolor} 0 0 0 ${boxShadowSize}px inset`;
                clearInterval(close_animation_interval);
            }
            else{
                boxShadowSize=boxShadowSize-0.5;
                loginContainer.style.boxShadow = `${boxcolor} 0 0 0 ${boxShadowSize}px inset`;
            }

            },interval);
          

        } 
        else {
          // Modifica la dimensione dell'ombra in base al progresso dell'animazione

           redValue = 255 - Math.round(progress * 255);
           greenValue = Math.min(Math.round(progress * 350),255);             //(progress * -x-), il val di -x- fa diventare verde prima la shadow
           boxShadowColor = `rgb(${redValue}, ${greenValue}, 0)`;

            boxShadowSize = 10 + (Math.sin(2*progress * Math.PI * 2)*4 ); // dimensione dell'ombra (oscillazione sinusoidale)
            loginContainer.style.boxShadow = `${boxShadowColor} 0 0 0 ${boxShadowSize}px inset`;
          


        }
      }, interval);
    }
  }