<?php
// Conexión a MySQL
$host = "localhost";
$user = "root"; // tu usuario de MySQL
$password = ""; // tu contraseña de MySQL
$dbname = "hotelesBA";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta todos los hoteles de 3 a 5 estrellas
$sql = "SELECT * FROM hoteles WHERE estrellas BETWEEN 3 AND 5";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hoteles Buenos Aires</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Hoteles en Buenos Aires (3 a 5 estrellas)</h1>
    </header>

    <main class="hotel-container">
        <?php
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo '<div class="hotel-card">';
                echo '<img src="images/' . $row["imagen"] . '" alt="' . $row["nombre"] . '">';
                echo '<h2>' . $row["nombre"] . '</h2>';
                echo '<p>' . str_repeat('⭐', $row["estrellas"]) . '</p>';
                echo '<p>' . $row["descripcion"] . '</p>';
                echo '</div>';
            }
        } else {
            echo "<p>No se encontraron hoteles.</p>";
        }
        $conn->close();
        ?>
    </main>
</body>
</html>
