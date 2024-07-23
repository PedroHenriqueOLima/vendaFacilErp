document.addEventListener("DOMContentLoaded", function () {
  const modalProducts = document.getElementById("modal-products");
  const modalBody = document.getElementById("modal-body");
  const modalProductsList = document.getElementById("modal-products-list");
  const searchItem = document.getElementById("search-item");
  const btnCloseSystem = document.getElementById("btn-close-system");
  const btnCloseModalProducts = document.getElementById(
    "btn-close-modal-products"
  );
  let productsSaleList = document.getElementById("products-list-body");

  // Variavel de contagem dos items

  let totalItems = 0;

  let debounceTimeout;

  btnCloseSystem.addEventListener("click", () => {
    closeSystem();
  });

  searchItem.addEventListener("keyup", (event) => {
    const query = event.target.value;

    // Limpa o timeout anterior
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (isNumeric(query.trim())) {
        if (isBarcode(query)) {
          searchByCode(query);
        } else {
          alert("Por favor, insira um código de barras válido.");
        }
      } else if (query.trim() === "") {
        alert("Por favor, insira um nome ou um código de barras.");
      } else {
        searchByName(query);
      }
    }, 1200); // 500ms de atraso

    event.preventDefault();
  });
  // Função de busca pelo código de barras
  function searchByCode(query) {
    fetch("/pdv/pesquisar-produto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Converter a resposta para JSON
      })
      .then((data) => {
        console.log(data); // Para depuração
        if (data.status ===  'ok') {
          const product = data.data; // Extrair produtos do campo `data`
          addProductToSale(product); // Passar produtos para sua função
        } else {
          console.error("Unexpected response status:", data.status);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  // Fechando o modal

  btnCloseModalProducts.addEventListener("click", () => {
    modalProducts.style.display = "none";
    modalBody.innerHTML = "";
    modalProductsList.innerHTML = "";
  });

  // Função de busca pelo nome
  function searchByName(query) {
    fetch("/pdv/pesquisar-produto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the JSON from the response
        } else {
          alert("Nenhum item encontrado, com este nome.");
          throw new Error("Network response was not ok.");
        }
      })
      .then((result) => {
        console.log(result); // Log the full result object for debugging
        if (result.status === "ok") {
          const products = result.data; // Extract the products from the `data` key
          addProductsToModal(products); // Pass the products to your function
        } else {
          console.error("Unexpected response status:", result.status);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Expressão para verificar se a query é um código de barras ou não

  function isBarcode(query) {
    return /^\d{13}$/.test(query);
  }

  // Função para verificar se a entrada é um número

  function isNumeric(input) {
    return /^\d+$/.test(input);
  }

  // Função para adicionar produtos a lista de produtos

  function addProductsToModal(products) {
    modalProducts.style.display = "block";
    modalProductsList.innerHTML = "";

    // Create table and its elements
    const table = document.createElement("table");
    table.id = "product-table";

    // Create table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const nameHeader = document.createElement("th");
    nameHeader.textContent = "Nome";
    headerRow.appendChild(nameHeader);

    const quantityHeader = document.createElement("th");
    quantityHeader.textContent = "Estoque";
    headerRow.appendChild(quantityHeader);

    const priceHeader = document.createElement("th");
    priceHeader.textContent = "Preço";
    headerRow.appendChild(priceHeader);

    const buttonHeader = document.createElement("th");
    buttonHeader.textContent = "Adicionar a Venda";
    headerRow.appendChild(buttonHeader);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement("tbody");

    products.forEach((product) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = product.name;
      row.appendChild(nameCell);

      const quantityCell = document.createElement("td");
      quantityCell.textContent = product.quantity;
      row.appendChild(quantityCell);

      const priceCell = document.createElement("td");
      priceCell.textContent = `R$ ${product.price}`;
      row.appendChild(priceCell);

      const buttonCell = document.createElement("td");
      const button = document.createElement("button");
      button.textContent = "Incluir na Venda";
      button.addEventListener("click", () => {
        addProductToSale(product);
        modalProducts.style.display = "none";
      });
      buttonCell.appendChild(button);
      row.appendChild(buttonCell);

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    modalProductsList.appendChild(table);
  }

  // Função para adicionar produtos a lista de vendas

  function addProductToSale(product) {
    // Definindo a quantidade como um item por padrão

    let quantity = 1;

    // Adicionando + 1 a quantidade de items da venda

    // Registrando cada produto em uma linha

    totalItems += 1;
    const row = document.createElement("tr");

    let orderNumber = document.createElement("td");
    orderNumber.textContent = totalItems;
    row.appendChild(orderNumber);

    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;
    row.appendChild(nameCell);

    const quantityCell = document.createElement("td");
    quantityCell.textContent = quantity;

    const priceCell = document.createElement("td");
    priceCell.textContent = `R$ ${product.price}`;

    const totalCell = document.createElement("td");
    totalCell.textContent = `R$ ${(product.price * quantity).toFixed(2)}`;

    const actionCell = document.createElement("td");

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";
    removeButton.classList.add("btn", "btn-remove-product");

    removeButton.addEventListener("click", () => {
      removeProductFromSale(row);
      totalItems -= 1;
      orderNumber.textContent = orderNumber - 1;
    });
    actionCell.appendChild(removeButton);

    row.appendChild(orderNumber);
    row.appendChild(nameCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(totalCell);
    row.appendChild(actionCell);

    productsSaleList.appendChild(row);
  }

  // Função para remover produtos da lista de vendas

  function removeProductFromSale(row) {
    const parent = row.parentNode;
    parent.removeChild(row);
  }
  function closeSystem() {
    window.location.href = "/login";
  }
});
