const dataObj = JSON.parse(localStorage.getItem("data"));

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

  const footerRow = document.createElement("tr");
  const footer1 = document.createElement("th");
  const footer2 = document.createElement("th");
  footer1.innerText = "Total Payment";
  footer2.innerText = "$" + tiketData.totalPrice;
  footerRow.appendChild(footer1);
  footerRow.appendChild(footer2);
  table.appendChild(footerRow);
};
