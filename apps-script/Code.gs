/**
 * VERA Nutrition — Waitlist backend (Google Apps Script)
 *
 * SETUP:
 * 1. Create a new Google Sheet (any name, e.g. "VERA Waitlist").
 * 2. Extensions > Apps Script.
 * 3. Delete the default code, paste this whole file in.
 * 4. Change ADMIN_KEY below to a secret only you know.
 * 5. Deploy > New deployment > Type: "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web app URL (ends in /exec). You'll need it for index.html and admin.html.
 */

const SHEET_NAME = 'Waitlist';
const ADMIN_KEY = 'CHANGE-THIS-TO-YOUR-OWN-SECRET'; // <-- edit this

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      (data.fullname || '').toString().trim(),
      (data.email || '').toString().trim(),
      (data.phone || '').toString().trim()
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  const key = (e.parameter.key || '').toString();
  if (key !== ADMIN_KEY) {
    return json_({ ok: false, error: 'unauthorized' });
  }
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const rows = values.slice(1); // drop header row
  const entries = rows
    .filter(function (r) { return r[1] || r[2]; })
    .map(function (r) {
      return {
        timestamp: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
        fullname: r[1],
        email: r[2],
        phone: r[3]
      };
    })
    .reverse(); // newest first
  return json_({ ok: true, entries: entries });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Full name', 'Email', 'Phone']);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
