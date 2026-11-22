const historico = document.getElementById("historico");
const campoComando = document.getElementById("campo-comando");
const telaTerminal = document.getElementById("tela-terminal");

let investigacaoIniciada = false;
let arquivosAbertos = [];
let suspeitosInvestigados = [];
let jogoEncerrado = false;
let origemRastreada = false;

// BANCO DE ARQUIVOS CONFIDENCIAIS
const arquivos = {
    "registro_acessos.dat": {
        titulo: "REGISTRO DE ACESSOS",
        conteudo: `ARQUIVO: registro_acessos.dat
ORIGEM: SERVIDOR INTERNO
DATA: 17/11/2026

23:18:04 — Acesso autorizado ao sistema.
23:26:51 — Usuário: A.VALENÇA
23:29:58 — Conexão remota detectada.
23:30:12 — CÂMERAS DESATIVADAS.
23:30:14 — Credencial utilizada: svc_cameras
23:41:08 — Sistema de câmeras restabelecido.
23:47:33 — Alerta de segurança ignorado.

OBSERVAÇÃO:
A credencial svc_cameras pertence ao setor de segurança.
O acesso remoto não consta no relatório oficial.

[ FIM DO ARQUIVO ]`
    },

    "perfil_vitima.enc": {
        titulo: "PERFIL DA VÍTIMA",
        conteudo: `ARQUIVO: perfil_vitima.enc
CLASSIFICAÇÃO: CONFIDENCIAL

NOME: Augusto Valença
IDADE: 61 anos
OCUPAÇÃO: Presidente do Grupo Valença

INFORMAÇÕES RECUPERADAS:

Nos últimos meses, Augusto solicitou uma
auditoria financeira independente.

O relatório preliminar apontava transferências
para empresas de fachada em regiões de conflito.

Parte dos valores teria sido direcionada a
intermediários ligados à segurança privada.

Três dias antes de sua morte, recebeu uma
mensagem de origem desconhecida:

"Você financiou a guerra.
Agora ela sabe seu nome."

NOTA:
O relatório completo foi removido do servidor.

[ FIM DO ARQUIVO ]`
    },

    "backup_cameras.tmp": {
        titulo: "FRAGMENTO DE CÂMERAS",
        conteudo: `ARQUIVO: backup_cameras.tmp
RECUPERAÇÃO: PARCIAL
LOCAL: RESIDÊNCIA VALENÇA

CÂMERA 03 — CORREDOR PRINCIPAL

23:29:58 — Sinal interrompido.
23:30:12 — Gravação suspensa.
23:41:08 — Sinal restabelecido.

FRAGMENTO RECUPERADO:

23:40:51 — Movimento detectado.
23:40:53 — Figura não identificada.
23:40:56 — Arquivo corrompido.

ANÁLISE AUTOMÁTICA:
A figura aparenta utilizar o acesso reservado
aos funcionários da residência.

IDENTIFICAÇÃO: INDISPONÍVEL.

[ FIM DO ARQUIVO ]`
    }
};

// BANCO DE SUSPEITOS
const suspeitos = {
    helena: {
        nome: "Helena Duarte",
        cargo: "Diretora de Segurança",
        idade: 44,
        motivo: "Augusto ameaçou demitir Helena após descobrir falhas graves no sistema de segurança.",
        depoimento: "Afirma que estava em casa no horário do crime.",
        contradicao: "Sua credencial estava associada ao acesso remoto que desativou as câmeras.",
        observacao: "Helena afirma que outras pessoas tinham acesso técnico ao sistema."
    },

    raul: {
        nome: "Raul Sampaio",
        cargo: "Diretor Financeiro",
        idade: 52,
        motivo: "Uma auditoria interna poderia revelar transferências financeiras feitas sob sua autorização.",
        depoimento: "Afirma que estava em uma reunião virtual durante o horário do assassinato.",
        contradicao: "O relatório financeiro desaparecido foi solicitado por Augusto poucos dias antes de sua morte.",
        observacao: "A reunião ainda não teve seu horário confirmado."
    },

    tomas: {
        nome: "Tomás Valença",
        cargo: "Sobrinho da vítima",
        idade: 29,
        motivo: "Uma alteração no testamento poderia retirar sua participação na herança.",
        depoimento: "Afirma que deixou a residência antes das 22h.",
        contradicao: "Um funcionário declarou ter visto um veículo semelhante ao seu próximo à propriedade.",
        observacao: "Tomás nega ter retornado à residência naquela noite."
    }
};

