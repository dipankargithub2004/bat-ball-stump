let scorestr = localStorage.getItem('score');
let score = JSON.parse(scorestr) || {
    match: 0,
    win: 0,
    lost: 0,
    Draw: 0,
};

score.displayscore = function () {
    return `Matches: ${score.match}, Wins: ${score.win}, Losses: ${score.lost}, Draws: ${score.Draw}`;
};

function generateComputerChoice() {
    const choices = ["Bat", "Ball", "Stump"];
    return choices[Math.floor(Math.random() * choices.length)];
}

document.addEventListener("DOMContentLoaded", function () {
    const userMoveEl = document.querySelector('#user-move');
    const computerMoveEl = document.querySelector('#computer-move');


    const buttons = document.querySelectorAll(".btn:not(#resetBtn)");
    const choices = ["Bat", "Ball", "Stump"];

    buttons.forEach((button, index) => {
        button.setAttribute('data-choice', choices[index]);

        button.addEventListener("click", function () {
            score.match++;

            const userChoice = this.getAttribute('data-choice');
            const computerChoice = generateComputerChoice();
            let resultMsg = "";

            if (userChoice === computerChoice) {
                score.Draw++;
                resultMsg = "It's a draw.";
            } else if (
                (userChoice === "Bat" && computerChoice === "Ball") ||
                (userChoice === "Ball" && computerChoice === "Stump") ||
                (userChoice === "Stump" && computerChoice === "Bat")
            ) {
                score.win++;
                resultMsg = "You win!";
            } else {
                score.lost++;
                resultMsg = "Computer wins!";
            }

            localStorage.setItem('score', JSON.stringify(score));

            // Show moves, result, and score
            userMoveEl.innerText = `You chose: ${userChoice}`;
            computerMoveEl.innerText = `Computer chose: ${computerChoice}`;
            document.querySelector('#result').innerText = `Result: ${resultMsg}`;
            document.querySelector('#score').innerText = `Score: ${score.displayscore()}`;
        });
    });

    document.getElementById("resetBtn").addEventListener("click", function () {
        localStorage.removeItem('score');

        score.match = 0;
        score.win = 0;
        score.lost = 0;
        score.Draw = 0;

        // Clear all text
        document.querySelector('#user-move').innerText = '';
        document.querySelector('#computer-move').innerText = '';
        document.querySelector('#result').innerText = '';
        document.querySelector('#score').innerText = `Score: ${score.displayscore()}`;

        alert('Game has been reset!');
    });

    document.querySelector('#score').innerText = `Score: ${score.displayscore()}`;
});
