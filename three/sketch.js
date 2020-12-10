let sf = 1; // scaleFactor


let mx, my; // mouse coords

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Slider para cambiar el angulo de ramificacion 
    slider = createSlider(1, 50, 7,0.1);
    slider.position(windowWidth-100, 10);
    slider.style('width', '80px');
}

function draw() {
    // Posicion del mouse
    mx = mouseX;
    my = mouseY;

    background(18,18,36);

    translate(mx, my);
    scale(sf);
    translate(-mx, -my);
    translate();

    fill(207, 136, 70);
    triangle(20, 40, 60, 15, 60, 60);

    translate(width/2, height); // Mueve el posicion de creacion a la posicion dada
    stroke(207, 136, 70);
    branch(150);
    translate(0, -150);

}

// Crea una linea dado el largo de la misma
function branch(length){
    line(0,0,0,-length);
    translate(0,-length);
    if(length > 5){
    let val = slider.value();

    // Fragmento de código que permite reiniciar la posicion de creacion a la anterior
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

function mousePressed() {
    if(mouseX>20 && mouseX<60 && mouseY<60 && mouseY>15) {
        window.location.replace('../choose/index.html');
    }
}

window.addEventListener("wheel", function(e) {
  if (e.deltaY > 0)
    sf *= 0.95;
  else
    sf *= 1.05 ;
});