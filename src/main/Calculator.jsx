import React, { Component } from 'react'
import './Calculator.css'
import Display from '../Components/Display'
import Button from '../Components/Button'

const initialState = {
    displayValue : '0',
    clearDisplay : false, 
    operation : null,
    values: [0,0], 
    current: 0
}

export default class Calculator extends Component {
    
    state =  { ...initialState }

    constructor(props){
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.setNumber = this.setNumber.bind(this)
    }

    clearMemory(){
        this.setState({ ...initialState })
    }
    setOperation(operation){
        
        if(this.state.current === 0){
            this.setState({operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '0'
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e){
                console.log(e)
            }
            
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    setNumber(n){
       //se o n for igual um "." e se já existir um "." no displayValue, então não fazer nada
       if(n === "." && this.state.displayValue.includes('.')){
           return
       }
       //limpar o Display, si o valor o valor do display for igual a 0 ou se o valor for verdadedo,
    //    então deve-se limpar o display
       const clearDisplay = this.state.displayValue === '0' ||
                            this.state.clearDisplay
    //    se a const clearDisplay for verdadeiro, então de seta a variável 
    //    currentValue = true, caso contrário seta-se currentValue com o valor 
    //    de this.state.displayValue
       const currentValue = clearDisplay  ? '' : this.state.displayValue

       const displayValue = currentValue + n

       //mudar o estado da aplicação
       this.setState({ displayValue, clearDisplay: false })


       if(n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
       }
    }
    
    render(){
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple></Button>
                <Button label="/" click={this.setOperation} operation></Button>
                <Button label="7" click={this.setNumber}></Button>
                <Button label="8" click={this.setNumber}></Button>
                <Button label="9" click={this.setNumber}></Button>
                <Button label="*" click={this.setOperation} operation></Button>
                <Button label="4" click={this.setNumber}></Button>
                <Button label="5" click={this.setNumber}></Button>
                <Button label="6" click={this.setNumber}></Button>
                <Button label="-" click={this.setOperation} operation></Button>
                <Button label="1" click={this.setNumber}></Button>
                <Button label="2" click={this.setNumber}></Button>
                <Button label="3" click={this.setNumber}></Button>
                <Button label="+" click={this.setOperation} operation></Button>
                <Button label="0" click={this.setNumber} double></Button>
                <Button label="." click={this.setNumber}></Button>
                <Button label="=" click={this.setOperation} operation></Button>
            </div>
        )
    }
}