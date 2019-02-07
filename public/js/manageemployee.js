//Checek if user logged in and admin
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //check if signed in user is Admin
    const useremail = user.email;
    const rootref = firebase.database().ref();

    rootref.child('admin').orderByChild('email').equalTo(useremail).on('value', function(snap) {

      const data = snap.val();

      if (data) {

      } else {
        window.location.href = "home.html";
      }
    });

  } else {
    window.location.href = "index.html";
  }
});


let employeeSignUpbtn = document.getElementById('employeeSignUpBtn');
let employeelistbtn = document.getElementById('employeeListBtn');
let backtohomepagebtn = document.getElementById('backToHomepageBtn');

let employeesignupdiv = document.getElementById('employeeSignUpDiv');
let employeelistdiv = document.getElementById('employeeListDiv');
let employeesignupsuccessdiv = document.getElementById('employeeSignUpSuccessDiv');

backToHomepageBtn.addEventListener('click',function(){

  window.location.href = "home.html";

});

employeelistbtn.addEventListener('click', function() {

  employeelistdiv.style.display = 'block';
  employeesignupdiv.style.display = 'none';

});


employeeSignUpbtn.addEventListener('click', function() {

  employeelistdiv.style.display = 'none';
  employeesignupdiv.style.display = 'block';

});


let signupbtn = document.getElementById('signUpBtn');
let signupanother = document.getElementById('addanotheremployeeBtn');

signupbtn.addEventListener('click', function(event) {



  let tmp = document.getElementById('sexOption');
  let tmp2 = tmp.options[tmp.selectedIndex].text;

  let employee = {
    name: document.getElementById('fullNameField').value,
    password: document.getElementById('passwordField').value,
    email: document.getElementById('emailField').value,
    mobilenumber: document.getElementById('mobileNumberField').value,
    post: document.getElementById('postField').value,
    address: document.getElementById('addressField').value,
    sex: tmp2
  };

  event.preventDefault();

  const auth = firebase.auth();
  const rootref = firebase.database();


  auth.createUserWithEmailAndPassword(employee.email, employee.password).catch(function(error) {
    if(error){
      alert(error.code + "\n" + error.message);
    }
    else{

    }});

    rootref.ref('employee').push(employee, function(error) {

      if (error) {
        alert("Failed to signup!\n" + "error:" + error);
      } else {


        employeesignupdiv.style.display = 'none';
        employeesignupsuccessdiv.style.display = 'block';

        signupanother.addEventListener('click', function() {

          employeesignupdiv.style.display = 'block';
          employeesignupsuccessdiv.style.display = 'none';
        });
      }

    });


});
