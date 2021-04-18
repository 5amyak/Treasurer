const METADATA_SHEET_NAME = 'Metadata';

let creditKeywords = [];
let debitKeywords = [];
let successKeywords = [];

function getMetadataSheet_() {
  let metadataSheet = activeSpreadsheet.getSheetByName(METADATA_SHEET_NAME);

  let metaData = metadataSheet.getDataRange().getValues();
  initializeKeywords_(metaData)
  console.log('Total rows in metadata sheet are : ' + metaData.length);
  return metadataSheet;
}

function initializeKeywords_(metaData) {
  creditKeywords = creditKeywords.concat(getColValuesByName_('Credit Keywords', metaData));
  debitKeywords = debitKeywords.concat(getColValuesByName_('Debit Keywords', metaData));
  successKeywords = successKeywords.concat(getColValuesByName_('Success Keywords', metaData));
}

function isValidTxn_(text) {
  for (const successKeyword of successKeywords) {
    if (text.indexOf(successKeyword) != -1) {
      console.log('Found a vaild transaction for email text :: %s', text);
      return true;
    }
  }
  
  console.warn('Found an invalid transaction');
  return false;
}

function isDebitTxn_(text) {
  for (let debitKeyword of debitKeywords) {
    debitKeyword = debitKeyword.toLowerCase().trim();
    if (text.indexOf(debitKeyword) != -1) return true;
  }
  
  return false;
}

function isCreditTxn_(text) {
  for (let creditKeyword of creditKeywords) {
    creditKeyword = creditKeyword.toLowerCase().trim();
    if (text.indexOf(creditKeyword) != -1) return true;
  }
  
  return false;
}
