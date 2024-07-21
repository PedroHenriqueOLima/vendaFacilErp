document.addEventListener("DOMContentLoaded", function () {
  const modalProducts = document.getElementById("modal-products");
  const modalBody = document.getElementById("modal-body");
  const modalProductsList = document.getElementById("modal-products-list");
  const searchItem = document.getElementById("search-item");
  const btnCloseSystem = document.getElementById("btn-close-system");
  const btnCloseModalProducts = document.getElementById(
    "btn-close-modal-products"
  );
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
          product = response.json();
          addProductsToModal(product);
        } else {
          alert("Nenhum item encontrado, com este nome.");
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

    products.forEach((product) => {
      
    });
    
  }

  function closeSystem() {
    window.location.href = "/login";
  }
});
