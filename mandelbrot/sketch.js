/*let sf = 1; // factor de escala del zoom


let mx, my; // coordenadas del mouse

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Slider para cambiar el ángulo de ramificación 
    slider = createSlider(1, 50, 7,0.1);
    slider.position(windowWidth-100, 10);
    slider.style('width', '80px');
}

function draw() {
    // Posicion del mouse
    mx = mouseX;
    my = mouseY;

    background(18,18,36);

    translate(mx, my); // Mueve la posicion de creacion de objetos a la posicion dada
    scale(sf); // Escala la figura al factor dado
    translate(-mx, -my);
    translate();

    // Crea el triangulo de redirigir a la página anterior
    fill(207, 136, 70);
    triangle(20, 40, 60, 15, 60, 60);

    // Crea la primer rama en el centro de la pantalla
    translate(width/2, height); 
    stroke(207, 136, 70);
    branch(150);
    translate(0, -150);
}

// Crea las ramas del árbol de forma recursiva cambiando el ángulo de creación de las mismas
function branch(length){
    line(0,0,0,-length); // Crea la linea
    translate(0,-length);
    if(length > 5){
        let val = slider.value();

        push(); 
            rotate(PI/val); // Rota 45 grados la linea
            branch(length * 0.75)
        pop();
        push();
            rotate(-PI/val);
            branch(length * 0.75)
        pop();
    }
}

// Función para detectar click en la figura del triangulo que redirige a la página anterior
function mousePressed() {
    if(mouseX>20 && mouseX<60 && mouseY<60 && mouseY>15) {
        window.location.replace('../choose/index.html');
    }
}

// Implementando zoom al usar la rueda del mouse
window.addEventListener("wheel", function(e) {
  if (e.deltaY > 0)
    sf *= 0.95;
  else
    sf *= 1.05 ;
});
*/

let sf = 1; // factor de escala del zoom


let mx, my; // coordenadas del mouse
let ax, ay;
let bx, by;
let cx, cy;
let x, y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ax = width / 2;
  ay = 0;
  bx = 0;
  by = height;
  cx = width;
  cy = height;
  x = random(width);
  y = random(height);
  background(0);
  stroke(255);
  strokeWeight(8);
  point(ax, ay);
  point(bx, by);
  point(cx, cy);
}

function draw() {
    //mx = mouseX;
    //my = mouseY;

    background(18,18,36);

    //translate(mx, my); // Mueve la posicion de creacion de objetos a la posicion dada
    // scale(sf); // Escala la figura al factor dado
    //translate(-mx, -my);
    //translate();
  for (let i = 0; i < 100; i++) {
    strokeWeight(2);
    point(x, y);
    let r = floor(random(3));
    if (r == 0) {
      stroke(255, 0, 255);
      x = lerp(x, ax, 0.5);
      y = lerp(y, ay, 0.5);
    } else if (r == 1) {
      stroke(0, 255, 255);
      x = lerp(x, bx, 0.5);
      y = lerp(y, by, 0.5);
    } else if (r == 2) {
      stroke(255, 255, 0);
      x = lerp(x, cx, 0.5);
      y = lerp(y, cy, 0.5);
    }
  }
}