let billElement = document.getElementsByClassName('bill__input')[0];
let numPeopleElement = document.getElementsByClassName('people__input')[0];
let customTipElement = document.getElementsByClassName('tip__input')[0];
let tipButton = document.getElementsByClassName("tip__btn");
let resetBtn = document.getElementsByClassName("total__reset")[0];
let buttons = document.querySelectorAll(".tip__btn");
let totalPersonElement = document.getElementById('total__per-person');
let tipPersonElement = document.getElementById('tip__per-person');
let peopleErrorMessage = document.getElementsByClassName('people__error')[0];
let billErrorMessage = document.getElementsByClassName('bill__error')[0];
let activeButton;
let tipPercent = 0;
let billAmount = 0;
let numOfPeople = 0;
let customAmount = 0;
let totalAmount = 0;

for (let i = 0; i < tipButton.length; i++) {
    tipButton[i].addEventListener('click', function () {
        tipPercent = +tipButton[i].value;
        calculateAndPopulateFields();
    });
}

buttons.forEach(tip__btn => {
    tip__btn.addEventListener('click', function (event) {
        if (activeButton) {
            activeButton.classList.remove("diff__color");
        }
        event.target.classList.add("diff__color");
        activeButton = event.target;
        resetBtn.style.background = "#26C2AE";
    })
});

customTipElement.addEventListener('click', function (event) {
    if (customTipElement && activeButton) {
        activeButton.classList.remove("diff__color");
    }
});

customTipElement.addEventListener('input', function () {
    if (customAmount <= 100) {
        tipPercent = customAmount;
        customTipElement.style.outlineColor = "#26C2AE";
    } else {
        customTipElement.style.outlineColor = "red";
    }
});

function calculateAndPopulateFields() {
    var tipAmount = (billAmount / 100) * tipPercent;
    var totalAmount = billAmount + tipAmount;
    var tipPerPerson = parseFloat(tipAmount / numOfPeople).toFixed(2);
    var totalPerPerson = parseFloat((totalAmount / numOfPeople)).toFixed(2);

    if (numOfPeople > 0 && billAmount > 0) {
        //Setting Tip/Person
        tipPersonElement.textContent = '$' + tipPerPerson;
        //Setting TotalPerson
        totalPersonElement.textContent = '$' + totalPerPerson;
    } else {
        tipPersonElement.textContent = '$0.00';
        totalPersonElement.textContent = '$0.00';
    }
}

billElement.addEventListener('input', function (event) {
    billAmount = parseFloat(billElement.value);
    resetBtnStyleChange();

    if (billElement.value <= 0) {
        billElement.value = "";
    }

    if (billAmount < 1000000) {
        calculateAndPopulateFields();
        billElement.style.outlineColor = "#26C2AE";
        billErrorMessage.style.display = "none"
    } else {
        billElement.style.outlineColor = "red";
        billErrorMessage.style.display = "block"
        
    }

    if(isNaN(event.target.value)) {
        event.target.value = "";
    }
});

numPeopleElement.addEventListener('input', function (event) {
    numOfPeople = parseInt(numPeopleElement.value);
    resetBtnStyleChange();
    
    if (numPeopleElement.value <= 0) {
        numPeopleElement.style.outlineColor = "red";
        numPeopleElement.value = "";
        peopleErrorMessage.style.display = "block";
    } else {
        numPeopleElement.style.outlineColor = "transparent";
        peopleErrorMessage.style.display = "none";
    }

    if (event.target.value % 1 != 0) {
        console.log(event.target.value);
        event.target.value = Math.round(event.target.value)
    } 

    if(isNaN(event.target.value)) {
        event.target.value = "";
    }

    calculateAndPopulateFields();
});

customTipElement.addEventListener('input', function () {
    customAmount = parseInt(customTipElement.valueAsNumber);
    calculateAndPopulateFields();
    resetBtnStyleChange();

    if (customTipElement.value <= 0) {
        customTipElement.value = "";
    }
});

function resetBtnStyleChange() {
    if (activeButton || numOfPeople > 0 || billAmount > 0 || customAmount > 0) {
        resetBtn.style.background = "#26C2AE";
    } else {
        resetBtn.style.background = "#0D686D";
    }
}

resetBtn.addEventListener('click', function () {
    if (activeButton) {
        activeButton.classList.remove("diff__color");
    }
    numPeopleElement.value = "";
    billElement.value = "";
    customTipElement.value = "";
    tipPercent = 0;
    billAmount = 0;
    numOfPeople = 0;
    customAmount = 0;
    totalAmount = 0;
    totalPersonElement.textContent = "$0.00";
    tipPersonElement.textContent = "$0.00";
    numPeopleElement.style.outlineColor = "transparent"
    resetBtn.style.background = "#0D686D";
    peopleErrorMessage.style.display = "none";
});