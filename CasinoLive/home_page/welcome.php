<?php 
    if (session_status() === PHP_SESSION_ACTIVE) {
      // la sessione è già stata avviata
  } else {
      // la sessione non è stata ancora avviata
      session_start();
  } 
  
  if (!isset($_SESSION['email']) && !isset($_COOKIE['email'])) {
      header("Location: ../index.html");
  }
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./welcome.css">
    <link rel="stylesheet" href="./prevent_default_scroll.css">
    <script type="text/javascript" src="./jquery-3.6.4.min.js"></script> <!-- La versione potrebbe essere differente -->
    <script type="text/javascript" src="./welcome.js" ></script>

    <script type="text/javascript" src="./funzioni_di_stampa/print_email_username_saldo.js" ></script>
    <script type="text/javascript" src="./navbar/navbar.js" ></script>
    <link rel="stylesheet" href="./navbar/navbar.css">

</head>
<body>

    <div id="navbarCasino" class="navbar-casino">
        <div class="navCas-row">
            <div class="navCas-sub-row1">    
                <div class="navCas-col1">
                    <div class="desc-col1">Ciao</div>
                    <div id="navEmail"></div>               <!--l' username viene messo sempre qua-->
                </div>

                <div class="navCas-col2">
                    <div class="desc-col2">Saldo: </div>
                    <div id="navSaldo"></div> 
                </div>
            </div>
            <div class="navCas-sub-row2"> 
                <div class="navCas-col3">
                    <div class="desc-col3">Ricarica: </div>
                    <div class="nav-ricarica"></div> 
                </div>

                <div class="navCas-col4">
                    <div class="desc-col4">Home Page:</div>  
                    <div class="nav-home-page"></div> 
                </div>

                <div class="navCas-col5">
                    <div class="desc-col5">Black Jack </div>
                    <div class="nav-black-jack"></div>   
                </div>

                <div class="navCas-col6">
                    <div class="desc-col6">Slot Machine</div>
                    <div class="nav-slot-machine"></div>
                </div>

                <div class="navCas-col7">
                    <div class="desc-col7">Logout</div>
                    <div class="nav-log-out"></div>
                </div>
            </div>
        </div>
    </div>   

    <div class="home-page-cnt">
        <div class="hp-second-ctn">
            <div class="hp-interface">
                <div class="hp-col1">
                
                    <div id="placeRicaricaSmallDev" class="hp-ricarica-saldo-container-small-dev">
                    </div>

                    <div class="hp-black-jack-cnt">
                        <div class="hp-balck-jack-title">
                            Black Jack
                        </div>   
                        <a href=./blackjack/blackjack.php> 
                            <div class="hp-bj-img"> </div>
                        </a>
                    </div>

                    <div id="placeRicaricaLargeDev" class="hp-ricarica-saldo-container-large-dev">
                        <button id="ricaricaSaldo" title="Ricarica-saldo" class="btn-custom">
                            <div class="hp-ricarica-inside-button"     
                            onmouseenter="document.querySelector('.hp-ricarica-img-btn').src='../image/ricarica-icon-gif.gif';"
                            onmouseleave="document.querySelector('.hp-ricarica-img-btn').src='../image/ricarica-icon.png';" 
                            >
                                Ricarica
                                <img class="hp-ricarica-img-btn" src="../image/ricarica-icon.png" alt=" ">
                            </div>       
                        </button>
                    </div>
                </div>

                <div class="hp-col-padding"></div>

                <div class="hp-col2">
                    <div class="hp-slot-machine-interface">
                        <div class="hp-slot-machine-title">
                        Slot Machine
                        </div>   
                        <a href=./slot/index-Ultimate-Spin.php>  
                            <img class="hp-slot-img" >
                        </a>
                    </div>


                    <div id="hpContactUsContainer" class="hp-contact-us-container">
                        <button id="contact-us-btn" title="contact-us" class="btn-custom"> 
                            <div class="hp-contact-us-inside-button"     
                            onmouseover="document.querySelector('.hp-contact-us-img-btn').src='../image/contact-us.gif';"
                            onmouseout="document.querySelector('.hp-contact-us-img-btn').src='../image/contact-us-img.png';" 
                            >
                                Contattaci
                                <img class="hp-contact-us-img-btn" src="../image/contact-us-img.png" alt=" ">
                            </div>                    
                        </button>    

                        <div id="contactWindow" class="contact-window" hidden>
                            <form class="contact-us-form" id="contactForm" method="POST">
                                <div id="textAreaCtn" class="text-area-ctn">
                                    <textarea id="contactTextArea" class="contact-us-text-area" placeholder="massimo 500 caratteri" maxlength="500"></textarea>
                                </div>
                                <div id="messageButtonInterface" class="message-button-intreface"> 
                                    <button id="sendMessageButton" title="send_contact" type="submit" class="btn-invia">Invia</button>
                                    <button id="annullaContactUsButton" title="annulla" type="button" class="annulla-contact-us-button">
                                        <div class="annulla-img-green" id="annullaContactUsImg"> </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>            
            </div>
        </div>

    </div>
</body>
</html>



