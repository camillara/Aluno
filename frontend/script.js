// URL base do backend
const baseURL = "http://localhost:8080/alunos";

// Captura do formulário de cadastro
document.getElementById("alunoForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Coleta os dados do formulário
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const telefone = document.getElementById("telefone").value;

    // Criação do objeto aluno
    const aluno = {
        nome: nome,
        idade: parseInt(idade),
        telefone: telefone
    };

    // Envio dos dados ao backend usando POST
    axios.post(`${baseURL}/cadastrar`, aluno)
        .then(response => {
            alert("Aluno cadastrado com sucesso!");
            document.getElementById("alunoForm").reset(); // Limpa o formulário
        })
        .catch(error => {
            console.error("Erro ao cadastrar aluno:", error);
            alert("Erro ao cadastrar aluno.");
        });
});

// Captura do formulário de consulta
document.getElementById("consultaForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Coleta o nome do aluno para busca
    const nomeConsulta = document.getElementById("nomeConsulta").value;

    // Envio da consulta ao backend usando GET
    axios.get(`${baseURL}/buscar`, {
        params: {
            nome: nomeConsulta
        }
    })
    .then(response => {
        // Verificando o conteúdo da resposta no console
        console.log("Resposta do backend:", response.data);

        const alunos = response.data;
        const alunoTableBody = document.getElementById("alunoTableBody");

        // Limpa a tabela antes de preenchê-la novamente
        alunoTableBody.innerHTML = "";

        // Cria elementos de tabela para cada aluno encontrado
        if (alunos.length === 0) {
            const noResultsRow = document.createElement("tr");
            const noResultsCell = document.createElement("td");
            noResultsCell.colSpan = 3;
            noResultsCell.className = "text-center";
            noResultsCell.textContent = "Nenhum aluno encontrado.";
            noResultsRow.appendChild(noResultsCell);
            alunoTableBody.appendChild(noResultsRow);
        } else {
            alunos.forEach(aluno => {
                const row = document.createElement("tr");

                const nomeCell = document.createElement("td");
                nomeCell.textContent = aluno.nome;
                row.appendChild(nomeCell);

                const idadeCell = document.createElement("td");
                idadeCell.textContent = aluno.idade;
                row.appendChild(idadeCell);

                const telefoneCell = document.createElement("td");
                telefoneCell.textContent = aluno.telefone;
                row.appendChild(telefoneCell);

                alunoTableBody.appendChild(row);
            });
        }
    })
    .catch(error => {
        console.error("Erro ao buscar alunos:", error);
        console.log("Detalhes do erro:", error.response ? error.response.data : error.message);
        alert("Erro ao buscar alunos.");
    });
});
