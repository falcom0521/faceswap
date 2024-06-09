document.addEventListener('DOMContentLoaded', () => {
    const resultImg = document.getElementById('result');
    const swappedImage = localStorage.getItem('swappedImage');
    resultImg.src = swappedImage;
});

document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');

    backButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Navigate back to the index page
    });
});
