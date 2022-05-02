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
    case "UpdatePending":
        $sql = "UPDATE friends SET PENDING=? WHERE EMAIL=?";
        $stmt = $conn->prepare($sql);
            if ($stmt === FALSE) {
                echo $conn->error;
             }
            $stmt->bind_param('ss', $user->pending, $user->email );
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }
            $stmt->close();
        break;
    case "UpdateFriends":
        $sql = "UPDATE friends SET FRIENDS=? WHERE EMAIL=?";
        $stmt = $conn->prepare($sql);
            if ($stmt === FALSE) {
                echo $conn->error;
             }
            $stmt->bind_param('ss', $user->friends, $user->email );
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }
            $stmt->close();
        break;
    case "GetFriends":
        $sql = "SELECT * FROM friends WHERE EMAIL='$user->email'";
        $result = mysqli_query($conn,$sql);
        $rows = [];
         while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $rows[] = $row;
         }
         echo json_encode($rows);
        break;
        case "Create":
            $sql = "INSERT INTO friends ( email ) VALUES ( ? )";
            
            $stmt = $conn->prepare($sql);
            if ($stmt === FALSE) {
                echo $conn->error;
             }
            $stmt->bind_param('s', $user->email );
    
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }
            break;

    case "UpdateFriends":
        $sql = "Update * FROM users WHERE EMAIL='{$user->email}'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $response['found']='TRUE';
        } else {
            $response['found']='FALSE';
        }
        echo json_encode($response);
        break;
    
    }
$conn->close();