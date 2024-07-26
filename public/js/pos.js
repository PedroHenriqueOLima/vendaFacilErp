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
  function handleSearchInput(event) {
    const query = event.target.value.trim();
    console.log(query.length);

    if (isNumeric(query) && (query.length === 12 || query.length === 13)) {
      if (isBarcode(query)) {
        searchByCode(query);
      } else {
        alert("Por favor, insira um código de barras válido.");
      }
    } else if (query !== "") {
      searchItem.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          console.log(query);
          searchByName(query);
        } else {
          modalProducts.style.display = "none";
        }
      });
    } else {
      modalProducts.style.display = "none";
    }

    event.preventDefault();
  }

  function searchByCode(query) {
    fetch("/pdv/pesquisar-produto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    .then(response => response.json())

    .then(response =>  {
      if (response.status === "ok") {
        addProductToSale(response.data);
      } else {
        alert(response.message);
        searchItem.value = "";
      }
    })
  }

  function searchByName(query) {
    fetch("/pdv/pesquisar-produto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then(handleResponse)
      .then((result) => {
        if (result.status === "ok") {
          addItemsToModal(result.data);
        } else {
          alert(result.message);
          searchItem.value = "";
        }
      })
  
  }

  function isBarcode(query) {
    return /^\d{13}$/.test(query);
  }

  function isNumeric(input) {
    return /^\d+$/.test(input);
  }

  function queryItem() {
    modalQueryItems.style.display = "block";

    const query = queryItemInput.value.trim();

    if (isNumeric(query)) {
      if (query.length === 12 || query.length === 13) {
        if (isBarcode(query)) {
          queryByCode(query);
        } else {
          alert("Por favor, insira um código de barras válido.");
        }
      } else {
        if (query !== "") {
          queryItemInput.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
              queryByName(query);          
              queryItemInput.value = "";
            }
          });
        } else {
          queryItemInput.placeholder =
            "Insira o código de barras ou descrição do item";

        }
      }
    }
  }

  function queryByCode(query) {
    fetch("/pdv/pesquisar-produto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then(handleResponse)
      .then((data) => {
        if (data.status === "ok") {
          addItemsToQueryList(data.data);
        } else {
          console.error("Unexpected response status:", data.status);
        }
      })
      .catch(handleError);
  }

  function queryByName(query) {
    fetch("/pdv/pesquisar-produto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then(handleResponse)
      .then((data) => {
        if (data.status === "ok") {
          addItemsToQueryList(data.data);
        } else {
          alert(data.message);
        }
      })
      .catch(handleError);
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

  function addItemsToQueryList(items) {
    modalQueryItems.style.display = "block";

    const table = document.createElement("table");
    table.id = "query-items-table";
    modalQueryItems.appendChild(table);

    const tbody = document.createElement("tbody");

    items.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.barcode}</td>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.cost}</td>
        <td>${item.price}</td>
      `;
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
  }

  function addProductToSale(product) {
    const row = document.createElement("tr");
    const quantity = 1;
    totalItems += 1;
    totalValue += parseFloat(product.price) * quantity; // Adiciona o valor do product.price;

    row.innerHTML = `
      <td>${totalItems}</td>
      <td>${product.name}</td>
      <td>${quantity}</td>
      <td>R$ ${product.price}</td>
      <td>R$ ${(product.price * quantity).toFixed(2)}</td>
      <td><button class="btn btn-remove-product">Remover</button></td>
    `;

    row.querySelector(".btn-remove-product").addEventListener("click", () => {
      removeProductFromSale(row);
      totalItems -= 1;
      updateOrderNumbers();
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

  function closeModalProducts() {
    modalProducts.style.display = "none";
    modalProductsList.innerHTML = "";
  }

  function closeSystem() {
    window.location.href = "/login";
  }
});
