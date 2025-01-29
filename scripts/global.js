let lastErrorId = 0;

function throwError(message){
    console.log("throwError");
    console.error(message);
    let errorContainer = document.getElementById("errorContainer");

    let errorElement = document.createElement("div");
        errorElement.className = "error";
        errorElement.id = "error_" + lastErrorId;
    lastErrorId++;

    errorContainer.appendChild(errorElement);


    let errorIcon = document.createElement("img");
        errorIcon.src = "resources/errorIcon.svg";
        errorIcon.className = "errorSvg";
    errorElement.appendChild(errorIcon);

    let errorMessage = document.createElement("div");
        errorMessage.innerHTML = message;
        errorMessage.className = "errorMessage";
    errorElement.appendChild(errorMessage);

    setTimeout(() => {
        errorElement.remove();
      }, "4000");
      
}
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

function isOverflown(element) {
return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}