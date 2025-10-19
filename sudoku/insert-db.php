<?php
$db_server = "localhost";
$db_username = "root";
$db_password = "root";
$db_name = "self-projects";

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

$json = file_get_contents('php://input');
$data = json_decode($json,true);
$name = $conn->real_escape_string($data['name']);
$score = $conn->real_escape_string($data['score']);
$difficulty = $conn->real_escape_string($data['difficulty']);

$sql = "INSERT INTO sudoku_ranking (username, score, difficulty) 
            VALUES ('$name', '$score', '$difficulty')";
mysqli_query($conn, $sql);
$conn->close();
