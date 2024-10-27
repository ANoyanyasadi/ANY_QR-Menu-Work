//! Arayüze(Website ekranına) etki edecek bütün Fonksyonlar burada tutulacak.

//!Menü List DİV'ini Çağır
const menuList = document.getElementById('menu-List');

//! Menü elemanlarını parametre olarak alıp dizideki her bir elemen için ekrana kart bas 

export const renderCards = (data) => {
    const cardsHTML = data.map((item) => `
      <a
        href="/detail.html?id=${item.id}"
        id="card"
        class="d-flex flex-column flex-md-row text-dark gap-3 text-decoration-none"
      >
        <img
          class="rounded shadow img-fluid"
          src="${item.img}"
        />

        <div>
          <div class="d-flex justify-content-between">
            <h5>${item.title}</h5>
            <p class="text-success fw-bold">${(item.price * 30).toFixed(
              2
            )}₺</p>
          </div>

          <p class="lead">
          ${item.desc}
          </p>
        </div>
      </a>  
  `
    )
    .join("");
    
    menuList.innerHTML = cardsHTML;
};