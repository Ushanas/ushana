const dataObj = JSON.parse(localStorage.getItem("tiketData"));
var emailIsValidate = false;
var mobileIsValidate = false;
var nameIsValidate = false;

const init = () => {
  //check here data is available
  console.log(dataObj);
  if (dataObj != undefined) {
    initComponents();
  } else {
    console.log("rederecting...");
    window.location.href = "error.html";
    //Todo rederect oops something went wrong page
  }
};
const initComponents = () => {
  //load table

  const table = document.getElementById("tableBody");

  //making date
  const dateRow = document.getElementById("tableDate");
  dateRow.innerText = dataObj.date;

  const timeRow = document.getElementById("tableTime");
  const from = dataObj.from;
  const to = dataObj.to;
  timeRow.innerText = "From " + from + " To " + to;

  const durationRow = document.getElementById("tableTimeDuration");
  const peekCount = dataObj.peekCount;
  const normalCount = dataObj.normalCount;
  const totalduration = peekCount + normalCount;
  durationRow.innerText =
    totalduration +
    " hrs (" +
    normalCount +
    " Normal : " +
    peekCount +
    " peek)";

  const titleRow = document.createElement("tr");
  const title1 = document.createElement("th");
  const title2 = document.createElement("th");
  title1.innerText = "Tickets";
  title2.innerText = "Charges";
  titleRow.appendChild(title1);
  titleRow.appendChild(title2);
  table.appendChild(titleRow);

  dataObj.tikets.map((item) => {
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

  const footerRow = document.createElement("tr");
  const footer1 = document.createElement("th");
  const footer2 = document.createElement("th");
  footer1.innerText = "Total Payment";
  footer2.innerText = "$" + dataObj.totalPrice;
  footerRow.appendChild(footer1);
  footerRow.appendChild(footer2);
  table.appendChild(footerRow);
};

const toggleActiveBtn = (isActive) => {
  const btn = document.getElementById("continueBtn");

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

//fullNameValidation
const fullNameValidate = () => {
  const fullname = document.getElementById("fullNameInput").value;
  if (fullname.length < 5) {
    nameIsValidate = false;
    return {
      type: false,
      msg: "full name must to be than 5 letters!",
    };
  } else {
    nameIsValidate = true;
    return {
      type: true,
      msg: "Great !",
    };
  }
};
const fullNameShowMessage = (type, msg) => {
  if (type) {
    document.getElementById("fullNameMsg").innerText = msg;
    document.getElementById("fullNameError").innerText = "";
  } else {
    document.getElementById("fullNameError").innerText = error;
    document.getElementById("fullNameMsg").innerText = "";
  }
};
const fullNameOnchange = () => {
  const msg = fullNameValidate();
  fullNameShowMessage(msg.type, msg.msg);
  checkFormIsValidate();
};

//phonevalidation
const phoneValidate = () => {
  mobileIsValidate = phoneInput.isValidNumber();
  return mobileIsValidate;
};
const phoneShowMessage = (type) => {
  if (type) {
    document.getElementById("phoneMsg").innerHTML = "Great!";
    document.getElementById("phoneError").innerHTML = "";
  } else {
    document.getElementById("phoneError").innerHTML = "Invalid Phone Number";
    document.getElementById("phoneMsg").innerHTML = "";
  }
};
const phoneOnChange = () => {
  const isValidate = phoneValidate();
  console.log(isValidate);
  phoneShowMessage(isValidate);
  checkFormIsValidate();
};

//emailvalidation
const emailValidate = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = document.getElementById("inputEmail").value;
  const reemail = document.getElementById("retypeEmail").value;

  if (emailRegex.test(email)) {
    console.log(email + ":" + reemail);
    if (email == reemail) {
      emailIsValidate = true;
      return {
        type: true,
        msg: "grate",
        show: 2,
      };
    } else {
      emailIsValidate = false;
      return {
        type: false,
        msg: "Email and Retype Email is not same!",
        show: 2,
      };
    }
  } else {
    // invalid email
    emailIsValidate = false;
    return {
      type: false,
      msg: "Invalid email",
      show: 0,
    };
  }
};
const emailShowMessage = (type, msg, show) => {
  if (type) {
    document.getElementById("RemailMsg").innerHTML = "Great!";
    document.getElementById("emailMsg").innerHTML = "Great!";

    document.getElementById("emailError").innerHTML = "";
    document.getElementById("RemailError").innerHTML = "";
  } else {
    document.getElementById("RemailMsg").innerHTML = "";
    document.getElementById("emailMsg").innerHTML = "";

    if (show == 0) {
      document.getElementById("emailError").innerHTML = msg;
    } else if (show == 1) {
      document.getElementById("RemailError").innerHTML = msg;
    } else {
      document.getElementById("emailError").innerHTML = msg;
      document.getElementById("RemailError").innerHTML = msg;
    }
  }
};
const emailOnchange = () => {
  const msg = emailValidate();
  emailShowMessage(msg.type, msg.msg, msg.show);
  checkFormIsValidate();
};

function getSelectedGender() {
    const genderInputs = document.getElementsByName("genderInput");
    let selectedGenderValue;
  
    for (const input of genderInputs) {
      if (input.checked) {
        selectedGenderValue = input.value;
        break;
      }
    }
  
    return selectedGenderValue;
  }

const checkFormIsValidate = () => {
  if (emailIsValidate && mobileIsValidate && nameIsValidate) {
    toggleActiveBtn(true);
  } else {
    toggleActiveBtn(false);
  }
};

const purchase = () => {
  if (emailIsValidate && mobileIsValidate && nameIsValidate) {
    const fullname = document.getElementById("fullNameInput").value;
    const email = document.getElementById("inputEmail").value;
    const mobile = phoneInput.getNumber();
    const tiketData = dataObj;
    const gender = getSelectedGender();
    const obj = {
        name:fullname,
        email:email,
        mobile:mobile,
        tiketData:tiketData,
        gender :gender,
    }

    localStorage.setItem("data",JSON.stringify(obj));
    window.location.href = "payment.html";


  } else {
    alert("all feilds are requred!")
  }
};
