const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
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
const url = "https://jsonplaceholder.typicode.com/users"; //


fetch(url)
  .then((res) => res.json())
  .then((data) => {
    /*console.log(data);*/
    users = data.map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      header.textContent = user.name;
      body.innerText = user.email;
      userCardContainer.appendChild(card);
      return { name: user.name, email: user.email, element: card };
    });
    const sortBtn = document.querySelector(".sort_btn");
    const gridBtn = document.querySelector(".grid_btn");
    const listBtn = document.querySelector(".flex_btn");

    sortBtn.addEventListener("click", () => {
      if (users) {
        users.sort((a, b) => a.name.localeCompare(b.name));
        userCardContainer.innerHTML = "";
        users.forEach((user) => {
          userCardContainer.appendChild(user.element);
        });
      }
    });
    gridBtn.addEventListener("click", () => {
        userCardContainer.classList.remove("user-cards2");
      userCardContainer.classList.add("user-cards1");
    });
    listBtn.addEventListener("click", () => {
        userCardContainer.classList.remove("user-cards1");
      userCardContainer.classList.add("user-cards2");
    });
  });
