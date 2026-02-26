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

    const imgWidth = originalImage.width;
    const imgHeight = originalImage.height;

    // maksymalny rozmiar
    const MAX_SIZE = 800;

    // obliczamy skalę tak, aby nie przekroczyć 800x800
    const scale = Math.min(MAX_SIZE / imgWidth, MAX_SIZE / imgHeight);

    const canvasWidth = Math.floor(imgWidth * scale);
    const canvasHeight = Math.floor(imgHeight * scale);

    // ustawiamy dynamiczny rozmiar canvas
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // tworzymy tymczasowy canvas do zmniejszenia
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = size;
    tempCanvas.height = Math.floor(size * (imgHeight / imgWidth));

    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(originalImage, 0, 0, tempCanvas.width, tempCanvas.height);

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(tempCanvas, 0, 0, canvasWidth, canvasHeight);

    infoText.textContent =
        `Pixel-art: ${tempCanvas.width}×${tempCanvas.height}px`;
}
