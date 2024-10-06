<?php 
/*

session_start();

if (!$_SESSION['email'])
    header("../index.html");
else {
    $email=$_SESSION['email'];
    // echo "prova $email <br>";



    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        header("Location: /");
    } else {
        $db_con=pg_connect("host=127.0.0.1 port=5432 dbname=casino_db user=postgres password=password"); //connette al database
        
        if (!$db_con) {
    
            $error_message = pg_last_error($db_con);
            $risposta = array('email'=>' ','successo'=>false,'conn_error'=>true,'db_error'=>false,'messaggio_per_js'=>$error_message);
            header('Content-Type: json');
            echo json_encode($risposta); //errore in caso di non successo 
            exit();
        }
    }

    if($db_con && isset($_POST['contact_message'])){

        $contactMessage = $_POST['contact_message'];
        
        $query = "UPDATE Utente SET messaggio_ok = true , messaggio_utente= $2 WHERE email = $1";
        $email = $_SESSION['email'];
        $result = pg_query_params($db_con, $query,array($email,$contactMessage));
        
        if(!$result){
            $risposta = array('email'=>$email,'successo'=>false,'conn_error'=>false,'db_error'=>true,'messaggio_per_js'=>'imporssibile aggiornare i valori nel database');
            header('Content-Type: json');
            echo json_encode($risposta); //errore in caso di non successo 
            exit();
        }

        $risposta = array('email'=>$email,'successo'=>true,'conn_error'=>false,'db_error'=>false,'messaggio_per_js'=>'Valori aggiornati correttamente');
        header('Content-Type: json');
        echo json_encode($risposta); //errore in caso di non successo 
        exit();

    }

}



*/

//                                                              Commento tutto senno quando usi il sito scoppia tutto 
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


    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        header("Location: /");
    } else {
        $db_con=pg_connect("host=127.0.0.1 port=5432 dbname=casino_db user=postgres password=password"); //connette al database
        
        if (!$db_con) {
    
            $error_message = pg_last_error($db_con);
            $risposta = array('email'=>' ','successo'=>false,'conn_error'=>true,'db_error'=>false,'messaggio_per_js'=>$error_message);
            header('Content-Type: json');
            echo json_encode($risposta); //errore in caso di non successo 
            exit();
        }
    }

    if($db_con && isset($_POST['contact_message'])){

        $contactMessage = $_POST['contact_message'];
        $email = $_SESSION['email'];
        $data_ora_corrente = date('Y-m-d H:i:s');
        $query = "INSERT INTO casinoproblem (email,db_error_message,date_error_message ) VALUES ($1,$2,$3)";
        $result = pg_query_params($db_con, $query,array($email,$contactMessage,$data_ora_corrente));
        
        if(!$result){
            $risposta = array('email'=>$email,'successo'=>false,'conn_error'=>false,'db_error'=>true,'messaggio_per_js'=>'imporssibile aggiornare i valori nel database');
            header('Content-Type: json');
            echo json_encode($risposta); //errore in caso di non successo 
            exit();
        }

        $risposta = array('email'=>$email,'successo'=>true,'conn_error'=>false,'db_error'=>false,'messaggio_per_js'=>'Valori aggiornati correttamente');
        header('Content-Type: json');
        echo json_encode($risposta); //errore in caso di non successo 
        exit();

    }
}



//ho creato un database chiamato casinoproblem, solo 2 campi, email char_var50 e db_error_message var_char500
//dovremmo magari dotare qualche account dei permessi amministraztori( un bool nell' altro database)
//e nel caso siano verificati, far vedere un altro bottone nella welcome page per accedere a un interfaccia grafica per quetso
//database
?>
    