<?php
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        header("Location: /");
    }
    else {
        $db_con = pg_connect("host=127.0.0.1 port=5432 dbname=casino_db user=postgres password=password");
        //$db_con=pg_connect("host=185.201.65.222 port=5432 dbname=upuwje7o_casino user=postgres password=Password1");
        if (!$db_con) {

            $error_message = pg_last_error($db_con);
            $risposta = array('email'=>' ','successo'=>false,'conn_error'=>true,'login_error'=>false,'db_error'=>false,'messaggio'=>$error_message);
            header('Content-Type: json');
            echo json_encode($risposta); //errore in caso di non successo 
            exit();
        }
    }

    /*
    in questo file 
        conn_true-> errore di connessione
        successo-> nessun errore
        login_error->Sbagliata password
        db_error-> email non presente nel databasa

    la richiesta è

                data: "l_email=" + log_email+"&l_password="+log_password+"&rmb_me="+remember, 
    */

    if ($db_con && isset($_POST['l_email']) && isset($_POST['l_password'])) {

        $email= $_POST['l_email'];
        $password= $_POST['l_password'];

        //verifico se l' email è registrata
        $email_check = pg_query_params($db_con, "select * from utente where email=$1", array($email));
        
        if (!($selected=pg_fetch_array($email_check, null, PGSQL_ASSOC))) {
            $risposta = array('email'=>$email,'successo'=>false,'conn_error'=>false,'login_error'=>false,'db_error'=>true,'messaggio'=>'email non presente nel db');
            header('Content-Type: application/json');
            echo json_encode($risposta);
            exit();
        }
        else {//se l' email E' registrata

            $result = pg_query_params($db_con, "select password,username from utente where email = $1 ", array($email));
            $selected=pg_fetch_array($result, null, PGSQL_ASSOC);

            if ( is_array($selected) && !password_verify($password,$selected['password'])) {//pass sbagliata
                $risposta = array('email'=>$email,'successo'=>false,'conn_error'=>false,'login_error'=>true,'db_error'=>false,'messaggio'=>'Password Sbagliata');
                header('Content-Type: application/json');
                echo json_encode($risposta);
                exit();          
            }
            else {                              //se la password è giusta

                session_start();
                $_SESSION['email']=$email;
                $mail=$_SESSION['email'];
                $username=$selected['username'];
                $_SESSION['username']=$username;
                if (isset($_COOKIE['email'])) {
                    // Se il primo cookie esiste, imposta il secondo cookie con la stessa scadenza
                    //$expiry = date('d/m/Y H:i:s', $_COOKIE['email']);
                    setcookie("username", $username, time()+60*60*24*30, '/'); // Imposta il secondo cookie con la stessa scadenza del primo
                }

                $risposta = array('email'=>$mail,'successo'=>true,'conn_error'=>false,'login_error'=>false,'db_error'=>false,'messaggio'=>'login avvenuto con successo, è restistuita la email registrata nella sessione');
                header('Content-Type: application/json');
                echo json_encode($risposta);
                exit();  

            }
        }
    }
?> 
