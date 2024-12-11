// Captura dos elementos do DOM
const Input_cep = document.getElementById('cep');
const Input_logroadouro = document.getElementById('logroadouro');
const Input_numero = document.getElementById('numero');
const Input_bairro = document.getElementById('bairro');
const Input_cidade = document.getElementById('cidade');
const Input_estado = document.getElementById('estado');

// Adiciona um listener para o evento de input no campo do CEP
Input_cep.addEventListener('input', () => {
    let cep = Input_cep.value;

    // Formata o CEP com o traço (XXX-XXX)
    if (cep.length <= 5) {
        cep = cep.replace(/(\d{5})(\d{1,})/, '$1-$2');
    } else {
        cep = cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    // Atualiza o valor do campo com o CEP formatado
    Input_cep.value = cep;

    // Faz a requisição à API do ViaCEP para buscar os dados do endereço
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(retorno => retorno.json())
        .then(json => {
            // Preenche os campos com os dados recebidos ou valores padrão
            Input_logroadouro.value = json.logradouro || 'Não Especificado';
            Input_bairro.value = json.bairro || 'Não Especificado';  // Caso o bairro não venha vazio
            Input_cidade.value = json.localidade || 'Não Especificado';  // Caso a cidade não venha vazia
            Input_estado.value = json.uf || 'Não Especificado';  // Caso o estado não venha vazio

            // Foca no campo número
            Input_numero.focus();
        })
});
