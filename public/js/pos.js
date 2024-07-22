document.addEventListener("DOMContentLoaded", function () {
  const modalProducts = document.getElementById("modal-products");
  const modalBody = document.getElementById("modal-body");
  const modalProductsList = document.getElementById("modal-products-list");
  const searchItem = document.getElementById("search-item");
  const btnCloseSystem = document.getElementById("btn-close-system");
  const btnCloseModalProducts = document.getElementById("btn-close-modal-products");

  let productsList = document.getElementById("products-list");

  btnCloseSystem.addEventListener("click", () => {
    closeSystem();
  });

  searchItem.addEventListener("keyup", (event) => {
    const query = event.target.value;
    if (isBarcode(query.trim())) {
      searchByCode(query);
    } else {
      searchByName(query);
    }

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
        if (response.ok) {
          product = response.json();
          addProductToList(product);
        } else {
          alert("Nenhum item encontrado, com este código de barras.");
        }
      })
      .catch((error) => {
        console.error(error);
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
    const productElement = document.createElement("li");
    productElement.textContent = `${product.name} - R$ ${product.price}`;
    productsList.appendChild(productElement);
  }

  function closeSystem() {
    window.location.href = "/login";
  }
});
