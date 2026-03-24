// ゲーム要素の取得
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const finalScoreDisplay = document.getElementById('finalScore');
const gameOverMessage = document.getElementById('gameOverMessage');
const ballSpeedDisplay = document.getElementById('ballSpeed');
const comboDisplay = document.getElementById('combo');
const difficultySelect = document.getElementById('difficulty');

// ゲーム変数
let gameState = 'start'; // 'start', 'playing', 'gameOver'
let score = 0;
let highScore = localStorage.getItem('tennisHighScore') || 0;
let combo = 0;
let animationId;

// 難易度設定
const difficulties = {
    easy: { ballSpeed: 4, ballAcceleration: 0.1, paddleWidth: 120 },
    normal: { ballSpeed: 6, ballAcceleration: 0.15, paddleWidth: 100 },
    hard: { ballSpeed: 8, ballAcceleration: 0.2, paddleWidth: 80 }
};

let currentDifficulty = difficulties.normal;

// パドル設定
const paddle = {
    width: 100,
    height: 15,
    x: canvas.width / 2 - 50,
    y: canvas.height - 40,
    speed: 8,
    color: '#00d4ff',
    glowColor: 'rgba(0, 212, 255, 0.5)'
};

// ボール設定
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 5,
    speedY: -5,
    maxSpeed: 15,
    color: '#ff6b6b',
    glowColor: 'rgba(255, 107, 107, 0.6)',
    trail: []
};

// 壁の設定
const wall = {
    height: 30,
    color: '#7c3aed',
    glowColor: 'rgba(124, 58, 237, 0.5)'
};

// パーティクル効果
const particles = [];

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.speedX = (Math.random() - 0.5) * 6;
        this.speedY = (Math.random() - 0.5) * 6;
        this.color = color;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size *= 0.96;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// 初期化
highScoreDisplay.textContent = highScore;

// イベントリスナー
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
difficultySelect.addEventListener('change', changeDifficulty);

// マウス/タッチ操作
let mouseX = canvas.width / 2;

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouseX = (touch.clientX - rect.left) * (canvas.width / rect.width);
}, { passive: false });

// 難易度変更
function changeDifficulty() {
    const difficulty = difficultySelect.value;
    currentDifficulty = difficulties[difficulty];
    paddle.width = currentDifficulty.paddleWidth;
}

// ゲーム開始
function startGame() {
    gameState = 'playing';
    startScreen.classList.add('hidden');
    score = 0;
    combo = 0;
    updateScore();
    resetBall();
    gameLoop();
}

// ゲーム再開
function restartGame() {
    gameOverScreen.classList.add('hidden');
    startGame();
}

// ボールリセット
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = (Math.random() - 0.5) * currentDifficulty.ballSpeed;
    ball.speedY = -currentDifficulty.ballSpeed;
    ball.trail = [];
}

// スコア更新
function updateScore() {
    scoreDisplay.textContent = score;
    scoreDisplay.classList.add('score-update');
    setTimeout(() => scoreDisplay.classList.remove('score-update'), 300);

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('tennisHighScore', highScore);
        highScoreDisplay.textContent = highScore;
    }

    comboDisplay.textContent = combo;
    const currentSpeed = Math.sqrt(ball.speedX ** 2 + ball.speedY ** 2).toFixed(1);
    ballSpeedDisplay.textContent = currentSpeed;
}

// パドル描画
function drawPaddle() {
    // グロー効果
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = paddle.glowColor;

    // グラデーション
    const gradient = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x + paddle.width, paddle.y);
    gradient.addColorStop(0, '#00d4ff');
    gradient.addColorStop(0.5, '#7c3aed');
    gradient.addColorStop(1, '#00d4ff');

    ctx.fillStyle = gradient;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    // ハイライト
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height / 3);

    ctx.restore();
}

