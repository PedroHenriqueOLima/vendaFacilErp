document.addEventListener("DOMContentLoaded", function () {
  const modalProducts = document.getElementById("modal-products");
  const modalBody = document.getElementById("modal-body");
  const modalProductsList = document.getElementById("modal-products-list");
  const searchItem = document.getElementById("searchItem");

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
                showProductsModal();
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

  // Função para mostrar modal com produtos ao pesquisar pela descrição

  function showProductsModal() {
    modalProducts.style.display = "block";
  }

  // Função para adicionar produtos a lista de produtos

  function addProductToList(product) {
    alert(product);
  }
});
