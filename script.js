const startBtn = document.getElementById('start');
if (startBtn) {
    startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem('dashBg', 'true');
        window.location.href = 'dashboard.html';
    });
}

