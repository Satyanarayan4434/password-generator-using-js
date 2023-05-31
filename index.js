let passwordLengthSlider = document.getElementById('passwordLengthSlider');
let passwordLength = document.getElementById('passwordLength');
let mainInputField = document.getElementById('mainInputField');
let uppercaseCheckBox = document.getElementById('uppercaseCheckBox');
let lowercaseCheckBox = document.getElementById('lowercaseCheckBox');
let numberCheckBox = document.getElementById('numberCheckBox');
let symbolCheckBox = document.getElementById('symbolCheckBox');
let copyBtn = document.getElementById('copyBtn');
let copyMsg = document.getElementById('copyMsg');





let setPasswordLength = 10;

//UI change
function getPasswordLength(){
    passwordLengthSlider.value = setPasswordLength;
   passwordLength.innerText = setPasswordLength;
}
getPasswordLength();

//apply event Listner on slider and print that data in Password Length
passwordLengthSlider.addEventListener("input",(event)=>{
    setPasswordLength = event.target.value;
    getPasswordLength();
});

//create a function to find Random number as per min and max input
function setRndInteger(min, max){
  return Math.floor( Math.random() * (max-min)) + min;
};

//create a function to find Upper Case Character's from ASCII code using previous setRndInteger Function
function generateUpperCase(){ 
    return String.fromCharCode(setRndInteger(65,91));
};

//create a function to find Lower Case Character's from ASCII code using previous setRndInteger Function
function generateLowerCase(){
    return String.fromCharCode(setRndInteger(97,123));
};

//create a function to find Random number using previous setRndInteger Function
function generateRndNumber(){
    return setRndInteger(0,9);
};

//create a function to find Random Symbol's using previous setRndInteger Function
let symbols = "`@#$%^&*()";
function generateSymbol(){
    let randomNum = setRndInteger(0, symbols.length);
    return symbols.charAt(randomNum);
};

//create function to check how many check box is checked
let allCheckBox = document.querySelectorAll("input[type=checkbox]");
function countCheckBox(){
    count = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            count++;
    });
    if(setPasswordLength<count){
        setPasswordLength = count;
        getPasswordLength();
    }
      return count; 
}

//create a function to generate password
let password = "";
let generateButton = document.getElementById('generateButton');
generateButton.addEventListener('click',()=>{ 
    if(countCheckBox()==0)
    return;
    
    let password = "";
    let funcArr = [];
    if(uppercaseCheckBox.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheckBox.checked){
        funcArr.push(generateLowerCase);
    }
    if(numberCheckBox.checked){
        funcArr.push(generateRndNumber);
    }
    if(symbolCheckBox.checked){
        funcArr.push(generateSymbol);
    }
    
    for(let i=0; i<funcArr.length; i++){
        password = password+funcArr[i]();
    }
    
    for(let i=0; i<passwordLengthSlider.value-funcArr.length; i++) {
        let randIndex = setRndInteger(0 , funcArr.length);
        password += funcArr[randIndex]();
    }
    if(uppercaseCheckBox.checked && lowercaseCheckBox.checked && (numberCheckBox.checked || symbolCheckBox.checked) && passwordLengthSlider.value>=8){
        checkPasswordStrength.classList.add('activeCheckPassword1');
    }
    else{
        checkPasswordStrength.classList.remove('activeCheckPassword1');
    }
    if((uppercaseCheckBox.checked || lowercaseCheckBox.checked) && (numberCheckBox.checked || symbolCheckBox.checked) && passwordLengthSlider.value>=6){
        checkPasswordStrength.classList.add("activeCheckPassword2");
    }
    else{
        checkPasswordStrength.classList.remove('activeCheckPassword2');
    }
    if(passwordLengthSlider.value<6){
        checkPasswordStrength.classList.add("activeCheckPassword3");
    }
    else{
        checkPasswordStrength.classList.remove('activeCheckPassword3');
    }
    mainInputField.value = password;
    
});
    
async function copyMsgBtn(){
   try{
    await navigator.clipboard.writeText(mainInputField.value);
    copyMsg.innerText = "copied!";
   }
   catch(e){
        copyMsg.innerText = "Failed:(";
   }
   copyMsg.classList.add("activeTooltip");
   setTimeout(()=>{
    copyMsg.classList.remove("activeTooltip");
   },2000)
}