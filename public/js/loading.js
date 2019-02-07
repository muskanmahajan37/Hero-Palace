window.addEventListener("load",function(){
  const loading = document.getElementById('preloader');
  setTimeout(function(){
      document.body.removeChild(loading);
  },1500);
})
