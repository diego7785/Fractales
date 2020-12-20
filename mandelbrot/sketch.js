let sf = 1; // factor de escala del zoom

let mx, my; // coordenadas del mouse

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);

    // Slider para cambiar el ángulo de ramificación
    slider = createSlider(1, 50, 7,0.1);
    slider.position(windowWidth-100, 10);
    slider.style('width', '80px');
}

function draw() {
    // Posicion del mouse
    mx = mouseX;
    my = mouseY;

    background(0);

    // Definir rango de valores en el plano complejo
    const w = 6;
    const h = (w * height) / width;
    const xmin = -w/2;
    const ymin = -h/2;

    loadPixels();

    // Max de iteraciones para cada punto en el plano complejo
    let maxiterations = slider.value();

    // x va de xmin a xman
    const xmax = xmin + w;
    // y va de ymin a ymax
    const ymax = ymin + h;

    // Valor de incremento para x y y
    const dx = (xmax - xmin) / (width);
    const dy = (ymax - ymin) / (height);

    let y = ymin;
    for (let j = 0; j < height; j++) {
        let x = xmin;
        for (let i = 0; i < width; i++) {
            // z = z^2 + cm
            let a = x;
            let b = y;
            let n = 0;

            while (n < maxiterations) {
                const aa = a * a;
                const bb = b * b;
                const twoab = 2.0 * a * b;
                a = aa - bb + x;
                b = twoab + y;

                // considerando infinito como 16
                if (dist(aa, bb, 0, 0) > 16) {
                    break;
                }

                n++;
            }

            // Colorear cada pixel basado en cuand lejor está de inifito
            const pix = (i+j*width)*4;
            const norm = map(n, 0, maxiterations, 0, 1);
            let bright = map(sqrt(norm), 0, 1, 0, 255);

            if (n == maxiterations) {
                bright = 0;
            } else {
                pixels[pix + 0] = bright;
                pixels[pix + 1] = bright;
                pixels[pix + 2] = bright;
                pixels[pix + 3] = 255;
            }

            x += dx;
        }

        y += dy;
    }

    updatePixels();

    translate(mx, my); // Mueve la posicion de creacion de objetos a la posicion dada
    scale(sf); // Escala la figura al factor dado
    translate(-mx, -my);
    translate();

    // Crea el triangulo de redirigir a la página anterior
    fill(207, 136, 70);
    triangle(20, 40, 60, 15, 60, 60);

    fill(255);
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
