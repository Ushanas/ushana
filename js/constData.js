const guest = [
  {
    id: 1,
    title: "SL Adult",
    subtitle: "above 15 yrs",
    price: 4,
    peekPrice: 6,
  },
  {
    id: 2,
    title: "SL Child",
    subtitle: "5 to 14 yrs",
    price: 2,
    peekPrice: 3,
  },
  {
    id: 3,
    title: "Foreigner Adult",
    subtitle: "above 15 yrs",
    price: 10,
    peekPrice: 13,
  },
  {
    id: 4,
    title: "Foreigner Child",
    subtitle: "5 to 14 yrs",
    price: 5,
    peekPrice: 8,
  },
  {
    id: 5,
    title: "infant",
    subtitle: "under 4 yrs",
    price: 0,
    peekPrice: 0,
  },
];

const timeSlots = [
  {
    id: 1,
    from: "7.00",
    isFromAm: true,
    to: "8.00",
    istoAm: true,
    isPeekTime: false,
  },
  {
    id: 2,
    from: "8.00",
    isFromAm: true,
    to: "9.00",
    istoAm: true,
    isPeekTime: false,
  },
  {
    id: 3,
    from: "9.00",
    isFromAm: true,
    to: "10.00",
    istoAm: true,
    isPeekTime: false,
  },

  {
    id: 4,
    from: "10.00",
    isFromAm: true,
    to: "11.00",
    istoAm: true,
    isPeekTime: true,
  },
  {
    id: 5,
    from: "11.00",
    isFromAm: true,
    to: "12.00",
    istoAm: false,
    isPeekTime: true,
  },
  {
    id: 6,
    from: "12.00",
    isFromAm: false,
    to: "1.00",
    istoAm: false,
    isPeekTime: true,
  },
  {
    id: 7,
    from: "1.00",
    isFromAm: false,
    to: "2.00",
    istoAm: false,
    isPeekTime: false,
  },
  {
    id: 8,
    from: "2.00",
    isFromAm: false,
    to: "3.00",
    istoAm: false,
    isPeekTime: false,
  },
  {
    id: 9,
    from: "3.00",
    isFromAm: false,
    to: "4.00",
    istoAm: false,
    isPeekTime: true,
  },
  {
    id: 10,
    from: "4.00",
    isFromAm: false,
    to: "5.00",
    istoAm: false,
    isPeekTime: true,
  },
  {
    id: 11,
    from: "5.00",
    isFromAm: false,
    to: "6.00",
    istoAm: false,
    isPeekTime: true,
  },
];
const selectedTimeSlots = [];
const tiketSavinDataObj = {
  date : "",
  from : "",
  to   : "",
  fromId :0,
  toId : 0,
  peekCount:0,
  normalCount:0,
  tikets:[],
  totalPrice :0,
  timeSlots:[]

};

var peakTimeSlotCountGlobal = 0;
var normalTimeSlotCountGlobal = 0;
var fromTimeGlobal = "";
var toTimeGlobal = "";
