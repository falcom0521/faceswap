document.addEventListener('DOMContentLoaded', () => {
    const resultImg = document.getElementById('result');
    const swappedImage = localStorage.getItem('swappedImage');
    resultImg.src = swappedImage;

    // Add click event listener to the result image for download
    resultImg.addEventListener('click', () => {
        downloadImage(swappedImage);
    });
});

function downloadImage(imageUrl) {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'result_image.png'; // Change the filename if needed
    link.style.display = 'none'; // Hide the link
    document.body.appendChild(link);

    // Trigger click event on the anchor element
    link.click();

    // Clean up: remove the anchor element from the DOM
    document.body.removeChild(link);
}
