
function makeRiggedChoice(yourChoice) {
    switch(yourChoice.toLowerCase()) {
        case "rock": return computerChoice=0; //paper, scissors, rock
        case "paper": return computerChoice=1;
        case "scissors": return computerChoice=2;
        default: return computerChoice=-1;
    }    
}

function makeFairChoice(yourChoice) {
    var randomChoice = Math.random();
    if(randomChoice < (1/3.0)) return 0;
    else if(randomChoice < (2/3.0)) 1;
    else return 2;
}

function winLose(choiceA, choiceB) { //picks winner of game
    if(choiceA == choiceB) return -1;
    if(Math.abs(choiceA-choiceB) == 2) {
        return Math.min(choiceA, choiceB);
    } else {
        return Math.max(choiceA, choiceB);
    }
}

module.exports.reply = function (yourChoice, rigged) {
    var computerChoice = -1;
    var choices = ["paper", "scissors", "rock"];
    if(rigged) computerChoice = makeRiggedChoice(yourChoice);
    else computerChoice = makeFairChoice(yourChoice);
    if(computerChoice == -1) return "Your input is invalid.";
    else {
        let winner = "";
        let humanChoice = winLose(choices.indexOf(yourChoice.toLowerCase()), computerChoice);
        if(humanChoice == -1) winner = "it's a draw.";
        else if (humanChoice == computerChoice) winner = "the computer wins.";
        else winner = "you win!"
        return "The computer chose " + choices[computerChoice] + ", which means that " + winner;
    }
}

