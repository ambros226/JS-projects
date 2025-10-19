<?php

function transferArray($result) {
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

$sql = "SELECT * FROM sudoku_ranking WHERE difficulty='easy' ORDER BY score DESC LIMIT 20";
$easy_data = transferArray(mysqli_query($conn, $sql));

$sql = "SELECT * FROM sudoku_ranking WHERE difficulty='medium' ORDER BY score DESC LIMIT 20";
$medium_data = transferArray(mysqli_query($conn, $sql));

$sql = "SELECT * FROM sudoku_ranking WHERE difficulty='hard' ORDER BY score DESC LIMIT 20";
$hard_data = transferArray(mysqli_query($conn, $sql));

$difficulties_data = [$easy_data, $medium_data, $hard_data];

?>
<!doctype html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="sudoku.css">
    <title>Sudoku</title>
</head>
<body>
<header>
    <h1 onclick="location.href='sudoku.html'">Sudoku</h1>
    <div id="ranking-container">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trophy-fill trophy"
             viewBox="0 0 16 16">
            <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935"/>
        </svg>
        <a href="ranking.php">Ranking</a>
    </div>

</header>

<main>
    <?php
    foreach ($difficulties_data as $data) {
        echo '<div class="difficulty">';
        for ($i = 0; $i <= 19; $i++) {
            if (isset($data[$i])) {
                echo '<div class="row">';
                echo "<span class='position'>". $i+1 .".</span>";
                echo "<span class='username'>".$data[$i]['username']."</span>";
                echo "<span class='score'>".$data[$i]['score']." pts</span>";
                echo "<span class='difficulty-span'>".$data[$i]['difficulty']."</span>";
                echo ' </div>';
            }
            else{
                echo "<div class='row'>";
                echo "<span class='position'>". $i+1 .".</span>";
                echo "<span class='username'>-</span>";
                echo "<span class='score'>-</span>";
                echo "<span class='difficulty-span'>-</span>";
                echo ' </div>';
            }
        }
        echo ' </div>';
    };
    ?>


</main>


</body>
</html>
