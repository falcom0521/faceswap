document.addEventListener('DOMContentLoaded', () => {
    const capturedPhoto = document.getElementById('capturedPhoto');
    const swapButton = document.getElementById('swap');
    const targetImages = document.querySelectorAll('.target-image');

    let selectedTargetImage = ''; // Store the selected target image URL

    const dataUrl = localStorage.getItem('capturedImage');
    capturedPhoto.src = dataUrl;

    // Event listener for target image selection
    targetImages.forEach(image => {
        image.addEventListener('click', () => {
            targetImages.forEach(img => img.classList.remove('selected'));
            image.classList.add('selected');
            selectedTargetImage = image.getAttribute('data-src');
        });
    });

    swapButton.addEventListener('click', async () => {
        if (!selectedTargetImage) {
            alert('Please select a target image.');
            return;
        }

        try {
            const sourceImg = dataUrl.split(',')[1];

            const response = await fetch('/faceswap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sourceImg, targetImg: selectedTargetImage }) // Include selected target image
            });

            if (!response.ok) {
                throw new Error('Failed to swap faces');
            }

            const data = await response.json();
            console.log('Response data:', data);

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
