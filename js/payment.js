const dataObj = JSON.parse(localStorage.getItem("data"));

var isCardNumberValidate = false;
var isExpValidate = false;
var isCVVValidate = false;
var isNameValidate = false;

const init = () => {
  //check here data is available
  console.log(dataObj);
  if (dataObj != undefined) {
    initComponents();
  } else {
    window.location.href = "error.html";
    //Todo rederect oops something went wrong page
  }
};
const initComponents = () => {
  //load table
  const tiketData = dataObj.tiketData;

  const table = document.getElementById("tableBody");

  const nameRow = document.getElementById("tableName");
  nameRow.innerText = dataObj.name;

  //making date
  const dateRow = document.getElementById("tableDate");
  dateRow.innerText = tiketData.date;

  const timeRow = document.getElementById("tableTime");
  const from = tiketData.from;
  const to = tiketData.to;
  timeRow.innerText = "From " + from + " To " + to;

  const durationRow = document.getElementById("tableTimeDuration");
  const peekCount = tiketData.peekCount;
  const normalCount = tiketData.normalCount;
  const totalduration = peekCount + normalCount;
  durationRow.innerText =
    totalduration +
    " hrs (" +
    normalCount +
    " Normal : " +
    peekCount +
    " peek)";

  const mobileRow = document.getElementById("tableMobile");
  mobileRow.innerText = dataObj.mobile;

  const emailRow = document.getElementById("tableEmail");
  emailRow.innerText = dataObj.email;

  const genderRow = document.getElementById("tableGender");
  genderRow.innerText = dataObj.gender;

  const titleRow = document.createElement("tr");
  const title1 = document.createElement("th");
  const title2 = document.createElement("th");
  title1.innerText = "Tickets";
  title2.innerText = "Charges";
  titleRow.appendChild(title1);
  titleRow.appendChild(title2);
  table.appendChild(titleRow);

  tiketData.tikets.map((item) => {
    if (item.count > 0) {
      const normalPrice = item.price * normalCount;
      const peekPrice = item.peekPrice * peekCount;
      const payment = (normalPrice + peekPrice) * parseInt(item.count);

      const tr = document.createElement("tr");
      const tdt = document.createElement("td");
      tdt.innerText = " ( " + item.count + "x ) " + item.title;

      const tdb = document.createElement("td");
      item.price == 0
        ? (tdb.innerText = "free")
        : (tdb.innerText = "$" + payment);

      tr.appendChild(tdt);
      tr.appendChild(tdb);
      table.appendChild(tr);
    }
  });

  const btn = (document.getElementById("paybtn").innerText =
    "Pay ($" + tiketData.totalPrice + ")");

  const footerRow = document.createElement("tr");
  const footer1 = document.createElement("th");
  const footer2 = document.createElement("th");
  footer1.innerText = "Total Payment";
  footer2.innerText = "$" + tiketData.totalPrice;
  footerRow.appendChild(footer1);
  footerRow.appendChild(footer2);
  table.appendChild(footerRow);
};

const cardNumberInputValidate = () => {
  // Remove spaces and non-numeric characters from the card number
  let cardNumber = document.getElementById("cardNumberInput").value;
  cardNumber = cardNumber.replace(/\s/g, "");

  // Check if the card number is between 13 and 19 digits in length
  if (!/^[0-9]{13,19}$/.test(cardNumber)) {
    return false;
  }

  // Implement the Luhn algorithm for card number validation
  let sum = 0;
  let shouldDouble = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};
const cardNumberInputShowMsg = (type) => {
  if (type == true) {
    document.getElementById("cardNumberMsg").innerText = "Great!";
    document.getElementById("cardNumberError").innerText = "";
  } else {
    document.getElementById("cardNumberError").innerText =
      "Invalid card Number";
    document.getElementById("cardNumberMsg").innerText = "";
  }
};
const cardNumberInputOnChange = () => {
  const value = cardNumberInputValidate();
  isCardNumberValidate = value;
  cardNumberInputShowMsg(value);
  checkAllDataisValidate();
};

