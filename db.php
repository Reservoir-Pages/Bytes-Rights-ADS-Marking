<?php

require 'mail-data.php'; // файл с данными

$dsn = 'mysql:host=' . $host . ';dbname=' . $dbname;

try {
  $pdo = new PDO($dsn, $user, $password);

  $sql = "INSERT INTO br_user (name, email, phone, message) VALUES (:user, :email, :phone, :message)";

  $statement = $pdo->prepare($sql);

  $statement->execute(['user' => $_POST['name'] . $_POST['surname'], 'email' => $_POST['email'], 'phone' => $_POST['phone'], 'message' => $_POST['message'] ?? '1']);

} catch (PDOExeption $e) {
  print "Error!: " . $e->getMessage() . "<br/>";
  die();
}
