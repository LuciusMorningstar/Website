document.addEventListener("DOMContentLoaded", function() {
    
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) link.classList.add('active');
    });

    const canvas = document.getElementById('sparks-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let sparks = [];
        function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        window.addEventListener('resize', resize); resize();

        for (let i = 0; i < 70; i++) sparks.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, size: Math.random()*2+1, speedY: Math.random()*1.5+0.5, opacity: Math.random() });

        function draw() {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            sparks.forEach(s => {
                ctx.globalAlpha = s.opacity; ctx.fillStyle = "#ff4d4d"; ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI*2); ctx.fill();
                s.y -= s.speedY; s.opacity -= 0.005;
                if (s.y < 0 || s.opacity <= 0) { s.y = canvas.height; s.opacity = Math.random(); }
            });
            requestAnimationFrame(draw);
        }
        draw();
    }

    const logoCanvas = document.getElementById('neon-logo');
    if (logoCanvas) {
        logoCanvas.width = 400; logoCanvas.height = 200;
        const ctxL = logoCanvas.getContext('2d');
        let angle = 0;
        function anim() {
            ctxL.clearRect(0,0,400,200); angle += 0.05;
            let glow = 15 + Math.sin(angle)*8;
            ctxL.shadowBlur = glow; ctxL.shadowColor = "#f00"; ctxL.strokeStyle = "#ff2a2a";
            ctxL.lineWidth = 6; ctxL.beginPath(); ctxL.arc(200, 100, 80, -Math.PI*0.8, Math.PI*0.1); ctxL.stroke();
            ctxL.fillStyle = "#fff"; ctxL.textAlign = "center";
            ctxL.font = "bold 40px Georgia"; ctxL.fillText("DEMON", 200, 90);
            ctxL.font = "bold 45px Georgia"; ctxL.fillText("SLAYER", 200, 140);
            requestAnimationFrame(anim);
        }
        anim();
    }

    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        const modal = document.createElement('div');
        modal.style.cssText = "display:none; position:fixed; z-index:2000; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.9); align-items:center; justify-content:center; backdrop-filter:blur(5px);";
        modal.innerHTML = `
            <div style="background:#111; border:2px solid #ff2a2a; padding:30px; width:300px; text-align:center;">
                <h3 style="color:#ff2a2a; margin-top:0;">ВХІД ДО ШТАБУ</h3>
                <input type="text" id="u" placeholder="Логін" style="width:100%; padding:10px; margin-bottom:10px; background:#000; border:1px solid #333; color:#fff;">
                <input type="password" id="p" placeholder="Пароль" style="width:100%; padding:10px; margin-bottom:10px; background:#000; border:1px solid #333; color:#fff;">
                <p id="err" style="color:red; font-size:12px; display:none;">Такий користувач у системі не зареєстрований</p>
                <button id="sub" style="width:100%; padding:10px; background:#ff2a2a; border:none; color:#fff; font-weight:bold; cursor:pointer;">УВІЙТИ</button>
            </div>
        `;
        document.body.appendChild(modal);
        loginBtn.onclick = (e) => { e.preventDefault(); modal.style.display = 'flex'; };
        modal.onclick = (e) => { if(e.target === modal) modal.style.display = 'none'; };
        document.getElementById('sub').onclick = () => {
            if(document.getElementById('u').value === "Superuser" && document.getElementById('p').value === "Superpassword") {
                alert("Доступ дозволено!"); modal.style.display = 'none';
            } else { document.getElementById('err').style.display = 'block'; }
        };
    }
});