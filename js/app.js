let from = document.querySelector("#from");
let to = document.querySelector("#to");
let input = document.querySelector(".input");
let result = document.querySelector(".result");
let tbody = document.querySelector(".tbody");
let clearBtn = document.querySelector(".clear");

function addList (content,value,parent) {
    let option = document.createElement("option");
    let text = document.createTextNode(content);
    option.appendChild(text);
    option.setAttribute("value",value);
    parent.appendChild(option);
} //function to create select option by use api data

function store () {
    localStorage.setItem("moneyExchangeCalculatorRecord", tbody.innerHTML);
} //function to store calculated result in localStorage

function addToTable(x) {
    let rowspacer = document.querySelector("#rowspacer"); //the thing to show if there is no record
    if(rowspacer) {
        rowspacer.remove();
    }
    let tr = document.createElement("tr");
    x.map(function(el) {
        let td = document.createElement("td");
        let content = document.createTextNode(el);
        td.appendChild(content);
        tr.appendChild(td);
    });
    tbody.appendChild(tr);
} //function to add the result in table

async function takeData() {
//    const response = await fetch("http://forex.cbm.gov.mm/api/latest");
    const response = await fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/mmk.json");
    const data = await response.json();
    
    for(x in data.mmk) {
        addList(x.toUpperCase(), data.mmk[x], from);
        addList(x.toUpperCase(), data.mmk[x], to);
    } 
}

takeData();//adding select options by useing api data

document.querySelector(".cal").addEventListener("submit", function(e) {
    e.preventDefault();

    //get data
    let inputValue = input.value;
    let fromValue = from.value;
    let toValue = to.value;
    let fromText =inputValue + " " + from.options[from.selectedIndex].innerText; // get from-text to show in table
    let toText = to.options[to.selectedIndex].innerText; // get to-text to show in table
    let date = new Date().toLocaleString();

    //process data
    let resultValue = (inputValue/fromValue*toValue).toFixed(2); //calculte result
    let arr = [date, fromText, toText, resultValue+ " " + toText] //create array to use in building table
    addToTable(arr); // add calculated data in table
    store(); //store calculated data in localStorage

    //display result

    result.innerHTML = resultValue + " " + toText;
    input.value = "";
    from.value = "";
    to.value = "1";
    input.focus();
});
(function() {
    if(localStorage.getItem("moneyExchangeCalculatorRecord")) {
        tbody.innerHTML += localStorage.getItem("moneyExchangeCalculatorRecord");
    } else {
        tbody.innerHTML = `<tr id="rowspacer"><td colspan="4">There is no record history</td></tr>`;
    }
})(); //to show at start of page

function nightChange() {
    document.body.classList.toggle("night");
    document.querySelector("#modeIcon").classList.toggle("fa-toggle-on");
    document.querySelector("#modeIcon").classList.toggle("fa-toggle-off");
} //function for night mode
