let sound;
let fft;

//サウンドファイルをプリロード
function preload() {
    // sound = loadSound('assets/materials/Drum_Loops/Drum_Loop1/Full_Loop.wav');
    sound = loadSound('assets/materials/Drum_Loops/Drum_Loop3/Full_Loop.wav');
    // sound = loadSound("hassei.wav");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
  //FFTを初期化
    fft = new p5.FFT();
  //サウンドファイルをFFTの入力に
    fft.setInput(sound);
    colorMode(HSB, 255);
}

function draw() {
    blendMode(BLEND);
    background(0);
    noStroke();
    //FFT解析
    let spectrum = fft.analyze();
    //結果をグラフで描画
    beginShape();
    blendMode(ADD);
    for (i = 0; i < spectrum.length; i++) {
        let hue = map(i, 0, spectrum.length - 1, 0, 255);
        let brightness = spectrum[i] / 20;
        fill(hue, 255, brightness);
        let diameter = map(spectrum[i], 0, 255, 0, height);
        let x = map(i, 0, spectrum.length - 1, width / 2, width);
        ellipse(x, height / 2, diameter);
        x = map(i, 0, spectrum.length - 1, width / 2, 0);
        ellipse(x, height / 2, diameter);
    }
    endShape();
}

function mousePressed(){
    if (sound.isPlaying() == false) {
        sound.loop();
    }
}
