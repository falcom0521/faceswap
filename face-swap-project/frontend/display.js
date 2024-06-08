document.addEventListener('DOMContentLoaded', () => {
    const capturedPhoto = document.getElementById('capturedPhoto');
    const capturedImage = localStorage.getItem('capturedImage');
    capturedPhoto.src = capturedImage;

    document.getElementById('swap').addEventListener('click', () => {
        window.location.href = 'result.html';
    });
});
