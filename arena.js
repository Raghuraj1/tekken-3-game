window.addEventListener('DOMContentLoaded', ()=>{
    
    const arenaBgSrc = localStorage.getItem('gameBg') || 'assets/normal.png';
    const p1Name = localStorage.getItem('player1');
    const p2Name = localStorage.getItem('player2');


    const canvas = document.getElementById('arenaCanvas');
    const ctx = canvas.getContext('2d');
    const keys = {};
    const bgImg = new Image();

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('keydown', (event) => {
        keys[event.code] = true;
    });
    window.addEventListener('keyup', (event) => {
        keys[event.code] = false;
    });

    bgImg.src = arenaBgSrc;

    const player1 = new Player(200, 300, p1Name, {
    left: 'KeyA', right: 'KeyD', jump: 'KeyW', crawl: 'KeyS', punch: 'KeyG', kick: 'KeyH'}, 'assets/player1',"right");
    const player2 = new Player(700, 300, p2Name, {
    left: 'ArrowLeft', right: 'ArrowRight', jump: 'ArrowUp', crawl: 'ArrowDown', punch: 'KeyO', kick: 'KeyP'}, 'assets/player2',"left");

    function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (bgImg.complete && bgImg.naturalWidth > 0) {
        const zoom = 1.3;
        const imageWidth = canvas.width * zoom;
        const imageHeight = canvas.height * zoom;
        const imageX = (canvas.width - imageWidth) / 2;
        const imageY = (canvas.height - imageHeight) / 2;
        ctx.drawImage(bgImg, imageX, imageY, imageWidth, imageHeight);
        player1.facing = player1.x < player2.x ? 'right' : 'left';
        player2.facing = player2.x < player1.x ? 'right' : 'left';
    }

    player1.handleInput(keys);
    player2.handleInput(keys);

    player1.update(canvas.height);
    player2.update(canvas.height);

    player1.draw(ctx);
    player2.draw(ctx);

    requestAnimationFrame(gameLoop);
    }
    gameLoop();
});

