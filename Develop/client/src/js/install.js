const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default behavior of the prompt
    event.preventDefault();

    // Store the event to use it later when the user clicks the install button
    deferredPrompt = event;

    // Show the install button
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the installation prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const choiceResult = await deferredPrompt.userChoice;

        // Check if the user accepted the prompt
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the installation prompt');
        } else {
            console.log('User dismissed the installation prompt');
        }

        // Reset the deferredPrompt variable
        deferredPrompt = null;

        // Hide the install button
        butInstall.style.display = 'none';
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App installed:', event);
});
