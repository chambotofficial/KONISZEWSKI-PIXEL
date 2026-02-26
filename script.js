const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const imageInput = document.getElementById("imageInput");
const pixelSlider = document.getElementById("pixelSlider");
const pixelValue = document.getElementById("pixelValue");
const infoText = document.getElementById("infoText");

const WINDOW_SIZE = 600;

let originalImage = null;

// wczytywanie obrazu
imageInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            originalImage = img;
            drawPixelArt();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// zmiana suwaka
pixelSlider.addEventListener("input", function () {
    pixelValue.textContent = pixelSlider.value;
    if (originalImage) {
        drawPixelArt();
    }
});

function drawPixelArt() {
    const size = parseInt(pixelSlider.value);

    // tworzymy tymczasowy canvas do zmniejszenia obrazu
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = size;
    tempCanvas.height = size;

    // zmniejszenie obrazu
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(originalImage, 0, 0, size, size);

    // wyczyszczenie głównego canvas
    ctx.clearRect(0, 0, WINDOW_SIZE, WINDOW_SIZE);

    // wyłączenie wygładzania
    ctx.imageSmoothingEnabled = false;

    // powiększenie do 600x600
    ctx.drawImage(tempCanvas, 0, 0, WINDOW_SIZE, WINDOW_SIZE);

    const scale = WINDOW_SIZE / size;

    infoText.textContent =
        `Pixel-art: ${size}×${size}px | Rozmiar piksela: ${scale.toFixed(2)}px`;
}
