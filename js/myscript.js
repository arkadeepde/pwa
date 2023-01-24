console.log(`Page running - ${new Date} - ${location.href}`);

// started service worker
if ('serviceWorker' in navigator) {
    console.log('Service worker supported');
    navigator.serviceWorker
        .register('../sw-whole-page.js')
        .then(reg => console.log('Service worker registered'))
        .catch(err => console.log(`Error while registerting service worker ${err}`));
}
