function getErrorText(htmlString) {
  var el = document.createElement("html");
  el.innerHTML = htmlString;
  return el.getElementsByTagName("pre")[0].textContent;
}

export default getErrorText;
