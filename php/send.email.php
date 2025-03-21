<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $assunto = $_POST['assunto'];
    $mensagem = $_POST['mensagem'];
    
    $to = "dev.alanmarques@gmail.com";
    $subject = "Novo contato do site: $assunto";
    $message = "Nome: $nome\n";
    $message .= "E-mail: $email\n\n";
    $message .= "Mensagem:\n$mensagem";
    $headers = "From: $email";
    
    if (mail($to, $subject, $message, $headers)) {
        echo "<script>alert('Mensagem enviada com sucesso!'); window.location.href='contact.html';</script>";
    } else {
        echo "<script>alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.'); window.location.href='contact.html';</script>";
    }
}
?>