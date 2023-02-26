const loadPhones = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
};

const displayPhones = (phones) => {
  //console.log(phones);
  //   show 10 phones only
  phones = phones.slice(0, 10);
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerHTML = "";

  //   no phone found warning
  const noPhoneFound = document.getElementById("no-phone-found");
  if (phones.length === 0) {
    // removing display none
    noPhoneFound.classList.remove("d-none");
  } else {
    noPhoneFound.classList.add("d-none");
  }

  phones.forEach((phone) => {
    console.log(phone);

    // creating div element
    const div = document.createElement("div");
    // adding a class to the created element
    div.classList.add("col");

    // setting innerHtml with the help of backtick
    div.innerHTML = `
    <div class="card">
    <img src="${phone.image}" class="img-fluid card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">
      brand: ${phone.brand}
      slug: ${phone.slug}
      </p>
    </div>
  </div>
    `;
    // adding created element to the parent element
    phonesContainer.appendChild(div);
  });
};

document.getElementById("btn-search").addEventListener("click", function () {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = "";
  loadPhones(searchText);
});

//loadPhones();