const ExpInputValidate = () => {
  const expirationDate = document.getElementById("expInput").value;
  // Check if the date is in the future and has a valid format (MM/YY)
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Get the last two digits of the current year
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1

  const inputYear = parseInt(expirationDate.slice(3, 5), 10);
  const inputMonth = parseInt(expirationDate.slice(0, 2), 10);

  if (
    inputYear < currentYear ||
    (inputYear === currentYear && inputMonth < currentMonth)
  ) {
    // Expiration date is in the past
    return false;
  }

  // Check if the format is correct (MM/YY)
  const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  return regex.test(expirationDate);
};

const ExpInputShowMsg = (type) => {
  if (type == true) {
    document.getElementById("expInputMsg").innerText = "Great!";
    document.getElementById("expInputError").innerText = "";
  } else {
    document.getElementById("expInputError").innerText = "Invalid Date";
    document.getElementById("expInputMsg").innerText = "";
  }
};
const ExpInputOnChange = () => {
  const value = ExpInputValidate();
  isExpValidate = value;
  ExpInputShowMsg(value);
  checkAllDataisValidate();
};

const CVCInputValidate = () => {
  const cvv = document.getElementById("cvcInput").value;
  // Check if the CVV is numeric and has the correct length (3 or 4 digits)
  const regex = /^[0-9]{3,4}$/;
  return regex.test(cvv);
};

const CVCInputShowMsg = (type) => {
  if (type == true) {
    document.getElementById("cvcMsg").innerText = "Great!";
    document.getElementById("cvcError").innerText = "";
  } else {
    document.getElementById("cvcError").innerText = "Invalid Number";
    document.getElementById("cvcMsg").innerText = "";
  }
};
const CVCInputOnChange = () => {
  const valid = CVCInputValidate();
  isCVVValidate = valid;
  CVCInputShowMsg(valid);
  checkAllDataisValidate();
};

const nameInputValidation = () => {
  const name = document.getElementById("NameInput").value;
  if (name.length > 5) {
    return true;
  } else {
    return false;
  }
};
const nameInputShowMsg = (type) => {
  if (type == true) {
    document.getElementById("NameMsg").innerText = "Great!";
    document.getElementById("NameError").innerText = "";
  } else {
    document.getElementById("NameError").innerText =
      "Please enter Your Full Name";
    document.getElementById("NameMsg").innerText = "";
  }
};
const nameInputOnchange = () => {
  const valid = nameInputValidation();
  isNameValidate = valid;
  nameInputShowMsg(valid);
  checkAllDataisValidate();
};

const checkAllDataisValidate = () => {
  if (
    isCVVValidate &&
    isCardNumberValidate &&
    isExpValidate &&
    isNameValidate
  ) {
    toggleActiveBtn(true);
    return true;
  } else {
    toggleActiveBtn(false);
    return false;
  }
};

const toggleActiveBtn = (isActive) => {
  const btn = document.getElementById("paybtn");

  if (isActive) {
    if (btn.classList.contains("deactive-btn")) {
      // If the element has "active" class, remove it and add "deactive" class
      // If the element does not have "active" class, add "active" class
      btn.classList.add("active-btn");
      btn.classList.remove("deactive-btn");
    }
  } else {
    if (btn.classList.contains("active-btn")) {
      // If the element has "active" class, remove it and add "deactive" class
      // If the element does not have "active" class, add "active" class
      btn.classList.remove("active-btn");
      btn.classList.add("deactive-btn");
    }
  }
};

const submitData = () => {
  if (isCVVValidate &&
    isCardNumberValidate &&
    isExpValidate &&
    isNameValidate) {
    const cardNumber = document.getElementById("cardNumberInput").value;
    const exp = document.getElementById("expInput").value;
    const cvv = document.getElementById("cvcInput").value;
    const name = document.getElementById("NameInput").value;
    const paymentData = {
      cardNumber: cardNumber,
      exp: exp,
      cvv: cvv,
      name: name,
    };

    localStorage.setItem("payment", JSON.stringify(paymentData));
    console.log("doneee")
    window.location.href = "confirm.html";
  } else {
    alert("please enter your payment details")
  }
};
