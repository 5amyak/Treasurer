function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  console.log('Sheet opened in auth mode :: %s', e.authMode);
  
  // https://developers.google.com/workspace/add-ons/concepts/editor-auth-lifecycle
  if (e && e.authMode != ScriptApp.AuthMode.NONE) {
    var menu = SpreadsheetApp.getUi().createMenu('Treasurer');
    menu.addItem('Previous Month', 'prevMonthTreasurer');
    menu.addItem('Current Month', 'curMonthTreasurer');
    menu.addItem('Custom Month', 'customMonthTreasurer');
    menu.addItem('Auto Update', 'autoUpdate');

    menu.addToUi();
  }
}