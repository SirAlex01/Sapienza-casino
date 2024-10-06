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

      $risposta = array('successo'=>true,'conn_error'=>false,'email'=>$email,'username'=>$username);  //errore connessione
      header('Content-Type: json');
      echo json_encode($risposta); //errore in caso di non successo 
      exit();

    }
  }
    
?>