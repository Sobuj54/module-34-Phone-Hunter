const loadPhones = async () => {
  const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
};

const displayPhones = (phones) => {
  //console.log(phones);
  const phonesContainer = document.getElementById("phones-container");
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

loadPhones();
