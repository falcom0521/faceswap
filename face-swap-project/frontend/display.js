document.addEventListener('DOMContentLoaded', () => {
    const capturedPhoto = document.getElementById('capturedPhoto');
    const swapButton = document.getElementById('swap');
    const imageOptions = document.getElementById('imageOptions');
    const dataUrl = localStorage.getItem('capturedImage');
    const targetImages = JSON.parse(localStorage.getItem('targetImages')) || [];

    capturedPhoto.src = dataUrl;

    targetImages.forEach(src => {
        const div = document.createElement('div');
        div.classList.add('image-option');
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('target-image');
        img.dataset.src = src;
        div.appendChild(img);
        imageOptions.appendChild(div);

        img.addEventListener('click', () => {
            document.querySelectorAll('.target-image').forEach(image => image.classList.remove('selected'));
            img.classList.add('selected');
            selectedTargetImage = img.src; // Change here to get the image source
        });
    });

    let selectedTargetImage = targetImages.length > 0 ? targetImages[0] : null;

    swapButton.addEventListener('click', async () => {
        try {
            const sourceImg = dataUrl.split(',')[1];
            const targetImg = selectedTargetImage.split(',')[1]; // Change here to get base64 data

            const response = await fetch('/faceswap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sourceImg, targetImg }) // Update payload to include base64 data
            });

            if (!response.ok) {
                throw new Error('Failed to swap faces');
            }

            const data = await response.json();
            if (data.image) {
                localStorage.setItem('swappedImage', `data:image/jpeg;base64,${data.image}`);
                window.location.href = 'result.html';
            } else {
                throw new Error('Invalid response data');
            }
        } catch (error) {
            console.error('Error swapping faces:', error);
            alert('An error occurred while swapping faces. Please try again.');
        }
    });
});
