document.getElementById("User").addEventListener("click", function() {
  var clickSound = new Audio("reset.wav"); 
  clickSound.play();
  
  setTimeout(function() {
      window.location.href = "index.html";
  }, 1000);  
});

    document.getElementById("comp").addEventListener("click", function() {
      var clickSound = new Audio("reset.wav"); 
      clickSound.play();

      setTimeout(function() {
          window.location.href = "index2.html";
      }, 1000);  
  });
  