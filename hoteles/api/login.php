<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hotelesba";  // Cambia esto por el nombre de tu base de datos

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos del formulario
$data = json_decode(file_get_contents("php://input"), true);
$email = $conn->real_escape_string($data['email']);
$password = $conn->real_escape_string($data['password']);

// Verificar si el correo existe
$sql = "SELECT * FROM usuario WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
  echo json_encode(['error' => 'Correo o contraseña incorrectos.']);
  exit();
}

$user = $result->fetch_assoc();

// Verificar la contraseña
if (password_verify($password, $user['pass'])) {
  echo json_encode(['message' => 'Inicio de sesión exitoso.', 'email' => $user['email']]);
} else {
  echo json_encode(['error' => 'Correo o contraseña incorrectos.']);
}

$conn->close();
?>
