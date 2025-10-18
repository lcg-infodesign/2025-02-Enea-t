let table;

function preload() {
  // put preload code here
  table = loadTable("assets/dataset.csv", "csv", "header");
}

function setup() {
  // controllo se ho caricato i dati
  console.log(table);

  let outerPadding = 20;
  let padding = 10;
  let itemSize = 30;

  // calcolo il numero di colonne
  let cols = floor((windowWidth - 2 * outerPadding) / (itemSize + padding))
  let rows = ceil(table.getRowCount() / cols);
  let totalHeight = outerPadding * 2 + rows * itemSize + padding * (rows - 1)
  console.log("cols: ", cols, "rows: ", rows);

  //creo il canvas
  createCanvas(windowWidth, totalHeight);
  background(255, 230, 190);

  let colCount = 0;
  let rowCount = 0;

  for(let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++) {
    // carico dati della riga
    let data = table.getRow(rowNumber).obj;

    // prendo valore per dimensione
    let myValue = data["column0"];

    // calcolo min e massimo
    let allValues = table.getColumn("column0");
    let minValue = min(allValues);
    let maxValue = max(allValues);

    let scaledValue = map(myValue, minValue, maxValue, 1, itemSize);

    //seconda variabile per il colore
    let value2 = data["column2"];
    let allValues2 = table.getColumn("column2");
    let minValue2 = min(allValues2);
    let maxValue2 = max(allValues2);
    let value2Mapped = map(value2, minValue2, maxValue2, 0, 1);

    let c1 = color("yellow");
    let c2 = color("blue");

    let mappedColor = lerpColor(c1, c2, value2Mapped);

    let xPos = outerPadding + colCount * (itemSize + padding);
    let yPos = outerPadding + rowCount * (itemSize + padding);

    fill(mappedColor);
    rect(xPos, yPos, scaledValue, scaledValue);

    // aumento colCount
    colCount++;

    // controllo se siamo a fine riga
    if(colCount == cols){
      colCount = 0;
      rowCount++;
    }
  }
}

function draw() {
  // put drawing code here
}
