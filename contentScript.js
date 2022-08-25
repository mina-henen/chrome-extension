let body = document.body
let res

const API_KEY = "0984d952c862dd0cd879e254";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

body.addEventListener("mouseup", async (e) => {
    let selection = window.getSelection()
    let selectedText = selection.toString()
    let {anchorNode, anchorOffset:start, focusOffset:end} = selection
    let {parentElement} = anchorNode
    let text = parentElement.textContent
    let newText = text
    
    if(isCurrency(selectedText) || selectedText.match(dollarRegex)) {
        let amount, type
        if(selectedText.match(dollarRegex)) {
            amount = selectedText.slice(1, -1)
            type = selectedText[0]
        } else {

            selectedTextArray = selectedText.split(" ")
            console.log(selectedTextArray);
            amount = selectedTextArray[0]
            type = selectedTextArray[1]
        }

        let newType = "EGP"
        let newAmount = await convert(amount, type, newType)
        console.log(newAmount);
        let newCurrency = [newAmount, newType]
        selectedText = newCurrency.join(" ")
        newText = text.slice(0, start).concat(selectedText).concat(text.slice(end, -1))
        newText = newText.trim()
    }

    parentElement.textContent = newText
})

let currenciesTypes = ["EUR", "EGP", "AUD", "KWD", "SAR"]
let dollarRegex = new RegExp(`$\d+`)
function isCurrency(input) {
    let currenciesTypes = ["EUR", "EGP", "AUD", "KWD", "SAR"]
    let foundMatch = false
    currenciesTypes.forEach(currencyType => {
        const currencyRegex = new RegExp(`\\d+ ${currencyType}`)
        let match = input.match(currencyRegex)
        foundMatch = foundMatch || (match && true)
    })
    return foundMatch
}

const convert = async (amount, base, dest) => {
  let current_response = {};
  console.log();


  current_response = JSON.parse(localStorage.getItem('rates'))
  console.log(current_response)
  if (
    !current_response ||
    current_response.base_code !== base ||
    current_response.time_next_update_unix < new Date().getTime() / 1000
  ) {
    console.log("NEED API CALL");
    await fetch(`${API_URL}/${base}`).then(async (response) => {
      response = await response.json();
      if (response.result === "success") {
        localStorage.setItem('rates', JSON.stringify(response))

        current_response = JSON.parse(localStorage.getItem('rates'))

        console.log(current_response)
        console.log("sasab");

        res = current_response["conversion_rates"][dest]*amount
        console.log("res", res)
        
    } else if (response.result === "error") {
        return "API ERROR"
      }
    });
    return res;

  } 
  else {
    console.log("NO NEED FOR API CALL");
    console.log(current_response);
    res;
    res = current_response["conversion_rates"][dest]*amount
    console.log(res)

    return res

  }
}

const symbols = {
    '$': 'USD',
    'د.إ': 'AED',
    'ب.د': 'BHD',
    '€' : 'EUR',
    '£': 'GBP',
    '₹': 'INR'
}

export default function sym2code(sym){
    if(symbols[sym] == undefined)
        return ''
    else
        return symbols[sym]
}
