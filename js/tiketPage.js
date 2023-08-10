var isContinueBtnActive = false;

window.addEventListener("load", function () {
  const elementToScrollTo = document.getElementById("card");

  if (elementToScrollTo) {
    // Scroll to the element using smooth behavior
    elementToScrollTo.scrollIntoView({ behavior: "smooth" });
  }
});

const submitData = () => {
  if (isContinueBtnActive) {
    console.log(tiketSavinDataObj);
    const jsonString = JSON.stringify(tiketSavinDataObj);
    console.log("saving");
    localStorage.setItem("tiketData", jsonString);
    console.log(localStorage.getItem("tiketData"));
    window.location.href = "details.html";
  } else {
    alert("All feilds are requred!")
  }
};

const incrementSelectorBtn = (id, operator) => {
  const adultCount = document.getElementById(id);
  if (operator == "+") {
    adultCount.innerHTML = parseInt(adultCount.innerHTML) + 1;
  }
  if (operator == "-") {
    if (parseInt(adultCount.innerHTML) > 0) {
      adultCount.innerHTML = parseInt(adultCount.innerHTML) - 1;
    } else {
      
    }
  }

  processTableData();
};

const toggleActiveBtn = (id, isActive) => {
  const btn = document.getElementById(id);

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
const checkActiveBtn = () => {
  const totalpaymentCell =
    document.getElementById("totalpaymentCell").innerText;
  const totalpayment = parseInt(totalpaymentCell.replace("$", ""));

  if (!document.getElementById("input-date").value) {
    console.log("date is not selected");
    isContinueBtnActive = false;
    toggleActiveBtn("continue-btn", false);
  } else if (
    document.getElementById("from-time-option-comp").value == 0 ||
    document.getElementById("to-time-option-comp").value == 0
  ) {
    isContinueBtnActive = false;
    toggleActiveBtn("continue-btn", false);
    console.log("time is not selected");
  } else if (totalpayment == 0) {
    isContinueBtnActive = false;
    toggleActiveBtn("continue-btn", false);
  } else {
    isContinueBtnActive = true;
    toggleActiveBtn("continue-btn", true);
  }
};

const selectDate = () => {
  const tableDate = document.getElementById("tableDate");
  const inputDate = document.getElementById("input-date");

  tableDate.innerText = inputDate.value;
  isDateselected = true;
};

const selectTime = () => {
  const fromTimeElement = document.getElementById("from-time-option-comp");
  const toTimeElement = document.getElementById("to-time-option-comp");

  const fromTimeID = parseInt(
    fromTimeElement.value.replace("time_slot_from_", "")
  );
  const toTimeID = parseInt(toTimeElement.value.replace("time_slot_to_", ""));

  const fromSelectedID = fromTimeElement.selectedIndex;
  const toSelectedID = toTimeElement.selectedIndex;

  if (fromSelectedID > 0 && toSelectedID > 0) {
    if (fromSelectedID > toSelectedID) {
      //from time grater than to time
      alert("from time > to time ");
      isTimeSelected = false;
    } else {
      // add time to table row
      const fromTime = fromTimeElement.options[fromSelectedID].innerText;
      const toTime = toTimeElement.options[toSelectedID].innerText;
      fromTimeGlobal = fromTime;
      toTimeGlobal = toTime;
      const tableTime = document.getElementById("tableTime");
      tableTime.innerText = "From " + fromTime + " To " + toTime;

      // add time duration to table
      var fromTimeObj = timeSlots[0];
      var toTimeObj = timeSlots[0];

      timeSlots.map((item) => {
        if (item.id == parseInt(fromTimeID)) {
          fromTimeObj = item;
        }
        if (item.id == parseInt(toTimeID)) {
          toTimeObj = item;
        }
      });

      //calculate duration
      var duration = 0;
      if (fromTimeObj != null && toTimeObj != null) {
        var fromTime24 = parseInt(fromTimeObj.from);
        fromTime24 += fromTimeObj.isFromAm ? 0 : fromTime24 != 12 ? 12 : 0;

        var toTime24 = parseInt(toTimeObj.to);
        toTime24 += toTimeObj.isFromAm ? 0 : toTime24 != 12 ? 12 : 0;

        duration = toTime24 - fromTime24;

        //calculate peak time slots and normal time slots
        var peakTimeSlotCount = 0;
        var normalTimeSlotCount = 0;

        timeSlots.map((item) => {
          var fromIemTime24 = parseInt(item.from);
          fromIemTime24 += item.isFromAm ? 0 : fromIemTime24 != 12 ? 12 : 0;

          var toIemTime24 = parseInt(item.to);
          toIemTime24 += item.isFromAm ? 0 : toIemTime24 != 12 ? 12 : 0;

          if (fromIemTime24 >= fromTime24) {
            if (toIemTime24 <= toTime24) {
              console.log(fromIemTime24 + " :" + toIemTime24);
              selectedTimeSlots.push(item);

              if (item.isPeekTime) {
                peakTimeSlotCount += 1;
              } else {
                normalTimeSlotCount += 1;
              }
            }
          }
        });
        isTimeSelected = true;
        peakTimeSlotCountGlobal = peakTimeSlotCount;
        normalTimeSlotCountGlobal = normalTimeSlotCount;

        document.getElementById("tableTimeDuration").innerText =
          toTime24 -
          fromTime24 +
          " hrs (" +
          normalTimeSlotCount +
          " Normal : " +
          peakTimeSlotCount +
          " Peak)";
      }
    }
  }
  processTableData();
};

const processTableData = () => {
  const tableBody = document.getElementById("tableBody");
  const geustesCount = [];
  guest.map((item) => {
    const countObj = {};
    const id = item.id;
    const title = item.title;
    const price = item.price;
    const peekPrice = item.peekPrice;

    const count = parseInt(document.getElementById(`${title + id}`).innerText);

    countObj.id = id;
    countObj.title = title;
    countObj.price = price;
    countObj.peekPrice = peekPrice;
    countObj.count = count;

    geustesCount.push(countObj);
  });

  var totalPayment = 0;
  console.log(geustesCount);
  isGurstSelected = geustesCount.length > 0;
  geustesCount.map((item) => {
    const normalPrice = item.price * normalTimeSlotCountGlobal;
    const peekPrice = item.peekPrice * peakTimeSlotCountGlobal;

    console.log("_______________" + item.title + "___________________________");
    console.log("__________________________________________");

    const payment = (normalPrice + peekPrice) * parseInt(item.count);
    totalPayment += payment;
    console.log("payment" + payment);
    const tr = document.getElementById(`${"table_body_" + item.id}`);

    while (tr.firstChild) {
      tr.removeChild(tr.firstChild);
    }

    const tdt = document.createElement("td");
    tdt.innerText = " ( " + item.count + "x ) " + item.title;

    const tdb = document.createElement("td");
    item.price == 0
      ? (tdb.innerText = "free")
      : (tdb.innerText = "$" + payment);

    tr.appendChild(tdt);
    tr.appendChild(tdb);
    tableBody.appendChild(tr);
  });

  const tr = document.getElementById("totalPaymentRow");
  while (tr.firstChild) {
    tr.removeChild(tr.firstChild);
  }
  const tht = document.createElement("th");
  const thb = document.createElement("th");
  thb.id = "totalpaymentCell";
  tht.innerText = "Total payment";
  thb.innerText = "$" + totalPayment;
  console.log(totalPayment);
  tr.appendChild(tht);
  tr.appendChild(thb);
  tableBody.appendChild(tr);

  tiketSavinDataObj.date = document.getElementById("input-date").value;
  tiketSavinDataObj.tikets = geustesCount;
  tiketSavinDataObj.totalPrice = totalPayment;
  tiketSavinDataObj.from = fromTimeGlobal;
  tiketSavinDataObj.to = toTimeGlobal;
  tiketSavinDataObj.peekCount = peakTimeSlotCountGlobal;
  tiketSavinDataObj.normalCount = normalTimeSlotCountGlobal;
};

const loadComponents = () => {
  initLoadGuests();
  initDurations();
  initTableGuests();
  setInterval(checkActiveBtn, 1000);
};

const initDurations = () => {
  const toSelect = document.getElementById("to-time-option-comp");
  const fromSelect = document.getElementById("from-time-option-comp");

  timeSlots.map((item) => {
    var formContent = "";
    formContent += item.from;
    formContent += item.isFromAm ? " Am " : " Pm ";

    var toContent = "";
    toContent += item.to;
    toContent += item.istoAm ? " Am " : " Pm";

    const optionElementFrom = document.createElement("option");
    optionElementFrom.value = "time_slot_from_" + item.id;
    optionElementFrom.textContent = formContent;

    const optionElementTo = document.createElement("option");
    optionElementTo.value = "time_slot_to_" + item.id;
    optionElementTo.textContent = toContent;

    fromSelect.appendChild(optionElementFrom);
    toSelect.appendChild(optionElementTo);
  });
};

const initLoadGuests = () => {
  guest.map((item) => {
    const id = item.id;
    const title = item.title;
    const subtitle = item.subtitle;

    // Create the main container div for each component
    const incrementSelectorDiv = document.createElement("div");
    incrementSelectorDiv.className = "increment-selector";

    // Create the div for the title and subtitle
    const titleSubtitleDiv = document.createElement("div");
    titleSubtitleDiv.className = "increment-selector-title";

    const titleSpan = document.createElement("span");
    titleSpan.textContent = title;

    const subtitleSpan = document.createElement("span");
    subtitleSpan.className = "sub-title";
    subtitleSpan.textContent = subtitle;

    titleSubtitleDiv.appendChild(titleSpan);
    titleSubtitleDiv.appendChild(subtitleSpan);

    // Create the div for buttons and count
    const btnRowDiv = document.createElement("div");
    btnRowDiv.className = "increment-selector-btn-row";

    const minusBtnDiv = document.createElement("div");
    minusBtnDiv.className = "increment-selector-btn";
    minusBtnDiv.textContent = "-";
    minusBtnDiv.setAttribute(
      "onclick",
      `incrementSelectorBtn('${title + id}', '-')`
    );

    const countDiv = document.createElement("div");
    countDiv.id = `${title + id}`;
    countDiv.textContent = "0"; // You can set the initial count value here

    const plusBtnDiv = document.createElement("div");
    plusBtnDiv.className = "increment-selector-btn";
    plusBtnDiv.textContent = "+";
    plusBtnDiv.setAttribute(
      "onclick",
      `incrementSelectorBtn('${title + id}', '+')`
    );

    btnRowDiv.appendChild(minusBtnDiv);
    btnRowDiv.appendChild(countDiv);
    btnRowDiv.appendChild(plusBtnDiv);

    // Append the titleSubtitleDiv and btnRowDiv to the main container div
    incrementSelectorDiv.appendChild(titleSubtitleDiv);
    incrementSelectorDiv.appendChild(btnRowDiv);

    // Add the main container div to the increment-selector-card element
    const incrementSelectorCard = document.getElementById(
      "increment-selector-card"
    );
    incrementSelectorCard.appendChild(incrementSelectorDiv);
  });
};

const initTableGuests = () => {
  const tableBody = document.getElementById("tableBody");

  guest.map((item) => {
    const id = item.id;
    const title = item.title;

    // <tr id="table_body_1">
    //   <td >2 SL Adult</td>
    //   <td>$28</td>
    // </tr>;

    const tr = document.createElement("tr");
    tr.id = `${"table_body_" + item.id}`;

    const tdt = document.createElement("td");
    tdt.innerText = " ( 0x ) " + title;

    const tdb = document.createElement("td");
    item.price == 0 ? (tdb.innerText = "free") : (tdb.innerText = "$0");

    tr.appendChild(tdt);
    tr.appendChild(tdb);
    tableBody.appendChild(tr);
  });

  // <tr>
  //   <th>Total Payable </th>
  //   <th>$118</th>
  // </tr>;

  const tr = document.createElement("tr");
  const tht = document.createElement("th");
  const thb = document.createElement("th");
  thb.id = "totalpaymentCell";
  tr.id = "totalPaymentRow";

  tht.innerText = "Total payment";
  thb.innerText = "$0";

  tr.appendChild(tht);
  tr.appendChild(thb);

  tableBody.appendChild(tr);
};
