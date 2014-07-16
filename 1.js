function buildRows(data, cntWidth, margin, lastClass){
  var rows = [],
    iterator = [data, 0];
  rows.push(getRow(iterator, FIRST_ROW_RATIO));
  pushNextRows(rows, iterator, cntWidth, margin, lastClass);
  data.type = "rows";
}

function pushNextRows(rows, iterator, cntWidth, margin, lastClass){
  var data = iterator[0],
    i = 0;

  while(iterator[1] < data.length) {
    rows.push(getRow(iterator, NEXT_ROWS_RATIO + (i++ % 2) * 0.5));
  }

  var lastRow = rows.pop();
  if(lastRow.volume < NEXT_ROWS_RATIO * 0.65) {
    if (rows.length == 0) {
      rows.push(lastRow);
    } else {
      var prevLastRow = rows[rows.length - 1];
      prevLastRow.ratio += lastRow.ratio;
      Array.prototype.push.apply(prevLastRow, lastRow);
    }
  } else {
    rows.push(lastRow);
  }
  var rowWidth,
    rowHeight,
    rowTotalWidth,
    row,
    ii,
    item;
  for(i=0;i < rows.length;i++){
    row = rows[i];
    rowWidth = cntWidth - margin * (row.length - 1) - 1;
    rowHeight = Math.round(rowWidth / row.ratio);
    rowTotalWidth = 0;
    for(ii=0;ii < row.length;ii++){
      item = row[ii];
      if(ii == row.length - 1){
        item.mod = lastClass;
      } else {
        //delete item.mod;
        item.mod = undefined;
        try{
            delete item.mod;
        }catch(e){}
      }
      item._height = rowHeight;
      item._width = Math.round(rowHeight * item.ratio);
      rowTotalWidth += item._width;
    }
    item = row[row.length - 1];
    item._width += rowWidth - rowTotalWidth;
  }
}

function getRow(iterator, maxRatio){
  var row = [],
    item;
  row.ratio = 0;
  row.volume = 0;
  while(row.volume < maxRatio){
    item = iterator[0][iterator[1]++];
    if(!item) break;
    row.push(item);
    row.ratio += item.ratio;
    row.volume += Math.max(item.ratio, 1 / item.ratio);
  }
  if(row.volume - maxRatio > 0.15 * maxRatio && row.length != 1) {
    var lastItem = row.pop();
    row.ratio -= lastItem.ratio;
    row.volume -= Math.max(lastItem.ratio, 1 / lastItem.ratio);
    iterator[1]--;
  }
  return row;
}


