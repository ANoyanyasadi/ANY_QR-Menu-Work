import { renderCards } from "./Scripts/ui.js";

//*! Data'ya her yerde ulaşabilmek için LET ile global değişken tanımladık
let data;

//*! Verileri DB.JSON dan çekmek için fonksyon
async function fetchMenu() {
    //*! Api den Verileri Almak
   const res = await fetch('./db.json');

    //*! Json verisini JS formatına Çevir
    data = await res.json();
    console.log(data);
}

//*! Sayfanın Yüklenme Olayını İzle

window.addEventListener('DOMContentLoaded', () => {
    //! Verileri Çeken Fonksyonu Çalıştır
    fetchMenu()
    .then(() => renderCards(data.menu));
});

//! Buttons alanındaki Inputs'ları Çağır
const inputs = document.querySelectorAll('#buttons input'); 

//! Inputlar dizisini dön

inputs.forEach((input) => {
    input.addEventListener('change', () => {
        const selected = input.id;

        if(selected === 'all') {
            renderCards(data.menu);
        } else {
            const filtered = data.menu.filter((i) => i.category ===
            selected);
            
            renderCards(filtered);
        }        
    });
});


