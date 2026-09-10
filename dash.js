const modeDivs = document.querySelectorAll('.mode');
const clickSound = document.getElementById('buttonClick');
const submit = document.querySelector('#submit');
localStorage.setItem('p2WIN',0);
localStorage.setItem('p1WIN',0);
localStorage.setItem('round',1);

let selectedModeData = {
    name: "Normal",
    hp: "1200",
    power: "100",
    bgm: "assets/normal.mp3",
    bg: "assets/normal.png"
};

window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('dashBGM');
    if (localStorage.getItem('dashBg') === 'true') {
        audio.volume = 0.5;
        audio.play().catch(error => console.log("Browser restricted autoplay:", error));
        localStorage.removeItem('dashBg');
    }
});

modeDivs.forEach(modeDiv => {
    modeDiv.addEventListener('click', () => {
        modeDivs.forEach(otherDiv => otherDiv.querySelector('img').classList.remove('active-glow'));

        clickSound.currentTime = 0;
        clickSound.play().catch(error => console.log("Audio play blocked:", error));

        selectedModeData = {
            name: modeDiv.getAttribute('data-mode'),
            hp: modeDiv.getAttribute('data-hp'),
            power: modeDiv.getAttribute('data-power'),
            bgm: modeDiv.getAttribute('data-bgm'),
            bg: modeDiv.getAttribute('data-bg')
        };

        modeDiv.querySelector('img').classList.add('active-glow');
    });
});

if (submit) {
    submit.addEventListener('click', () => {
        const p1Name = document.getElementById('P1NAME').value || 'PLAYER-1';
        const p2Name = document.getElementById('P2NAME').value || 'PLAYER-2';

        localStorage.setItem('player1', p1Name);
        localStorage.setItem('player2', p2Name);
        localStorage.setItem('gameMode', selectedModeData.name);
        localStorage.setItem('gameHp', selectedModeData.hp);
        localStorage.setItem('gamePower', selectedModeData.power);
        localStorage.setItem('gameBgm', selectedModeData.bgm);
        localStorage.setItem('gameBg', selectedModeData.bg);
        localStorage.setItem('dashBg', 'true');

        window.location.href = 'arena.html';
    });
}
