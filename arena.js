window.addEventListener('DOMContentLoaded', ()=>{
    
    const arenaBgSrc = localStorage.getItem('gameBg') || 'assets/normal.png';
    const p1Name = localStorage.getItem('player1');
    const p2Name = localStorage.getItem('player2');


    const canvas = document.getElementById('arenaCanvas');
    const ctx = canvas.getContext('2d');
    const bgImg = new Image()

    bgImg.src = arenaBgSrc;
    bgImg.onload = ()=> {
        const zoom = 1.3;
        const iwidth = canvas.width*zoom;
        const iheight = canvas.height*zoom;
        const x = (canvas.width - iwidth) / 2;
        const y = (canvas.height - iheight) / 2;

        ctx.clearRect(0,0,canvas.width,canvas.height);

        ctx.drawImage(bgImg,x,y,iwidth,iheight);
      
    };

});