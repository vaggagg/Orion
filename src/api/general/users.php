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
    case "GET":
        $sql = "SELECT * FROM users";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($users);
        break;
    case "Create":
        $sql = "INSERT INTO users ( NAME, ROLE, EMAIL, PASSWORD, USERNAME, SURNAME, INTERESTS, BIRTHDAY, DATECREATED, AVATAR) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)";
        
        $stmt = $conn->prepare($sql);
        if ($stmt === FALSE) {
            echo $conn->error;
         }
        $stmt->bind_param('ssssssssss', $user->name, $user->role, $user->email, $user->password, $user->username, $user->surname ,$user->interests, $user->birthday, $user->dateCreated, $user->avatar );

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        break;

    case "PUT":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE users SET name= :name, email =:email, mobile =:mobile, updated_at =:updated_at WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':updated_at', $updated_at);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM users WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
    case "Authentication":
        $sql = "SELECT * FROM users WHERE EMAIL='{$user->email}' AND PASSWORD = '{$user->password}'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $response['found']='TRUE';
        } else {
            $response['found']='FALSE';
        }
        echo json_encode($response);
        break;
        case "Authentication1":
            $sql = "SELECT * FROM users WHERE EMAIL='{$user->email}' AND PASSWORD = '{$user->password}'";
            $result = $conn->query($sql);
            $rows = [];
            while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
                $rows[] = $row;
            }
         echo json_encode($rows);
        break;
    case "AddTags":
        $sql = "INSERT INTO link_users_tags ( ENTITY_ID, TAG_ID) VALUES ( ?, ?)";
        
        $stmt = $conn->prepare($sql);
        if ($stmt === FALSE) {
            echo $conn->error;
         }
        $stmt->bind_param('ss', $user->entity_id, $user->tag_id );

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        break;
    case "searchTagsByUserID":
        $sql = "SELECT * FROM link_users_tags WHERE ENTITY_ID LIKE'%{$user->entity_id}%'";
        $result = mysqli_query($conn,$sql);
        $rows = [];
            while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $rows[] = $row;
            }
            echo json_encode($rows);
        break;
    case "SearchUsers":
        $sql = "SELECT * FROM users WHERE USERNAME LIKE'%{$user->username}%'";
        $result = mysqli_query($conn,$sql);
        $rows = [];
         while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $rows[] = $row;
         }
         echo json_encode($rows);
        break;
    case "SearchUsersByEmail":
        $sql = "SELECT * FROM users WHERE EMAIL LIKE'%{$user->email}%'";
        $result = mysqli_query($conn,$sql);
        $rows = [];
            while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $rows[] = $row;
            }
            echo json_encode($rows);
        break;
    case "CheckEmail":
        $sql = "SELECT * FROM users WHERE EMAIL='{$user->email}'";
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