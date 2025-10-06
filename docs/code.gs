/**
 * Google Apps Script endpoint for Maxwell Software Solutions contact form.
 * Deploy this as a Web App (doGet/doPost) with “Anyone” or “Anyone with the link” access.
 */

/**
 * Main POST handler. Expects JSON payload:
 * {
 *   "token": "<shared secret>",
 *   "name": "Full name or fallback value",
 *   "email": "user@example.com",
 *   "message": "Contact message",
 *   "phone": "optional phone number"
 * }
 */
function doPost(e) {
  try {
    const payload = parseRequest(e);
    validatePayload(payload);
    notifyTeam(payload);
    logSubmission(payload);

    return buildResponse(200, {
      ok: true,
      message: 'Thanks! Your message is on its way to our team.',
    });
  } catch (error) {
    const status = error.status || 500;
    const message =
      status === 401
        ? 'Unauthorized request.'
        : status === 400
          ? error.message
          : 'We hit a snag delivering your message. Please retry later.';

    console.error('Contact form error:', message, error);
    return buildResponse(status, { ok: false, message });
  }
}

/**
 * Parse and normalize the incoming request.
 */
function parseRequest(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw createHttpError(400, 'Missing POST payload.');
  }

  const contentType = e.postData.type || '';
  if (contentType.indexOf('application/json') === -1) {
    throw createHttpError(400, 'Unsupported content type.');
  }

  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (parseError) {
    throw createHttpError(400, 'Invalid JSON payload.');
  }

  return {
    token: String(body.token || '').trim(),
    name: String(body.name || '').trim(),
    email: String(body.email || '').trim(),
    message: String(body.message || '').trim(),
    phone: body.phone ? String(body.phone).trim() : '',
  };
}

/**
 * Validate shared token and required fields.
 */
function validatePayload(payload) {
  const expectedToken = PropertiesService.getScriptProperties().getProperty('SHARED_TOKEN');
  if (!expectedToken) {
    throw createHttpError(500, 'Server misconfiguration. Token missing.');
  }
  if (payload.token !== expectedToken) {
    throw createHttpError(401, 'Invalid shared token.');
  }

  if (!payload.email || !payload.message) {
    throw createHttpError(400, 'Email and message are required.');
  }
}

/**
 * Send the notification email (customize the recipient as needed).
 */
function notifyTeam(payload) {
  const recipient = PropertiesService.getScriptProperties().getProperty('TEAM_EMAIL') || 'hello@maxwell.software';

  const subject = `New contact: ${payload.name || payload.email}`;
  const bodyLines = [
    `Name: ${payload.name || 'N/A'}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    '',
    'Message:',
    payload.message,
    '',
    `Submitted at: ${new Date().toISOString()}`,
  ].filter(Boolean);

  GmailApp.sendEmail(recipient, subject, bodyLines.join('\n'));
}

/**
 * Optional logging in spreadsheet (comment out if not needed).
 */
function logSubmission(payload) {
  const sheetId = PropertiesService.getScriptProperties().getProperty('SUBMISSIONS_SHEET_ID');
  if (!sheetId) {
    return; // Skip logging unless configured.
  }

  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Submissions');
  if (!sheet) {
    throw createHttpError(500, 'Submissions sheet not found.');
  }

  sheet.appendRow([new Date(), payload.name, payload.email, payload.phone, payload.message]);
}

/**
 * Helpers
 */
function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function buildResponse(status, body) {
  return ContentService.createTextOutput(JSON.stringify(body, null, 2))
    .setMimeType(ContentService.MimeType.JSON)
    .setResponseCode(status);
}
