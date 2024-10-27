
const params = new URLSearchParams(window.location.search);
//search-params ile window daki search kısmına erişebiliriz. 

//Yukarıdaki classtan oluşturduğumuz nesne sayesinde urldeki arama
//parametrelerini güncellemeye  / erişmeye silmeye yarayan methodlarını 
//kullanabiliyoruz. Ve bu şekilde Get methodu ile ''id'' 
//parametresine ulaştık 

const id = params.get('id');


/*1) Sayfanın yüklenme olayını izle (ASYNC VE AWAIT İŞLEMLERİ GENELDE API LERDEN KULLANILIYOR
FETCH İLE DB.JASON DAN KENDİ OLUŞTURDUĞUMUZ API Yİ ÇEKİYORUZ, FETCH İŞLEMİNİ DE DEĞİŞKENE AKTARIYORUZ,
ANCAK VERİLER ALINMASI BİR KAÇ SANİYE SÜREBİLİYOR VE BU AŞAMADA BEKLEMESİNİ İSTİYORUZ, BEKLEMEZSE PENDING YAZIYOR
BU NEDENLE ASYNC VE AWAIT YAPISINI KULLANIYORUZ */
document.addEventListener('DOMContentLoaded', async () => {

/* 2) API'dan verileri Al */ 
try {
    const res = await fetch('./db.json');
    const data = await res.json();

/* 3) Veriler arasından url'deki id'ye denk gelen ürünü bul */
const product = data.menu.find((item)=> item.id == id);


if(!product) {
// 4) Ürün bulunamazsa: 404 sayfasını RENDERLA (EKRANA BAS) KULLANICI TARAYICIYA YANLIŞ YAZARSA SİTE İSMİNİ, 404 YAZISI ÇIKMASI İÇİN EKRANA...
renderNotFound();
} else {
    // 5) Ürün bulunuyorsa sayfa içeriğini API den aldığımız ürüne göre RENDERLA.
    renderPage(product);
}
} catch (error) {
    renderNotFound();
    return alert('üzgünüz bir sorun oluştu');
}
});

//! Sayfa içerisine basacağımız divi çağırdık. GetElementById ile ID ye ulaştık 
const outlet = document.getElementById('outlet');

//! Sayfa içeriğini basmak için RENDER özelliği kullanmalıyız. Render edebilmek için INNERHTML ile html den DIV alıp şekillendirmeliyiz. 
function renderPage(product) {
    outlet.innerHTML = `
     <div class="d-flex justify-content-between fs-5">
            <a href="#">
                <img width="35px" src="./Images/home (1).png">
            </a>

            <p>Anasayfa / ${product.category} 
            / ${product.title.toLowerCase()}</p>
        </div>
        <h1 class="text-center my-4">${product.title}</h1>

        <img src="${product.img}"
        style='max-height=400px'
        class="rounded object-fit-cover shadow">
        <h4>
            <span class="my-4">Ürünün Kategorisi</span>
            <span class="text-success">${product.category}</span>
        </h4>

        <h4>
            <span class="my-4">Ürünün Fiyatı</span>
            <span class="text-success">${(product.price*30).toFixed(2)} ₺</span>
        </h4>

        <P class="lead">${product.desc}</P>
    `; 
}

//! 404 Hatası sayfa içeriğini ekrana basan Fonksyon

function renderNotFound() {
    outlet.innerHTML = `
    <div style="height:90vh" class="d-flex justify-content-center align-items-center">
    <div class="d-flex flex-column align-items-center gap-3">
      <h1 class="text-center">Aradığınız ürün mevcut değil</h1>
  
      <a href="/">Anasayfaya Dönün</a>
   </div>
    </div>  
      `;
  }