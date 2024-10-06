
$(document).ready(function() {
  
  const infoMessageCtn = document.querySelector('.info-message');
  const regFormCtn=document.querySelector('.reg-form');


  //all' inzio sono tutti e due visibili, nascondiamo il div messaggio
  //e prepariamo l' event listener
  infoMessageCtn .style.display='none'; 
  
  $('.col-info').on('click', function(){
    regFormCtn.style.display='none'; 
    infoMessageCtn.style.display='flex'; 
    hideMessage();
  });



  function showMessage(){
    $('.col-info').on('click', function(){
      regFormCtn.style.display='none'; 
      infoMessageCtn.style.display='flex'; 
    });
    hideMessage();
  }

  function hideMessage(){
    $('#indietroCtn').on('click',function(){
      regFormCtn.style.display='flex';
      infoMessageCtn.style.display='none'; 
      showMessage();
    });  
  }
});






/*
let message_code= '<div class= info-interface>'+
'   <div class="email-info"> email: si prega di inserire un email valida</div>'+
'   <div class="username-info">Username: &eacute possibile scegliere qualsiasi username</div>'+
'   <div class="eta-info">Et&aacute: Per giocare si deve aver compiuto 18 anni </div>'+
'   <div class="password-info">Password: La password deve rispettare le seguenti caratteristiche: </div>'+
'   <ol type="i">'+
'       <li> - Lunghezza compresa fra 5 e 25 caratteri(inclusi)</li> '+
'       <li> <div class="passNOchar">- NON deve contenere i seguenti caratteri speciali: <br>'+
'              @ % ^ & * ( ) _ + \- = \[ \] { } ; \' : " \\ | < > \/ ? </div></li><br>'+
'       <li>  - Deve contenere almeno un numero </li>'+
'       <li> - Deve contenere almeno un carattere maiuscolo </li>'+
'   </ol>'+
'  <div class="indietro-ctn" id="indietroCtn">'+
'     <div class="indietro-img"></div>'+
'  </div>'+
'</div>';
*/

