let sf = 1; // factor de escala del zoom

let mx, my; // coordenadas del mouse

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Slider para cambiar el ángulo de ramificación 
    slider = createSlider(1, 50, 7,0.1);
    slider.position(windowWidth-100, 10);
    slider.style('width', '80px');

    sliderII = createSlider(2, 200, 7,2);
    sliderII.position(windowWidth-100, 30);
    sliderII.style('width', '80px');
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
}

// Crea las ramas del árbol de forma recursiva cambiando el ángulo de creación de las mismas
function branch(length){
    line(0,0,0,-length); // Crea la linea
    translate(0,-length);
    let valSII = sliderII.value();
    if(length > valSII){
        let val = slider.value();

        push(); 
            rotate(PI/val); // Rota PI/val grados la linea
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

  