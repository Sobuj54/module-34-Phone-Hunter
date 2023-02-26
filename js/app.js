const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};
// -------------------->
const displayPhones = (phones, dataLimit) => {
  //console.log(phones);
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerHTML = "";

  //   show 10 phones only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  //   no phone found warning
  const noPhoneFound = document.getElementById("no-phone-found");
  if (phones.length === 0) {
    // removing display none
    noPhoneFound.classList.remove("d-none");
  } else {
    noPhoneFound.classList.add("d-none");
  }

  phones.forEach((phone) => {
    //console.log(phone);

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
      <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
    `;
    // adding created element to the parent element
    phonesContainer.appendChild(div);
  });
  //   stop spinner
  toggleSpinner(false);
};
// ------------------------------------>
const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};
//------------------------------------------>
document.getElementById("btn-search").addEventListener("click", function () {
  // start spinner
  processSearch(10);
});
// ------------------------>
// enter key event handler
// enter key event handler is used on input field not in button
document
  .getElementById("search-field")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      processSearch(10);
    }
  });
// --------------------------------------------->
// spinner function
const toggleSpinner = (isTrue) => {
  const spinner = document.getElementById("spinner");
  if (isTrue) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};
// -------------------------------------------->
// show all
document.getElementById("btn-showAll").addEventListener("click", function () {
  processSearch();
});
// ------------------------>
const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.data);
};

//loadPhones();
