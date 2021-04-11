const isValid = document.URL.split("?")[1];
if (isValid === "err") {
  const errMSG = document.createElement("p");
  errMSG.innerText = "Было указанно нерпавильное имя или пароль";
  errMSG.style.color = "rgb(255, 114, 114)";
  document.forms[0].insertBefore(errMSG, document.forms[0].lastElementChild);
}
