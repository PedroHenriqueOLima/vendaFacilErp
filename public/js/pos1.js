document.addEventListener("DOMContentLoaded", function () {
  // Elementos do DOM

  const modalQueryItems = document.getElementById("modal-query-items");
  const modalProducts = document.getElementById("modal-products");
  const modalProductsList = document.getElementById("modal-products-list");
  const queryItemBtn = document.getElementById("query-btn");
  const searchItem = document.getElementById("search-item");
  const queryItemInput = document.getElementById("query-item-input");
  const btnCloseSystem = document.getElementById("btn-close-system");
  const btnCloseModalProducts = document.getElementById(
    "btn-close-modal-products"
  );
  const productsSaleList = document.getElementById("products-list-body");
  const displayTotalItems = document.getElementById("total-items");
  const displayTotalPrice = document.getElementById("total-price");

  // Variáveis

  let totalItems = 0;
  let totalValue = 0;

  // Eventos

  btnCloseSystem.addEventListener("click", closeSystem);
  btnCloseModalProducts.addEventListener("click", closeModalProducts);
  searchItem.addEventListener("input", handleSearchInput);
  queryItemBtn.addEventListener("click", () => {
    queryItem();
  });

  // Funções

  // Função para fechar o PDV

  function closeSystem() {
    window.location.href = "/login";
  }

  // Função para fechar o modal de produtos
  function closeModalProducts() {
    modalProducts.style.display = "none";
    modalProductsList.innerHTML = "";
  }

  // Função para manipular o input de pesquisa
  function handleSearchInput(event) {
    let query = event.target.value.trim();
    if (isNumeric(query) && isBarcode(query)) {
      console.log("código buscado:", query);
      searchByCode(query);
      searchItem.value = ""; // Buscar pelo código
    } else {
      if (isDescription(query)) {
        searchItem.addEventListener("keyup", (event) => {
          if (event.key === "Enter") {
            searchItem.value = "";
            console.log("busca por descrição:", query);
          } else {
            modalProducts.style.display = "none";
          }
        })
      }
    }
  }

  // Função para consultar os itens a partir do botão consultar item
  function queryItem() {
    modalQueryItems.style.display = "block";
  }

  // Função para verificar se a query está vazia

  function isEmpty(query) {
    return !query || query.trim().length === 0;
  }

  // Função para verificar se a query é um código de barras de 12 ou 13 digitos

  function isBarcode(query) {
    return /^[0-9]{12,13}$/.test(query);
  }

  // Função para verificar se a query é um número

  function isNumeric(query) {
    return /^[0-9]+$/.test(query);
  }

  // Função para verificar se é uma descrição

  function isDescription(query) {
    return !isBarcode(query) && !isNumeric(query);
  }

  // Função para buscar o item pelo código

  function searchByCode(query) {
    fetch("/pdv/pesquisar-produto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())

    
      .then(response => {
        if (response.status === "ok") {
          console.log("produto encontrado:", response);
        } else {
          console.log("erro", response);
        }
      })
      
      .catch((error) => {
        console.error("Erro:", error);
      });
  }
});
