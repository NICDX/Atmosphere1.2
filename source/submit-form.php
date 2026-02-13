<?php
/**
 * Обработчик формы регистрации / заказа обратного звонка
 * Atmosphere 1.2 - Бюро Атмосфера
 * 
 * Принимает POST запросы с полями:
 * - name (string, required) — Имя клиента
 * - telephonenumber (string, required) — Номер телефона
 * 
 * Возвращает JSON ответ:
 * - success: true/false
 * - message: описание результата
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Только POST запросы
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Метод не разрешён. Используйте POST.'
    ]);
    exit;
}

// Получаем данные из тела запроса (поддержка JSON и form-data)
$contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';

if (strpos($contentType, 'application/json') !== false) {
    $input = json_decode(file_get_contents('php://input'), true);
    $name = isset($input['name']) ? trim($input['name']) : '';
    $phone = isset($input['telephonenumber']) ? trim($input['telephonenumber']) : '';
} else {
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $phone = isset($_POST['telephonenumber']) ? trim($_POST['telephonenumber']) : '';
}

// Валидация
$errors = [];

if (empty($name)) {
    $errors[] = 'Имя обязательно для заполнения';
}

if (mb_strlen($name) < 2) {
    $errors[] = 'Имя должно содержать минимум 2 символа';
}

if (mb_strlen($name) > 100) {
    $errors[] = 'Имя не должно превышать 100 символов';
}

if (empty($phone)) {
    $errors[] = 'Номер телефона обязателен для заполнения';
}

// Проверка формата телефона (допускаем +7, 8, или просто цифры)
$cleanPhone = preg_replace('/[\s\-\(\)]/', '', $phone);
if (!preg_match('/^[\+]?[0-9]{10,15}$/', $cleanPhone)) {
    $errors[] = 'Некорректный формат номера телефона';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => implode('. ', $errors),
        'errors' => $errors
    ]);
    exit;
}

// Санитизация данных
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($cleanPhone, ENT_QUOTES, 'UTF-8');

// === СОХРАНЕНИЕ ДАННЫХ ===

// 1. Сохранение в файл (CSV)
$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$csvFile = $dataDir . '/registrations.csv';
$isNewFile = !file_exists($csvFile);

$fp = fopen($csvFile, 'a');
if ($fp) {
    if ($isNewFile) {
        fputcsv($fp, ['Дата', 'Имя', 'Телефон', 'IP', 'User-Agent']);
    }
    fputcsv($fp, [
        date('Y-m-d H:i:s'),
        $name,
        $phone,
        $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ]);
    fclose($fp);
}

// 2. Отправка email-уведомления (раскомментируйте и настройте)
/*
$to = 'your-email@example.com';  // <-- Укажите ваш email
$subject = 'Новая заявка с сайта Бюро Атмосфера';
$emailBody = "Новая заявка на обратный звонок:\n\n";
$emailBody .= "Имя: {$name}\n";
$emailBody .= "Телефон: {$phone}\n";
$emailBody .= "Дата: " . date('d.m.Y H:i:s') . "\n";
$emailBody .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

$headers = "From: noreply@atmosphere-buro.ru\r\n";
$headers .= "Reply-To: noreply@atmosphere-buro.ru\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

mail($to, $subject, $emailBody, $headers);
*/

// 3. Сохранение в базу данных (раскомментируйте и настройте)
/*
try {
    $pdo = new PDO('mysql:host=localhost;dbname=atmosphere;charset=utf8mb4', 'username', 'password');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo->prepare('INSERT INTO registrations (name, phone, created_at, ip_address) VALUES (?, ?, NOW(), ?)');
    $stmt->execute([$name, $phone, $_SERVER['REMOTE_ADDR'] ?? 'unknown']);
} catch (PDOException $e) {
    // Логируем ошибку, но не показываем пользователю
    error_log('DB Error: ' . $e->getMessage());
}
*/

// Успешный ответ
echo json_encode([
    'success' => true,
    'message' => 'Спасибо! Мы свяжемся с вами в ближайшее время.'
]);
