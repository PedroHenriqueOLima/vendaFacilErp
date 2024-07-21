document.addEventListener("DOMContentLoaded", function () {
  const modalProducts = document.getElementById("modal-products");
  const modalBody = document.getElementById("modal-body");
  const modalProductsList = document.getElementById("modal-products-list");
  const searchItem = document.getElementById("searchItem");
  const btnCloseSystem = document.getElementById("btn-close-system");
  const btnCloseModal = document.getElementById("btn-close-modal");
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

  btnCloseModal.addEventListener("click", () => {
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
                displayProductsInModal(product);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Expressão para verificar se a query é um código de barras ou não
  const isBarcode = (query) => {
    const regex = /^[0-9]{13}$/;
    return regex.test(query);
  };

  // Função para adicionar produtos a lista de produtos

  function displayProductsInModal(product) {

    modalProducts.style.display = "block";
    modalBody.innerHTML = "";
    modalProductsList.innerHTML = "";

    for (let i = 0; i < product.length; i++) {
      const li = document.createElement("li");
      const barcode = document.createElement("p");
      const name = document.createElement("p");
      const quantity = document.createElement("p");
      const price = document.createElement("p");
    }

  }

  function closeSystem() {
    window.location.href = "/login";
  }

});
