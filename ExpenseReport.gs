const DATA_TEMPLATE_SHEET_NAME = 'DataTemplate';

function getExpensesSheet_(month, year) {
  let expensesSheet = activeSpreadsheet.getSheetByName(month + '/' + year);
  if (expensesSheet == null) {
    let dataTemplateSheet = activeSpreadsheet.getSheetByName(DATA_TEMPLATE_SHEET_NAME);
    expensesSheet = dataTemplateSheet.copyTo(activeSpreadsheet).setName(month + '/' + year);
  }

  return expensesSheet;
}

function appendExpenses_(expensesSheet, metaDataRow, month, year) {
  let mailThreads = scanGmail_(metaDataRow[METADATA_COLUMNS.From].trim(), month, year);

  for (const thread of mailThreads) {
    for (const msg of thread.getMessages()) {
      const expenseRow = scrapeData_(msg, metaDataRow);
      if (expenseRow != null && expenseRow.length > 0 
            && !isAlreadyProcessed_(expensesSheet, expenseRow[EXPENSE_COLUMNS.MsgId]))
        expensesSheet.appendRow(expenseRow);
    }
  }
}

function isAlreadyProcessed_(expensesSheet, msgId) {
  let data = expensesSheet.getDataRange().getValues();
  let processedIds = getColValuesByName_('Id', data);
  
  console.log('%d expenses are present in the sheet', processedIds.length);
  return (processedIds.indexOf(msgId) != -1);
}