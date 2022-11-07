class Calculator {
    constructor (currentOperandTextElement, previousOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand  + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computaion
        let prev = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                console.log(prev, current);
                computaion = prev + current;
                break;
            case '-':
                computaion = prev - current;
                break;
            case '*':
                computaion = prev * current;
                break;
            case '÷':
                computaion = prev / current;
                break;
            default:
                return
        }
        this.currentOperand = computaion
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay='';
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
           this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const allClearButtons = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//number onclick
numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

//operation onclick
operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButtons.addEventListener('click', ()=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButtons.addEventListener('click', ()=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButtons.addEventListener('click', ()=>{
    calculator.delete()
    calculator.updateDisplay()
})