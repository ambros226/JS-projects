<?php
header('Content-Type: application/json; charset=utf-8');


function transferArray($result)
{
    $rows = [];
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
    }
    return $rows;
}

global $conn;
$db_server = "localhost";
$db_username = "root";
$db_password = "root";
$db_name = "self-projects";

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

$sql = "SELECT * FROM sudoku_ranking WHERE difficulty='easy' ORDER BY score DESC LIMIT 5";
$easy_data = transferArray(mysqli_query($conn, $sql));

$sql = "SELECT * FROM sudoku_ranking WHERE difficulty='medium' ORDER BY score DESC LIMIT 5";
$medium_data = transferArray(mysqli_query($conn, $sql));

$sql = "SELECT * FROM sudoku_ranking WHERE difficulty='hard' ORDER BY score DESC LIMIT 5";
$hard_data = transferArray(mysqli_query($conn, $sql));

$response = [
    'easy' => $easy_data,
    'medium' => $medium_data,
    'hard' => $hard_data
];

echo json_encode($response);