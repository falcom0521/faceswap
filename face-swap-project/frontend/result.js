// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDgK4fxaRYdR9R19NgK_6zvNbNehit4E5s",
    authDomain: "faceswap-36eff.firebaseapp.com",
    projectId: "faceswap-36eff",
    storageBucket: "faceswap-36eff.appspot.com",
    messagingSenderId: "807539515423",
    appId: "1:807539515423:web:6c22ec7b44601a4e97f52a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

document.addEventListener('DOMContentLoaded', () => {
    const resultImg = document.getElementById('result');
    const swappedImage = localStorage.getItem('swappedImage');
    if (swappedImage) {
        resultImg.src = swappedImage;
    }

    const saveButton = document.getElementById('saveBtn');
    const backButton = document.getElementById('backButton');

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html'; // Navigate back to the index page
        });
    }

    if (saveButton) {
        saveButton.addEventListener('click', async () => {
            try {
                // Convert image source to blob
                const response = await fetch(resultImg.src);
                const blob = await response.blob();

                // Generate a unique file name
                const uniqueFileName = `face_swap_result_${Date.now()}.jpg`;

                // Upload blob to Firebase Storage
                const storageRef = storage.ref();
                const imageRef = storageRef.child(`images/${uniqueFileName}`);
                await imageRef.put(blob);

                // Get the download URL
                const downloadURL = await imageRef.getDownloadURL();

                console.log('Image uploaded successfully:', downloadURL);
                alert('Image has been successfully saved!'); // Display pop-up message

                // Change button color to green
                saveButton.classList.add('clicked');
            } catch (error) {
                console.error('Error uploading the image:', error);
            }
        });
    }
});
