<?php 

session_start();

if (!$_SESSION['email'])
    header("../../index.html");
else {
    $email=$_SESSION['email'];
}


    $array_totale = array();

    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        header("Location: /");
    } else {
        $db_con=pg_connect("host=127.0.0.1 port=5432 dbname=casino_db user=postgres password=password"); //connette al database
        
        if (!$db_con) {
    
            $error_message = pg_last_error($db_con);
            $risposta = array('email'=>$email,'db_vuoto'=>false,'successo'=>false,'conn_error'=>true,'db_error'=>false,'messaggio_errore'=>$array_totale);  //errore connessione
            header('Content-Type: json');
            echo json_encode($risposta); //errore in caso di non successo 
            exit();
        }
    

        if($db_con && isset($_POST['stampa_errori'])){
           //echo json_encode($_POST['importo_ricarica']);

            $email = $_SESSION['email'];
            //echo json_encode($email);

            $sql = "SELECT * FROM casinoproblem";
            $result = pg_query($db_con, $sql);


            if(!$result){
                $risposta = array('email'=>$email,'db_vuoto'=>false,'successo'=>false,'conn_error'=>false,'db_error'=>true,'messaggio_errore'=>$array_totale);   //'imporssibile aggiornare i valori nel database
                header('Content-Type: json');
                echo json_encode($risposta); //errore in caso di non successo 
                exit();
            }

            $array_totale = array();

            // Itera su ogni riga e stampala a schermo
            if (pg_num_rows($result) > 0) {
                while ($row = pg_fetch_assoc($result)) {
                    $new_row=array('email'=>$row["email"],"messaggio"=>$row["db_error_message"],"ora"=>$row["date_error_message"],"id"=>$row["id"]);
                    array_push($array_totale, $new_row);
                }
            } else {
                array_push($array_totale,array('email'=>" ","messaggio"=>"nessuna riga presente nel database","ora"=>" "));
                $risposta = array('email'=>$email,'db_vuoto'=>true,'successo'=>true,'conn_error'=>false,'db_error'=>false,'messaggio_errore'=>$array_totale);
                header('Content-Type: json');
                echo json_encode($risposta); //errore in caso di non successo 
                exit();
            }

            $risposta = array('email'=>$email,'db_vuoto'=>false,'successo'=>true,'conn_error'=>false,'db_error'=>false,'messaggio_errore'=>$array_totale);
            header('Content-Type: json');
            echo json_encode($risposta); //errore in caso di non successo 
            exit();

        }

        }
    pg_close($db_con);
    

?>
    