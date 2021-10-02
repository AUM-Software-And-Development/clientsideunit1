function Validation() {
  /* First assign references to the document tags */
  let InputName = document.getElementById("input-name").value;
  let InputSubject = document.getElementById("input-subject").value;
  let InputPhone = document.getElementById("input-phone").value;
  let InputEmail = document.getElementById("input-email").value;
  let InputMessage = document.getElementById("message").value;
  let InputError = document.querySelector(".error-message");
  let Output;

  InputError.style.padding = "24px";

  // If the name isn't at least an abbreviation, then it asks the user to retry with a longer one
  if (InputName.length < 2) {
    Output = "This form only accepts a name of 2 or more characters.";
    InputError.innerHTML = Output;
    return false;
  }

  // As above, the subject line should be within reason
  if (InputSubject.length < 6) {
    Output = "This form only accepts a longer subject of 6 or more characters.";
    InputError.innerHTML = Output;
    return false;
  }

  // The phone number is required to both be a number, and be a valid US number length
  if (isNaN(InputPhone) || InputPhone.length != 10) {
    Output = "This form uses standard phone number formats of only 10 numbers.";
    InputError.innerHTML = Output;

    return false;
  }

  // The email is required to contain an "@" symbol, and be at least 7 characters in length following domain convention
  if (InputEmail.indexOf("@") === -1 || InputEmail.length < 7) {
    Output = "This form uses standard email formats of x@x.xxx.";
    InputError.innerHTML = Output;

    return false;
  }

  // The message should be long enough but not so long that it causes frustration
  if (InputMessage.length <= 10) {
    Output = "This form only accepts a message of at least 10 characters.";
    InputError.innerHTML = Output;

    return false;
  }

  // If everything validated, a green box appears, and an alert does as well
  InputError.style.background = "green";
  Output = "Sent.";
  InputError.innerHTML = Output;
  alert("Your query was a success!");

  return true;
}
