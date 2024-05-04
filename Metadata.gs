const METADATA_SHEET_NAME = 'Metadata';

let creditKeywords = [];

function getMetadataSheet_() {
  let metadataSheet = activeSpreadsheet.getSheetByName(METADATA_SHEET_NAME);

  let metaData = metadataSheet.getDataRange().getValues();
  initializeKeywords_(metaData)
  console.log('Total rows in metadata sheet are : ' + metaData.length);
  return metadataSheet;
}

function initializeKeywords_(metaData) {
  creditKeywords = creditKeywords.concat(getColValuesByName_('Credit Keywords', metaData));
}

function isCreditTxn_(text) {
  for (let creditKeyword of creditKeywords) {
    let creditRegex = new RegExp('\\s' + creditKeyword.toLowerCase().trim() + '\\s');
    if (text.search(creditRegex) != -1) {
      console.log('Found a credit keyword :: %s', creditKeyword);
      return true;
    }
  }
  
  return false;
}
