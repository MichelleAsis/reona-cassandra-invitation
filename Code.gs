const SPREADSHEET_ID = "PASTE_YOUR_GOOGLE_SHEET_ID_HERE";
const RESPONSE_SHEET_NAME = "RSVPs";

function doPost(event) {
  const fields = event && event.parameter ? event.parameter : {};

  if (fields.website) {
    return respond_(true);
  }

  let lock;
  try {
    if (!SPREADSHEET_ID || SPREADSHEET_ID === "PASTE_YOUR_GOOGLE_SHEET_ID_HERE") {
      throw new Error("Set SPREADSHEET_ID before deploying the RSVP service.");
    }

    const guest = String(fields.guest || "").trim();
    const attendance = String(fields.attendance || "").trim();
    const message = String(fields.message || "").trim();
    const validAttendance = ["Yes! I will attend", "Sorry, I will not be attending"];

    if (!guest || guest.length > 120 || !validAttendance.includes(attendance) || message.length > 1000) {
      throw new Error("The RSVP submission did not pass validation.");
    }

    lock = LockService.getScriptLock();
    lock.waitLock(10000);

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(RESPONSE_SHEET_NAME) || spreadsheet.insertSheet(RESPONSE_SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Submitted at", "Guest name", "Attendance", "Birthday wish"]);
    }
    sheet.appendRow([
      new Date(),
      asPlainText_(guest),
      attendance,
      asPlainText_(message)
    ]);

    return respond_(true);
  } catch (error) {
    console.error(error);
    return respond_(false);
  } finally {
    if (lock && lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function asPlainText_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function respond_(ok) {
  const result = JSON.stringify({ type: "reona-rsvp-result", ok: ok });
  return HtmlService.createHtmlOutput(
    "<!doctype html><html><body><script>window.parent.postMessage(" +
      result +
      ', "*");</script></body></html>'
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
