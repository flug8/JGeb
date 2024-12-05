document.getElementById('playButton').addEventListener('click', function() {
    const audio = new Audio('birthday_song.mp3');
    audio.play();
});

// Particle explosion effect
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 300; // Increase the number of particles

function createParticle(x, y) {
    const colors = ['#FF5F6D', '#FFC371', '#00CED1', '#800080', '#FFD700', '#FF69B4', '#00FF7F', '#FF4500'];
    return {
        x: x,
        y: y,
        size: Math.random() * 10 + 5, // Increase the size range
        speedX: (Math.random() * 6 - 3), // Increase the speed range
        speedY: (Math.random() * 6 - 3), // Increase the speed range
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1 // Add alpha for fading effect
    };
}

function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(canvas.width / 2, canvas.height / 2);
        particles.push(particle);
    }
}

function updateParticles() {
    particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.size -= 0.005; // Decrease size faster
        particle.alpha -= 0.001; // Decrease alpha for fading effect

        if (particle.size <= 0 || particle.alpha <= 0) {
            particles.splice(index, 1);
        }
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 100).toString(16)}`;
        ctx.fill();
        ctx.closePath();
    });
}

function animateParticles() {
    updateParticles();
    drawParticles();
    if (particles.length > 0) {
        requestAnimationFrame(animateParticles);
    }
}

createParticles();
animateParticles();
