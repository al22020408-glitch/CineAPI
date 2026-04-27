
<?php

// Forzar que muestre errores de MySQL (clave en InfinityFree)
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$host = "sql301.infinityfree.com";
$user = "if0_41741300";
$pass = "83p8727l6ObcEdf";
$db   = "if0_41741300_cine_api";

try {
    $conn = new mysqli($host, $user, $pass, $db);
    $conn->set_charset("utf8");
} catch (Exception $e) {
    die("Error de conexión: " . $e->getMessage());
}

?>