function game() {
  const actions = ["rock", "scissor", "paper"];
  const userWinResults = ["rockscissor", "scissorpaper", "paperrock"];
  let userChoice = "";
  let compChoice = "";
  let userScore=0;
  let compScore=0;
  const topSectionElement = document.querySelector(".topSection");
  const userChoiceElement = document.querySelector(".middleSection");
  const pickedElement = document.querySelector(".bottomSection");
  const footerSectionElement = document.querySelector(".footer");
  const userPickElement = document.querySelector(".user-pick");
  const pcPickElement = document.querySelector(".pc-pick");
  const resultElement = document.querySelector(".resultContainer");
  const resultTitleElement = resultElement.querySelector(".title");
  const againstPcElement = resultElement.querySelector(".against-pc");
  const playAgainElement = document.querySelector(".play-again");
  const nextButtonElement = document.querySelector(".footer .next");
  const rulesContainerElement = document.querySelector(".rulesContainer");
  const closeButtonElement = rulesContainerElement.querySelector(".close-btn");
  const rulesButtonElement = document.querySelector(".rules-btn");
  const hurrayElement = document.querySelector(".hurraySection");
  const userScoreTitle=document.querySelector('.userScore h1')
  const compScoreTitle=document.querySelector('.computerScore h1')

  window.addEventListener("load", () => {

    retrievePcScoreFromLocalStorage();
    retrieveUserScoreFromLocalStorage();

    const options = document.querySelectorAll(".middleSection .game-card");
    options.forEach((card) => {
      card.addEventListener("click", (e) => {
        userChoice = getUserChoice(e.target); //what user pick
        compChoice = getComputerChoice();//what computerpick
        startGame();
      });
    });

    playAgainElement.addEventListener("click", playAgain);
    closeButtonElement.addEventListener("click", closeRulesContainer);
    rulesButtonElement.addEventListener("click", openRulesContainer);
    nextButtonElement.addEventListener("click", showHurray);
    hurrayElement.querySelector("button").addEventListener("click", playAgain);
  });

  function startGame() {
    calculateWinner(userChoice, compChoice);
    userChoiceElement.classList.add("hidden");
    pickedElement.classList.remove("hidden");
    clearResultBeforeAppend();
    buildChoiceElement(true, userChoice);
    buildChoiceElement(false, compChoice);
  }

  function getUserChoice(target) {
    // console.log(target);
    if (target.nodeName === "IMG") {
      return target.parentElement.classList[1];
    }
    return target.classList[1];
  }

  function getComputerChoice() {
    return actions[Math.floor(Math.random() * 3)];
  }

  function calculateWinner(user, comp) {
    if (user === comp) {
      resultTitleElement.innerText = "TIE UP";
      againstPcElement.classList.add("hidden");
    } else if (getUserWinStatus(user + comp)) {
      resultTitleElement.innerText = "YOU WIN";
      againstPcElement.classList.remove("hidden");
      nextButtonElement.classList.remove("hidden");
      userPickElement.classList.add('.concentricCircles')
      calculateUserScore(userScore+1);
    } else {
      resultTitleElement.innerText = "YOU LOST";
      againstPcElement.classList.remove("hidden");
      calculatePcScore(compScore+1);
    }
  }

  function getUserWinStatus(result) {
    return userWinResults.some((winStr) => {
      return winStr === result;
    });
  }

  function buildChoiceElement(isItUserElement, className) {
    const el = document.createElement("div");
    el.classList = [`game-card ${className}`];
    el.innerHTML = `<img src="./images/${className}.png" alt="${className}"/>`;
    if (isItUserElement) {
      userPickElement.append(el);
    } else {
      pcPickElement.append(el);
    }
  }

  function retrievePcScoreFromLocalStorage(){
    let score=+window.localStorage.getItem('pcScore')||0;
    compScore=score;
    calculatePcScore(compScore)
  }

  function retrieveUserScoreFromLocalStorage(){
    let score=+window.localStorage.getItem('uScore')||0;
    userScore=score;
    calculateUserScore(userScore)
  }

  function calculateUserScore(score) {
    userScore=score;
    userScoreTitle.innerHTML=userScore;
    window.localStorage.setItem('uScore', userScore);
  }

  function calculatePcScore(score) {
    compScore=score;
    compScoreTitle.innerHTML=compScore;
    window.localStorage.setItem('pcScore', compScore);
  }

  function playAgain() {
    userChoiceElement.classList.remove("hidden");
    pickedElement.classList.add("hidden");
    nextButtonElement.classList.add("hidden");
    hurrayElement.classList.add("hidden");
    topSectionElement.classList.remove("hidden");
    footerSectionElement.classList.remove("hidden");
  }

  function clearResultBeforeAppend() {
    userPickElement.innerHTML = "";
    pcPickElement.innerHTML = "";
  }

  function closeRulesContainer() {
    rulesContainerElement.classList.add("hidden");
  }

  function openRulesContainer() {
    rulesContainerElement.classList.remove("hidden");
  }

  function showHurray() {
    // hurrayElement.lastElementChild.classList.add('.play-again')//not working why
    hurrayElement.classList.remove("hidden");
    topSectionElement.classList.add("hidden");
    userChoiceElement.classList.add("hidden");
    pickedElement.classList.add("hidden");
    footerSectionElement.classList.add("hidden");
  }
}

game();
