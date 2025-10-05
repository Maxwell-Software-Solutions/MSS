declare(strict_types=1);
<?php
header('Content-Type: text/plain; charset=utf-8');
http_response_code(410);
echo 'This endpoint has been retired. Please submit the form via /api/contact.';
