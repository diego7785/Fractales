let sf = 1; // factor de escala del zoom

let mx, my; // coordenadas del mouse

var scaleFactor = 0.5;
var alphaValue = 10;
var scaleSlider;

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);

    // Slider para cambiar el ángulo de ramificación
    slider = createSlider(0.3, 0.57, 0.3, 0.01);
    slider.position(windowWidth-100, 10);
    slider.style('width', '80px');
}

function polygon(x, y, radius, npoints) {
    var angle = TWO_PI/npoints;

    // Dibujar forma inicial usando el scaleFactor para determinar el tamaño del radio de las generaciones
    scaleFactor = slider.value();
    fill(255, 0);

    beginShape();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = x + cos(a) * radius;
            var sy = y + sin(a) * radius;
            vertex(sx, sy);
        }
    endShape(CLOSE);

    // Dibujar formas recursivas
    if (radius > 10) {
        push();
            translate(x, y); // Mueve la posicion de creacion de objetos a la posicion dada
            rotate(PI/4);
            polygon(radius, 0, radius * scaleFactor, npoints); // Dibujar polygon
            polygon(0, radius, radius * scaleFactor, npoints);
            polygon(0, -radius, radius * scaleFactor, npoints);
            polygon(-radius, 0, radius * scaleFactor, npoints);
        pop();
    }
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

    stroke(255);

    const x = width/2
    const y = height/2
    const radius = 150
    const points = 6

    polygon(x, y, radius, points); // Dibujar polygon
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
