
function quantityInput(e){
    let input_quantity = document.querySelector('.input_quantity')
    if (input_quantity.value == 1 && e == -1) {
       return;
    }
    let quantity = parseInt(e)
    input_quantity.value = parseInt(input_quantity.value) + quantity;
}

function copyToClipboard() {
    var copyText = document.getElementById("copyText");
    copyText.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        alert("Không thể sao chép nội dung vào clipboard. Hãy thử sao chép bằng cách nhấn Ctrl+C hoặc Cmd+C.");
    }
}

(function(){

})();

function modalShare() {
    let modal = document.querySelector('.modal_sh');
    modal.classList.toggle("show");

    let modals = document.querySelector('.modal_share-gay');
    modals.classList.toggle("show");
}


    // Weekly-2 Acticve
    $('.weekly2-news-active').slick({
        dots: true,
        infinite: true,
        speed: 600,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay:true,
        initialSlide: 3,
        loop:true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
    });