// EXIBE MENSAGENS NO TERMINAL
let filaMensagens = Promise.resolve();

function escreverMensagem(texto, tipo = "sistema") {
    filaMensagens = filaMensagens.then(async () => {
        const mensagem = document.createElement("div");

        mensagem.classList.add("mensagem", tipo);
        historico.appendChild(mensagem);

        for (const caractere of texto) {
            mensagem.textContent += caractere;
            telaTerminal.scrollTop = telaTerminal.scrollHeight;

            await new Promise(resolve => setTimeout(resolve, 18));
        }

        telaTerminal.scrollTop = telaTerminal.scrollHeight;
    });

    return filaMensagens;
}

// PAUSA ENTRE MENSAGENS
function aguardar(tempo) {
    return new Promise(resolve => setTimeout(resolve, tempo));
}

// INICIALIZA A INVESTIGAÇÃO
async function iniciarInvestigacao() {
    if (investigacaoIniciada) {
        escreverMensagem("A investigação já está em andamento.", "alerta");
        return;
    }

    investigacaoIniciada = true;
    campoComando.disabled = true;

    escreverMensagem("INICIANDO PROTOCOLO...", "alerta");
    await aguardar(900);

    escreverMensagem("Estabelecendo conexão segura...", "sistema");
    await aguardar(1000);

    escreverMensagem("Rastreando servidor de origem...", "sistema");
    await aguardar(1200);

    escreverMensagem("Conexão estabelecida.", "sucesso");
    await aguardar(700);

    escreverMensagem("----------------------------------------", "sistema");
    escreverMensagem("ACESSO CONCEDIDO", "sucesso");
    escreverMensagem("IDENTIDADE: DESCONHECIDA", "sistema");
    escreverMensagem("NÍVEL DE ACESSO: RESTRITO", "sistema");
    escreverMensagem("----------------------------------------", "sistema");

    await aguardar(1000);

    escreverMensagem("AVISO: ARQUIVO CONFIDENCIAL RECUPERADO.", "alerta");
    await aguardar(800);

    escreverMensagem("CASO 001 — AUGUSTO VALENÇA", "sucesso");
    escreverMensagem("CLASSIFICAÇÃO: HOMICÍDIO", "sistema");
    escreverMensagem("STATUS: INVESTIGAÇÃO ABERTA", "sistema");

    await aguardar(800);

    escreverMensagem("Digite 'arquivos' para listar os documentos recuperados.", "sistema");

    campoComando.disabled = false;
    campoComando.focus();
}

// LISTA OS ARQUIVOS DISPONÍVEIS
function listarArquivos() {
    escreverMensagem("DOCUMENTOS RECUPERADOS:", "sucesso");
    escreverMensagem("----------------------------------------", "sistema");

    Object.keys(arquivos).forEach(nome => {
        escreverMensagem(nome, "sistema");
    });

    escreverMensagem("----------------------------------------", "sistema");
    escreverMensagem("Para consultar um documento, digite: abrir nome_do_arquivo", "sistema");
}

// ABRE UM ARQUIVO
function abrirArquivo(nome) {
    const arquivo = arquivos[nome];

    if (!arquivo) {
        escreverMensagem("Arquivo não encontrado ou acesso negado.", "alerta");
        return;
    }

    escreverMensagem("RECUPERANDO DOCUMENTO...", "alerta");
    escreverMensagem("----------------------------------------", "sistema");
    escreverMensagem(arquivo.conteudo, "sucesso");
    escreverMensagem("----------------------------------------", "sistema");

    if (!arquivosAbertos.includes(nome)) {
        arquivosAbertos.push(nome);
    }
}

