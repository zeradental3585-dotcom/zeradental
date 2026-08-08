/**
 * Zera Dental — Lead capture backend
 * Receives form + audit submissions from zeradental.in and writes them to a Google Sheet.
 *
 * SETUP (5 minutes) — see SETUP.md in this folder.
 */

var SHEET_NAME = 'Leads';

// Optional: get an email whenever a new lead arrives. Leave '' to disable.
var NOTIFY_EMAIL = '';

var HEADERS = [
  'Timestamp (IST)',
  'Name',
  'WhatsApp',
  'Clinic',
  'City',
  'Existing Website',
  'Source',
  'Audit Score',
  'Audit Band',
  'Top Gaps',
  'Message',
  'Audit Answers',
  'Page',
  'Referrer',
  'Status',
  'Notes'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);

    var data = {};
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      data = e.parameter || {};
    }

    var sheet = getSheet_();

    var row = [
      formatIST_(new Date()),
      str_(data.name),
      normalisePhone_(data.phone),
      str_(data.clinic),
      str_(data.city || data.cityPage),
      str_(data.website),
      str_(data.source),
      data.auditScore === undefined || data.auditScore === '' ? '' : Number(data.auditScore),
      str_(data.auditBand),
      str_(data.topGaps),
      str_(data.message),
      str_(data.auditAnswers),
      str_(data.page),
      str_(data.referrer),
      'New',
      ''
    ];

    sheet.appendRow(row);
    highlightLastRow_(sheet);

    if (NOTIFY_EMAIL) {
      notify_(data);
    }

    return json_({ result: 'success', row: sheet.getLastRow() });
  } catch (err) {
    return json_({ result: 'error', message: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

function doGet() {
  return json_({ result: 'ok', message: 'Zera Dental lead endpoint is live.' });
}

/* ---------- helpers ---------- */

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    var header = sheet.getRange(1, 1, 1, HEADERS.length);
    header.setFontWeight('bold')
          .setBackground('#0B1F33')
          .setFontColor('#FFFFFF')
          .setVerticalAlignment('middle');
    sheet.setFrozenRows(1);
    sheet.setRowHeight(1, 34);
    var widths = [150, 150, 130, 170, 110, 190, 190, 90, 90, 260, 260, 320, 150, 180, 90, 220];
    for (var i = 0; i < widths.length; i++) sheet.setColumnWidth(i + 1, widths[i]);
  }
  return sheet;
}

function highlightLastRow_(sheet) {
  var r = sheet.getLastRow();
  if (r < 2) return;
  var score = sheet.getRange(r, 8).getValue();
  if (score === '' || isNaN(score)) return;
  var colour = score < 30 ? '#fde8e8' : score < 55 ? '#fef3e2' : score < 80 ? '#fdf9e3' : '#eafaf4';
  sheet.getRange(r, 1, 1, HEADERS.length).setBackground(colour);
}

function notify_(data) {
  var subject = 'New Zera Dental lead: ' + (data.name || 'Unknown') +
                (data.city ? ' (' + data.city + ')' : '');
  var body =
    'Name: ' + str_(data.name) + '\n' +
    'WhatsApp: ' + normalisePhone_(data.phone) + '\n' +
    'Clinic: ' + str_(data.clinic) + '\n' +
    'City: ' + str_(data.city || data.cityPage) + '\n' +
    'Website: ' + str_(data.website) + '\n' +
    'Source: ' + str_(data.source) + '\n' +
    (data.auditScore ? 'Audit score: ' + data.auditScore + ' (' + str_(data.auditBand) + ')\n' : '') +
    (data.topGaps ? 'Top gaps: ' + str_(data.topGaps) + '\n' : '') +
    (data.message ? 'Message: ' + str_(data.message) + '\n' : '') +
    '\nOpen WhatsApp: https://wa.me/' + normalisePhone_(data.phone).replace(/\D/g, '');
  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

function str_(v) {
  return v === undefined || v === null ? '' : String(v);
}

function normalisePhone_(p) {
  var d = str_(p).replace(/\D/g, '');
  if (d.length === 10) return '91' + d;
  return d;
}

function formatIST_(d) {
  return Utilities.formatDate(d, 'Asia/Kolkata', 'dd MMM yyyy, HH:mm');
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
