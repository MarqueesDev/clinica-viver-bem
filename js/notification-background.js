const form = document.getElementById('contactFormu');
const modal = document.getElementById('messageModal');
const modalMessage = document.getElementById('modalMessage');


// FUNCTIONS
function validarFormulario() {
    // Obter os valores dos campos
    var email = document.getElementById("email").value;
    var cellPhone = document.getElementById("cell-phone").value;
    var name = document.getElementById("name").value;
    var message = document.getElementById("message").value;
    if (email === "" || cellPhone === "" || name === "" || message === "") {
        return false; // Retorna falso se algum campo estiver vazio
    }
    return true;
}

function validaValores() {
    // Obter os elementos do formulário
    var email = document.getElementById("email");
    var cellPhone = document.getElementById("cell-phone");
    var name = document.getElementById("name");
    var message = document.getElementById("message");

    // Expressão regular para verificar se o nome contém números
    var regexNome = /\d/; // Verifica se há números no nome

    // Expressão regular para verificar se o telefone contém apenas números
    var regexTelefone = /^\d+$/; // Verifica se contém apenas números

    // Verificar se os campos são válidos
    if (!email.checkValidity() ||
     !cellPhone.checkValidity() ||
     !regexTelefone.test(cellPhone.value) ||
     regexNome.test(name.value)) {
        return false; // Retorna falso se qualquer campo não for válido
    }

    // Se todos os campos forem válidos, retorna verdadeiro
    return true;
}
// END FUNCTIONS


form.addEventListener('submit', function (e) {
    e.preventDefault();

    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (!validarFormulario()){
                modalMessage.style.color = "#e74c3c";
                showModal("Ocorreu um erro. Por favor preencha todos os campos e tente novamente.");
            } else if (!validaValores()) {
                modalMessage.style.color = "#e74c3c";
                showModal("Ocorreu um erro. Por favor verifique se os campos estão preenchidos corretamente e tente novamente.");
            } else if (data.ok) {
                modalMessage.style.color = "#2ecc71";
                showModal("Mensagem enviada com sucesso!");
                form.reset();
            }
        })
        .catch(error => {
            console.error(error);
            modalMessage.style.color = "#e74c3c";
            showModal("Ocorreu um erro. Por favor,aguarde um pouco e tente novamente.");
        });

    // if (!validarFormulario()) {
    // } else if (data.ok) {
    //     modalMessage.style.color = "#2ecc71";
    //     showModal("Mensagem enviada com sucesso!");
    //     form.reset();
    // } else {
    //     modalMessage.style.color = "#e74c3c";
    //     showModal("Ocorreu um erro. Por favor, verifique se os campos estão preenchidos corretamente e tente novamente.");
    // }







    //         if (data.ok) {
    //             modalMessage.style.color = "#2ecc71";
    //             showModal("Mensagem enviada com sucesso!");
    //             form.reset();
    //         } else if (!validarFormulario()){
    //         }else {
    //             modalMessage.style.color = "#e74c3c";
    //             showModal("Ocorreu um erro. Por favor verifique se os campos estão preenchidos corretamente e tente novamente.");
    //         }
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         modalMessage.style.color = "#e74c3c";
    //         showModal("Ocorreu um erro. Por favor,aguarde um pouco e tente novamente.");
    //     });
    // });

    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = "block";

        // Oculta o modal após 3 segundos (3000 milissegundos)
        setTimeout(function () {
            modal.style.display = "none";
        }, 3000);
    }
});