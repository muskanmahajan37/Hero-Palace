//Menu Buttons
let entylistbtn = document.getElementById('addNewEntryBtn');
let analyticsbtn = document.getElementById('analyticsBtn');
let manageproductsbtn = document.getElementById('manageProductBtn');
let manageadminbtn = document.getElementById('manageAdminBtn');
let manageemployeebtn = document.getElementById('manageEmployeeBtn');
let signoutbtn = document.getElementById('signOutBtn');
//menu button list ends here


//check user auth state
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //check if signed in user is Admin
    const useremail = user.email;
    const rootref = firebase.database().ref();
    const key = useremail.split("@");


    rootref.child('admin').orderByChild('email').equalTo(useremail).on('value', function(snap) {

      const data = snap.val();

      if (data) {

        let username = data[key[0]].username;

        document.getElementById('usernameLabel').innerHTML = username;

        analyticsbtn.style.display = 'block';

        manageproductsbtn.style.display = 'block';

        manageadminbtn.style.display = 'block';

        manageemployeebtn.style.display = 'block';


        manageproductsbtn.addEventListener('click', function() {
          window.location.href = "manageproducts.html";
        });

        manageemployeebtn.addEventListener('click', function() {
          window.location.href = "manageemployee.html"

        });

      }
    });

  } else {
    window.location.href = "index.html";
  }
});


//This portion of code fetches product list from database
let productprice = document.getElementById('productPriceField');
let modelselect = document.getElementById('modelSelector');
let colorselect = document.getElementById('colorlSelector');
let pricefield = document.getElementById('productPriceField');
//map holds the value of the products
let map = new Map();

const database = firebase.database();

database.ref('products/bikes/').once("value", function(data) {
  if (data) {
    let product = data.val();
    for(key in product){
        const model = product[key].model;
        const color  = product[key].color;
        const price = product[key].price;

        let productinfo = [model,color,price];

        map.set(model,productinfo);

        let option = document.createElement("option");
        option.value = model;
        option.innerHTML = model;
        modelselect.appendChild(option);
    }
  }
});

modelselect.addEventListener("change",function(){

  let len = colorselect.options.length;

  for(key in colorselect){
    colorselect.remove(key);
  }

  let selectedvalue = modelselect.value;
  let object = map.get(selectedvalue);
  let tmp = object[1];
  let colors = tmp.split(",");

  for(key in colors){
    let color = colors[key];

    let option = document.createElement("option");
    option.value = color;
    option.innerHTML = color;
    colorselect.appendChild(option);
  }
  productprice.value = object[2];

});

//END

//Menu button actions

signoutbtn.addEventListener('click', function(event) {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
    alert(error);
  });
});


//Menu buttons action functions ends here




//This portion of code automates the calculation needed
let downpayment = document.getElementById('productDownPaymentField');
let noofinstallment = document.getElementById('productNoOfInstallmentField');
let vat = document.getElementById('productVatField');
let sellingprice = document.getElementById('productSellingPriceField');
let monthlyrent = document.getElementById('productMonthlyRentField');
let servicecharge = document.getElementById('productServiceCharge');
let monthlyinstallment = document.getElementById('productMonthlyInstallmentField');
let totalprice = document.getElementById('totalPriceField');
let due = document.getElementById('dueField');


function solveAllField() {
  sellingprice.value = parseInt(productprice.value, 10) + parseInt(vat.value, 10);
  let downint = parseInt(downpayment.value, 10);
  let sellingint = parseInt(sellingprice.value, 10);
  let rent = ((sellingint - downint) * 2.0) / 100.0;
  monthlyrent.value = Math.round(rent);
  let montfloat = parseFloat(monthlyrent.value);
  let instint = parseInt(noofinstallment.value);
  servicecharge.value = Math.round(montfloat * instint);
  totalprice.value = parseInt(sellingprice.value, 10) + parseInt(servicecharge.value, 10);
  due.value = parseInt(totalprice.value, 10) - parseInt(downpayment.value, 10);
  monthlyinstallment.value = Math.round(parseInt(due.value, 10) / parseFloat(noofinstallment.value));
}

