window.addEventListener("DOMContentLoaded", function () {
  enterButton = document.getElementById("enter_button");
  enterButton.onclick = function () {
    input = document.getElementById("user_input_api").value;
    localStorage.setItem("API_KEY", input);
    window.location.href = "index.html";
  };
});
