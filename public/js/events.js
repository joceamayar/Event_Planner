let zipCodeButton = document.querySelector('#search-zip')
if (zipCodeButton) {
    let classificationId = zipCodeButton.getAttribute('data-zip');
    zipCodeButton.addEventListener('click', () => {
        let zipCodeInput = document.querySelector('#zip_code_input')
        if (zipCodeInput.value) {
            window.location.href = `/event?zip_code=${zipCodeInput.value}&classification_id=${classificationId}`;
        }
    });
} 