// ボール描画
function drawBall() {
    // トレイル効果
    ball.trail.push({ x: ball.x, y: ball.y });
    if (ball.trail.length > 10) {
        ball.trail.shift();
    }

    // トレイル描画
    ctx.save();
    ball.trail.forEach((pos, index) => {
        ctx.globalAlpha = (index / ball.trail.length) * 0.5;
        ctx.shadowBlur = 10;
        ctx.shadowColor = ball.glowColor;
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        const size = ball.radius * (index / ball.trail.length);
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.restore();

    // メインボール
    ctx.save();
    ctx.shadowBlur = 25;
    ctx.shadowColor = ball.glowColor;

    const gradient = ctx.createRadialGradient(ball.x - 3, ball.y - 3, 0, ball.x, ball.y, ball.radius);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.3, ball.color);
    gradient.addColorStop(1, '#c0392b');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

// 壁描画
function drawWall() {
    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = wall.glowColor;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#7c3aed');
    gradient.addColorStop(0.5, '#00d4ff');
    gradient.addColorStop(1, '#7c3aed');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, wall.height);

    // ハイライト
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(0, 0, canvas.width, wall.height / 2);

    ctx.restore();
}

// パーティクル生成
function createParticles(x, y, color, count = 10) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, color));
    }
}

// パーティクル更新・描画
function updateParticles() {
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });
}

// パドル更新
function updatePaddle() {
    // マウス位置に向かって移動
    const targetX = mouseX - paddle.width / 2;
    paddle.x += (targetX - paddle.x) * 0.15;

    // 画面内に制限
    if (paddle.x < 0) paddle.x = 0;
    if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }
}

// ボール更新
function updateBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // 壁との衝突（上部）
    if (ball.y - ball.radius <= wall.height) {
        ball.y = wall.height + ball.radius;
        ball.speedY = -ball.speedY;
        score += 10;
        combo++;
        updateScore();
        createParticles(ball.x, ball.y, '#7c3aed', 15);
    }

    // 左右の壁
    if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
        ball.speedX = -ball.speedX;
        ball.x = ball.x - ball.radius <= 0 ? ball.radius : canvas.width - ball.radius;
        createParticles(ball.x, ball.y, '#00d4ff', 8);
    }

    // パドルとの衝突
    if (ball.y + ball.radius >= paddle.y &&
        ball.y - ball.radius <= paddle.y + paddle.height &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.width) {

        // ヒット位置による角度変更
        const hitPos = (ball.x - paddle.x) / paddle.width;
        const angle = (hitPos - 0.5) * Math.PI * 0.6;

        const speed = Math.sqrt(ball.speedX ** 2 + ball.speedY ** 2);
        const newSpeed = Math.min(speed + currentDifficulty.ballAcceleration, ball.maxSpeed);

        ball.speedX = Math.sin(angle) * newSpeed;
        ball.speedY = -Math.cos(angle) * newSpeed;
        ball.y = paddle.y - ball.radius;

        score += 5 + combo;
        combo++;
        updateScore();
        createParticles(ball.x, ball.y, '#4ade80', 20);
    }

    // ゲームオーバー
    if (ball.y - ball.radius > canvas.height) {
        endGame();
    }
}

// ゲーム終了
function endGame() {
    gameState = 'gameOver';
    cancelAnimationFrame(animationId);

    finalScoreDisplay.textContent = score;

    // メッセージ生成
    let message = '';
    if (score >= 500) {
        message = '素晴らしい！テニスの達人ですね！🏆';
    } else if (score >= 300) {
        message = 'とても上手です！👏';
    } else if (score >= 100) {
        message = '良いプレイでした！👍';
    } else {
        message = '練習あるのみ！もう一度挑戦しよう！💪';
    }
    gameOverMessage.textContent = message;

    gameOverScreen.classList.remove('hidden');
}

// 背景描画
function drawBackground() {
    // グリッド
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.05)';
    ctx.lineWidth = 1;

    // 縦線
    for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // 横線
    for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    ctx.restore();
}

// ゲームループ
function gameLoop() {
    if (gameState !== 'playing') return;

    // 画面クリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 描画
    drawBackground();
    drawWall();
    updateParticles();
    drawPaddle();
    drawBall();

    // 更新
    updatePaddle();
    updateBall();

    animationId = requestAnimationFrame(gameLoop);
}

// 初期描画
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawBackground();
drawWall();
paddle.x = canvas.width / 2 - paddle.width / 2;
drawPaddle();
ball.x = canvas.width / 2;
ball.y = canvas.height / 2;
drawBall();
