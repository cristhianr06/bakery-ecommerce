(function () {
  emailjs.init({
    publicKey: "5IMsC4c4weESlMvMI",
  });
})();

const formContact = document.getElementById("formContacto");
formContact.addEventListener("submit", function (event) {
  event.preventDefault();
  emailjs.sendForm("service_uftovra", "template_sxkvieg", this).then(
    function () {
      formContact.reset();
      alert("Mensaje enviado");
    },
    function (error) {
      alert("Error: " + JSON.stringify(error));
    }
  );
});
