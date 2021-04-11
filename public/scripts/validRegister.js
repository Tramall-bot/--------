const isValid = document.URL.split("?")[1];
console.log(isValid);
if (isValid !== undefined) {
  const errMSG = document.createElement("p");
  switch (Number(isValid)) {
    case 0:
      errMSG.innerText = "Данное имя уже используется";
      break;
    case 1:
      errMSG.innerText = "Имени превышает лимит в 20 символов";
      break;
    case 2:
      errMSG.innerText = "Введите пароль";
      break;
    case 3:
      errMSG.innerText = "Пароль должен состоять минимум из 4 символов";
      break;
    case 4:
      errMSG.innerText = "Введите имя";
      break;
    case 5:
      errMSG.innerText = "Пароль превышает лимит в 20 символов";
  }
  errMSG.style.color = "rgb(255, 114, 114)";
  document.forms[0].insertBefore(errMSG, document.getElementById("btn"));
}
