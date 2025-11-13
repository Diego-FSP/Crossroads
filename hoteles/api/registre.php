<?php
// Conexión a la base de datos (asegúrate de usar tus credenciales)
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

// Verificar si el correo ya existe
$sql = "SELECT * FROM usuario WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo json_encode(['error' => 'El correo electrónico ya está registrado.']);
  exit();
}

// Cifrar la contraseña
$password_hashed = password_hash($password, PASSWORD_BCRYPT);

// Insertar el usuario en la base de datos
$sql = "INSERT INTO usuario (email, pass) VALUES ('$email', '$password_hashed')";

if ($conn->query($sql) === TRUE) {
  echo json_encode(['message' => 'Usuario registrado correctamente.']);
} else {
  echo json_encode(['error' => 'Error al registrar el usuario.']);
}

$conn->close();
?>
