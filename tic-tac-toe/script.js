const cells = document.querySelectorAll("[data-cell]");
const score1 = document.querySelector("[data-score1]");
const score2 = document.querySelector("[data-score2]");
const winningMessage = document.getElementById("winningMessage");
const restartButton = document.querySelector(".restartButton");
let currentUser = "x";
let cellNum = 4;
let prev;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const controlls = [
  "Escape",
  "a",
  "s",
  "d",
  "w",
  "Up",
  "ArrowUp",
  "Down",
  "ArrowDown",
  "Left",
  "ArrowLeft",
  "Right",
  "ArrowRight",
];
const userMark = {
  x: {
    mark: "x",
    class: "x",
  },
  circle: {
    mark: "o",
    class: "circle",
  },
};
gameStart();
storage();


function gameStart() {
  storage();
  restartButton.addEventListener("click", gameRestart);
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", (e) => {
      if (cell.classList.contains("x") || cell.classList.contains("circle")) {
        e.preventDefault();
      } else {
        cell.classList.add("nextMove");
        cell.innerHTML = userMark[currentUser].mark;
      }
    });
    cell.addEventListener("mouseleave", (e) => {
      if (cell.classList.contains("x") || cell.classList.contains("circle")) {
        e.preventDefault();
      } else {
        cell.classList.remove("nextMove");
        cell.innerHTML = ``;
      }
    });
    cell.addEventListener("click", (e) => {
      handleClick(e);
    });
  });

  document.addEventListener("keydown", (event) => {
    switchFunction(event)
  });
  cells.forEach((cell) => {
    cell.addEventListener("focus", (e) => {
      if (
        cell.classList.contains("x") ||
        cell.classList.contains("circle") ||
        cell.classList.contains("choosen")
      ) {
        e.preventDefault();
      } else {
        cell.classList.add("nextMove");
        cell.innerHTML = userMark[currentUser].mark;
      }
    });
    cell.addEventListener("blur", (e) => {
      if (
        cell.classList.contains("x") ||
        cell.classList.contains("circle") ||
        cell.classList.contains("choosen")
      ) {
        e.preventDefault();
      } else {
        cell.classList.remove("nextMove");
        cell.classList.remove("focus");
        cell.innerHTML = "";
      }
    });
  });
}
function gameRestart() {
  winningMessage.classList.remove("show");
  currentUser = "x";
  cells.forEach((e) => {
    e.innerHTML = "";
    e.classList.remove("choosen");
    e.classList.remove("x");
    e.classList.remove("circle");
  });
}
function checkWinner(className) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(className);
    });

  });
}
function checkDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains("choosen");
  });
}
function handleClick(e) {
    if (e.target.classList.contains("choosen")) {
      return;
    }
    setMark(e);
    if (checkDraw() === true) {
      winningMessage.classList.add("show");
      winningMessage.children[0].innerHTML = `Draw`;
    }
    if (checkWinner(currentUser)) {
      winningMessage.classList.add("show");
      winningMessage.children[0].innerHTML = `${userMark[
        currentUser
      ].mark.toUpperCase()}'s wins`;
      increment(currentUser);
      storage();
      switchFunction('endGame')
    }
    e.target.classList.remove("focus");
    switchTurn();
  }
function increment(currentUser) {
    const obj = storage();
    if (currentUser === "x") {
      const temp = {
        xScore: obj.xScore + 1,
        oScore: obj.oScore,
      };
      localStorage.setItem("scores", JSON.stringify(temp));
    } else {
      const temp = {
        xScore: obj.xScore,
        oScore: obj.oScore + 1,
      };
      localStorage.setItem("scores", JSON.stringify(temp));
    }
  }
function setMark(e) {
  const cell = e.target;
  cell.classList.add("choosen");
  cell.classList.add(userMark[currentUser].class);
  cell.classList.remove("nextMove");
  cell.innerHTML = userMark[currentUser].mark;
}
function storage() {
  const scores = JSON.parse(localStorage.getItem("scores"));
  if (scores) {
    score1.innerHTML = scores.xScore;
    score2.innerHTML = scores.oScore;
    return scores;
  } else {
    const newScores = {
      xScore: 0,
      oScore: 0,
    };
    localStorage.setItem("scores", JSON.stringify(newScores));
  }
}
function switchTurn() {
    if (currentUser === "x") {
      currentUser = "circle";
    } else {
      currentUser = "x";
    }
  }




  function switchFunction (event){
    console.log(event);
    if(winningMessage.classList.contains("show")){
        if(event.key==="Escape" || event.key === 'Enter' || event.code=== 'Space'){
          setTimeout(() => {
            gameRestart()
          }, 100);
        }
        return;
    }
    if (document.activeElement && controlls.includes(event.key)) {
        cells[4].focus();
        let nextCellNum;
        switch (event.key) {
          case "Up":
          case "w":
          case "ArrowUp":
            if (cellNum <= 2) {
              nextCellNum = cellNum + 9;
              cellNum = cellNum + 9;
            }
            nextCellNum = cellNum - 3;
            cellNum = cellNum - 3;
            break;
          case "Down":
          case "s":
          case "ArrowDown":
            if (cellNum >= 6) {
              nextCellNum = cellNum - 9;
              cellNum = cellNum - 9;
            }
            nextCellNum = cellNum + 3;
            cellNum = cellNum + 3;
            break;
          case "Left":
          case "a":
          case "ArrowLeft":
            nextCellNum = cellNum - 1;
            prev = cellNum;
            cellNum = cellNum - 1;
            if (cellNum === -1) {
              nextCellNum = 8;
              cellNum = 8;
            }
  
            break;
          case "Right":
          case "d":
          case "ArrowRight":
            nextCellNum = cellNum + 1;
            prev = cellNum;
            cellNum = cellNum + 1;
            if (cellNum === 9) {
              nextCellNum = 0;
              cellNum = 0;
            }
            break;
          case "Escape":
            gameRestart();
          default:
            return;
        }
        cells[nextCellNum].focus();
        cells[prev].blur();
      }
  }