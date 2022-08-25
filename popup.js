let changeColor = document.getElementById("changeColor");

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
  let res = await convert(100, base_code, dest_codes);
  console.log(res);
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
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

  chrome.storage.local.get(["rates"], function (result) {
    current_response = result;
  });

  if (
    !current_response ||
    current_response.base_code !== base ||
    current_response.time_next_update_unix < new Date().getTime() / 1000
  ) {
    console.log("NEED API CALL");
    await fetch(`${API_URL}/${base}`).then(async (response) => {
      response = await response.json();
      console.log(response);
      if (response.result === "success") {
        //store the response in the chrome storage.
        chrome.storage.local.set({ rates: response }, function () {
          console.log("Value is set to " + response);
        });
        chrome.storage.local.get(["rates"], function (result) {
          current_response = result;
        });
        console.log(current_response);
        let res = [];
        dest.forEach((element) => {
          res.push(current_response["conversion_rates"][element] * amount);
        });
        console.log(res);
      } else if (response.result === "error") {
        console.log("API ERROR");
      }
    });
  } else {
    console.log("NO NEED FOR API CALL");
    console.log(current_response);
    let res = [];
    dest.forEach((element) => {
      res.push(current_response["conversion_rates"][element] * amount);
    });
    console.log(res);
  }
};