productprice.addEventListener("keyup", function() {
  if (vat && downpayment && noofinstallment) {
    solveAllField();
  }
});

vat.addEventListener("keyup", function() {
  if (productprice && downpayment && noofinstallment) {
    solveAllField();
  }
});

downpayment.addEventListener("keyup", function() {
  if (vat && productprice && noofinstallment) {
    solveAllField();
  }
});

noofinstallment.addEventListener("keyup", function() {
  if (vat && downpayment && productprice) {
    solveAllField();
  }
});

//Automated calculation portion  codes end here


//Form control codes starts here

//form Buttons
let addnewguarantorbtn = document.getElementById('addNewGuarantorBtn');
let deletguarantorbtn = document.getElementById('deleteGuaratorBtn');
let nextbutton = document.getElementById('nextBtn');
//form button ends here


//Form button actions
addnewguarantorbtn.addEventListener('click', function(event) {
  document.getElementById('gurantor2').style.display = 'block';
  addnewguarantorbtn.style.display = 'none';
});

deletguarantorbtn.addEventListener('click', function(event) {
  document.getElementById('gurantor2').style.display = 'none';
  addnewguarantorbtn.style.display = 'block';

});

nextbutton.addEventListener('click', function() {

  let entrydiv = document.getElementById('investDiv');
  let installmentdiv = document.getElementById('installmentDiv');
  entrydiv.style.display = "none";
  installmentdiv.style.display = "block";
});

//Form button actions end here




function addNewEntry(email) {

  //investment related fields variables
  let investno = document.getElementById('investNoField');
  let date = document.getElementById('dateField');

  // customer related fields variables
  let customer = {
    mobileno: document.getElementById('customerMobielNumberField').value,
    name: document.getElementById('customerNameField').value,
    mothername: document.getElementById('customerMotherNameField').value,
    fathername: document.getElementById('customerFatherNameField').value,
    address: document.getElementById('customerAddressField').value,
    postoffice: document.getElementById('customerPostofficeField').value,
    village: document.getElementById('customerVillageField').value,
    district: document.getElementById('customerDistrictField').value,
    upzilla: document.getElementById('customerUpzillaField').value
  };

  //product info realted field variables
  let product = {
    productselector: document.getElementById('productSelector').value,
    modelselector: document.getElementById('modelSelector').value,
    colorselector: document.getElementById('colorlSelector').value
  };

  //productprice related field information
  let productprice = {
    productprice: document.getElementById('productPriceField').value,
    downpayment: document.getElementById('productDownPaymentField').value,
    noofinstallment: document.getElementById('productNoOfInstallmentField').value,
    vat: document.getElementById('productVatField').value,
    sellingprice: document.getElementById('productSellingPriceField').value,
    monthlyrent: document.getElementById('productMonthlyRentField').value,
    servicecharge: document.getElementById('productServiceCharge').value,
    monthlyinstallment: document.getElementById('productMonthlyInstallmentField').value,
    totalprice: document.getElementById('totalPriceField').value,
    due: document.getElementById('dueField').value
  };

  //Gurantor related field information
  let guarantor = {
    mobileno: document.getElementById('guarantorMobileField').value,
    name: document.getElementById('guarantorNameField').value,
    mothername: document.getElementById('guarantorMotherNameField').value,
    fathername: document.getElementById('guarantorFatherNameField').value,
    address: document.getElementById('guarantorAddressField').value,
    postoffice: document.getElementById('guarantorPostofficeField').value,
    village: document.getElementById('guarantorVillageField').value,
    district: document.getElementById('customerDistrictField').value,
    upzilla: document.getElementById('guarantorUpzillaField').value
  };

  let entryinfo = {
    os: navigator.platform,
    dateandtime: Date(Date.now).toString(),
    employeeemail: email
  }

  alert(entryinfo.employeeemail);
}
