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

document.addEventListener('DOMContentLoaded', async () => {
    const imagesContainer = document.getElementById('imagesContainer');

    try {
        // Reference to the images folder
        const storageRef = storage.ref().child('images/');
        const listResult = await storageRef.listAll();

        // Iterate through each item in the folder and get the download URL
        for (const itemRef of listResult.items) {
            const downloadURL = await itemRef.getDownloadURL();
            displayImage(downloadURL);
        }
    } catch (error) {
        console.error('Error listing images:', error);
    }
});

function displayImage(url) {
    const imagesContainer = document.getElementById('imagesContainer');
    const imgElement = document.createElement('img');
    imgElement.src = url;
    imgElement.className = 'uploaded-image';
    imgElement.addEventListener('click', () => {
        printImage(url);
    });
    imagesContainer.appendChild(imgElement);
}

function printImage(url) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Image</title>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            </style>
        </head>
        <body>
            <img src="${url}" />
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}
