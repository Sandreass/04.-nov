document.addEventListener("DOMContentLoaded", () => {
  const userCardTemplate = document.querySelector("[data-user-template]");
  const userCardContainer = document.querySelector(
    "[data-user-cards-container]"
  );
  const searchInput = document.querySelector("[data-search]");

  let users = [];

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    users.forEach((user) => {
      const isVisible =
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value);
      user.element.classList.toggle("hide", !isVisible);
    });
  });

  const url = "https://jsonplaceholder.typicode.com/users";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      users = data.map((user) => {
        const card = userCardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[data-header]");
        const body = card.querySelector("[data-body]");
        header.textContent = user.name;
        body.innerText = user.email;
        userCardContainer.appendChild(card);
        return { name: user.name, email: user.email, element: card };
      });
      applySortAndLayout(); 
    });

  const sortBtn = document.querySelector(".sort_btn");
  const gridBtn = document.querySelector(".grid_btn");
  const flexBtn = document.querySelector(".felx_btn");

  let sortState = localStorage.getItem("sortState") || "desc";
  let layoutState = localStorage.getItem("layoutState") || "grid";

  function updateSortButton() {
    if (sortState === "desc") {
      sortBtn.innerHTML = '<i class="fa-solid fa-arrow-up-z-a"></i>';
    } else {
      sortBtn.innerHTML = '<i class="fa-solid fa-arrow-down-a-z"></i>';
    }
  }

  sortBtn.addEventListener("click", () => {
    if (sortState === "desc") {
      users.sort((a, b) => a.name.localeCompare(b.name));
      sortState = "asc";
    } else {
      users.sort((a, b) => b.name.localeCompare(a.name));
      sortState = "desc";
    }
    updateSortButton();
    localStorage.setItem("sortState", sortState);
    renderUsers();
  });

  gridBtn.addEventListener("click", () => {
    userCardContainer.classList.remove("user-cards2");
    userCardContainer.classList.add("user-cards1");
    layoutState = "grid";
    localStorage.setItem("layoutState", layoutState);
  });

  flexBtn.addEventListener("click", () => {
    userCardContainer.classList.remove("user-cards1");
    userCardContainer.classList.add("user-cards2");
    layoutState = "flex";
    localStorage.setItem("layoutState", layoutState);
  });

  function renderUsers() {
    userCardContainer.innerHTML = "";
    users.forEach((user) => userCardContainer.appendChild(user.element));
  }

  function applySortAndLayout() {
  
    if (sortState === "asc") {
      users.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      users.sort((a, b) => b.name.localeCompare(a.name));
    }
    updateSortButton();
    renderUsers();

    if (layoutState === "grid") {
      userCardContainer.classList.add("user-cards1");
      userCardContainer.classList.remove("user-cards2");
    } else {
      userCardContainer.classList.add("user-cards2");
      userCardContainer.classList.remove("user-cards1");
    }
  }
}); 

