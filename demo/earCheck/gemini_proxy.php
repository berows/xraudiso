<?php
declare(strict_types=1);

ini_set('display_errors', '0');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { http_response_code(204); exit; }
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Method Not Allowed'], JSON_UNESCAPED_UNICODE);
  exit;
}

$apiKey = '';
$keyFile = __DIR__ . '/gemini_key.php';
if (is_file($keyFile)) {
  $apiKey = (string) require $keyFile;
}
$apiKey = trim($apiKey);

if ($apiKey === '') {
  http_response_code(500);
  echo json_encode(['error' => 'Missing GEMINI_API_KEY (ear/gemini_key.php)'], JSON_UNESCAPED_UNICODE);
  exit;
}

$raw = file_get_contents('php://input');
$input = json_decode($raw ?: '', true);
if (!is_array($input)) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid JSON'], JSON_UNESCAPED_UNICODE);
  exit;
}

$prompt   = trim((string)($input['prompt'] ?? ''));
$imageB64 = (string)($input['image'] ?? '');
$mimeType = (string)($input['mimeType'] ?? 'image/jpeg');

// PHP 7 compatibility: strip data URL header if present (e.g. "data:image/jpeg;base64,...")
if (strncmp($imageB64, 'data:', 5) === 0) {
  $parts = explode(',', $imageB64, 2);
  $imageB64 = $parts[1] ?? '';
}

if ($prompt === '' || $imageB64 === '') {
  http_response_code(400);
  echo json_encode(['error' => 'prompt/image required'], JSON_UNESCAPED_UNICODE);
  exit;
}

$model = 'gemini-2.5-flash';
$url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent";

$payload = [
  'contents' => [[
    'role' => 'user',
    'parts' => [
      ['text' => $prompt],
      ['inlineData' => ['mimeType' => $mimeType, 'data' => $imageB64]],
    ],
  ]],
  'generationConfig' => [
    'responseMimeType' => 'application/json',
    'responseJsonSchema' => [
      'type' => 'object',
      'properties' => [
        'overall_health_status' => ['type' => 'string'],
        'detailed_analysis' => ['type' => 'string'],
        'deficient_nutrients' => [
          'type' => 'array',
          'items' => ['type' => 'string'],
        ],
        'segmentation_analysis' => [
          'type' => 'array',
          'items' => ['type' => 'object'],
        ],
      ],
      'required' => [
        'overall_health_status',
        'detailed_analysis',
        'deficient_nutrients',
        'segmentation_analysis',
      ],
    ],
    'temperature' => 0.2,
    'maxOutputTokens' => 8192,
  ],
];

$ch = curl_init($url);
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    'Content-Type: application/json',
    'x-goog-api-key: ' . $apiKey,
  ],
  CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
  CURLOPT_TIMEOUT => 40,
]);

$resBody = curl_exec($ch);
$httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err = curl_error($ch);
curl_close($ch);

if ($resBody === false) {
  http_response_code(502);
  echo json_encode(['error' => 'Upstream error', 'detail' => $err], JSON_UNESCAPED_UNICODE);
  exit;
}

http_response_code($httpCode);
echo $resBody;