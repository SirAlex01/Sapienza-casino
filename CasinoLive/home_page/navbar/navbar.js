//facciamo tutto qui tranne riempire i campi saldo ed email, che saranno riempiti dal 



function attivaNavbar(info,namePage,animNumber){
    
    let navEmail=document.querySelector('#navEmail');

    if(info==='email'){
        printEmail('#navEmail',animNumber) ;
    }
    else if(info==='username'){
        printUsername('#navEmail',animNumber) ;
    }
    else {
        navEmail.innerHTML='hai sbagliato ad inserire il primo parametro';
    }
    
    printSaldo('#navSaldo',0,animNumber);


    const colRicarica= document.querySelector('.navCas-col3');
    const colHomePage= document.querySelector('.navCas-col4');
    const colBlackJack= document.querySelector('.navCas-col5');
    const colSlotMachine= document.querySelector('.navCas-col6');
    const colLogOut= document.querySelector('.navCas-col7');

    const ricaricaIcon=document.querySelector('.nav-ricarica');
    const homePageIcon=document.querySelector('.nav-home-page');
    const blackJackIcon=document.querySelector('.nav-black-jack');
    const SlotMachineIcon=document.querySelector('.nav-slot-machine');
    const logOutIcon=document.querySelector('.nav-log-out');
  

  
    colRicarica.addEventListener('mouseenter', function() {
      ricaricaIcon.style.backgroundImage ="url(/CasinoLive/image/icon-ricarica.gif)";
    });
  
    colRicarica.addEventListener('mouseleave', function() {
      ricaricaIcon.style.backgroundImage ="url(/CasinoLive/image/icon-ricarica.png)";
    });
  
    colHomePage.addEventListener('mouseenter', function() {
        homePageIcon.style.backgroundImage = "url(/CasinoLive/image/icon-home.gif)";
    });
    
    colHomePage.addEventListener('mouseleave', function() {
        homePageIcon.style.backgroundImage = "url(/CasinoLive/image/icon-home.png)";
    });
  
    if(namePage!='black-jack'){
        colBlackJack.addEventListener('mouseenter', function() {
            blackJackIcon.style.backgroundImage = "url(/CasinoLive/image/icon-black-jack.gif)";
        });
        
        colBlackJack.addEventListener('mouseleave', function() {
            blackJackIcon.style.backgroundImage ="url(/CasinoLive/image/icon-black-jack.png)";
        });
    }    
    else{
        $('.desc-col5').text('Black Jack');
        $('.nav-black-jack').css('background-image', 'url(../../image/informazioni.png)');
    }


    if(namePage!='slot-machine'){
        colSlotMachine.addEventListener('mouseenter', function() {
            SlotMachineIcon.style.backgroundImage ="url(/CasinoLive/image/icon-slot-gladiatore.gif)";
        });
        
        colSlotMachine.addEventListener('mouseleave', function() {
            SlotMachineIcon.style.backgroundImage ="url(/CasinoLive/image/icon-slot-gladiatore.png)";
        });
    }
    else{
        $('.desc-col6').text('Ultimate spin');
        $('.nav-slot-machine').css('background-image', 'url(../../image/informazioni.png)');
    }



    colLogOut.addEventListener('mouseenter', function() {
      logOutIcon.style.backgroundImage ="url(/CasinoLive/image/icon-log-out.gif)";
    });
  
    colLogOut.addEventListener('mouseleave', function() {
      logOutIcon.style.backgroundImage ="url(/CasinoLive/image/icon-log-out.png)";
    });

    colRicarica.addEventListener('click',function(){
        window.location.href = '/CasinoLive/home_page/ricarica/ricarica.php';
    });

    colHomePage.addEventListener('click',function(){
        window.location.href = '/CasinoLive/home_page/welcome.php' ;
    });
    
    if(namePage!='black-jack'){
        colBlackJack.addEventListener('click',function(){
            window.location.href = '/CasinoLive/home_page/blackjack/blackjack.php';
        });
    }
    if(namePage!='slot-machine'){
        colSlotMachine.addEventListener('click',function(){
            window.location.href = '/CasinoLive/home_page/slot/index-Ultimate-Spin.php';
        });
    }
    colLogOut.addEventListener('click',function(){

        document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location= '/CasinoLive/index.html';  

    });
}



/*
function log_out() {
    document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location='../index.html';  
}*/