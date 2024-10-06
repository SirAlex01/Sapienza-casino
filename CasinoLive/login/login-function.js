$(document).ready(function() {

    //controlla che ci siano credenziali già salvate

    let form_log_container=document.getElementById("form-login-container");

    //controlla se sono già stati inizializzati cookies
    if (document.cookie.indexOf("email") != -1 && document.cookie.indexOf("password")) {
        console.log(email,password);
    }

    let log_ok_array = [true, true];
    //define ok_array order
    //[email_ok,  password_ok];
    let log_email_ok=0;
    let log_password_ok=1;


    let log_original_code='<form class="login-form" id="log-form" method="POST">' +
    '<div class="login-form-title">' +
    '   <h1>Loggati!</h1>' +
    '       </div>' +
    '           <div class="login-email-cnt">' +
    '               <label for="inputEmail" class="label">Inserire Email:</label><br>' +
    '               <input id="log-email" type="email" name="inputEmail" class="login-email-txt" required autofocus><br>' +
    '           </div><br>' +
    '       <div class="login-pass-cnt">' +
    '           <label for="inputPassword" class="label">Inserire Password:</label><br>' +
    '              <input id="log-password" type="password" name="inputPassword" class="login-pass-txt" required>' +
    '           </div>' +
    '       <div id="divRemember" class="check-remember">' +
    '           <input type="checkbox" name="remember" id="log-rmb">' +
    '           <label for="rmb">Ricordami</label>' +
    '       </div>' +
    '       <div class="login-send-btn">' +
    '           <button title="Log-in" type="submit" class="btn-custom">' +
    '                <img class="img-btn" src="./image/fingerprint-security-lineal-img.png" alt="Log-in"' +
    '                onmouseover="this.src=\'./image/fingerprint-security-lineal-gif3.gif\';"' +
    '                onmouseout="this.src=\'./image/fingerprint-security-lineal-img.png\';">' +
    '           </button>' +
    '       </div>' +
    '</form>';
    

    let log_str_info = {
        log_email_str: "",
        log_password_str: "",
    };


    let log_emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let log_specialChars = /[@%^&*()_+\-=\[\]{};':"\\|<>\/?]/;
    let log_uppercaseChars = /[A-Z]/;
    let log_numberChars = /[0-9]/;



    $("#log-form").submit(function(event){
        //appena il form viene inviato parte questo codice

        let log_email = $("#log-email").val();    //prendo i valori nei campi
        let log_password=$("#log-password").val();
        let remember = $("#log-rmb").prop("checked"); //true se checked
        

        // resetta le stringhe di errore
        log_str_info.log_email_str = "";
        log_str_info.log_password_str = "";


        // resetta il valore dell'ok_array
        log_ok_array = [true, true];

        //controllo email
        if(log_email === ""){
            log_ok_array[log_email_ok]=false;
            log_str_info.log_email_str='<div class="reg-error-str" >Inserire un email valida</div>';
        }
        else{
            if(!log_emailRegex.test(log_email)){// test return ->true se collima
                log_ok_array[log_email_ok]=false;
                log_str_info.log_email_str='<div class="reg-error-str" >Inserire email valida***</div>';
            }
        }


        //controllo password
        if(log_password === ""){
            log_ok_array[log_password_ok]=false;
            log_str_info.log_password_str='<div class="reg-error-str" >La password non può essere vuota</div>';
        }
        else{//password non vuota
            if(log_specialChars.test(log_password)){
                log_ok_array[log_password_ok]=false;
                log_str_info.log_password_str='<div class="reg-error-str" >La password non può contenere caratteri speciali</div>';
            }
            else{//la pass non contiene caratteri speciali
                if(!log_uppercaseChars.test(log_password)){
                    log_ok_array[log_password_ok]=false;
                    log_str_info.log_password_str='<div class="reg-error-str" >La password deve contenre caratteri maiuscoli</div>';
                }
                else{//la password contiene caratteri maiuscoli 
                    if(!log_numberChars.test(log_password)){
                        log_ok_array[log_password_ok]=false;
                        log_str_info.log_password_str='<div class="reg-error-str" >La password deve contenere almeno un numero</div>';
                        }
                    }
                }
        }



        if(log_ok_array[log_email_ok] === false || log_ok_array[log_password_ok] === false ){ //se c'è stato qualche errore di inserimento 
        
            // se i campi non sono stati inseriti correttamente, mostra un messaggio di errore
            form_log_container.innerHTML = '<div class="reg-error-container">'+ log_str_info.log_email_str+'<br>'+log_str_info.log_password_str+'</div>';
        
            // attiva il timer per ripristinare il form dopo 3 secondi
            setTimeout(function() {
                form_log_container.innerHTML = log_original_code;
                aggiorna_log_page();
            }, 3000);

            // impedisce l'invio del form, lo fa perche ritorna prima di mandare la richiesta
            return false;
        }
        
        //se si desidera essere ricordati, si aggiungono i cookie
        if (remember) {

            // Impostazione dei cookie persistenti
            var data_scadenza = new Date();
            data_scadenza.setTime(dataScadenza.getTime() + (12 * 30 * 24 * 60 * 60 * 1000)); // Impostazione della data di scadenza (1 anno)
            document.cookie = "email="+log_email+"; expires=" + data_scadenza.toUTCString() + "; path=/";
            document.cookie = "password="+log_password+"; expires=" + data_scadenza.toUTCString() + "; path=/";
            console.log(document.cookie);
        }


        //se è tutto ok faccio partire la richiesta
        $.ajax({
            type: "POST",
            url: "./login/login.php",
            data: "l_email=" + log_email+"&l_password="+log_password,    //remember è un bool
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            dataType: "json",//ci si aspetta che la risposta dal server sia in formato JSON. 
    //debug        //dataType : "text",

            success: function(risposta) {                                  //Se la risposta del server  è in formato JSON,
                
                let conn_error = risposta.conn_error;
                let log_error = risposta.login_error;
                let no_in_db_error = risposta.db_error;
                let success = risposta.successo;
                let EMAIL = risposta.email;
                let messaggio = risposta.messaggio;

                if(success === true){
                            //gestione successo, devo essere rimandato alla pagina di welcome
                            console.log(risposta);
                            window.location.href = "./home_page/welcome.php";
                }

                if(conn_error === true){
                    form_log_container.innerHTML = '<div class="reg-error-str">OPS.. sembra si sia veririficato un problema di connessione, riprova'+messaggio+'</div>'; 
                }

                if(no_in_db_error===true){
                    form_log_container.innerHTML = '<div class="reg-error-str"> Ciao '+ EMAIL+', questa email  non risulta gi&aacute registrata nei nostri database, effettua la registrazione qui vicino</div>';         
                    focus_on_registration();
                }

                if(log_error === true ){
                    form_log_container.innerHTML = '<div class="reg-error-str"> Ciao '+ EMAIL+' Password sbagliata riprovare </div>';         
                }



                setTimeout(function() {
                    form_log_container.innerHTML = log_original_code;
                    aggiorna_log_page();
                }, 1800);

                //DEGUB
                console.log(risposta);
            }

            ,                                    //Se la risposta del server non è in formato JSON, o c'è un errore di connesione
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log("Errore durante la richiesta AJAX:");
                    console.log("Stato HTTP: " + jqXHR.status);
                    console.log("Messaggio di errore: " + errorThrown);
                //DEBUG

                    form_log_container.innerHTML = '<div class="reg-error-str"> OPs... Si è verificato un errore, Contattaci, ritorneremo Presto! </div>';         
                    setTimeout(function() {
                        form_log_container.innerHTML = log_original_code;
                        aggiorna_log_page();
                    }, 1300);
                
                //gestione dell' errore di risposta da parte del server
            }
            
            });

            

        return false;//blocca la normale esecuzione, la richiesta già è stata inviata non deve essere mandata nuovamente
    });
});


