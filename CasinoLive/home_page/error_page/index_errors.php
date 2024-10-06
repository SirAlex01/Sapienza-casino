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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=no">
    <link rel="stylesheet" href="../prevent_default_scroll.css">
    <link rel="stylesheet" href="./index_errors.css">
    <script type="text/javascript" src="../jquery-3.6.4.min.js"></script> <!-- La versione potrebbe essere differente -->
    <script type="text/javascript" src="./index_errors.js" ></script>
   
    <script type="text/javascript" src="../funzioni_di_stampa/print_email_username_saldo.js" ></script>
    <script type="text/javascript" src="../navbar/navbar.js" ></script>
    <link rel="stylesheet" href="../navbar/navbar.css">
    <title>Document</title>
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

    <div class="errori-interface">
        <div class="info-interface">
            <div class="info-table">
                <div class="info-id-ora-email-ctn">
                    <div class="id-info">  -id </div>
                    <div class="ora-info"> ORARIO</div>
                    <div class="email-info"> EMAIL </div>
                </div>
                <div class="messaggio-info">     MESSAGGIO</div>
            </div>
        </div>
        <div id="messaggiDiErrore" class="messaggi-di-errore">
        <!--                                                            metto la struttura di un messaggio per chiarezza
            '<div id="comunication-'+i+'" class="comunication"> '+
            '   <div class="com-id-ora-email-erase-ctn">'+
            '     <div class="id-erase-ctn">'+
            '       <div id="ComIdNum" class="com-id-num" > n° -'+ i+' </div>'+
            '       <div id='+com_id+' class="com-erase">'+                             //qui serve che l' id sia pari all' id del database, questo viene garantito tramite js
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
            '     <br> messaggio: <br> '+user_message +'<br>'+
            '   </div> '+
            '</div>';
        -->
        </div>

    </div>

</body>
</html>

