import hpError from "lib/hpError";

function getErrorText(htmlString, errorText) {
  try {
    var el = document.createElement("html");
    el.innerHTML = htmlString;
    return el.getElementsByTagName("pre")[0].textContent;
  } catch (err) {
    throw new hpError("db", "Error:  (Complete error description not available) response: " + htmlString + "   text: " + errorText);
  }
}

export default getErrorText;
