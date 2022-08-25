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