// LISTA TODOS OS SUSPEITOS
function listarSuspeitos() {
    escreverMensagem("PESSOAS SOB INVESTIGAÇÃO:", "sucesso");
    escreverMensagem("----------------------------------------", "sistema");

    Object.keys(suspeitos).forEach(chave => {
        const suspeito = suspeitos[chave];
        escreverMensagem(chave.toUpperCase() + " — " + suspeito.nome, "sistema");
    });

    escreverMensagem("----------------------------------------", "sistema");
    escreverMensagem("Digite: investigar nome", "sistema");
}

// CONSULTA O PERFIL DE UM SUSPEITO
function investigarSuspeito(nome) {
    const suspeito = suspeitos[nome];

    if (!suspeito) {
        escreverMensagem("Suspeito não encontrado.", "alerta");
        escreverMensagem("Consulte a lista com o comando 'suspeitos'.", "sistema");
        return;
    }

    if (!suspeitosInvestigados.includes(nome)) {
        suspeitosInvestigados.push(nome);
    }

    escreverMensagem("ACESSANDO DOSSIÊ...", "alerta");
    escreverMensagem("----------------------------------------", "sistema");
    escreverMensagem("NOME: " + suspeito.nome, "sucesso");
    escreverMensagem("CARGO: " + suspeito.cargo, "sistema");
    escreverMensagem("IDADE: " + suspeito.idade, "sistema");
    escreverMensagem("POSSÍVEL MOTIVAÇÃO: " + suspeito.motivo, "sistema");
    escreverMensagem("DEPOIMENTO: " + suspeito.depoimento, "sistema");
    escreverMensagem("CONTRADIÇÃO: " + suspeito.contradicao, "alerta");
    escreverMensagem("OBSERVAÇÃO: " + suspeito.observacao, "sistema");
    escreverMensagem("----------------------------------------", "sistema");
}

// INVENTÁRIO DE EVIDÊNCIAS
function listarEvidencias() {
    escreverMensagem("INVENTÁRIO DE EVIDÊNCIAS", "sucesso");
    escreverMensagem("----------------------------------------", "sistema");

    if (arquivosAbertos.length === 0) {
        escreverMensagem("Nenhuma evidência coletada.", "alerta");
        return;
    }

    if (arquivosAbertos.includes("registro_acessos.dat")) {
        escreverMensagem("[01] Acesso remoto às câmeras.", "sucesso");
    }

    if (arquivosAbertos.includes("perfil_vitima.enc")) {
        escreverMensagem("[02] Mensagem ameaçadora recebida pela vítima.", "sucesso");
    }

    if (arquivosAbertos.includes("backup_cameras.tmp")) {
        escreverMensagem("[03] Figura não identificada no corredor.", "sucesso");
    }

    escreverMensagem("----------------------------------------", "sistema");
    escreverMensagem("DOCUMENTOS ANALISADOS: " + arquivosAbertos.length + "/3", "sistema");
}

// CRUZAMENTO DE INFORMAÇÕES
function analisarEvidencias() {
    if (arquivosAbertos.length < 3) {
        escreverMensagem("Dados insuficientes para cruzamento.", "alerta");
        escreverMensagem("Consulte todos os documentos recuperados.", "sistema");
        return;
    }

    escreverMensagem("EXECUTANDO CRUZAMENTO DE DADOS...", "alerta");
    escreverMensagem("----------------------------------------", "sistema");

    escreverMensagem("CORRELAÇÃO 01:", "sucesso");
    escreverMensagem("A credencial de segurança foi utilizada durante o apagão das câmeras.", "sistema");

    escreverMensagem("CORRELAÇÃO 02:", "sucesso");
    escreverMensagem("A interrupção da gravação coincide com o intervalo em que uma figura entrou na residência.", "sistema");

    escreverMensagem("CORRELAÇÃO 03:", "sucesso");
    escreverMensagem("A auditoria financeira desaparecida foi solicitada pela vítima antes do assassinato.", "sistema");

    escreverMensagem("----------------------------------------", "sistema");
    escreverMensagem("NOVA SUSPEITA: RAUL SAMPAIO", "alerta");
    escreverMensagem("Recomendação: investigar as movimentações financeiras.", "sistema");
}

