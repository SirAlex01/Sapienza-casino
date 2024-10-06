<?php 

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: /");
} else {
    //$db_con=pg_connect("host=localhost port=5432 dbname=upuwje7o_casino user=postgres password=Password1"); //connette al database
    $db_con=pg_connect("host=127.0.0.1 port=5432 dbname=casino_db user=postgres password=password"); //connette al database
    if (!$db_con) {

        $error_message = pg_last_error($db_con);
        $risposta = array('nome_utente'=>' ','successo'=>false,'conn_error'=>true,'registr_error'=>false,'messaggio'=>$error_message);
        header('Content-Type: json');
        echo json_encode($risposta); //errore in caso di non successo 
        exit();
    }
}

if ($db_con && isset($_POST['r_email']) && isset($_POST['r_eta']) && isset($_POST['r_password']) && isset($_POST['r_username'])) {

    $email=$_POST['r_email'];

// controlla se l'email è già registrata nel database
    $email_check = pg_query_params($db_con, "select * from utente where email=$1", array($email));
    $email_count = pg_num_rows($email_check);

    
    if ($email_count>0) {
        $risposta = array('nome_utente'=>$_POST['r_username'],'successo'=>false,'conn_error'=>false,'registr_error'=>true,'messaggio'=>' email gia registrata ');
        header('Content-Type: application/json');
        echo json_encode($risposta); // errore in caso di non successo 
        exit();
    }


    $eta = $_POST['r_eta'];
    $saldo=1000;
    $password = password_hash($_POST['r_password'],PASSWORD_DEFAULT);
    $username=$_POST['r_username'];

    $q2 = "insert into utente values ($1,$2,$3,$4,$5)";
    $sent_data = pg_query_params($db_con, $q2,          array($email,$eta,$saldo,$password,$username));
    // inserisce l'utente nel database


    if (pg_affected_rows($sent_data) == 0) {
        $error_message = pg_last_error($db_con);
        $risposta = array('nome_utente'=>$_POST['r_username'],'successo'=>false,'conn_error'=>true,'registr_error'=>false,'messaggio'=>$error_message);
        header('Content-Type: json');
        echo json_encode($risposta); // errore in caso di non successo 
        exit();
    }


    $risposta = array('nome_utente'=>$_POST["r_username"],'successo'=>true,'conn_error'=>false,'registr_error'=>false,'messaggio'=>' registrazione avvenuta con successo ');
    header('Content-Type: json');
    echo json_encode($risposta); // successo 
    
}

pg_close($db_con);

?>
