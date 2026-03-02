// بيانات اللعبة
const players = [
    { color: 'red', pieces: [0, 0, 0, 0] },  // 0 يعني في المنزل
    { color: 'green', pieces: [0, 0, 0, 0] },
    { color: 'yellow', pieces: [0, 0, 0, 0] },
    { color: 'blue', pieces: [0, 0, 0, 0] }
];

let currentPlayer = 0; // 0: أحمر, 1: أخضر, 2: أصفر, 3: أزرق
let diceValue = 0;
let gameActive = true;

// عناصر HTML
const boardEl = document.getElementById('board');
const rollDiceBtn = document.getElementById('rollDice');
const diceResultEl = document.getElementById('diceResult');
const messageEl = document.getElementById('message');
const playerEls = document.querySelectorAll('.player');

// إنشاء لوحة اللعب (15x15 مبسطة)
function createBoard() {
    for (let i = 0; i < 225; i++) { // 15*15=225
        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        // تلوين بسيط للمناطق (يمكنك تحسينه لاحقاً)
        const row = Math.floor(i / 15);
        const col = i % 15;
        
        // مناطق الانطلاق (المنازل)
        if (row < 6 && col < 6) cell.classList.add('home-red');
        else if (row < 6 && col > 8) cell.classList.add('home-green');
        else if (row > 8 && col < 6) cell.classList.add('home-yellow');
        else if (row > 8 && col > 8) cell.classList.add('home-blue');
        
        // ممرات بسيطة (يمكنك تعديلها حسب المسار الحقيقي)
        if ((row === 6 && col >= 0 && col <= 14) || (col === 6 && row >= 0 && row <= 14)) {
            cell.classList.add('path-red');
        }
        // ... يمكن إضافة المزيد من المسارات لاحقاً
        
        boardEl.appendChild(cell);
    }
}

// عرض القطع على اللوحة (تجريبي: نضع قطعة حمراء في أول منزل)
function renderPieces() {
    // إزالة أي قطع سابقة
    document.querySelectorAll('.piece').forEach(p => p.remove());
    
    // نعرض فقط قطع اللاعب الحالي للتبسيط، أو يمكن عرض جميع القطع حسب موقعها
    players.forEach((player, pIndex) => {
        player.pieces.forEach((position, pieceIndex) => {
            if (position !== 0) { // إذا لم تكن القعة في المنزل
                // نحدد الخلية حسب الموقع (هذا مبسط جداً، يحتاج لمنطق حقيقي)
                const cellIndex = position; // نفترض أن position هو رقم الخلية
                const cell = boardEl.children[cellIndex];
                if (cell) {
                    const piece = document.createElement('div');
                    piece.classList.add('piece', player.color);
                    piece.dataset.player = pIndex;
                    piece.dataset.piece = pieceIndex;
                    cell.appendChild(piece);
                }
            }
        });
    });
}

// تحديث رسالة الدور
function updateTurnMessage() {
    const colors = ['أحمر', 'أخضر', 'أصفر', 'أزرق'];
    messageEl.textContent = `دور اللاعب ${colors[currentPlayer]}`;
    playerEls.forEach((el, i) => {
        el.style.opacity = i === currentPlayer ? '1' : '0.5';
    });
}

// رمي النرد
function rollDice() {
    if (!gameActive) return;
    diceValue = Math.floor(Math.random() * 6) + 1;
    diceResultEl.textContent = `النرد: ${diceValue}`;
    
    // هنا يجب إضافة منطق تحريك القطع، لكن سنكتفي بإظهار رسالة
    messageEl.textContent = `اللاعب رمى ${diceValue}`;
    
    // تمرير الدور للاعب التالي (للتبسيط)
    currentPlayer = (currentPlayer + 1) % 4;
    updateTurnMessage();
}

// أحداث
rollDiceBtn.addEventListener('click', rollDice);

// تهيئة اللعبة
createBoard();
// نضع قطعاً تجريبية في أول 4 خلايا لتوضيح المظهر
players[0].pieces[0] = 1; // قطعة حمراء في الخلية 1
players[1].pieces[0] = 2; // قطعة خضراء في الخلية 2
players[2].pieces[0] = 3; // صفراء في 3
players[3].pieces[0] = 4; // زرقاء في 4
renderPieces();
updateTurnMessage();
