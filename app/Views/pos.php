<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/main.css">
    <link rel="stylesheet" href="./css/pos.css">
    <title>Venda Fácil - PDV</title>
</head>

<body>
    <div id="container">
        <nav id="navbar">
            <div id="nav-brand">
                <h1>PDV Venda Fácil</h1>
                <small>Ph Tech Soluções</small>
            </div>

            <ul id="nav-links">
                <li><a href="/painel-administrador/login" id="btn-panel">Painel Do Administrador</a></li>
                <li><button id="btn-close-system">Sair do Sistema</button></li>
            </ul>
        </nav>

        <!-- Campo de pesquisa de itens -->

        <input type="text" id="search-item" placeholder="Insira o código de barras do item ou digite o nome do item">

        <!-- Modal de consulta de item -->

        <div id="modal-query-items">
            <div id="modal-query-items-header">
                <h5 id="modal-query-items-title">Consultar Item</h5>
                <button id="btn-close-query-items">Terminar Consulta</button>
            </div>

            <div id="modal-query-items-body"></div>
                <input type="text" id="query-item-input">
                <div id="modal-query-items-list">
                    <!-- Tabela de itens será inserida aqui -->
                </div>
            </div>

        </div>
        <!-- Modal para lista de produtos -->
        <div id="modal-products">
            <div id="modal-products-header">
                <h5 id="modal-products-title">Selecione o Produto</h5>
                <button id="btn-close-modal-products">Fechar</button>
            </div>

            <div id="modal-products-body">
                <div id="modal-products-list">
                    <!-- Tabela de produtos será inserida aqui -->
                </div>
            </div>

        </div>


        <main id="app">
            <div id="left-container">
                <!-- Botões de ação -->
                <button id="query-btn">
                    Consultar Item
                </button>

                
                <button id="add-product-btn">
                    Cadastrar Produto
                </button>

                <button id="add-service-btn">
                    Cadastrar Serviço
                </button>

                <button id="add-client-btn">
                    Cadastrar Cliente
                </button>

                <button id="add-receivable-btn">Contas a Receber</button>
            </div>
            <!-- Container de itens da esquerda -->

            <!-- Container de itens da direita -->

            <div id="right-container">

                
                <!-- Lista de itens da venda -->
                <div id="products-list">
                    <table>
                        <thead id="products-list-header">
                            <tr>
                                <th id="product-number">Nº</th>
                                <th id="product-name">Item</th>
                                <th id="product-quantity">Quantidade</th>
                                <th id="product-price">Valor</th>
                                <th id="product-total">Valor Total</th>
                                <th id="product-action">Ação</th>
                            </tr>
                        </thead>
                        <tbody id="products-list-body">
                            <!-- Lista de produtos da venda será inserida aqui -->
                        </tbody>

                    </table>
                </div>

                <!-- Informações da venda -->

                <div id="row-footer">
                    <button id="cancel-btn">Cancelar Venda (F5)</button>
                    <div id="total-items">
                        <h3>Total de Itens</h3>
                        <p>0</p>
                    </div>
                    <div id="total-price">
                        <h3>Valor Total</h3>
                        <p id="total-price-value">R$ 0,00</p>
                    </div>


                    <button id="confirm-btn">Finalizar Venda (F9)</button>
                </div>
            </div>
        </main>

        <script src="./js/pos1.js"></script>
</body>

</html>