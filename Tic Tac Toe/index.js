const game = {
    xTurn: true,
    xState: [],
    oState: [],
    winningStates: [
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],

        ["0", "3", "6"],
        ["1", "4", "7"],
        ["2", "5", "8"],

        ["0", "4", "8"],
        ["2", "4", "6"]

    ]
}

document.addEventListener("click", event => {
    const target = event.target;
    const isCell = target.classList.contains("box");
    const isDisabled = target.classList.contains("disabled");

    if (isCell && !isDisabled) {
        const cellValue = target.dataset.value;

        game.xTurn === true
            ? game.xState.push(cellValue)
            : game.oState.push(cellValue)

        target.classList.add("disabled");
        target.classList.add(game.xTurn ? "x" : "o")

        game.xTurn = !game.xTurn;


        if (!document.querySelectorAll(".box:not(.disabled)").length) {
            document.querySelector(".game-over").classList.add("visible");
            document.querySelector(".game-over-text").textContent = "Draw!";
        }


        game.winningStates.forEach(winningstate => {
            const xWins = winningstate.every(state => game.xState.includes(state));
            const oWins = winningstate.every(state => game.oState.includes(state));

            if (xWins || oWins) {
                document.querySelectorAll(".box").forEach(cell => cell.classList.add("disabled"));
                document.querySelector(".game-over").classList.add("visible");
                document.querySelector(".game-over-text").textContent = xWins
                    ? "X WINS!"
                    : "O WINS!"
            }
        })
    }
})
document.querySelector(".restart").addEventListener("click", () => {
    document.querySelector(".game-over").classList.remove("visible");
    document.querySelectorAll(".box").forEach(cell => {
        cell.classList.remove("disabled", "x", "o")
    })

    game.xTurn = true
    game.xState = []
    game.oState = []
})