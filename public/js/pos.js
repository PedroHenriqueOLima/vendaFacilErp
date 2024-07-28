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

  // Tempo de espera para o usuário digitar

  let debounceTimeout;

  function handleSearchInput(event) {
    let query = event.target.value.trim();

    if (isNumeric(query) && isBarcode(query)) {
      console.log("código buscado:", query);
      searchByCode(query);
      searchItem.value = ""; // Limpar o input após buscar pelo código
    } else if (isDescription(query)) {
      // Limpar o timeout anterior
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        console.log("descrição buscada:", query);
        searchByName(query);
      }, 1200); // Tempo de atraso de 1200ms para busca por descrição
    }
  }

  // Função auxiliar para verificar se a query é uma descrição
  function isDescription(query) {
    return query.length > 0 && !isNumeric(query);
  }

  // Função debounce (adiar a execução da função)
  function debounce(func, timeout = 300) {
    return (...args) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  searchItem.addEventListener("input", handleSearchInput); // Usar "input" em vez de "keyup" para detectar qualquer mudança no valor do input

  // Função para consultar os itens a partir do botão consultar item
  function queryItem() {
    modalQueryItems.style.display = "block";
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

      .then((response) => {
        if (response.status === "ok") {
          console.log("produto encontrado:", response);
          addProductToSale(response.data);
        } else {
          console.log("erro", response);
        }
      })

      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  function searchByName(query) {
    fetch("/pdv/pesquisar-produto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())

      .then((response) => {
        if (response.status === "ok") {
          console.log("produto encontrado:", response);
          addItemsToModal(response.data);
        } else {
          alert("Não há nenhum item com essa descrição. Tente novamente.");
          searchItem.value = "";
        }
      })

      .catch((message) => {
        console.error("Erro:", message);
      });
  }

  function addItemsToModal(products) {
    modalProducts.style.display = "block";
    modalProductsList.innerHTML = "";

    const table = document.createElement("table");
    table.id = "product-table";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
      <th>Nome</th>
      <th>Estoque</th>
      <th>Preço</th>
      <th>Adicionar a Venda</th>
    `;
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>R$ ${product.price}</td>
        <td><button class="btn">Incluir na Venda</button></td>
      `;
      row.querySelector("button").addEventListener("click", () => {
        addProductToSale(product);
        modalProducts.style.display = "none";
      });
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    modalProductsList.appendChild(table);
  }

  function addProductToSale(product) {
    const row = document.createElement("tr");
    const quantity = 1;
    totalItems += 1;
    totalValue += parseFloat(product.price) * quantity; // Adiciona o valor do product.price;

    row.innerHTML = `
      <td class="item-value">${totalItems}</td>
      <td class="name-value">${product.name}</td>
      <td class="quantity-value"><input type="number" min="1" value="${quantity}"/></td>
      <td class="price-value"><input type="number" min="0.01" step="0.01" value="${product.price}"/>R$</td>
      <td class="total-value">R$ ${(product.price * quantity).toFixed(2)}</td>
      <td><button class="btn btn-remove-product">Remover</button></td>
    `;

    row.querySelector(".btn-remove-product").addEventListener("click", () => {
      removeProductFromSale(row);
      totalItems -= 1;
      updateOrderNumbers();
      updateTotalItems();
      updateTotalValue();
    });

    row.querySelector(".price-value input").addEventListener("change", () => {
      const price = row.querySelector(".price-value input").value;
      row.querySelector(".total-value").textContent = `R$ ${(price * quantity)}`;
      updateTotalValue();
    })

    row.querySelector(".quantity-value input").addEventListener("change", () => {
      const quantity = row.querySelector(".quantity-value input").value;
      row.querySelector(".total-value").textContent = `R$ ${(product.price * quantity)}`;
      updateTotalValue();
    });



    displayTotalItems.innerHTML = `<h4>Total de Itens: </br> ${totalItems}</h4>`;
    displayTotalPrice.innerHTML = `<h4>Valor Total: </br> R$ ${totalValue} </h4>`;
    productsSaleList.appendChild(row);
    searchItem.value = "";
  }

  function removeProductFromSale(row) {
    row.parentNode.removeChild(row);
  }

  function updateOrderNumbers() {
    const rows = productsSaleList.querySelectorAll("tr");
    rows.forEach((row, index) => {
      row.querySelector("td").textContent = index + 1;
    });
  }

  function updateTotalItems() {
    const rows = productsSaleList.querySelectorAll("tr");
    totalItems = rows.length;
    displayTotalItems.innerHTML = `<h4>Total de Itens: </br> ${totalItems}</h4>`;
  }

  function updateTotalValue() {
    const rows = productsSaleList.querySelectorAll("tr");
    totalValue = 0;
    rows.forEach((row) => {
      totalValue += parseFloat(
        row.querySelector(".total-value").textContent.replace("R$", "")
      );
    });
    displayTotalPrice.innerHTML = `<h4>Valor Total: </br> R$ ${totalValue} </h4>`;
  }
});
