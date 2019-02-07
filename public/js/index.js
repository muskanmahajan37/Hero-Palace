firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location.href = "home.html";
  }
});

let btn = document.getElementById('signInBtn');
const loadingdiv = document.getElementById('onSignInDiv');

btn.addEventListener('click', function(event) {

  let email = document.getElementById('emailField').value;
  let password = document.getElementById('passwordField').value;

  let emailtrim = email.trim();
  let passtrim = password.trim();

  if (emailtrim && passtrim) {
    loadingdiv.style.display = "block";
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(emailtrim, passtrim).catch(function(error) {
    loadingdiv.style.display = "none";
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // ...
      alert(errorCode + "  " + errorMessage);
    });
  }
});