// ACUSAÇÃO
function acusarSuspeito(nome) {
    if (!suspeitos[nome]) {
        escreverMensagem("Identificação inválida. Use: acusar helena, raul ou tomas.", "alerta");
        return;
    }

    if (
        arquivosAbertos.length < 3 ||
        !suspeitosInvestigados.includes("raul")
    ) {
        escreverMensagem("PROVAS INSUFICIENTES PARA FORMALIZAR A ACUSAÇÃO.", "alerta");
        escreverMensagem("Consulte todos os documentos e investigue Raul Sampaio.", "sistema");
        return;
    }

    jogoEncerrado = true;

    if (nome === "raul") {
        escreverMensagem("----------------------------------------", "sucesso");
        escreverMensagem("ACUSAÇÃO CONFIRMADA.", "sucesso");
        escreverMensagem("RAUL SAMPAIO — RESPONSÁVEL PELO ASSASSINATO.", "sucesso");
        escreverMensagem("A auditoria revelou transferências autorizadas por Raul para financiar a operação.", "sistema");
        escreverMensagem("Ele utilizou o acesso ao sistema de segurança para encobrir a entrada na residência.", "sistema");
        escreverMensagem("Uma denúncia anônima foi encaminhada às autoridades.", "sistema");
        escreverMensagem("IDENTIDADE DO INVESTIGADOR: PROTEGIDA.", "sucesso");
        escreverMensagem("----------------------------------------", "sucesso");
        escreverMensagem("FINAL 01 — VERDADE REVELADA", "sucesso");
    } else {
        escreverMensagem("----------------------------------------", "alerta");
        escreverMensagem("ACUSAÇÃO INCORRETA.", "alerta");
        escreverMensagem("As evidências não sustentam a denúncia.", "sistema");
        escreverMensagem("O verdadeiro responsável deixou a jurisdição.", "sistema");
        escreverMensagem("O acesso ao servidor foi revogado.", "alerta");
        escreverMensagem("----------------------------------------", "alerta");
        escreverMensagem("FINAL 02 — INVESTIGAÇÃO ENCERRADA", "alerta");
    }

    escreverMensagem("FIM DA SESSÃO. Atualize a página para reiniciar.", "sistema");
}

// RASTREAMENTO DE ORIGEM — CAMINHO OCULTO
function rastrearOrigem() {
    if (arquivosAbertos.length < 3 || suspeitosInvestigados.length < 3) {
        escreverMensagem("Rastreamento bloqueado. Dados incompletos.", "alerta");
        escreverMensagem("Consulte todos os arquivos e investigue os três suspeitos.", "sistema");
        return;
    }

    origemRastreada = true;

    escreverMensagem("RASTREAMENTO DE ORIGEM INICIADO...", "alerta");
    escreverMensagem("----------------------------------------", "sistema");
    escreverMensagem("Uma credencial desconhecida aparece nos registros da noite do crime.", "sistema");
    escreverMensagem("A sessão foi iniciada a partir de um dispositivo associado ao investigador.", "alerta");
    escreverMensagem("LOCALIZAÇÃO: RESIDÊNCIA VALENÇA.", "alerta");
    escreverMensagem("HORÁRIO: 23:29:58.", "sistema");
    escreverMensagem("----------------------------------------", "sistema");
    escreverMensagem("Digite 'confessar' para acessar o registro completo.", "alerta");
}

