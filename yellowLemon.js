let t = 0;
let currHue;
const queue = new Array(10);
const k = queue.length;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    stroke(255);
    background(0, 0, 0);
    currHue = random() * 360;
    frameRate(24);
    for (let i = 0; i < k; i++) {
        queue[i] = [0, 0, 0, 0, color(0, 0, 0)];
    }
}

function draw() {
    t += 0.1;
    background(0, 0, 0);
    currHue = (currHue + 3 * random() + 360) % 360;
    const [shootX, shootY] = getShootXY(t);
    queue[frameCount % k] = [shootX, shootY, mouseX, mouseY, color(currHue, 25, 75)];

    for (let i = k; i >= 0; i--) {
        const [sX, sY, mX, mY, c] = queue[(frameCount - i + k) % k];
        stroke(lerpColor(c, color(0, 0, 0), i / parseFloat(k)));
        line(sX, sY, mX, mY);
    }
}

function getShootXY(t) {
    const r = (t, x) => x * cos(1.73205 * t) + x * sin(t);
    const r2 = (t, x) => x * 2 * cos(0.5623 * t) - x * sin(2.123 * t);

    const centerX = windowWidth / 2;
    const centerY = windowHeight / 2;
    const s = min(windowWidth, windowHeight) / 4;
    const speed = 0.003;

    return [centerX + r(t, s) * sin(frameCount * speed),
    centerY + r2(t, s) * cos(frameCount * speed)];
}
