<?php

// ❌ NO mostrar errores en pantalla
error_reporting(0);
ini_set('display_errors', 0);

// ✅ Forzar JSON
header('Content-Type: application/json');

include __DIR__ . "/db.php";

if (!$conn) {
    echo json_encode(["error" => "Error de conexión"]);
    exit;
}

$result = $conn->query("SELECT * FROM movies");

if (!$result) {
    echo json_encode(["error" => "Error SQL"]);
    exit;
}

$movies = [];

while ($row = $result->fetch_assoc()) {
    $movies[] = $row;
}

echo json_encode($movies);

$conn->close();

?>