<?php
//da js gli si invia il nuovo valore del saldo
//modifica il saldo nel database e restituisce il saldo aggiornato 
//tramite AJAX


// connessione al database
    if (session_status() === PHP_SESSION_ACTIVE) {
        // la sessione è già stata avviata
    } else {
        // la sessione non è stata ancora avviata
        session_start();
    } 
    
    if (!isset($_SESSION['email']) && !isset($_COOKIE['email'])) {
        header("Location: /CasinoLive/index.html");
    }
    else {
        if (isset($_SESSION['email'])) {
            $email=$_SESSION['email'];
            $username=$_SESSION['username'];
        }
        else {
          //echo json_encode($_COOKIE);
            $email=$_COOKIE['email'];
            $username=$_COOKIE['username'];
            $_SESSION['email']=$email;
            $_SESSION['username']=$username;
        }
    
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        header("Location: /");
    } else {
        $db_con=pg_connect("host=127.0.0.1 port=5432 dbname=casino_db user=postgres password=password"); //connette al database
        if (!$db_con) {
    
            $error_message = pg_last_error($db_con);
            $risposta = array('saldo_to_js'=>'-1','messaggio_per_js'=>$error_message);
            header('Content-Type: json');
            echo json_encode($risposta); //errore in caso di non successo 
            exit();
        }
    }


    // controlla se la richiesta POST contiene il campo saldo
    if ($db_con && isset($_POST['saldo_attuale'])) {
        // recupera il nuovo valore del saldo
        $saldo_from_js = $_POST['saldo_attuale'];
    
        // esegui l'aggiornamento del saldo nel database
        $query = "UPDATE Utente SET saldo = $saldo_from_js WHERE email = $1";
        $result = pg_query_params($db_con, $query,array($email));
    
        if(!$result){
            $risposta = array('saldo_to_js'=>'-1','messaggio_per_js'=>'');
            header('Content-Type: json');
            echo json_encode($risposta); //errore in caso di non successo 
            exit();
        }

        $risposta = array('saldo_to_js'=>$saldo_from_js,'messaggio_per_js'=>'');
        header('Content-Type: json');
        echo json_encode($risposta); //errore in caso di non successo 
        exit();
    }
    
    
    // chiudi la connessione al database
    pg_close($db_con);
}
?>