let table;
let itemSize = 14;

if(windowHeight >= windowWidth) {
  scala = windowWidth;
} else {
  scala = windowHeight;
}

function decina(x) {
  return floor(Math.abs(x)/10);
}

function rotateAroundCenter(anglex) {
  translate(itemSize, 0);
  rotate(anglex);
}

function preload() {
  // put preload code here
  table = loadTable("assets/dataset.csv", "csv", "header");
}

function setup() {
  // controllo se ho caricato i dati
  console.log(table);

  //creo il canvas
  createCanvas(windowWidth, windowHeight);
  background(0, 100, 160);
  angleMode(DEGREES); //più comodo per le rotazioni

  let angle = 10; //ogni glifo successivo sarà ruotato di 10deg in più
  let dim = 1; //serve per evitare che i glifi diventino sempre più lontani
  //tra loro man mano che si allontanano dal centro

  for(let i = 0; i < table.getRowCount(); i++){
    //creo la spirale
    push();
    translate(windowWidth/2, windowHeight/2);
    rotate(2*i/dim * angle);
    fill(220);
    push();
      translate(50 + 1.2 * i/dim + itemSize/2, 0)
      //creo i glifi
      let x0 = table.getNum(i, 0);
      let x1 = table.getNum(i, 1);
      let x2 = table.getNum(i, 2);
      let x3 = table.getNum(i, 3);
      let x4 = table.getNum(i, 4);
      noStroke()
      //rect(0, 0, itemSize, itemSize);
      
      fill("white");

      //barre di base
      if(x0 >= 0) {
        rotateAroundCenter(90);
      }
      rect(itemSize/2 - 0.5, 0, 1, itemSize);

      //cerchi e quad
      if(x0 % 6 !== 0) {
        if(x2 % 3 == 0) {
        stroke("white");
        noFill();
      }
      let circleY = map(decina(x1), 0, 10, itemSize/10, itemSize - (itemSize/10));
      let radius = itemSize/2;
      if(x4 % 5 == 0) {
        radius = itemSize/1.25;
      }
      circle(itemSize/2, circleY, radius);
      } else {
        stroke("white");
        noFill();
        let quadY = decina(x3) * (itemSize/20);
        quad(
          itemSize/2, 0,
          (3/4) * itemSize, quadY,
          itemSize/2, itemSize,
          itemSize/4, quadY
        )
      }

      //triangoli
      stroke("white");
      noFill();
      let verticeY = decina(x4)
      if(x0 % 2 == 0 && x3 >= 0) {
        triangle(
          (itemSize/4), itemSize,
          itemSize - (itemSize/4), itemSize,
          itemSize/2, verticeY
        );
      }

    pop();
    pop();
    dim = dim + 0.0028;
  }
}

function draw() {
  // put drawing code here
}
