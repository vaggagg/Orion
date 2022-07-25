<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

include '../config/DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

$user = json_decode( file_get_contents('php://input') );
switch($user->action) {
    case "Create":
        $sql = "INSERT INTO POSTS ( CREATOR, DESCRIPTION, IMG , VIDEO, TAGS ) VALUES (?, ? , ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        if ($stmt === FALSE) {
            echo $conn->error;
         }
        $stmt->bind_param('sssss', $user->CREATOR, $user->DESCRIPTION, $user->IMG , $user->VIDEO  , $user->TAGS );

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        break;
    case "GetAllInterests":
        $sql = "SELECT * FROM interests";
        $result = mysqli_query($conn,$sql);
        $rows = [];
            while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $rows[] = $row;
            }
            echo json_encode($rows);
        break;
    }
$conn->close();