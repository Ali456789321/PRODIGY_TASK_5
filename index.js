const x_Class = 'x'
const circle_Class = 'circle'
const winning_comb = [
    [0,1,2],
    [1,4,3],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElement = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningText = document.querySelector('[data-winning-message-text]')
const winningElement = document.getElementById('winningMessage')
const restart = document.getElementById('restart')
let circleTurn

startGame()

restart.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElement.forEach(cell => {
        cell.classList.remove(x_Class)
        cell.classList.remove(circle_Class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once : true})
    })
    setBoard()
    winningElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? circle_Class : x_Class
  placeMark(cell, currentClass)
  if(checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
     endGame(true)
  } else {
    swapTurns()
    setBoard()
  }
}

function endGame(draw) {
   if(draw) {
    winningText.innerText = 'draw'
   } else {
    winningText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
   }
   winningElement.classList.add('show')
}

function isDraw() {
    return [...cellElement].every(cell => {
       return cell.classList.contains(circle_Class) || cell.classList.contains(x_Class)   
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoard() {
   board.classList.remove(x_Class)
   board.classList.remove(circle_Class)
   if(circleTurn) {
    board.classList.add(circle_Class)
   } else {
    board.classList.add(x_Class)
   }
}

function checkWin(currentClass) {
   return winning_comb.some(combination => {
     return combination.every(index => {
        return cellElement[index].classList.contains(currentClass)  
     })
   })
}