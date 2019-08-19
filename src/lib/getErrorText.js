import hpError from "lib/hpError";

function getErrorText(htmlString) {
  try {
    var el = document.createElement("html");
    el.innerHTML = htmlString;
    return el.getElementsByTagName("pre")[0].textContent;
  } catch (err) {
    throw new hpError("db", "Error:  Server did not send the error description");
  }
}

export default getErrorText;
