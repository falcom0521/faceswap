const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const swapButton = document.getElementById('swap');
const resultImg = document.getElementById('result');

let isCaptured = false;

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing camera: ", err);
    });

captureButton.addEventListener('click', () => {
    if (!isCaptured) {
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        video.style.display = 'none';
        canvas.style.display = 'block';
        captureButton.classList.add('hidden'); // Hide capture button
        swapButton.classList.remove('hidden'); // Show swap button
        isCaptured = true;
    } else {
        video.style.display = 'block';
        canvas.style.display = 'none';
        swapButton.classList.add('hidden'); // Hide swap button
        resultImg.style.display = 'none'; // Hide result image
        captureButton.textContent = 'Capture'; // Reset button text
        isCaptured = false;
    }
});

swapButton.addEventListener('click', async () => {
    try {
        const sourceImg = canvas.toDataURL('image/jpeg').split(',')[1];

        const response = await fetch('/faceswap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sourceImg })
        });

        if (!response.ok) {
            throw new Error('Failed to swap faces');
        }

        const data = await response.json();
        console.log('Response data:', data);

        // Adjust based on the actual response structure
        if (data.image) {
            resultImg.src = `data:image/jpeg;base64,${data.image}`;
            resultImg.style.display = 'block';
            swapButton.classList.add('hidden'); // Hide swap button
            captureButton.classList.remove('hidden'); // Show capture button
            captureButton.textContent = 'Retake'; // Change button text to 'Retake'
        } else {
            throw new Error('Invalid response data');
        }
    } catch (error) {
        console.error('Error swapping faces:', error);
        alert('An error occurred while swapping faces. Please try again.');
    }
});
