let image = document.querySelector(".image-input");
let options = document.querySelectorAll("input[type='range']");
let uploadBtn = document.querySelector("#upload-btn");
let canvas = document.createElement("canvas");
let canvasContext = canvas.getContext("2d");
let downloadBtn = document.querySelector("#download-btn");
let optionsContainer = document.querySelector(".options-container");
let selectedFile;
let photoContainer = document.querySelector(".photo-container");

// intitialize variables
let brightness = 1, contrast = 1, grayScale = 0, hueRotate = 0, blur = 0, saturation = 0;



photoContainer.addEventListener('click', function () {
    uploadBtn.click();
})

uploadBtn.addEventListener("input", function () {

    hueRotate = 0;
    brightness = 1;
    contrast = 1;
    grayScale = 0;
    blur = 0;
    saturation = 1;



    options.forEach(option => {
        if (option.name == "brightness" || option.name == "contrast") {
            option.value = 1;
        }
        else {
            option.value = 0;
        }
    })

    updatePicture();



    if (uploadBtn.files.length > 0) {
        selectedFile = uploadBtn.files[0];
        let imgUrl = URL.createObjectURL(selectedFile);
        image.src = imgUrl;
    }
    optionsContainer.style.display = "flex";
});

function updatePicture() {
    image.style.filter = `brightness(${brightness}) contrast(${contrast}) grayscale(${grayScale}) hue-rotate(${hueRotate}deg) blur(${blur}px) saturate(${saturation})`;
}

function updateCanvas() {
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw the filtered image on the canvas
    canvasContext.filter = `brightness(${brightness}) contrast(${contrast}) grayscale(${grayScale}) hue-rotate(${hueRotate}deg) blur(${blur}px) saturate(${saturation})`;
    canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height);
}

document.addEventListener('DOMContentLoaded', function () {
    options.forEach(option => option.addEventListener('input', function () {
        if (option.classList.contains("brightness")) {
            brightness = option.value;
        } else if (option.classList.contains("contrast")) {
            contrast = option.value;
        } else if (option.classList.contains("gray-scale")) {
            grayScale = option.value;
        } else if (option.classList.contains("hue-rotate")) {
            hueRotate = option.value;
        }
        else if (option.classList.contains("blur")) {
            blur = option.value;
        }
        else if (option.classList.contains("saturation")) {
            saturation = option.value;
        }
        updatePicture();
        updateCanvas(); // Call updateCanvas whenever filters are updated

        downloadBtn.style.display = "block";
    }));

    // Create a download link

    downloadBtn.addEventListener("click", function () {
        // Convert canvas content to a data URL (PNG format)
        let dataURL = canvas.toDataURL("image/png");

        // Create a temporary link element for download
        let tempLink = document.createElement("a");
        tempLink.href = dataURL;
        tempLink.download = selectedFile.name; // Set the download filename
        tempLink.click(); // Simulate a click to trigger download
        console.log("downloaded");
    });
});
