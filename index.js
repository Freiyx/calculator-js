//numbers and operator variables for calculation
let prevNum = ''
let currentNum = ''
let operator;

//declaring the buttons
let numBtns = document.querySelectorAll('[data-type="number"]')
let operatorBtns = document.querySelectorAll('[data-type="operator"]')
let dotBtn = document.querySelector('[data-type="dot"]')
let equalBtn = document.querySelector('[data-type="equal"]')
let clearBtn = document.querySelector('[data-type="clear"]')
let clearAllBtn = document.querySelector('[data-type="clearall"]')

let resultDiv = document.querySelector('.calculated-result')
let calculationDiv = document.querySelector('.calculation')

//equalMode variable becomes true when a calculation is made after pressing '='. 
//Pressing a number afterwards replace the currentNum, whereas pressing a operator will keep the calculated number for the next calculation. Also disables 'clear'.
let equalMode = false

//operator functions
function add(num1, num2){
    return num1 + num2
}

function subtract(num1, num2){
    return num1 - num2
}

function multiply(num1, num2){
    return num1 * num2
}

function divide(num1, num2){
    return num1 / num2
}

//operate function that takes operator and two nums and return the calculation based on operator
function operate(operator, num1, num2){
    switch (operator){
        case '+':
            return add(num1, num2)
        case '-':
            return subtract(num1, num2)
        case '*':
            return multiply(num1, num2)
        case '/':
            if (num1 == '0' || num2 =='0'){
                return 'you cant divide by 0 dummy'
            }else{
                return divide(num1, num2)
            }
        default:
            break;
    }
}

//button click listeners
numBtns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        let numValue = btn.value
        numberHandler(numValue)
    })
})

operatorBtns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        let operatorValue = btn.value
        operatorHandler(operatorValue)
    })
})

equalBtn.addEventListener('click', ()=>{
    equalHandler()
})

clearBtn.addEventListener('click', ()=>{
    clear()
})

clearAllBtn.addEventListener('click', ()=>{
    allClear()
})

dotBtn.addEventListener('click', (e)=>{
    let dotValue = e.target.value
    dotHandler(dotValue)
})

//keypress keydown listeners
document.addEventListener('keydown', (e) => {
    if (e.key == 'Backspace'){
        clear()
    }

    if (e.key == 'Escape'){
        allClear()
    }

    if (Number(e.key) || e.key == '0'){
        let numValue = e.key       
        numberHandler(numValue)
    }

    if (e.key == 'Enter'){
        e.preventDefault()
        equalHandler()
    }

    if (e.key == '.'){
        let dotValue = e.key   
        dotHandler(dotValue)
    }

    if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/'){
        let operatorValue = e.key
        operatorHandler(operatorValue)
    }
})

//handlers for click/press listeners

//number handler 
function numberHandler(numValue){
    if (equalMode){
        currentNum = numValue
        equalMode = false
    }else{
        currentNum += numValue
    }

    resultDiv.textContent = currentNum
}

//operator handler
function operatorHandler(operatorValue){
    if (isNaN(currentNum)){
        return
    }
    
    if (prevNum != '' && currentNum != ''){
        prevNum = operate(operator, Number(prevNum), Number(currentNum))
        currentNum =''
        operator = operatorValue
    }
    else{       
        if (currentNum == ''){
            currentNum = prevNum
        }
        operator = operatorValue
        prevNum = currentNum
        currentNum = ''
    }

    if (prevNum == ''){
        prevNum = '0'
    }
   
    calculationDiv.textContent = `${prevNum} ${operator}`
    resultDiv.textContent = ''
}

//all clear handler
function allClear(){
    currentNum = ''
    prevNum = ''
    operator = ''
    calculationDiv.textContent = ''
    resultDiv.textContent = ''
}

//clear handler
function clear(){
    if (equalMode){
        return
    }
    currentNum = currentNum.slice(0,-1)
    if (prevNum == '' && currentNum == ''){
        currentNum = ''
    }
    resultDiv.textContent = currentNum
}

// '.' handler
function dotHandler(getDotValue){
    if (equalMode){
        currentNum = '0' + getDotValue
        equalMode = false
    }else{

        if (currentNum.includes('.')){
            return
        }

        if (currentNum == ''){
            currentNum += '0'
        }

        currentNum += getDotValue
    }
    
    resultDiv.textContent = currentNum
}

//equal handler
function equalHandler(){
    calculationDiv.textContent = ''

    if (prevNum != '' && currentNum != ''){
        
        currentNum = operate(operator, Number(prevNum), Number(currentNum)).toString()
        //if number is decimal and is more than 3dp, round down to 3dp
        if (currentNum.includes('.')){
            let decimals = currentNum.substring(currentNum.indexOf('.')+1)
            if (decimals.length > 3){
                let toNum = Number(currentNum)
                currentNum = +toNum.toFixed(3)
            }
        }
    }else if (currentNum == ''){
        currentNum = prevNum
    }else{
        return
    }
    
    prevNum = ''
    resultDiv.textContent = currentNum

    equalMode = true
}