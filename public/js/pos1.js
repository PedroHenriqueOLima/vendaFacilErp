document.addEventListener("DOMContentLoaded", function () {
  // Elementos do DOM

  const modalQueryItems = document.getElementById("modal-query-items");
  const modalProducts = document.getElementById("modal-products");
  const modalProductsList = document.getElementById("modal-products-list");
  const queryItemBtn = document.getElementById("query-btn");
  const searchItem = document.getElementById("search-item");
  const queryItemInput = document.getElementById("query-item-input");
  const btnCloseSystem = document.getElementById("btn-close-system");
  const btnCloseModalProducts = document.getElementById("btn-close-modal-products");
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

  function closeSystem() {
    window.location.href = "/login";
  }

  function closeModalProducts() {
    modalProducts.style.display = "none";
    modalProductsList.innerHTML = "";
  }

  function handleSearchInput(event) {
    const query = event.target.value.trim();
    console.log(query.length);
  }

  function queryItem() {
    modalQueryItems.style.display = "block";
  }


  
});