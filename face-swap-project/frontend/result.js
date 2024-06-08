document.addEventListener('DOMContentLoaded', async () => {
    const resultImg = document.getElementById('result');
    const capturedImage = localStorage.getItem('capturedImage');

    try {
        const response = await fetch('/faceswap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sourceImg: capturedImage.split(',')[1] })
        });

        if (!response.ok) {
            throw new Error('Failed to swap faces');
        }

        const data = await response.json();
        console.log('Response data:', data);

        if (data.image) {
            resultImg.src = `data:image/jpeg;base64,${data.image}`;
        } else {
            throw new Error('Invalid response data');
        }
    } catch (error) {
        console.error('Error swapping faces:', error);
        alert('An error occurred while swapping faces. Please try again.');
    }
});
