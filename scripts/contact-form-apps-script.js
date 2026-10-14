// Paste this into Extensions > Apps Script on your Google Sheet.
// Then Deploy > New deployment > type "Web app" > execute as "Me" > access "Anyone".
// Copy the resulting /exec URL into .env.local as GOOGLE_SHEET_URL.

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.source || "",
    data.name || "",
    data.email || "",
    data.service || "",
    data.budget || "",
    data.message || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
