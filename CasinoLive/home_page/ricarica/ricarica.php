<?php 
    if (session_status() === PHP_SESSION_ACTIVE) {
      // la sessione è già stata avviata
  } else {
      // la sessione non è stata ancora avviata
      session_start();
  } 
  
  if (!isset($_SESSION['email']) && !isset($_COOKIE['email'])) {
      header("Location: ../../index.html");
  }
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=no">
    <link rel="stylesheet" href="../prevent_default_scroll.css">
    <link rel="stylesheet" href="./ricarica.css">
    <script type="text/javascript" src="../jquery-3.6.4.min.js"></script> <!-- La versione potrebbe essere differente -->
    <script type="text/javascript" src="../ricarica/ricarica.js"></script>
    <script type="text/javascript" src="../funzioni_di_stampa/print_email_username_saldo.js" ></script>
    <script type="text/javascript" src="../navbar/navbar.js" ></script>
    <link rel="stylesheet" href="../navbar/navbar.css">
    
    <title>Ricarica Saldo</title>
</head>
<body>

    <div id="navbarCasino" class="navbar-casino">
        <div class="navCas-row">
            <div class="navCas-sub-row1">    
                <div class="navCas-col1">
                    <div class="desc-col1">Ciao</div>
                    <div id="navEmail"></div>
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

    <div id="ricaricaInterface" class="ricarica-interface">

        <div class="orizzontal-initial-padding" style="display:none;"></div>
        <div class="result-interface" id="resultInterface">
            <div id="message" class="message-to-user"></div>
        </div>


        <div id="divImgSostituto" class="result-img-cnt" > <!--hidden at the start-->
            <div id="message-img"></div> <!--ci vengono aggiunte delle classi in basi alle immagini che si vogliono-->
        </div>

        <div id="bottoniDiRicarica" class="bottoni-di-ricarica">    
            <!----><!--poi questo sotto diventa hidden quando message-img assume qualche classe-->
            <div id="ricaricaButtonrow1" class="ricarica-button-row1">

                <button id="ricarica-50" title="50 chip" class="btn-custom">
                    <div class="ricarica50-inside-button"     >
                        <div class="btn-description">
                        Ricarica 50 chips
                        </div> 
                        <img class="ricarica50-img-btn" src="../../image/ricarica-icon.png" alt=" ">
                    </div>       
                </button>

                <div class="vertical-buttons-padding"></div>

                <button id="ricarica-150" title="150 chip" class="btn-custom">
                    <div class="ricarica150-inside-button">
                        <div class="btn-description">
                        Ricarica 150 chips
                        </div>
                        <img class="ricarica150-img-btn" src="../../image/money-150-removebg.jpg" alt=" ">
                    </div>       
                </button>
            </div>

            <div class="orizzontal-buttons-padding"></div>

            <div id="ricaricaButtonrow2" class="ricarica-button-row2">

                <button id="ricarica-300" title="300 chip" class="btn-custom">
                    <div class="ricarica300-inside-button"    >
                        <div class="btn-description">
                        Ricarica 300 chips
                        </div>
                        <img class="ricarica300-img-btn" src="../../image/money-300-removebg.png" alt=" ">
                    </div>       
                </button>

                <div class="vertical-buttons-padding"></div>

                <button id="ricarica-700" title="700 chip" class="btn-custom">
                    <div class="ricarica700-inside-button"     >
                        <div class="btn-description">
                        Ricarica 700 chips
                        </div>  
                        <img class="ricarica700-img-btn" src="../../image/money-700-removebg.png" alt=" ">
                    </div>       
                </button>
            </div>

        </div>

    </div>

</body>
</html>


