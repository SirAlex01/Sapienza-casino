<?php 

session_start();

if (!$_SESSION['email'])
    header("../../index.html");
else {
    $email=$_SESSION['email'];
}


    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        header("Location: /");
    } else {
        $db_con=pg_connect("host=127.0.0.1 port=5432 dbname=casino_db user=postgres password=password"); //connette al database
        
        if (!$db_con) {
    
            $error_message = pg_last_error($db_con);
            $risposta = array('successo'=>false,'conn_error'=>true,'db_error'=>false);  //errore connessione
            header('Content-Type: json');
            echo json_encode($risposta); //errore in caso di non successo 
            exit();
        }
    

        if($db_con && isset($_POST['id'])){
           //echo json_encode($_POST['importo_ricarica']);

            $id = $_POST['id'];
            //echo json_encode($email);

            $query = "DELETE FROM casinoproblem WHERE id = $id";
            $result = pg_query($db_con, $query);


            if(!$result){
                $risposta = array('successo'=>false,'conn_error'=>false,'db_error'=>true);   //'imporssibile aggiornare i valori nel database
                header('Content-Type: json');
                echo json_encode($risposta); //errore in caso di non successo 
                exit();
            }

            $risposta = array('successo'=>true,'conn_error'=>false,'db_error'=>false);
            header('Content-Type: json');
            echo json_encode($risposta); //errore in caso di non successo 
            exit();

        }

        }
    pg_close($db_con);
    

?>
    