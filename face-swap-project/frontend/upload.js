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

document.getElementById("fileInput").addEventListener("change", function(event) {
    const fileList = event.target.files;
    const imageDetails = document.getElementById("imageDetails");
    imageDetails.innerHTML = "";
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const fileName = file.name;
        const listItem = document.createElement("p");
        listItem.textContent = `Name: ${fileName}`;
        imageDetails.appendChild(listItem);
    }
});
