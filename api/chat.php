<?php
// Protection CORS et Session
$allowedOrigins = []; 
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && (empty($allowedOrigins) || in_array($origin, $allowedOrigins, true))) {
  header("Access-Control-Allow-Origin: $origin");
  header("Vary: Origin");
} else {
  header("Access-Control-Allow-Origin: *");
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200); exit();
}

session_start();
if (empty($_SESSION['ling_user_id'])) {
  $_SESSION['ling_user_id'] = 'u_' . bin2hex(random_bytes(16));
}
$userId = $_SESSION['ling_user_id'];

// Chargement de la configuration
$configFile = __DIR__ . '/../config.php';
if (!file_exists($configFile)) {
    echo json_encode(["status" => "error", "reply" => "Erreur serveur: config.php introuvable."]);
    exit();
}
$config = require $configFile;

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
$message = isset($data['message']) ? trim((string)$data['message']) : '';

if ($message === '') {
  echo json_encode(["status" => "error", "reply" => "Message vide."]);
  exit();
}

$payload = [
  "app_token" => $config['app_token'],
  "user_id"   => $userId,
  "message"   => $message,
];

$ch = curl_init($config['ling_url']);
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST           => true,
  CURLOPT_TIMEOUT        => 30,
  CURLOPT_HTTPHEADER     => [
    "Authorization: Bearer " . $config['bearer'],
    "Content-Type: application/json",
  ],
  CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
]);

$respBody = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($respBody === false || $httpCode >= 400) {
    echo json_encode(["status" => "error", "reply" => "Erreur communication LingML", "debug" => $httpCode]);
    exit();
}

$respJson = json_decode($respBody, true);
$reply = $respJson['response'] ?? "Désolé, je n'ai pas compris.";

echo json_encode([
  "status"  => "success",
  "reply"   => $reply,
  "user_id" => $userId
], JSON_UNESCAPED_UNICODE);