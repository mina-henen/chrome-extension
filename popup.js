let changeColor = document.getElementById("changeColor");
let res = []
chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
  let dest_codes = ["EUR", "EGP", "AUD", "KWD", "SAR"];
  let base_code = "USD";
  await convert(100, base_code, dest_codes);
  console.log(res)
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  console.log("change")
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}

const API_KEY = "0984d952c862dd0cd879e254";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

let dest_codes = ["EUR", "EGP", "AUD", "KWD", "SAR"];
let base_code = "USD";

const convert = async (amount, base, dest) => {
  let current_response = {};


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



        res = [];
        dest.forEach((element) => {
          res.push(current_response["conversion_rates"][element] * amount);
        });
        console.log(res);
        return res;

      } else if (response.result === "error") {
        return "API ERROR"
      }
    });
  } 
  
  
  else {
    console.log("NO NEED FOR API CALL");
    res = [];
    dest.forEach((element) => {
      res.push(current_response["conversion_rates"][element] * amount);
    });
    console.log(res)

  }
};
