const API_URL = "http://localhost:3000";


// ELEMENTOS DO HTML
// produtos
const btnListar =
    document.getElementById("btnListar");

const btnFiltrar =
    document.getElementById("btnFiltrar");

const btnBuscar =
    document.getElementById("btnBuscar");

const formProduto =
    document.getElementById("formProduto");

const produtos =
    document.getElementById("produtos");

const mensagem =
    document.getElementById("mensagem");

const areasProdutos =
    document.querySelectorAll(".area-produtos");

// usuarios
const formUsuario =
    document.getElementById("formUsuario");

let usuarioCadastrado = false;


// PRODUTOS
function liberarSistema() {

    usuarioCadastrado = true;

    areasProdutos.forEach(area => {
        area.style.opacity = "1";
        area.style.pointerEvents = "auto";
    });

}

async function listarProdutos() {

    try {

        const resposta =
            await fetch(`${API_URL}/produtos`);

        const dados =
            await resposta.json();


        if (!resposta.ok) {

            mensagem.textContent =
                "Erro ao buscar produtos.";

            mensagem.className = "erro";

            return;
        }


        mostrarProdutos(dados);

        mensagem.textContent =
            `Status: ${resposta.status}`;

        mensagem.className = "sucesso";


    } catch (erro) {

        mensagem.textContent =
            "Não foi possível conectar à API.";

        mensagem.className = "erro";

    }

}


// MOSTRAR PRODUTOS
function mostrarProdutos(lista) {

    produtos.innerHTML = "";


    if (lista.length === 0) {

        produtos.innerHTML =
            "<p>Nenhum produto encontrado.</p>";

        return;
    }


    lista.forEach(produto => {

        produtos.innerHTML += `

            <div class="produto">

                <h3>
                    ${produto.nome}
                </h3>

                <p>
                    <strong>ID:</strong>
                    ${produto.id}
                </p>

                <p>
                    <strong>Preço:</strong>
                    R$ ${produto.preco}
                </p>

                <p>
                    <strong>Categoria:</strong>
                    ${produto.categoria}
                </p>

                <button onclick="deletarProduto(${produto.id})">
                    Excluir
                </button>

            </div>

        `;

    });

}


// FILTRAR POR CATEGORIA
async function filtrarCategoria() {

    const categoria =
        document.getElementById("categoria").value;


    if (!categoria) {

        mensagem.textContent =
            "Digite uma categoria.";

        mensagem.className = "erro";

        return;
    }


    try {

        const resposta =
            await fetch(
                `${API_URL}/produtos/filtrar?categoria=${categoria}`
            );


        const dados =
            await resposta.json();


        mostrarProdutos(dados);


        mensagem.textContent =
            `Status: ${resposta.status}`;

        mensagem.className = "sucesso";


    } catch (erro) {

        mensagem.textContent =
            "Erro ao conectar com a API.";

        mensagem.className = "erro";

    }

}

// BUSCAR POR ID
async function buscarPorId() {

    const id =
        document.getElementById("id").value;


    if (!id) {

        mensagem.textContent =
            "Digite um ID.";

        mensagem.className = "erro";

        return;
    }


    try {

        const resposta =
            await fetch(
                `${API_URL}/produtos/${id}`
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            produtos.innerHTML = "";

            mensagem.textContent =
                dados.mensagem;

            mensagem.className = "erro";

            return;
        }


        mostrarProdutos([dados]);


        mensagem.textContent =
            `Status: ${resposta.status}`;

        mensagem.className = "sucesso";


    } catch (erro) {

        mensagem.textContent =
            "Erro ao conectar com a API.";

        mensagem.className = "erro";

    }

}


// CADASTRAR PRODUTO
formProduto.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const novoProduto = {

            nome:
                document.getElementById("nome").value,

            preco:
                Number(
                    document.getElementById("preco").value
                ),

            categoria:
                document.getElementById(
                    "categoriaCadastro"
                ).value

        };


        try {

            const resposta =
                await fetch(
                    `${API_URL}/produtos`,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(novoProduto)

                    }
                );


            const dados =
                await resposta.json();


            if (!resposta.ok) {

                mensagem.textContent =
                    dados.mensagem;

                mensagem.className = "erro";

                return;
            }


            mensagem.textContent =
                `Produto cadastrado! Status: ${resposta.status}`;

            mensagem.className = "sucesso";


            formProduto.reset();


            listarProdutos();


        } catch (erro) {

            mensagem.textContent =
                "Erro ao conectar com a API.";

            mensagem.className = "erro";

        }

    }
);

async function deletarProduto(id) {

    const confirmar =
        confirm("Deseja realmente excluir este produto?");


    if (!confirmar) {
        return;
    }


    try {

        const resposta =
            await fetch(
                `${API_URL}/produtos/${id}`,
                {
                    method: "DELETE"
                }
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            mensagem.textContent =
                dados.mensagem;

            mensagem.className = "erro";

            return;
        }


        mensagem.textContent =
            `Produto excluído! Status: ${resposta.status}`;

        mensagem.className = "sucesso";


        listarProdutos();


    } catch (erro) {

        mensagem.textContent =
            "Erro ao conectar com a API.";

        mensagem.className = "erro";

    }

}

// EVENTOS DOS BOTÕES
btnListar.addEventListener(
    "click",
    listarProdutos
);


btnFiltrar.addEventListener(
    "click",
    filtrarCategoria
);


btnBuscar.addEventListener(
    "click",
    buscarPorId
);


// USUARIO
formUsuario.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const novoUsuario = {

            nome:
                document.getElementById(
                    "nomeUsuario"
                ).value,

            email:
                document.getElementById(
                    "emailUsuario"
                ).value,

            senha:
                document.getElementById(
                    "senhaUsuario"
                ).value

        };

        try {

            const resposta =
                await fetch(
                    `${API_URL}/usuarios`,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(novoUsuario)

                    }
                );

            const dados =
                await resposta.json();

            if (!resposta.ok) {

                mensagem.textContent =
                    dados.mensagem;

                mensagem.className =
                    "erro";

                return;
            }

            liberarSistema()

            mensagem.textContent =
                `Usuário cadastrado! Status: ${resposta.status}`;

            mensagem.className =
                "sucesso";

            formUsuario.reset();

        } catch (erro) {

            mensagem.textContent =
                "Erro ao conectar com a API.";

            mensagem.className =
                "erro";

        }

    }
);