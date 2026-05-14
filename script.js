document.addEventListener("DOMContentLoaded", function() {
    
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.terminal-btn');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    const canvas = document.getElementById('sparks-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let sparks = [];
        const sparkCount = 80;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        for (let i = 0; i < sparkCount; i++) {
            sparks.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedY: Math.random() * 1.5 + 0.5,
                speedX: (Math.random() - 0.5) * 1,
                opacity: Math.random()
            });
        }

        function drawSparks() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            sparks.forEach(spark => {
                ctx.globalAlpha = spark.opacity;
                ctx.fillStyle = "#ff4d4d";
                ctx.shadowBlur = 10;
                ctx.shadowColor = "#ff2a2a";
                ctx.beginPath();
                ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
                ctx.fill();

                spark.y -= spark.speedY;
                spark.x += spark.speedX;
                spark.opacity -= 0.005;

                if (spark.y < 0 || spark.opacity <= 0) {
                    spark.y = canvas.height;
                    spark.x = Math.random() * canvas.width;
                    spark.opacity = Math.random();
                }
            });
            requestAnimationFrame(drawSparks);
        }
        drawSparks();
    }

    const logoCanvas = document.getElementById('neon-logo');
    if (logoCanvas) {
        logoCanvas.width = 400;
        logoCanvas.height = 200;
        const ctxLogo = logoCanvas.getContext('2d');
        
        let pulseAngle = 0;
        let isHovered = false;

        logoCanvas.addEventListener('mouseenter', () => isHovered = true);
        logoCanvas.addEventListener('mouseleave', () => isHovered = false);

        function animateNeonLogo() {
            ctxLogo.clearRect(0, 0, logoCanvas.width, logoCanvas.height);
            
            pulseAngle += isHovered ? 0.1 : 0.05;
            const baseGlow = isHovered ? 25 : 15;
            const glow = baseGlow + Math.sin(pulseAngle) * (isHovered ? 12 : 8);

            const cx = logoCanvas.width / 2;
            const cy = logoCanvas.height / 2;

            ctxLogo.beginPath();
            ctxLogo.arc(cx, cy, 85, -Math.PI * 0.8, Math.PI * 0.1, false);
            ctxLogo.lineWidth = isHovered ? 10 : 8;
            ctxLogo.strokeStyle = '#ff2a2a';
            ctxLogo.shadowBlur = glow;
            ctxLogo.shadowColor = '#ff0000';
            ctxLogo.lineCap = 'round';
            ctxLogo.stroke();

            ctxLogo.textAlign = 'center';
            ctxLogo.textBaseline = 'middle';
            ctxLogo.fillStyle = '#ffffff';

            ctxLogo.font = 'bold 42px Georgia, serif';
            ctxLogo.shadowBlur = glow * 0.8;
            ctxLogo.fillText('DEMON', cx, cy - 25);

            ctxLogo.font = 'bold 50px Georgia, serif';
            ctxLogo.fillText('SLAYER', cx, cy + 25);

            ctxLogo.font = 'bold 12px Arial, sans-serif';
            ctxLogo.shadowBlur = glow * 0.5;
            ctxLogo.fillText('KIMETSU NO YAIBA', cx, cy + 70);

            requestAnimationFrame(animateNeonLogo);
        }
        
        animateNeonLogo();
    }

    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'photo-modal';
    
    const modalContainer = document.createElement('div');
    modalContainer.id = 'modal-img-container';
    
    const modalImage = document.createElement('img');
    modalImage.id = 'modal-img';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-modal-btn';
    closeBtn.innerHTML = '&times;'; 

    modalContainer.appendChild(closeBtn);
    modalContainer.appendChild(modalImage);
    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);

    const demonPhotos = document.querySelectorAll('.demon-card img');
    
    demonPhotos.forEach(photo => {
        photo.style.cursor = 'zoom-in'; 
        
        photo.addEventListener('click', () => {
            modalImage.src = photo.src; 
            modalOverlay.classList.add('active'); 
        });
    });

    function closePhotoModal() {
        modalOverlay.classList.remove('active');
    }

    closeBtn.addEventListener('click', closePhotoModal);
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closePhotoModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePhotoModal();
    });

    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        const loginModal = document.createElement('div');
        loginModal.id = 'login-modal';
        loginModal.style.cssText = `
            display: none; position: fixed; z-index: 10000; left: 0; top: 0; 
            width: 100%; height: 100%; background-color: rgba(5,2,2,0.9); backdrop-filter: blur(5px);
            align-items: center; justify-content: center;
        `;
        
        loginModal.innerHTML = `
            <div style="background: #0b0c10; border: 2px solid #ff2a2a; padding: 30px; border-radius: 8px; width: 300px; position: relative;">
                <span id="close-login" style="position: absolute; top: 10px; right: 15px; color: #ff2a2a; font-size: 24px; cursor: pointer;">&times;</span>
                <h2 style="color: #ff2a2a; text-align: center; margin-top: 0;">СЕКРЕТНИЙ АРХІВ</h2>
                
                <input type="text" id="login-username" placeholder="Нікнейм" style="width: 100%; padding: 10px; margin-bottom: 15px; box-sizing: border-box; background: #000; border: 1px solid #ff2a2a; color: #fff; font-family: inherit;">
                
                <input type="password" id="login-password" placeholder="Пароль" style="width: 100%; padding: 10px; margin-bottom: 15px; box-sizing: border-box; background: #000; border: 1px solid #ff2a2a; color: #fff; font-family: inherit;">
                
                <p id="login-error" style="color: #ff2a2a; font-size: 13px; display: none; margin-bottom: 15px; text-align: center;">Такий користувач у системі не зареєстрований</p>
                
                <button id="login-submit" style="width: 100%; padding: 12px; background: rgba(255,42,42,0.1); border: 1px solid #ff2a2a; color: #ff2a2a; cursor: pointer; text-transform: uppercase; font-weight: bold; transition: 0.3s;">Увійти</button>
            </div>
        `;
        document.body.appendChild(loginModal);

        const closeLoginBtn = document.getElementById('close-login');
        const loginSubmit = document.getElementById('login-submit');
        const errorMsg = document.getElementById('login-error');

        loginBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            loginModal.style.display = 'flex';
            errorMsg.style.display = 'none'; 
        });

        closeLoginBtn.addEventListener('click', () => loginModal.style.display = 'none');
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) loginModal.style.display = 'none';
        });
        
        loginSubmit.addEventListener('click', () => {
            const user = document.getElementById('login-username').value;
            const pass = document.getElementById('login-password').value;
            
            if (user === "Superuser" && pass === "Superpassword") {
                alert("Успішний вхід до Архіву Мисливців!");
                loginModal.style.display = 'none';
                document.getElementById('login-username').value = ""; 
                document.getElementById('login-password').value = "";
            } else {
                errorMsg.style.display = 'block'; 
            }
        });
    }
});