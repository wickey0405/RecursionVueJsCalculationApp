// ここから書いてください
class Operator{
    constructor(type, priority, data){
        this.type = type;
        this.priority = priority;
        this.data = data;
    }
}

class Operators{
        static plus = new Operator("optr", 1, "+");
        static minus = new Operator("optr", 1, "-");
        static multiplied = new Operator("optr", 2, "*");
        static divided = new Operator("optr", 2, "/");
}

var vm = new Vue({
    el: "#app",
    data(){
        return {
            temp: "",
            nums: [],
            operators: [],
            equation: "",
            process:[]
        }
    },
    methods:{
        isNumber(input){
            if (Number.isNaN(Number(input))) return false;
            return true;
        },

        isOperator(input){
            if (Number.isNaN(Number(input))) return true;
            return false;
        },

        add(input){
            if (this.equation.length == 0 && this.isOperator(input)){
                return;
            }
            
            if (this.temp.length === 0 || (this.isNumber(this.temp) && this.isNumber(input))){
                this.temp += input;
                this.equation += input;
            } else if(this.isNumber(this.temp) && this.isOperator(input)){
                this.nums.push(this.temp);
                this.temp = "" + input;
                this.equation += " " + input;    
            } else if(this.isOperator(this.temp) && this.isNumber(input)) {
                this.operators.push(this.temp);
                this.temp = "" + input;
                this.equation += " " + input;
            } else {
                this.temp = "" + input;
                this.equation = this.equation.slice(0,-1);
                this.equation += input;
            }
            console.log("nums: "+this.nums);
            console.log("oprs: "+this.operators)
            return this.equation;
        },
        check(){
            if (this.isOperator(this.temp)) return;
            this.nums.push(this.temp);
            this.totalCalculation();
        },
        calculation(num1, num2, operator){
            num1 = Number(num1);
            num2 = Number(num2);
            if (operator === "+") return num1 + num2;
            else if (operator === "-") return num1 - num2;
            else if (operator === "*") return num1 * num2;
            else if (operator === "/") {
                if (num2 === 0) return NaN;
                return num1 / num2;
            }
        },
        makeProcessEquation(){
            let result = "";
            for(let i = 0; i < this.nums.length-1; i++){
                result += this.nums[i] + " " + this.operators[i] + " "; 
            }
            result += this.nums[this.nums.length-1];
            this.process.push(result);
        },
        totalCalculation(){
            for (let i = 0; i < this.nums.length-1; i++){
                if (this.operators[i]==="*" || this.operators[i] === "/"){
                    this.nums[i] = calculation(this.nums[i], this.nums[i+1], this.operators[i]);
                    for (let j = i+1; j < this.nums.length-1; j++){
                        this.nums[j] = this.nums[j+1];
                        this.operators[j] = this.operators[j+1];
                    }
                    this.nums.pop();
                    this.operators.pop();

                    this.makeProcessEquation();
                }
            }

            for (let i = 0; i < this.nums.length-1; i++){
                this.nums[i] = calculation(this.nums[i], this.nums[i+1], this.operators[i]);
                for (let j = i+1; j < this.nums.length-1; j++){
                    this.nums[j] = this.nums[j+1];
                    this.operators[j] = this.operators[j+1];
                }
                this.nums.pop();
                this.operators.pop();

                this.makeProcessEquation();
            }
            return this.nums[0];
        }
        
    }
})

