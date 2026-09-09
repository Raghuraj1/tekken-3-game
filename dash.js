const clickableImages = document.querySelectorAll('.mode img');
const clickSound = document.getElementById('buttonClick');

window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('dashBGM');
    
    if (audio && localStorage.getItem('dashBg') === 'true') {
        audio.volume = 0.5
        audio.play().catch(error => {
            console.log("Browser restricted autoplay:", error);
        });
        
        localStorage.removeItem('dashBg');
    }
});



clickableImages.forEach(img => {
    img.addEventListener('click', () => {
        clickableImages.forEach(otherImg => {
            otherImg.classList.remove('active-glow');
        });
        clickSound.currentTime = 0;
        clickSound.play().catch(error => console.log("Audio play blocked:", error));

        img.classList.toggle('active-glow');
    });
});