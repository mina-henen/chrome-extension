let body = document.body

body.addEventListener("mouseup", e => {
    let selection = window.getSelection()
    let selectedText = selection.toString()
    let {anchorNode, anchorOffset:start, focusOffset:end} = selection
    let {parentElement} = anchorNode
    let text = parentElement.textContent
    let newText = text
    
    if(isCurrency(selectedText)) {
        selectedTextArray = selectedText.split(" ")
        [amount, type] = selectedTextArray
        // newAmount = apiCall(amount, type, newType)
        // newCurrency = [newAmount, newType]
        // newCurrency.join(" ")
        selectedTextArray[0] = "111"
        selectedText = selectedTextArray.join(" ")
        newText = text.slice(0, start).concat(selectedText).concat(text.slice(end, -1))
        newText = newText.trim()
    }

    parentElement.textContent = newText
})

let currenciesTypes = ["EUR", "EGP", "AUD", "KWD", "SAR"]
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
