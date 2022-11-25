<?php

$action = $_POST['action'];

if($action == "Agregar"){
    addProduct();
}
else if($action == "Agregar1"){
    addProduct1();
}
else{
    getProducts();
}
    function connect(){
            $databasehost = "localhost";
            $databasename = "Miau";
            $databaseuser = "root";
            $databasepass = "Alarahi";

            $mysqli = new mysqli($databasehost, $databaseuser, $databasepass, $databasename);
            if ($mysqli->connect_errno) {
                echo "Problema con la conexion a la base de datos";
            }
            return $mysqli;
    }

    function disconnect() {
        mysqli_close();
    }

    function addProduct() {
        $nombre1 = $_POST["nombre1"];
        $puntos1 = $_POST["puntos1"];
        $nombre2 = $_POST["nombre2"];
        $puntos2 = $_POST["puntos2"];

        $mysqli = connect();
        
        //$result = $mysqli->query("INSERT INTO product(p_name, p_detail, p_price ) values('".$name."','".$detail."',".$price.")");
        $result = $mysqli->query("INSERT INTO puntuaciones(p_nombre, p_puntuaciones) values('".$nombre1."','".$puntos1."')");
        
        if (!$result) {
            echo "Problema al hacer un query: " . $mysqli->error;								
        } else {
            echo "Todo salio bien";		
        }

        $result = $mysqli->query("INSERT INTO puntuaciones(p_nombre, p_puntuaciones) values('".$nombre2."','".$puntos2."')");
        
        if (!$result) {
            echo "Problema al hacer un query: " . $mysqli->error;								
        } else {
            echo "Todo salio bien";		
        }
        //$result->free();
        //disconnect();
    }

    function addProduct1() {
        $nombre = $_POST["nombre"];
        $puntos = $_POST["puntos"];

        $mysqli = connect();
        
        //$result = $mysqli->query("INSERT INTO product(p_name, p_detail, p_price ) values('".$name."','".$detail."',".$price.")");
        $result = $mysqli->query("INSERT INTO puntuaciones(p_nombre, p_puntuaciones) values('".$nombre."','".$puntos."')");
        
        if (!$result) {
            echo "Problema al hacer un query: " . $mysqli->error;								
        } else {
            echo "Todo salio bien";		
        }
        //$result->free();
        //disconnect();
    }

    function getProducts() {
		$mysqli = connect();

		$result = $mysqli->query("SELECT * FROM puntuaciones");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			// Recorremos los resultados devueltos
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			// Codificamos los resultados a formato JSON y lo enviamos al HTML (Client-Side)
			echo json_encode($rows);
		}
		//$result->free();
		//disconnect();	
	}
?>