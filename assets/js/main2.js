
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