//**login function sopra */

//*reguìistration function sotto  */


function aggiorna_log_page(){


        let form_log_container=document.getElementById("form-login-container");
    
        let log_ok_array = [true, true];
        //define ok_array order
        //[email_ok,  password_ok];
        let log_email_ok=0;
        let log_password_ok=1;
    
    
        let log_original_code='<form class="login-form" id="log-form" method="POST">' +
        '<div class="login-form-title">' +
        '   <h1>Loggati!</h1>' +
        '       </div>' +
        '           <div class="login-email-cnt">' +
        '               <label for="inputEmail" class="label">Inserire Email:</label><br>' +
        '               <input id="log-email" type="email" name="inputEmail" class="login-email-txt" required autofocus><br>' +
        '           </div><br>' +
        '       <div class="login-pass-cnt">' +
        '           <label for="inputPassword" class="label">Inserire Password:</label><br>' +
        '              <input id="log-password" type="password" name="inputPassword" class="login-pass-txt" required>' +
        '           </div>' +
        '       <div id="divRemember" class="check-remember">' +
        '           <input type="checkbox" name="remember" id="log-rmb">' +
        '           <label for="rmb">Ricordami</label>' +
        '       </div>' +
        '       <div class="login-send-btn">' +
        '           <button title="Log-in" type="submit" class="btn-custom">' +
        '                <img class="img-btn" src="./image/fingerprint-security-lineal-img.png" alt="Log-in"' +
        '                onmouseover="this.src=\'./image/fingerprint-security-lineal-gif3.gif\';"' +
        '                onmouseout="this.src=\'./image/fingerprint-security-lineal-img.png\';">' +
        '           </button>' +
        '       </div>' +
        '</form>';
        
    
        let log_str_info = {
            log_email_str: "",
            log_password_str: "",
        };
    
    
        let log_emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let log_specialChars = /[@%^&*()_+\-=\[\]{};':"\\|<>\/?]/;
        let log_uppercaseChars = /[A-Z]/;
        let log_numberChars = /[0-9]/;
    
    
    
        $("#log-form").submit(function(event){
            //appena il form viene inviato parte questo codice
    
            let log_email = $("#log-email").val();    //prendo i valori nei campi
            let log_password=$("#log-password").val();
            let remember = $("#log-rmb").prop("checked"); //true se checked
            
    
            // resetta le stringhe di errore
            log_str_info.log_email_str = "";
            log_str_info.log_password_str = "";
    
    
            // resetta il valore dell'ok_array
            log_ok_array = [true, true];
    
            //controllo email
            if(log_email === ""){
                log_ok_array[log_email_ok]=false;
                log_str_info.log_email_str='<div class="reg-error-str" >Inserire un email valida</div>';
            }
            else{
                if(!log_emailRegex.test(log_email)){// test return ->true se collima
                    log_ok_array[log_email_ok]=false;
                    log_str_info.log_email_str='<div class="reg-error-str" >Inserire email valida***</div>';
                }
            }
    
    
            //controllo password
            if(log_password === ""){
                log_ok_array[log_password_ok]=false;
                log_str_info.log_password_str='<div class="reg-error-str" >La password non può essere vuota</div>';
            }
            else{//password non vuota
                if(log_specialChars.test(log_password)){
                    log_ok_array[log_password_ok]=false;
                    log_str_info.log_password_str='<div class="reg-error-str" >La password non può contenere caratteri speciali</div>';
                }
                else{//la pass non contiene caratteri speciali
                    if(!log_uppercaseChars.test(log_password)){
                        log_ok_array[log_password_ok]=false;
                        log_str_info.log_password_str='<div class="reg-error-str" >La password deve contenre caratteri maiuscoli</div>';
                    }
                    else{//la password contiene caratteri maiuscoli 
                        if(!log_numberChars.test(log_password)){
                            log_ok_array[log_password_ok]=false;
                            log_str_info.log_password_str='<div class="reg-error-str" >La password deve contenere almeno un numero</div>';
                            }
                        }
                    }
            }
    
    
    
            if(log_ok_array[log_email_ok] === false || log_ok_array[log_password_ok] === false ){ //se c'è stato qualche errore di inserimento 
            
                // se i campi non sono stati inseriti correttamente, mostra un messaggio di errore
                form_log_container.innerHTML = '<div class="reg-error-container">'+ log_str_info.log_email_str+'<br>'+log_str_info.log_password_str+'</div>';
            
                // attiva il timer per ripristinare il form dopo 3 secondi
                setTimeout(function() {
                    form_log_container.innerHTML = log_original_code;
                    aggiorna_log_page();
                }, 3000);
    
                // impedisce l'invio del form, lo fa perche ritorna prima di mandare la richiesta
                return false;
            }
    
    
            //se è tutto ok faccio partire la richiesta
            $.ajax({
                type: "POST",
                url: "./login.php",
                data: "l_email=" + log_email+"&l_password="+log_password+"&rmb_me="+remember,    //remember è un bool
                headers: {"Content-type": "application/x-www-form-urlencoded"},
                dataType: "json",//ci si aspetta che la risposta dal server sia in formato JSON. 
        //debug        //dataType : "text",
    
                success: function(risposta) {                                  //Se la risposta del server  è in formato JSON,
                    
                    let conn_error = risposta.conn_error;
                    let log_error = risposta.login_error;
                    let no_in_db_error = risposta.db_error;
                    let success = risposta.successo;
                    let EMAIL = risposta.email;
                    let messaggio = risposta.messaggio;
    
                    if(success === true){
                                //gestione successo, devo essere rimandato alla pagina di welcome
                                console.log(risposta);
                                window.location.href = "./home_page/welcome.php";
                    }
    
                    if(conn_error === true){
                        form_log_container.innerHTML = '<div class="reg-error-str">OPS.. sembra si sia veririficato un problema di connessione, riprova'+messaggio+'</div>'; 
                    }
    
                    if(no_in_db_error===true){
                        form_log_container.innerHTML = '<div class="reg-error-str"> Ciao '+ EMAIL+', questa email  non risulta gi&aacute registrata nei nostri database, effettua la registrazione qui vicino</div>';         
                        focus_on_registration();
                    }
    
                    if(log_error === true ){
                        form_log_container.innerHTML = '<div class="reg-error-str"> Ciao '+ EMAIL+' Password sbagliata riprovare </div>';         
                    }
    
    
    
                    setTimeout(function() {
                        form_log_container.innerHTML = log_original_code;
                        aggiorna_log_page();
                    }, 1800);
    
                    //DEGUB
                    console.log(risposta);
                }
    
                ,                                    //Se la risposta del server non è in formato JSON, o c'è un errore di connesione
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log("Errore durante la richiesta AJAX:");
                        console.log("Stato HTTP: " + jqXHR.status);
                        console.log("Messaggio di errore: " + errorThrown);
                    //DEBUG
    
                        form_log_container.innerHTML = '<div class="reg-error-str"> OPs... Si è verificato un errore, Contattaci, ritorneremo Presto! </div>';         
                        setTimeout(function() {
                            form_log_container.innerHTML = log_original_code;
                            aggiorna_log_page();
                        }, 1300);
                    
                    //gestione dell' errore di risposta da parte del server
                }
                
                });
    
    
                
    
            return false;//blocca la normale esecuzione, la richiesta già è stata inviata non deve essere mandata nuovamente
        });
       


}



