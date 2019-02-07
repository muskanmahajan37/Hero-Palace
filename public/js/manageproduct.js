//Check if user signed in
const backtohomepagebtn = document.getElementById('backToHomepageBtn');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    backtohomepagebtn.addEventListener('click', function() {
      window.location.href = "home.html";

    });

  } else {
    window.location.href = "index.html";
  }
});

let map = new Map();
const database = firebase.database();

let prouductlistbtn = document.getElementById('productlistBtn');
let addproductbtn = document.getElementById('addproductBtn');

let productlistdiv = document.getElementById('productlistDiv');
let addproudctdiv = document.getElementById('addproudctDiv');
let submitproductbtn = document.getElementById('submitproductBtn');
let gotoproductlist = document.getElementById('gotoproductlist');

let overitewarningdiv = document.getElementById('overiteWarningDiv');
let successdiv = document.getElementById('addedProductSuccessDiv');
let addaontherbtn = document.getElementById('addanotherBtn');


let updatediv = document.getElementById('editproductDiv');
let availdiv = document.getElementById('productlistDiv');
let updatemodelfield = document.getElementById('bikemodelEditField');
let updatecolorfield = document.getElementById('bikecolorEditField');
let updatepricefield = document.getElementById('bikepriceEditField');
let updateproductbtn = document.getElementById('updateProductBtn');

let producttablebody = document.getElementById('producttableBody');





database.ref('products/bikes/').once("value", function(data) {
  if (data) {
    let product = data.val();
    for (key in product) {
      const model = product[key].model;
      const color = product[key].color;
      const price = product[key].price;

      let ob = [model,color,price];

      map.set(model,ob);

      let tablerow = document.createElement('tr');
      let tableelement1 = document.createElement('td');
      let tableelement2 = document.createElement('td');
      let tableelement3 = document.createElement('td');

      tableelement3.setAttribute("class", "text-center");

      let editbutton = document.createElement("button");
      let editicon = document.createElement("i");
      editbutton.setAttribute("class", "mx-3 btn btncolor");
      editicon.setAttribute("class", "fas fa-edit");

      editbutton.setAttribute("onclick", "editbuttonClick(this)");
      editbutton.appendChild(editicon);

      let delbutton = document.createElement("button");
      let delicon = document.createElement("i");
      delbutton.setAttribute("class", "mx-3 btn btn-danger");
      delicon.setAttribute("class", "fas fa-trash");
      delbutton.setAttribute("onclick", "delbuttonClick(this)");
      delbutton.appendChild(delicon);

      tableelement1.appendChild(document.createTextNode(model));
      tableelement2.appendChild(document.createTextNode(color));
      tableelement3.appendChild(document.createTextNode(price));
      tableelement3.appendChild(editbutton);
      tableelement3.appendChild(delbutton);

      tablerow.appendChild(tableelement1);
      tablerow.appendChild(tableelement2);
      tablerow.appendChild(tableelement3);
      tablerow.setAttribute("id", model);

      producttablebody.appendChild(tablerow);


    }
  }
});

let modelid;

function editbuttonClick(child) {
  availdiv.style.display = "none";
  updatediv.style.display = "block";

  let modelname = child.parentNode.parentNode.id;
  let modelinfo = map.get(modelname);
  modelid = modelinfo[0];
  updatemodelfield.value = modelinfo[0];
  updatecolorfield.value = modelinfo[1];
  updatepricefield.value = modelinfo[2];
}


function delbuttonClick(child) {
  let res = confirm("Are you Sure?");
  if (res) {

    let parent = child.parentNode.parentNode;
    parent.parentNode.removeChild(parent);

    let path = "products/bikes/" + parent.id;
    database.ref(path).remove();
  }
}


updateproductbtn.addEventListener('click',function(){

  let product = {
    model: updatemodelfield.value.trim(),
    price: updatepricefield.value.trim(),
    color: updatecolorfield.value.trim()
  };

  if (product.model && product.price && product.color) {

    event.preventDefault();

    const childref = 'products/bikes/' +modelid;

    database.ref(childref).update(product, function(error){

        if(error)
          alert(error);
        else{

          successdiv.style.display = 'block';
          updatediv.style.display = 'none';

        }
    });

  }

});


prouductlistbtn.addEventListener('click', function() {
  successdiv.style.display = 'none';
  productlistdiv.style.display = 'block';
  addproudctdiv.style.display = 'none';
  overitewarningdiv.style.display = 'none';
  updatediv.style.display = "none";

});


addproductbtn.addEventListener('click', function() {

  productlistdiv.style.display = 'none';
  addproudctdiv.style.display = 'block';
  overitewarningdiv.style.display = 'none';
  updatediv.style.display = "none";



});

gotoproductlist.addEventListener('click', function() {
  overitewarningdiv.style.display = 'none';
  productlistdiv.style.display = 'block';
  updatediv.style.display = "none";

});


submitproductBtn.addEventListener('click', function(event) {

  let database = firebase.database();

  let product = {
    model: document.getElementById('bikemodelField').value.trim(),
    price: document.getElementById('bikepriceField').value.trim(),
    color: document.getElementById('bikecolorField').value.trim()
  };


  if (product.model && product.price && product.color) {

    event.preventDefault();

    const childref = 'products/bikes/' + product.model;

    const checkrefexist = database.ref().child(childref);

    checkrefexist.once('value', function(snapshot) {

      if (snapshot.exists()) {

        overitewarningdiv.style.display = 'block';
        addproudctdiv.style.display = 'none';
        successdiv.style.display = 'none';

      } else {

        database.ref(childref).set(product, function(error) {
          if (error) {
            alert("Failed to submit product\n" + "error:" + error);
          } else {

            document.getElementById('bikeform').reset();

            addproudctdiv.style.display = 'none';
            successdiv.style.display = 'block';

            addanotherBtn.addEventListener('click', function() {
              successdiv.style.display = 'none';
              addproudctdiv.style.display = 'block';
            });
          }
        });
      }
    });
  }

});
