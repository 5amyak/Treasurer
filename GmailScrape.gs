const TXN_AMOUNT_INITIAL_REGEX = /(₹|rs|inr)[\s\d\.]+/;
const TXN_AMOUNT_FINAL_REGEX = /\d+\.?\d*/;
const TXN_WITH_REGEX = ' ';
const DELIM = '|';

function scanGmail_(fromGmail, month, year) {
  if (fromGmail == null || fromGmail.length == 0)
    return [];
  
  const searchQuery = formSearchQuery_(fromGmail, month, year);
  const mailThreads = GmailApp.search(searchQuery);
  console.log('Found %d messages for search query :: "%s"', mailThreads.length, searchQuery);
  return mailThreads;
}

function formSearchQuery_(fromGmail, month, year) {
  let afterDate = year + '/' + month + '/1';
  let beforeDate = year + '/' + (month+1) + '/1';
  if (month === 12) beforeDate = (year+1) + '/1/1';
  
  return 'from:' + fromGmail + ' after:' + afterDate + ' before:' + beforeDate;
}

function scrapeData_(msg, metaDataRow) {
  const msgId = msg.getId().trim();
  const msgDate = msg.getDate();
  const msgSubject = msg.getSubject().trim();
  const msgBody = msg.getPlainBody().trim();
  const msgText = msgSubject.concat(DELIM).concat(msgBody).toLowerCase().replace(/,/g, '').replaceAll('\n', ' ').trim();
  
  const txnFrom = metaDataRow[METADATA_COLUMNS.Name].trim();
  const txnWith = getTxnWith_(msgText, metaDataRow[METADATA_COLUMNS.TxnWithRegex]);
  const txnAmount = getTxnAmount_(msgText, TXN_AMOUNT_INITIAL_REGEX);
  if (txnAmount && isCreditTxn_(msgText)) return [msgDate, msgId, txnFrom, txnWith, , txnAmount];
  else if (txnAmount) return [msgDate, msgId, txnFrom, txnWith, txnAmount, ];
  else return null;
}

function getTxnWith_(msgText, regExpStr) {
  let txnWithText = '';
  if (regExpStr) {
    txnWithText = getMatchedStr_(msgText, regExpStr);
    txnWithText = txnWithText.substring(txnWithText.indexOf(TXN_WITH_REGEX)).trim();
  }
  
  if (txnWithText === '' || txnWithText.split(' ').filter(s => !(s.trim() === '')).length > 5) 
    txnWithText = msgText.substring(0, msgText.indexOf(DELIM)).trim();
  console.log('Found txn with text :: "%s" after using regex :: "%s"', txnWithText, regExpStr);
  return toTitleCase_(txnWithText);
}

function getTxnAmount_(msgText, regExp) {
  let txnAmountText = getMatchedStr_(msgText, regExp);
  console.log('Found txn amount text :: "%s" after using regex :: "%s"', txnAmountText, regExp);
  if (regExp !== TXN_AMOUNT_FINAL_REGEX)
    txnAmountText = getTxnAmount_(txnAmountText, TXN_AMOUNT_FINAL_REGEX);
  
  return txnAmountText;
}