function focus_on_registration() {
    const regContainer = document.getElementById('form-reg-container');
    let duration = 10000; // durata dell'animazione in millisecondi
    let interval = 50; // intervallo di tempo tra le animazioni in millisecondi
    let startTime = new Date().getTime(); // tempo di inizio dell'animazione

    if (regContainer !== null) {
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
                regContainer.style.boxShadow = `${boxcolor} 0 0 0 ${boxShadowSize}px inset`;
                clearInterval(close_animation_interval);
            }
            else{
                boxShadowSize=boxShadowSize-0.5;
                regContainer.style.boxShadow = `${boxcolor} 0 0 0 ${boxShadowSize}px inset`;
            }

            },interval);
          

        } 
        else {
          // Modifica la dimensione dell'ombra in base al progresso dell'animazione

            redValue = 255 - Math.round(progress * 255);
            greenValue = Math.min(Math.round(progress * 350),255);             //(progress * -x-), il val di -x- fa diventare verde prima la shadow
            boxShadowColor = `rgb(${redValue}, ${greenValue}, 0)`;

            boxShadowSize = 10 + (Math.sin(2*progress * Math.PI * 2)*4 ); // dimensione dell'ombra (oscillazione sinusoidale)
            regContainer.style.boxShadow = `${boxShadowColor} 0 0 0 ${boxShadowSize}px inset`;
          
        }
      }, interval);
    }
    
  }