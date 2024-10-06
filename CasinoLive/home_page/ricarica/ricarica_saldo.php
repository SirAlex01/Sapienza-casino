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
        $db_con=pg_connect("host=127.0.0.1 port=5432 dbname=casino_db user=postgres password=password"); //connette al database
        
        if (!$db_con) {
    
            $error_message = pg_last_error($db_con);
            $risposta = array('email'=>' ','successo'=>false,'conn_error'=>true,'db_error'=>false,'saldo'=>-100);  //errore connessione
            header('Content-Type: json');
            echo json_encode($risposta); //errore in caso di non successo 
            exit();
        }

        
        if($db_con && isset($_POST['importo_ricarica'])){
           //echo json_encode($_POST['importo_ricarica']);
            $importoRicarica = $_POST['importo_ricarica'];
            //echo json_encode($email);

            $query = "SELECT saldo FROM Utente WHERE email = $1;";
            $result_saldo = pg_query_params($db_con, $query, array($email));

            //echo json_encode($email);

            if(!$result_saldo){
                $risposta = array('email'=>$email,'successo'=>false,'conn_error'=>false,'db_error'=>true,'saldo'=>-2);//imporssibile aggiornare i valori nel database
                header('Content-Type: json');
                echo json_encode($risposta); //errore in caso di non successo 
                exit();
            }

            $saldo_vecchio = pg_fetch_result($result_saldo, 0, 'saldo');
            $saldo_nuovo = floatval($saldo_vecchio)+floatval($importoRicarica);

            $query = "UPDATE Utente SET saldo = $1 WHERE email = $2;";
            $result_saldo = pg_query_params($db_con, $query,array($saldo_nuovo,$email));

            if(!$result_saldo){
                $risposta = array('email'=>$email,'successo'=>false,'conn_error'=>false,'db_error'=>true,'saldo'=>-3);   //'imporssibile aggiornare i valori nel database
                header('Content-Type: json');
                echo json_encode($risposta); //errore in caso di non successo 
                exit();
            }

            $risposta = array('email'=>$email,'successo'=>true,'conn_error'=>false,'db_error'=>false,'saldo'=>$saldo_nuovo);
            header('Content-Type: json');
            echo json_encode($risposta); //errore in caso di non successo 
            exit();

        }

    }

?>
    