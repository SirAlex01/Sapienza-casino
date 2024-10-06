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

      if ($_SERVER["REQUEST_METHOD"] != "POST") {
          header("Location: /");
      } 
      else {
        $db_con=pg_connect("host=127.0.0.1 port=5432 dbname=casino_db user=postgres password=password"); //connette al database
        if (!$db_con) {
          $error_message = pg_last_error($db_con);
          $risposta = array('successo'=>false,'conn_error'=>true,'saldo'=>-1);  //errore connessione
          header('Content-Type: json');
          echo json_encode($risposta); //errore in caso di non successo 
          exit();
        }
      }

      if (isset($_SESSION['email'])) {
        $email=$_SESSION['email'];
        $username=$_SESSION['username'];
      }
      else {
        $email=$_COOKIE['email'];
        $username=$_COOKIE['username'];
        $_SESSION['email']=$email;
        $_SESSION['username']=$username;
      }

      $q = "select saldo from utente where email= $1";
      $result = pg_query_params($db_con, $q, array($email));
      $saldo=pg_fetch_array($result, null, PGSQL_ASSOC)['saldo'];

      if(!$result){
        $risposta = array('successo'=>false,'conn_error'=>true,'saldo'=>-1);  //errore connessione
        header('Content-Type: json');
        echo json_encode($risposta); //errore in caso di non successo 
        exit();
      }

      $risposta = array('successo'=>true,'conn_error'=>false,'saldo'=>$saldo);  //errore connessione
      header('Content-Type: json');
      echo json_encode($risposta); //errore in caso di non successo 
      exit();


    }

  pg_close($db_con);
    
?>