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
	<title>Blackjack</title>
	<link rel="stylesheet" href="../prevent_default_scroll.css">
	<link rel="stylesheet" href="../navbar/navbar.css">
	<link rel="stylesheet" type="text/css" href="./style_black_jack2.css">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
	<script src="../jquery-3.6.4.min.js"></script>
    <script type="text/javascript" src="../funzioni_di_stampa/print_email_username_saldo.js" ></script>
	<script type="text/javascript" src="../navbar/navbar.js" ></script>

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


    <div id="istruzioniCtn" class="istruzioni-ctn">
        <div class="istruzioni-interface">
            <div class="close-istruzioni">
                <div class="close-istruzioni-btn"></div>
            </div>
            <div class="istruzioni-1">
				<div class="istr-rosso" style="font-size:x-large; display:flex; flex-direction:row;">Ciao   <div id="istr-name" style="padding-left:10px;"></div></div>
                <div class="content-istr1"> 
				
				<div class="istr-grigio">	Il blackjack è un gioco di carte in cui si gioca contro il banco. <br><br>L'obiettivo del gioco è di ottenere una mano con un valore totale di 21 o il più vicino possibile a 21, <div class="istr-rosso" style="font-size:x-large;">senza superare questo valore, ALTRIMENTI SI PERDE AUTOMATICAMENTE!<br><br></div>

					Le carte dal 2 al 10 hanno il loro valore nominale, mentre le figure (Jack, Queen, King) valgono tutte 10 punti.<br> L'Asso può valere 1 o 11 punti, a seconda di quello che è meglio per la mano.<br><br></div>

					All'inizio del gioco, il dealer distribuisce due carte scoperte a ogni giocatore e due carte, una scoperta e una coperta, a se stesso.<br> Se la prima carta del dealer è un Asso, i giocatori hanno la possibilità di assicurare la puntata.<br><br>

					<div class="istr-giallo">L'assicurazione è una scommessa che si effettua quando il dealer ha un Asso come prima carta.<br><br>- Si scommette la metà della scommessa originale del giocatore. Qualora il dealer abbia effettivamente blackjack, l'assicurazione ripagherà la puntata e il giocatore non perderà nulla.<br> -Se il dealer non ha un blackjack, il giocatore perde la scommessa dell'assicurazione (quindi si perde metà puntata) e il gioco continua normalmente. Il dealer non scopre la sua carta coperta, tuttavia il giocatore può essere certo che il dealer non nasconda una carta con valore pari a 10. Se il giocatore decide di non assicurare la puntata, la partita continuerà normalmente.</div>
				<br><br>
					Dopo aver ricevuto le carte, il  giocatore ha diverse opzioni:<br>

					<div class="istr-verde" style="font-size:x-large;">- "Hit" (Chiedere carta):</div><div class="istr-grigio"> il giocatore può chiedere una carta aggiuntiva per migliorare la propria mano.<br><br></div>
					<div class="istr-giallo" style="font-size:x-large;">- "Stand" (Stare): </div><div class="istr-grigio"> il giocatore può decidere di non chiedere altre carte e di stare con la mano attuale.<br><br></div>
					<div class="istr-rosso" style="font-size:x-large;">- "Double" (Raddoppio): </div><div class="istr-grigio"> il giocatore può raddoppiare la scommessa originale e riceve ESATTAMENTE una carta aggiuntiva, non può riceverne due (né ovviamente di più) o nessuna<br><br></div>
					<div class="istr-blu" style="font-size:x-large;">  - "Split" (Dividere):</div><div class="istr-grigio">  se le prime due carte del giocatore sono dello stesso valore, il giocatore può dividerle in due mani separate e scommettere su ciascuna di esse, quindi effettuare due partite separate, contro il dealer che invece gioca con le carte iniziali;<br>
					quindi il giocatore riceve altre 2 carte, visto che le prima due carte rappresentano la prima carta delle due partite; in entrambe le mani è possibile chiedere una carta, stare o raddoppiare, ma non splittare nuovamente <br><br><br></div>
					
					<div class="istr-giallo" style="x-large">Dopo che tutti i giocatori hanno completato le loro scelte, il dealer rivela la sua carta coperta:</div>
					- Se il giocatore o il dealer ha un blackjack (esattamente due carte che sommano a 21), vince automaticamente (a meno che non ce l'abbiano entrambi, in tal caso si pareggia).<br><br>
					- Se il dealer ha un punteggio inferiore a 17, continua a chiedere carte fino a raggiungere almeno 17.<br><br>
					- Se il punteggio del dealer supera i 21, il giocatore, se ancora in gioco, vince la partita. Il giocatore è ancora in gioco se non supera il punteggio di 21<br> <br>
					- Se il punteggio del dealer è inferiore a 21, il vincitore è colui che ha il valore delle carte in mano più vicina a 21 senza superarlo.<br><br>
					- Se il punteggio del giocatore e del dealer è lo stesso, la partita finisce in pareggio e viene restituita la puntata all' utente <br><br>
					
					- In ogni caso si vince il doppio della cifra puntata, tranne qualora il giocatore abbia blackjack. In quest'ultimo caso, la mano in questione paga in proporzione 3 a 2, perciò si vincono i 5/2 della cifra puntata.<br><br>
                </div>
            </div>
        </div>
    </div>




	<div class="game-container" id="gameContainer">
	
			<div class="game-title">	
				<div class="title-background">
					Blackjack
				</div>
			</div>

		<div id="gameInterfaceArea"  class="game-interface-area">

			<div class="info-user-ctn">
				<div id="infoUser" class=info-user> 
				</div>
			</div>

			<div id="tavoloDaGioco" class="tavolo">
				<div id="player-area" class="player-area">
					<div class="grafica-tavolo">
						<div class="player-area-title">Player</div>
						<div id="player-score" class="punteggio-player">Punteggio:</div>
					</div>
					<div class="player-cards-ctn">
						<div id="player-cards" class="player-cards"></div>
						<div id="new-cards" class="player-cards"></div>
  					</div>
				</div>

				<div id="gameDeck" class="game-deck">
					<div class="deck-card-restanti"> 
						<div id="deckCarteRestanti"></div>
						<div id="deckCarteRestantiDescrizione">
							Carte nel <br> mazzo 
						</div>
					</div>
					<div class="deck-cards" id="carteResidue">
						<!--Qui vengono messe le carte del deck -->
					</div>
				</div>
				

				<div id="dealer-area" class="dealer-area">
					<div class="grafica-tavolo">
						<div class="dealer-area-title">Dealer</div>
						<div id="dealer-score" class="punteggio-dealer">Punteggio: </div>
					</div>
					
					<div id="dealer-cards" class="dealer-cards"></div>
				</div>
			</div>

			<!-- qui vanno le fiches nel caso di un laptop-->
			<div id="chipsCtnLargeDevices" class="chips-ctn-large-devices">

			</div>


		</div>
		
		<div class="user-interface">

			<div id="userRow1" class="user-interface-row1">
				<div class="button-scroll">
					<div id="buttons" class="play-btn">
						<button id="new-game-button" class="btn-custom">New Game</button>
						<button id="hit-button" class="btn-custom">Hit</button>
						<button id="stand-button" class="btn-custom">Stand</button>
						<button id="double-down-button" class="btn-custom">Double</button>
						<button id="split-button" class="btn-custom">Split</button>
					</div>	
				</div>
			</div>


			<!-- qui vanno le fiches nel caso di un devices (<600) -->
			<div id="chipsCtnSmallDevices" class="chips-ctn-small-devices">

			</div>

					
			<div id="userRow2" class="user-interface-row2">

				<div id="resultInterface" class="result-interface">		
					<div class="result-message-ctn">		
						<div id="message" class="result-interface-message">
							Ciao! Benvenuto al tavolo ! <br> effettua una puntata per giocare
						</div>
					</div>
				</div>		

			<!-- storico dei risultati, non implementato -->

				<div id="moneyInterface" class="money-interface">
					<div class="money-int-scroll">
						<div id="saldoContainer" class="saldo-ctn">
							<div >*Saldo: </div>
							<div id="saldoFake" class="money-interface-saldo-fake" ><!--?php include "../carica_saldo.php"?--></div>
						</div>

						<div id="saldo" class="money-interface-saldo" hidden><!--?php include "../carica_saldo.php"?--></div>

						<div id="betContainer" class="bet-ctn">	
							<div class="desc-punt">*Puntata: </div>
							<div id="bet" class="money-interface-bet" >
								0
							</div>
						</div>
					</div>	
				</div>



				<div id="insurance" class="insurance-container"  hidden >
					<div class="insurance-interface">
						Assicura puntata?
						<button id="insChoice" class="btn-custom"  onclick="insuranceChoice(true)">Si</button>
						<button id="insChoice" class="btn-custom" onclick="insuranceChoice(false)">No</button>
					</div>
				</div>

				<div id="insurancePlaceHolder" class="insurance-container"  >
					<div  class="ins-place-holder-gif" ></div>
				</div>	

			</div>

		</div>

		
		<!--  le chips hanno posizione e classe dinamica -->

		<div id="chips" hidden>
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
			<button id="annullaUltimaChip" title="annulla" type="button" class="chip-img-btn">
				<div class="annulla-img-red" id="annullaGiocata"> </div>
			</button>
		</div>
		

	</div>

	<script src="script_black_jack2.js"></script>
<!-- ce ne sono altri due da mettere
	<script src="path/to/jquery.slim.min.js"></script>
	<script src="path/to/popper.min.js"></script>
	-->
</body>
</html>
 
