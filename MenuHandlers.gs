function prevMonthTreasurer() {
  let d = new Date();
  d.setMonth(d.getMonth() - 1);
  main_(d.getMonth() + 1, d.getFullYear());
}

function curMonthTreasurer() {
  let d = new Date();
  main_(d.getMonth() + 1, d.getFullYear());
}

function customMonthTreasurer() {
  let html = HtmlService.createHtmlOutputFromFile('CustomMonthDialog')
      .setWidth(260)
      .setHeight(65);
  SpreadsheetApp.getUi()
      .showModalDialog(html, 'Enter Month');
}

function customMonthDialogHandler(dateForm) {
  let date = dateForm['dateInput'];
  const month = parseInt(date.split('-')[1]);
  const year = parseInt(date.split('-')[0]);
  main_(month, year);
}

function autoUpdate() {
  const ui = SpreadsheetApp.getUi();
  try {
    let isAutoUpdateInstalled = isAutoUpdateEnabled_();
    let alertText = formAutoUpdateAlertText_(isAutoUpdateInstalled);
    let result = ui.alert('Auto Update', alertText, ui.ButtonSet.YES_NO);
    if (result == ui.Button.YES) {
      if (isAutoUpdateInstalled) disableAutoUpdate_();
      else enableAutoUpdate_();
    }
    console.log('Successfully handled auto update');
  } catch(e) {
    console.error('Failed in handling auto update due to ', e.stack);
    ui.alert('Some error occured. Please try again later');
  }
}

function formAutoUpdateAlertText_(isAutoUpdateInstalled) {
  let alertText;
  if (isAutoUpdateInstalled) {
    alertText = 'Auto update is enabled. Do you want to disable auto update of sheet on 1st of every month ?';
  } else {
    alertText = 'Auto update is disabled. Do you want to enable auto update of sheet on 1st of every month ?';
  }

  return alertText;
}

function isAutoUpdateEnabled_() {
  let isAutoUpdateInstalled = false;
  let allTriggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < allTriggers.length; i++) {
    if (allTriggers[i].getHandlerFunction() === 'lastMonthTreasurer')
      isAutoUpdateInstalled = true;
  }

  return isAutoUpdateInstalled;
}