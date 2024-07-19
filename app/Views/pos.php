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
            <li><a href="#" id="btn-panel">Painel Do Administrador</a></li>
            <li><a href="./sale" id="btn-close-system">Sair do Sistema</a></li>
            </ul>
        </nav>

        <!-- Campo de pesquisa de itens -->

        <input type="text" id="searchItem" placeholder="Insira o código de barras do item ou digite o nome do item">


        <!-- Modal para lista de produtos -->
        <div id="modal-products">
            <h5 id="modal-products-title">Selecione o Produto</h5>
            <div id="modal-products-body">
                <ul id="modal-product-list">
                    <!-- Lista de produtos será inserida aqui -->
                </ul>
            </div>
        </div>


    </div>
    <script src="./js/pos.js"></script>
</body>
</html>
