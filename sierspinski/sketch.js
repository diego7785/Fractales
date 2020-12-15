var alto;  // Alto del triangulo inicial
let sf = 1; // factor de escala del zoom

let mx, my; // coordenadas del mouse

function setup() {
    alto=windowHeight;
    createCanvas(windowWidth, windowHeight);
    noStroke(); // Elimina los bordes de los triangulos
    fill(255);

    // Slider para cambiar el ángulo de ramificación 
    slider = createSlider(1, 10, 1,1);
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

    fill(255);

    let val = slider.value();
    
    let x = width / 2 - alto / 2;
    let y = height / 2 + alto/2 - 40;
    
    divide(x, y, alto, 1, val);
}

function divide(x, y, le, lvl, max) {
    // Creo el primer triángulo 
    if (lvl == max) {
      CreateTriangle(x, y, le);
    } else {
      // Se crean los triangulos por cada division
      divide(x, y, le / 2, lvl + 1, max); // Crea el triangulo de abajo a la izquierda
      divide(x + le / 2, y, le / 2, lvl + 1, max); // Crea el triangulo de abajo a la derecha
      divide(x + le / 4, y - le * sqrt(3) / 4, le / 2, lvl + 1, max); // Crea el triangulo de arriba
    }
}

// Crea un triángulo dada la posición (x,y) y su alto (le)
function CreateTriangle(x, y, le) {
    triangle(x, y, x + le / 2, y - le * sqrt(3) / 2, x + le, y);
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