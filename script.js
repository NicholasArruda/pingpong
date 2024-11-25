const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Criar a raquete
const paddleWidth = 10;
const paddleHeight = 100;
const player1 = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: 'white',
    score: 0
};

const player2 = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: 'white',
    score: 0
};

// Criar a bola
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: 'white'
};

// Desenhar raquetes e bola
function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawArc(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

// Controlar raquetes
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    player1.y = event.clientY - rect.top - player1.height / 2;
});

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            player2.y -= 20;
            break;
        case 'ArrowDown':
            player2.y += 20;
            break;
    }
});

// Atualizar o jogo
function update() {
    // Atualizar a posição da bola
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Colisão com o teto e o chão
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    // Colisão com as raquetes
    const player1Collision = ball.x - ball.radius < player1.x + player1.width && ball.y > player1.y && ball.y < player1.y + player1.height;
    const player2Collision = ball.x + ball.radius > player2.x && ball.y > player2.y && ball.y < player2.y + player2.height;

    if (player1Collision || player2Collision) {
        ball.velocityX = -ball.velocityX;
    }

    // Marcar ponto
    if (ball.x - ball.radius < 0) {
        player2.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        player1.score++;
        resetBall();
    }
}

// Reiniciar a bola
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
}

// Desenhar o jogo
function render() {
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    drawRect(player1.x, player1.y, player1.width, player1.height, player1.color);
    drawRect(player2.x, player2.y, player2.width, player2.height, player2.color);
    drawArc(ball .x, ball.y, ball.radius, ball.color);
    ctx.font = '20px Arial';
    ctx.fillText(player1.score, canvas.width / 4, canvas.height / 5);
    ctx.fillText(player2.score, 3 * canvas.width / 4, canvas.height / 5);
}

// Loop do jogo
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Iniciar o jogo
gameLoop();