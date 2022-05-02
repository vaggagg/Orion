<?php


class DbConnect{
	private $host  = 'localhost';
    private $user  = 'root';
    private $password   = "";
    private $database  = "orion"; 
    
    public function getConnection(){		
		$conn = new mysqli($this->host, $this->user, $this->password, $this->database);
		if($conn->connect_error){
			echo("Error failed to connect to MySQL: " . $conn->connect_error);
		} else {
			return $conn;
		}
    }
}
?>