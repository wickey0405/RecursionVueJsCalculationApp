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
            process:[],
            total: 0,
            resetFlag: false,
        }
    },
    methods:{
        reset(){
            this.temp = "";
            this.nums = [];
            this.operators = [];
            this.equation = "";
            this.process = [];
            this.total = 0;
            this.resetFlag = false;
        },
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
            
            return this.equation;
        },
        check(){
            if (this.isOperator(this.temp)) return;
            this.nums.push(this.temp);
            // console.log("nums: "+this.nums);
            // console.log("oprs: "+this.operators)
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
            let i = 0;
            while (this.operators.includes("*") || this.operators.includes("/")){
                if (this.operators[i]==="*" || this.operators[i] === "/"){
                    this.nums.splice(i,2,this.calculation(this.nums[i], this.nums[i+1], this.operators[i]));
                    this.operators.splice(i,1);
                    this.makeProcessEquation();
                    i = 0;
                } else {
                    i++;
                }
            }

            while(this.nums.length!=1){
                let num1 = this.nums.shift();
                let num2 = this.nums.shift();
                let operator = this.operators.shift();

                this.nums.unshift(this.calculation(num1,num2,operator));
                this.makeProcessEquation();
            }

            this.total = this.nums[0];
            this.resetFlag = true;
            return this.nums[0];
        }
        
    }
})