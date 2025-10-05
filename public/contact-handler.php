<?php
declare(strict_types=1);

/**
 * Simple PHP handler for the Next.js contact form.
 *
 * Make sure this script is executed by a PHP-enabled server (Apache, Nginx + PHP-FPM, etc.).
 * If your production hosting for the Next.js app cannot execute PHP, deploy this file to a
 * separate PHP-capable origin and update NEXT_PUBLIC_CONTACT_ENDPOINT accordingly.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type');
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed',
    ]);
    exit;
}

$allowedOrigin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header('Access-Control-Allow-Origin: ' . $allowedOrigin);

// Helper to sanitise input and prevent header injection.
$sanitize = static function (?string $value): string {
    $value = trim($value ?? '');
    return str_replace(["\r", "\n"], ' ', $value);
};

$firstName = $sanitize($_POST['firstName'] ?? null);
$lastName = $sanitize($_POST['lastName'] ?? null);
$email = $sanitize($_POST['email'] ?? null);
$phone = $sanitize($_POST['phone'] ?? null);
$description = trim($_POST['description'] ?? '');

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Please provide a valid email address.',
    ]);
    exit;
}

if ($description === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Description is required.',
    ]);
    exit;
}

$to = 'admin@maxwellsoftwaresolutions.com';
$subject = 'Website contact form submission';

$bodyLines = [
    'You have received a new enquiry from the website contact form.',
    '',
    'First name: ' . ($firstName !== '' ? $firstName : 'N/A'),
    'Last name: ' . ($lastName !== '' ? $lastName : 'N/A'),
    'Email: ' . $email,
    'Phone: ' . ($phone !== '' ? $phone : 'N/A'),
    '',
    'Description:',
    $description,
];

$body = implode("\r\n", $bodyLines);

$fromAddress = 'no-reply@maxwellsoftwaresolutions.com';
$headers = [
    'From: "Maxwell Software Solutions" <' . $fromAddress . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . PHP_VERSION,
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been emailed to our team.',
    ]);
    exit;
}

http_response_code(500);
echo json_encode([
    'success' => false,
    'message' => 'We could not relay your message. Please try again later.',
]);
