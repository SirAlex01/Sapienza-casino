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
<html lang="it">
<head>
	<title>Utlimate Spin</title>
    <link rel="stylesheet" type="text/css" href="../prevent_default_scroll.css">
    <link rel="stylesheet" href="../navbar/navbar.css">
    <link rel="stylesheet" type="text/css" href="style-Ultimate-Spin.css">
    
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <script src="../jquery-3.6.4.min.js"></script>
    <script type="text/javascript" src="../funzioni_di_stampa/print_email_username_saldo.js" ></script>
	<script type="text/javascript" src="../navbar/navbar.js" ></script>

</head>
<body id="body">

    <div class="welcome-img" id="welcomeImg" > </div>

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


    <div id="istruzioniCtn" class="istruzioni-ctn">
        <div class="istruzioni-interface">
            <div class="close-istruzioni">
                <div class="close-istruzioni-btn"></div>
            </div>
            <div class="istruzioni-1">
                <div style="display:flex; flex-direction:row;">Ciao <div id="istr-name" style="padding-left:10px;"></div></div>
                <div class="content-istr1">    
                Esistono 2 modalità di Gioco:<br><br>
                - Modalità Statica: i pulsanti di Stop, fermano la colonna selezionata per un giro della slot. E' possibile premerne solo uno alla volta e SOLAMENTE AD INIZIO PUNTATA. Non si può bloccare la stessa colonna per più giri consecutivi. Per bloccare una linea, bisogna pagare una cifra pari a metà della puntata, che viene restituita qualora si decidesse di non bloccarla più, clickando di nuovo il pulsante.<br>
                - Modalità Dinamica: i pulsanti di Stop, fermano la rispettiva colonna, DURANTE il giro della slot. Se si ripreme il pulsante della colonna Bloccata mentre le altre stanno ancora girando, anche questa ritornerà a girare e si potrà bloccare un altra colonna. Non è possibile bloccare una colonna appena sbloccata. E' possibile bloccare solo una colonna alla volta. In questa modalità bloccare una colonna ha un prezzo pari a un decimo della puntata ogni volta. Sbloccarla è invece gratuito.<br><br>
                Si può passare da una modalità all' altra solamente quando la slot è ferma. Inoltre, se si sta bloccando una colonna in modalità statica, non è possibile passare a quella dinamica.<br> Quando si passa da dinamica a statica, prima di poter stoppare una colonna si deve aspettare un giro della slot. Al primo spin dopo il cambio di modalità da dinamica a statica, non è concesso fermare alcuna colonna.<br><br><br>
                -AutoSpin, è possibile far girare la slot automaticamente. L'autospin prende l' importo della puntata nel momento in cui è stato attivato e gioca con quell' importo ogni volta, finché o l' utente non lo disattiva o funche non finisce il saldo. Fra un giro e un altro della slot, passeranno 2 seconodi in tal modo si ha la possibilità di stoppare qualche colonna in modalità statica ed eventualmente modificare la puntata. Attenzione: la modifica della puntata varrà per ogni spin automatico a partire da quello in cui è stata effettuata!<br><br>

                la slot paga con 31 linee che sono illustrate in fondo.<br><br>
                Sono presenti in tutto 8 simboli ognuno dei quali ha il suo rispettivo moltiplicatore:<br>
                </div>
            </div>
            <div class="lista-moltiplicatori" >
                <div class="img-ctn"> 
                    <div class="istr-list-symbol-image10"></div>
                    Tavoletta<br>Moltiplicatore: x4
                </div>
                <div class="img-ctn"> 
                    <div class="istr-list-symbol-image9"></div>
                    Tempio<br>Moltiplicatore: x4
                </div> 
                <div class="img-ctn"> <div class="istr-list-symbol-image8"></div>Elmo<br>Moltiplicatore: x7</div>
                <div class="img-ctn"> <div class="istr-list-symbol-image7"></div>Scudo<br>Moltiplicatore: x7</div> 
                <div class="img-ctn"> <div class="istr-list-symbol-image6"></div>Carro<br>Moltiplicatore: x9</div>  
                <div class="img-ctn"> <div class="istr-list-symbol-image5"></div>Torre<br>Moltiplicatore: x9</div> 
                <div class="img-ctn"> <div class="istr-list-symbol-image4"></div>Catapulta<br>Moltiplicatore: x21</div> 
                <div class="img-ctn"> <div class="istr-list-symbol-image3"></div>Guerriero<br>Moltiplicatore: x21 </div>
                
                <div class="img-ctn">
                    <div class="istr-list-symbol-image1"></div>
                    Archiere  <br> Moltiplicatore: x0 
                </div>

                <div class="img-ctn"> 
                    <div class="istr-list-symbol-image2"></div>
                    Wild <br>Moltiplicatore: x41 
                </div>
            </div>
            <br>

            <div class="istruzioni-bonus">
                <strong>Wild </strong> E' il jolly del gioco. Si sostitusce agli altri simboli tranne al bonus, e ti permette di vincere il più possibile.<br>
                Nel caso in cui il wild aiutasse il giocatore a vincere su delle linee, assume il moltiplicatore del simbolo corrispondente.<br><br>
                <strong>BIG WIN!</strong> <br> con 5 wild in una linea vincente, scatta la Big Win che paga con moltiplicatore x41 <br> <br>
                Esempio uso del wild:
                <br><br>
                <strong> Arciere </strong> Nel caso in cui in una linea vincente compaiano 3 bonus, allora si attiva il Jackpot Game<br><br>
            </div>

            <div class="istruzioni-2"> 
                Jackpot Game: Quando ci sono 3 arcieri in una linea vincente della slot, allora si attiva questo Bonus Game:<br><br>
                - Tutte le caselle della slot, diventano bersagli da colpire. <br>
                - L'utente ne deve scegliere uno fra i 15 disponibili. Una volta<br>
                - Una volta Sparato al bersaglio, verrà rilevato il moltiplicatore nascosto dietro ad esso e verrà pagata la vincita corrispondente.<br><br>
                <strong>I moltiplicatori del Bonus Game sono : x10 x25 x50 x75 x100</strong><br><br><br>

                Funzionamento delle linee:<br>
                - Le linee vincenti sono presentate qui di seguito e sono in totale 31.<br> <br>
                - nel caso in cui fosse attivata una linea con meno di 3 simboli vincenti, allora quella linea non pagherà.<br><br>
                - nel caso in cui fosse attivata una linea con 3 simboli vincenti, allora il pagamento sarebbe strutturato in questo modo: 1,5 * (Moltiplicatore del simbolo)<br><br>
                - nel caso in cui fosse attivata una linea con 4 simboli vincenti, allora il pagamento sarebbe strutturato in questo modo: 2 * (Moltiplicatore del simbolo)<br><br>
                - nel caso in cui fosse attivata una linea da 5 simboli vincenti, allora il pagamento sarebbe strutturato in questo modo: 2,5 * (Moltiplicatore del simbolo)<br><br>
                - la vincita effettiva è pari alla somma delle vincite su tutte le linee diviso 31 e moltiplicato per la Puntata.
                Elenco delle linee vincenti:
            </div>
        </div>
    </div>


	<div class="game-container">    <!-- contenitore di tutta l' interfaccia di gioco 
        
        <div class="game-title">	
            <div class="title-background">
                Ultimate Spin
            </div>
        </div> -->	

        <div class="slot-interface">         <!-- contenitore della slot-->

            <div class="info-user-ctn">
				<div id="infoUser" class=info-user> 
                    Devi puntare per poter giocare!
				</div>
			</div>
            
            <div id="slot-machine" class="slot-machine">	
                    <!-- contenitore della slot-->
                <div class="slot-col1">
                  <button class="reel-button">
                      <div class="reel" id="reel0">
                          <div class="content"></div>
                      </div>
                  </button>
                  <button class="reel-button">
                      <div class="reel" id="reel1">
                          <div class="content"></div>
                      </div>
                  </button>
                  <button class="reel-button">
                      <div class="reel" id="reel2">
                          <div class="content"></div>
                      </div>
                  </button>
              </div>
              
              <div class="slot-col2">
                  <button class="reel-button">
                      <div class="reel" id="reel3">
                          <div class="content"></div>
                      </div>
                  </button>
                  <button class="reel-button">
                      <div class="reel" id="reel4">
                          <div class="content"></div>
                      </div>
                  </button>
                  <button class="reel-button">
                      <div class="reel" id="reel5">
                          <div class="content"></div>
                      </div>
                  </button>
              </div>
              
              <div class="slot-col3">
                  <button class="reel-button">
                      <div class="reel" id="reel6">
                          <div class="content"></div>
                      </div>
                  </button>
                  <button class="reel-button">
                      <div class="reel" id="reel7">
                          <div class="content"></div>
                      </div>
                  </button>
                  <button class="reel-button">
                      <div class="reel" id="reel8">
                          <div class="content"></div>
                      </div>
                  </button>
              </div>

              <div class="slot-col4">
                  <button class="reel-button">
                      <div class="reel" id="reel9">
                          <div class="content"></div>
                      </div>
                  </button>
                  <button class="reel-button">
                      <div class="reel" id="reel10">
                          <div class="content"></div>
                      </div>
                  </button>
                  <button class="reel-button">
                      <div class="reel" id="reel11">
                          <div class="content"></div>
                      </div>
                  </button>
              </div>
              
              <div class="slot-col5">
                  <button class="reel-button">
                      <div class="reel" id="reel12">
                          <div class="content"></div>
                      </div>
                  </button>
                  <button class="reel-button">
                      <div class="reel" id="reel13">
                          <div class="content"></div>
                      </div>
                  </button>
                  <button class="reel-button">
                      <div class="reel" id="reel14">
                          <div class="content"></div>
                      </div>
                  </button>
              </div>
              

            </div>
		</div>	


           <!-- contenitore di tutta l' interfaccia di gioco 	-->
        <div class="game-interface" >

            <div class="table-stop-btn">
              <div class="table-stop-btn-row" >
                <div class="table-stop-btn-col1">
                    <button id="stopButton1" class="btn-custom-stop">Stop</button>
                </div>
                <div class="table-stop-btn-col2">
                    <button id="stopButton2" class="btn-custom-stop">Stop</button>
                </div>
                <div class="table-stop-btn-col3">
                    <button id="stopButton3" class="btn-custom-stop">Stop</button>
                </div>
                <div class="table-stop-btn-col4">
                    <button id="stopButton4" class="btn-custom-stop">Stop</button>
                </div>
                <div class="table-stop-btn-col5">
                    <button id="stopButton5" class="btn-custom-stop">Stop</button>
                </div>
              </div>
            </div>

            <div class="second-row">

                <div class="table-game">
                    <div class="table-game-row" >

                    <div class="table-game-result-col">
                        <div id="result" ></div>			
                    </div>

                    <div class="table-game-spin-col">
                        <div ><button id="spin-button" class="btn-custom">
                            Spin</button>
                        </div>	
                    </div>		

                    <div class="table-game-saldo-col">
                        <div class="saldo-ctn">Saldo:
                            <div id="saldo"></div>
                        </div>
                        <div class="puntata-ctn">Puntata:                  
                            <div id="puntata">0</div>
                        </div>
                    </div>

                    </div>
                </div>

                <div class="chip-container">
                    <div id="chips" class="chip-interface" >
                        <button title="AutoSpin" type="button" id="autoSpin" class="chip-img-btn-auto-spin">
                            <div id=autoSpingImg class="auto-spin-img" ></div>
                        </button>
                        <button title="chip_1" type="button" class="chip-img-btn">
                            <div class="chip1-img" title="chip 1"></div>
                        </button>
                        <button title="chip_5" type="button" class="chip-img-btn">
                            <div class="chip5-img" title="chip 5" > </div>
                        </button>
                        <button title="chip_10" type="button" class="chip-img-btn">
                            <div class="chip10-img" title="chip 10"> </div>
                        </button>
                        <button title="chip_50" type="button" class="chip-img-btn">
                            <div class="chip50-img" title="chip 50"> </div>
                        </button>
                        <button title="chip_100" type="button" class="chip-img-btn">
                            <div class="chip100-img" title="chip 100"> </div>
                        </button>
                        <button id="annullaUltimaChip" title="annulla" type="button" class="chip-img-btn-annulla">
                            <div class="annulla-img-red" id="annullaGiocata"> </div>
                        </button>
                        <button title="Cambio Modalità" type="button" id="changeMode" class="chip-img-btn-cambio">
                            <div id="changeModeImg" class="change-mode-img" ></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <script src="script-Ultimate-Spin.js"></script>
    


    <!-- ce ne sono altri due da mettere
    <script src="path/to/jquery.slim.min.js"></script>
    <script src="path/to/popper.min.js"></script>
    -->
</body>
</html>


