const fileInput = document.getElementById('fileInput');
const saveImagesButton = document.getElementById('saveImages');
const backToCaptureButton = document.getElementById('backToCapture');

saveImagesButton.addEventListener('click', () => {
    const files = fileInput.files;
    const targetImages = [];

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
            targetImages.push(e.target.result);
            if (targetImages.length === files.length) {
                localStorage.setItem('targetImages', JSON.stringify(targetImages));
                alert('Images saved successfully!');
            }
        };
        reader.readAsDataURL(files[i]);
    }
});

backToCaptureButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});
