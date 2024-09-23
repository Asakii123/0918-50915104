let playerScore = 0;
let computerScore = 0;

// 音樂檔案
const winSound = new Audio('win.mp3');
const drawSound = new Audio('draw.mp3');
const loseSound = new Audio('lose.mp3');

function play(playerChoice) {
    const choices = ['剪刀', '石頭', '布'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let resultText = '';
    let resultClass = '';
    let soundToPlay = null;

    // 判斷結果
    if (playerChoice === computerChoice) {
        resultText = '平手';
        resultClass = 'gray';
        soundToPlay = drawSound; // 播放平手音樂
    } else if (
        (playerChoice === '剪刀' && computerChoice === '布') ||
        (playerChoice === '石頭' && computerChoice === '剪刀') ||
        (playerChoice === '布' && computerChoice === '石頭')
    ) {
        resultText = '獲勝';
        resultClass = 'green';
        playerScore++;
        soundToPlay = winSound; // 播放獲勝音樂
    } else {
        resultText = '失敗';
        resultClass = 'red';
        computerScore++;
        soundToPlay = loseSound; // 播放失敗音樂
    }

    document.getElementById('playerScore').innerText = playerScore;
    document.getElementById('computerScore').innerText = computerScore;

    // 顯示結果
    Swal.fire({
        title: '結果',
        html: `
            <p>你的選擇: <strong>${playerChoice}</strong></p>
            <p>電腦的選擇: <strong>${computerChoice}</strong></p>
            <p style="color: ${resultClass};">結果: ${resultText}</p>
        `,
        confirmButtonText: '確定'
    }).then(() => {
        // 播放音樂
        if (soundToPlay) {
            soundToPlay.play().catch(error => {
                console.error('音樂播放失敗:', error);
            });
        }

        // 檢查是否有獲勝者
        if (playerScore === 3 || computerScore === 3) {
            const winner = playerScore === 3 ? '玩家' : '電腦';
            Swal.fire({
                title: '遊戲結束',
                text: `獲勝者是: ${winner}\n\n雙方比分都將重置為 0`,
                confirmButtonText: '確定',
                didClose: () => { // 使用 didClose 替換 onClose
                    resetScores(); // 自動重置分數
                }
            });
        }
    });
}

function resetScores() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('playerScore').innerText = playerScore;
    document.getElementById('computerScore').innerText = computerScore;
}
