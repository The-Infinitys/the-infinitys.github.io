var HTMLEditor = document.getElementById("HTMLEditor");
var CSSEditor = document.getElementById("CSSEditor");
var JSEditor = document.getElementById("JSEditor");
var HTMLSource = document.getElementById("HTMLSource");
function getHTMLSource() {
  return document.documentElement.outerHTML
    .replace("/&/g", "&amp;")
    .replace("/</g", "&lt;")
    .replace("/>/g", "&gt;");
}
function openDevelopper() {
  document.getElementById("DevelopperToolBox").style.visibility = "visible";

  document.getElementById("MaximiseSwitch").style.visibility = "visible";

  CSSEditor.style.visibility = "hidden";
  JSEditor.style.visibility = "hidden";
  HTMLEditor.style.visibility = "visible";
  document.getElementById("VisibleSwitch").style.opacity = "1";
}
openDevelopper();
HTMLSource.value = getHTMLSource();
document.querySelector("#VisibleSwitch").addEventListener("click", (e) => {
  if (document.getElementById("DevelopperToolBox").style.visibility === "visible") {
    document.getElementById("DevelopperToolBox").style.visibility = "hidden";
    document.getElementById("MaximiseSwitch").style.visibility = "hidden";
    CSSEditor.style.visibility = "hidden";
    JSEditor.style.visibility = "hidden";
    HTMLEditor.style.visibility = "hidden";
    document.getElementById("VisibleSwitch").style.opacity = "0";
  } else {
    openDevelopper();
  }
});
document.querySelector("#MaximiseSwitch").addEventListener("click", (e) => {
  if (document.getElementById("DevelopperToolBox").style.width == "100%") {
    document.getElementById("DevelopperToolBox").style.width = "20%";
  } else {
    document.getElementById("DevelopperToolBox").style.width = "100%";
  }
});
document.querySelector("#HTML").addEventListener("click", (e) => {
  CSSEditor.style.visibility = "hidden";
  JSEditor.style.visibility = "hidden";
  HTMLEditor.style.visibility = "visible";
});
document.querySelector("#CSS").addEventListener("click", (e) => {
  HTMLEditor.style.visibility = "hidden";
  JSEditor.style.visibility = "hidden";
  CSSEditor.style.visibility = "visible";
});
document.querySelector("#JS").addEventListener("click", (e) => {
  CSSEditor.style.visibility = "hidden";
  HTMLEditor.style.visibility = "hidden";
  JSEditor.style.visibility = "visible";
});
document.querySelector("#RestoreHTML").addEventListener("click", (e) => {
  HTMLSource.value = getHTMLSource();
});
document.querySelector("#UpdateHTML").addEventListener("click", (e) => {
  console.log(HTMLSource.value);
  document.open();
  document.write(HTMLSource.value);
});
/* consoleプログラムの書き換え*/
console.log = ((logTextAreaArgument) => {
  let logTextArea = logTextAreaArgument;
  return (text) => (logTextArea.innerHTML += ">" + text + "<br>");
})(document.getElementById("JSRunnerConsole"));
console.info = ((logTextAreaArgument) => {
  let logTextArea = logTextAreaArgument;
  return (text) => (logTextArea.innerHTML += "[i]>" + text + "<br>");
})(document.getElementById("JSRunnerConsole"));
console.warn = ((logTextAreaArgument) => {
  let logTextArea = logTextAreaArgument;
  return (text) => (logTextArea.innerHTML += "[⚠︎]>" + text + "<br>");
})(document.getElementById("JSRunnerConsole"));
console.error = ((logTextAreaArgument) => {
  let logTextArea = logTextAreaArgument;
  return (text) => (logTextArea.innerHTML += "[×]>" + text + "<br>");
})(document.getElementById("JSRunnerConsole"));

document.querySelector("#JSRunnerButton").addEventListener("click", (e) => {
  let before = document.getElementById("JSRunner");
  before.remove();
  let after = document.createElement("script");
  after.id = "JSRunner";
  after.innerHTML = document.getElementById("JSSource").value;
  document.getElementById("JSEditor").appendChild(after);
});
document.querySelector("#UpdateCSS").addEventListener("click", (e) => {
  let before = document.getElementById("CSSAdder");
  before.remove();
  let after = document.createElement("style");
  after.id = "CSSAdder";
  after.innerHTML = document.getElementById("CSSSource").value;
  document.getElementById("CSSEditor").appendChild(after);
});
