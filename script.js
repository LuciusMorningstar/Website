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
});