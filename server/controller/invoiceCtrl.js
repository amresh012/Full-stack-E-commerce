// Example usage:

const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];
const teens = [
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function convertToWords(num) {
  if (num === 0) {
    return "Zero";
  }

  function convertChunk(number) {
    let result = "";

    if (number >= 100) {
      result += ones[Math.floor(number / 100)] + " Hundred ";
      number %= 100;
    }

    if (number >= 11 && number <= 19) {
      result += teens[number - 11] + " ";
    } else if (number >= 20 || number === 10) {
      result += tens[Math.floor(number / 10)] + " ";
      number %= 10;
    }

    if (number >= 1 && number <= 9) {
      result += ones[number] + " ";
    }

    return result;
  }

  let result = "";
  let chunkCount = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      result =
        convertChunk(chunk) +
        ["", "Thousand", "Million", "Billion"][chunkCount] +
        " " +
        result;
    }
    num = Math.floor(num / 1000);
    chunkCount++;
  }

  return result.trim();
}

const createInvoice = ({
  totalPrice,
  invoiceno,
  userName,
  userAdress,
  productDetails,
  isCoupon,
  placeofsup,
  gstNo,
}) => {
  const companyName = "Deepnap Softech tech";
  const compayAdderss =
    "A-91, SECOND FLOOR,DERAWAL NAGAR.DELHI, NEW DELHI-110009";
  const conatactNumbers = "8882758900, 7827730205";
  const contactEmail = "shreenathjisai@gmail.com";
  const placeOfSupply = "Delhi(09)";
  const bankName = `BANK NAME:- YES BANK BRANCH:- B7 &amp; B8 Gujranwala Town New
Delhi 110009 Account No:- 008363400002351 IFSC Code:-
YESB0000083`;
  const date = new Date();
  const invoiceDate = JSON.stringify(date).split("T")[0].split('"')[1];
  const products = productDetails
    .map((pro, i) => {
      return `<tr>
          <td>${i + 1}</td>
          <td>${pro.name}</td>
          <td> ${pro.hsn || "-"}</td>
          <td>${pro.count}</td>
          <td>${pro.unit}</td>
          <td> ${pro.total / pro.count}</td>
          <td>${pro.total} ₹</td>
        </tr>`;
    })
    .join("");
  const totalQty = "6";
  const alphabeticalPrice = convertToWords(parseInt(totalPrice));
  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>E-proccure Invoice</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;1,400&family=Roboto+Slab&family=Rubik&display=swap");
      body {
        font-family: "Poppins", sans-serif;
        font-family: "Roboto Slab", serif;
        box-sizing: border-box;
        font-family: "Rubik", sans-serif;
      }
      .mainContainer {
        border: 1px solid black;
        /* width: 100%; */
      }
      .nameContainer {
        border-bottom: 1px solid black;
        display: flex;
        flex-direction: column !important;
        padding: 8px;
      }
      .gst {
        width: 100%;
        display: flex;
        justify-content: space-between !important;
      }
      .gst h5 {
        margin: 0;
      }
      .w-full {
        width: 100%;
      }
      .flex {
        display: flex;
      }
      .jsustify-center {
        justify-content: center;
      }
      .jsustify-between {
        justify-content: space-between;
      }
      .flex-col {
        flex-direction: column;
      }
      .m-0 {
        margin: 0;
      }
      .underline {
        text-decoration: underline;
      }
      .border {
        border: 1px solid black;
      }
      .textc {
        text-align: center;
      }
      .pt-3 {
        padding-top: 10px !important;
      }
      .text-center {
        width: 100%;
        text-align: center;
        margin: 1px;
      }
      .pb {
        padding-bottom: 4px;
      }
      .border-b {
        border-bottom: 1px solid black;
      }
      .border-l {
        border-left: 1px solid black;
      }
      .border-r {
        border-right: 1px solid black;
      }
      .w-50 {
        width: 50%;
      }
      /* @media (min-width: 768px) {
        .w-50 {
          width: 50%;
        }
      } */
      .pb-4 {
        padding: 10px;
        box-sizing: border-box;
      }
      .mb-4 {
        margin-bottom: 40px;
      }
      h5 span {
        color: rgba(43, 41, 41, 0.836);
      }
      .no {
        text-wrap: nowrap;
      }
      .bill strong {
        display: block;
        margin: 4px 0px;
      }
      .mainContainer table {
        width: 100%;
        border-bottom: none !important;
      }
      .mainContainer table,
      th,
      td {
        border: 1px solid black;
        text-align: center;
        border-collapse: collapse;
        padding: 8px;
      }

      .mainContainer tfoot tr td,
      tfoot tr {
        border: none;
      }
      .text-end{
        width: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        text-align: end;
      }
      .pb-10 {
        padding: 10px 40px 4px 40px;
        box-sizing: border-box;
      }
      .pb-9 {
        padding: 4px 40px 10px 40px;
        box-sizing: border-box;
      }
      .pt-2{
        padding-top:4px;
        padding-left:10px;
      }
    </style>
  </head>
  <body>
    <div class="mainContainer">
      <div class="nameContainer flex-col">
        <div class="gst w-full">
          <p>GSTIN : <strong>07AERFS7014R1Z4</strong></p>
          <p>Original copy</p>
        </div>
        <h4 class="m-0 underline pt-3 textc w-full pb h4">TAX INVOICE</h4>
        <h2 class="textc w-full m-0 h2">${companyName}</h2>
        <p class="text-center p">
         ${compayAdderss}
        </p>
        <p class="text-center m-0">Tel. :${conatactNumbers} email : ${contactEmail}</p>
      </div>
      <div class="dateCont border-b flex">
        <div class="w-50 border-r pb-4">
          <p class="m-0 pb no p"><span>Invoice No</span> : ${invoiceno}</p>
          <p class="m-0 no p"><span>Dated</span> : ${invoiceDate}</p>
        </div>
        <div class="w-50 border-l pb-4">
          <p class="m-0 pb no p">
            <span>Place of Supply </span> : ${placeofsup}
          </p>
          <p class="m-0 no p"><span>Revese Charges No</span> : N</p>
        </div>
      </div>
      <div class="shipp border-b flex mb-4">
        <div class="w-50 border-r pb-4">
          <p class="m-0 pb bill p">
            <span>Billed to</span> :
            <strong>
             ${userName}
             <br>
             ${userAdress}
            </strong>
          </p>
          ${
            gstNo
              ? `<h4 class="m-0 pb bill h3 text-sm">
            <span>GST NO.</span> :
             ${gstNo}
          </h4>`
              : ""
          }
        </div>
        <div class="w-50 border-l pb-4">
          <p class="m-0 pb bill p">
            <span>Shipped to</span> :
            <strong>
            ${userName}
             <br>
             ${userAdress}
            </strong>
          </p>
          ${
            gstNo
              ? `<h4 class="m-0 pb bill h3 text-sm">
            <span>GST NO.</span> :
             ${gstNo}
          </h4>`
              : ""
          }
        </div>
      </div>
      <div class="">
        <table>
          <tr class="border-b">
            <th>S.N.</th>
            <th>Description of Goods</th>
            <th>HSN/SAC Code</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Price</th>
            <th>Amount (₹)</th>
          </tr>
          ${products}
        </table>
        ${
          isCoupon
            ? `<h4 class="text-end pb-10 m-0 p"><span>Coupon Discount <span>(&nbsp;${isCoupon?.code}&nbsp;)</span> :</span > &nbsp;- ${isCoupon?.discountrs} ₹</h4>`
            : ""
        }
        <h4 class="text-end pb-9 m-0 p"><span>Total :</span> &nbsp; ${totalPrice} ₹</h4>
        <p class="text-end border-b pt-2 m-0 ">${alphabeticalPrice} Rupees only :-</p>
        <p class="border-b pb-4 m-0 p"><span>Bank Details :</span> &nbsp; ${bankName}</p>
            <div class="shipp border-b flex">
                <div class="w-50 border-r pb-4">
                  <p class="m-0 pb bill p">
                    <span class="underline pb-1">Terms & Conditions</span> :
                    <strong>
                        E.& O.E.
                        1. Goods once sold will not be taken back.
                        <br>
                        2. Interest @ 18% p.a. will be charged if the payment
                        <br>
                        is not made with in the stipulated time.
                        <br>
                        3. Subject to 'Delhi' Jurisdiction only.
                    </strong>
                  </p>
                </div>
                <div class="w-50 border-l">
                    <p class="border-b pb-4 m-0">
                        <span>Receiver's Signature</span> :

                    </p>
                  <h3 class="text-end m-0 pb-4">For ${companyName}</h3>
                  <p class="text-end m-0 pb-4">Authorised Signatory</p>
                </div>
              </div>

      </div>
    </div>
  </body>
</html>
`;
  return htmlContent;
};
module.exports = createInvoice;
