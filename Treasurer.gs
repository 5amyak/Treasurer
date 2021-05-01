const EXPENSE_COLUMNS = Object.freeze(
  {'Date':0, 'MsgId':1, 'TxnFrom':2, 'TxnWith':3, 'DebitAmt':4, 'CreditAmt': 5});
const METADATA_COLUMNS = Object.freeze(
  {'From':0, 'Name':1, 'TxnWithRegex':2});

let activeSpreadsheet, templateSpreadsheet;
function initializeGlobals_() {
  activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
}

function main_(month, year) {
  try {
    initializeGlobals_();
    addExpenses_(month, year);

    console.log('Successfully created expense report for date :: %s/%s', month, year);
    activeSpreadsheet.toast('Expenses updated successfully')
  } catch(e) {
    console.error('Failed in creating expense report due to ', e.stack);
    activeSpreadsheet.toast('Some error occured. Please try again later');
  }
}

function addExpenses_(month, year) {
  let expensesSheet = getExpensesSheet_(month, year);
  activeSpreadsheet.setActiveSheet(expensesSheet);
  activeSpreadsheet.moveActiveSheet(1);

  let metadataSheet = getMetadataSheet_();
  let metaDataValues = metadataSheet.getDataRange().getValues();
  for (let i = 1; i < metaDataValues.length; i++) {
    appendExpenses_(expensesSheet, metaDataValues[i], month, year);
  }
  expensesSheet.sort(EXPENSE_COLUMNS.MsgId);
  expensesSheet.showSheet();
}

function enableAutoUpdate_() {
  ScriptApp.newTrigger('lastMonthTreasurer')
    .timeBased()
    .onMonthDay(1)
    .create();
  SpreadsheetApp.getUi().alert('Auto update enabled successfully');
}

function disableAutoUpdate_() {
  let allTriggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < allTriggers.length; i++) {
    if (allTriggers[i].getHandlerFunction() === 'lastMonthTreasurer')
      ScriptApp.deleteTrigger(allTriggers[i]);
  }
  SpreadsheetApp.getUi().alert('Auto update disabled successfully');
}