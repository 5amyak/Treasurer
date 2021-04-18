function getColValuesByName_(colName, data) {
  let col = data[0].indexOf(colName);
  
  let colValues = [];
  if (col != -1) {
    for (let i = 1; i < data.length; i++) {
      if (data[i][col]) colValues.push(data[i][col]);
    }
  }
  
  return colValues;
}

function getMatchedStr_(str, regExp) {
  const strMatches = str.match(regExp);
  if (strMatches && strMatches.length > 0) {
    return strMatches[0].trim();
  } else {
    return "";
  }
}

function toTitleCase_(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

function beautifyDataSheet_(dataSheet) {
  dataSheet.setFrozenRows(1);
  dataSheet.setFrozenColumns(1);
  dataSheet.hideColumn(dataSheet.getRange("B1"));

  let debitAmountFormattingRule = SpreadsheetApp.newConditionalFormatRule()
    .setGradientMaxpoint("#E87674")
    .setGradientMinpoint("#FFE0E1")
    .setRanges([dataSheet.getRange("E1:E")])
    .build();
  let creditAmountFormattingRule = SpreadsheetApp.newConditionalFormatRule()
    .setGradientMaxpoint("#A5E830")
    .setGradientMinpoint("#E7FFE7")
    .setRanges([dataSheet.getRange("F1:F")])
    .build();
  dataSheet.setConditionalFormatRules([debitAmountFormattingRule, creditAmountFormattingRule]);
}