// FINAL OCULTO
function confessar() {
    if (!origemRastreada) {
        escreverMensagem("Comando indisponível. Execute 'rastrear origem' primeiro.", "alerta");
        return;
    }

    jogoEncerrado = true;

    escreverMensagem("----------------------------------------", "alerta");
    escreverMensagem("REGISTRO RECUPERADO.", "alerta");
    escreverMensagem("A credencial não foi roubada.", "sistema");
    escreverMensagem("O dispositivo pertence ao próprio investigador.", "sistema");
    escreverMensagem("A sessão foi utilizada na residência na noite do assassinato.", "sistema");
    escreverMensagem("A investigação nunca foi sobre encontrar o assassino.", "alerta");
    escreverMensagem("Era sobre descobrir o quanto ainda sabiam.", "alerta");
    escreverMensagem("----------------------------------------", "alerta");
    escreverMensagem("FINAL 03 — TRACE//404", "alerta");
    escreverMensagem("IDENTIDADE DO ASSASSINO: CONFIRMADA.", "alerta");
    escreverMensagem("FIM DA SESSÃO.", "sistema");
}

// PROCESSA OS COMANDOS DIGITADOS
function processarComando(comando) {
    const comandoLimpo = comando.trim().toLowerCase();

    if (comandoLimpo === "") {
        return;
    }

    escreverMensagem("investigador@trace:~$ " + comando, "comando");

    if (jogoEncerrado) {
        escreverMensagem("Sessão encerrada. Atualize a página para reiniciar.", "alerta");
        return;
    }

    if (!investigacaoIniciada && comandoLimpo !== "ajuda" && comandoLimpo !== "iniciar") {
        escreverMensagem("Acesso negado. Digite 'iniciar' para começar.", "alerta");
        return;
    }

    if (comandoLimpo.startsWith("abrir ")) {
        abrirArquivo(comandoLimpo.slice(6).trim());
        return;
    }

    if (comandoLimpo.startsWith("investigar ")) {
        investigarSuspeito(comandoLimpo.slice(11).trim());
        return;
    }

    if (comandoLimpo.startsWith("acusar ")) {
        acusarSuspeito(comandoLimpo.slice(7).trim());
        return;
    }

    switch (comandoLimpo) {
        case "ajuda":
            escreverMensagem(
                "COMANDOS DISPONÍVEIS:\n" +
                "ajuda           - exibe os comandos\n" +
                "iniciar         - inicia a investigação\n" +
                "limpar          - limpa o terminal\n" +
                "arquivos        - lista documentos recuperados\n" +
                "abrir           - abre um documento\n" +
                "suspeitos       - lista os suspeitos\n" +
                "investigar      - consulta um suspeito\n" +
                "evidencias      - consulta as pistas coletadas\n" +
                "analisar        - cruza as informações\n" +
                "acusar          - formaliza uma acusação\n" +
                "rastrear origem - procura a origem da conexão\n" +
                "confessar       - acessa o registro oculto",
                "sucesso"
            );
            break;

        case "iniciar":
            iniciarInvestigacao();
            break;

        case "limpar":
            historico.innerHTML = "";
            break;

        case "arquivos":
            listarArquivos();
            break;

        case "suspeitos":
            listarSuspeitos();
            break;

        case "evidencias":
            listarEvidencias();
            break;

        case "analisar":
            analisarEvidencias();
            break;

        case "rastrear origem":
            rastrearOrigem();
            break;

        case "confessar":
            confessar();
            break;

        default:
            escreverMensagem("Comando não reconhecido. Digite 'ajuda'.", "alerta");
    }
}

// DETECTA QUANDO ENTER É PRESSIONADO
campoComando.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const comando = campoComando.value;
        campoComando.value = "";

        processarComando(comando);
    }
});

// MENSAGENS INICIAIS
escreverMensagem("TRACE//404 — TERMINAL DE INVESTIGAÇÃO", "sucesso");
escreverMensagem("Sistema inicializado.", "sistema");
escreverMensagem("Aguardando autenticação...", "sistema");
escreverMensagem("Digite 'ajuda' para consultar os comandos.", "sistema");