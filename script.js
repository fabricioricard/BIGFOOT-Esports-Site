console.log('Script carregado com sucesso');

// Verifica se os elementos principais estão presentes
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente carregado');
    const header = document.getElementById('header');
    const hero = document.getElementById('home');
    if (header && hero) {
        console.log('Cabeçalho e Hero Section encontrados');
    } else {
        console.error('Erro: Elementos principais não encontrados');
    }
});
