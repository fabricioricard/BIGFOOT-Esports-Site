<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coletar e sanitizar os dados do formulário
    $nome = filter_var($_POST['nome-contato'], FILTER_SANITIZE_STRING);
    $sobrenome = filter_var($_POST['sobrenome-contato'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email-contato'], FILTER_SANITIZE_EMAIL);
    $mensagem = filter_var($_POST['mensagem'], FILTER_SANITIZE_STRING);

    // Configurações do e-mail
    $to = "bigftesports@gmail.com"; // E-mail de destino
    $subject = "Nova Mensagem de Contato: $nome $sobrenome";
    $body = "Nome: $nome $sobrenome\n";
    $body .= "Email: $email\n";
    $body .= "Mensagem:\n$mensagem";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Enviar o e-mail
    if (mail($to, $subject, $body, $headers)) {
        // Redirecionar de volta ao site com mensagem de sucesso
        header("Location: index.html?status=success");
        exit;
    } else {
        // Redirecionar com mensagem de erro
        header("Location: index.html?status=error");
        exit;
    }
} else {
    // Caso o acesso seja direto, redirecionar para o index
    header("Location: index.html");
    exit;
}
?>
