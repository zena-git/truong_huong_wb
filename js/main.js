(
    function () {
        const menuMobileChildItems = document.querySelectorAll('.menu_mobile-child');

        // Lặp qua từng phần tử và thêm sự kiện click
        menuMobileChildItems.forEach(item => {
            const childList = item.querySelector('.menu_child-list');

            // Thêm sự kiện click vào phần tử cha
            item.addEventListener('click', () => {
                console.log(item);
                // Toggle lớp 'active' trên phần tử con (menu_child-list)
                childList.classList.toggle('actives');
            });
        });

    }
)();


function toggleFindProBox(element) {
    var findProBox = element.nextElementSibling; // Lấy phần find_pro-box kế tiếp của phần tử được nhấp
    if (findProBox.style.display === "block") {
        findProBox.style.display = "none"; // Ẩn nếu đang hiển thị
    } else {
        findProBox.style.display = "block"; // Hiển thị nếu đang ẩn
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".swiper-container", {
        slidesPerView: "auto",
        spaceBetween: 10,
        grabCursor: true, // Cho phép con trỏ chuột trở thành biểu tượng "kéo"
        scrollbar: {
            el: ".swiper-scrollbar", // Thêm thanh cuộn tùy chỉnh
            hide: false, // Ẩn thanh cuộn mặc định của Swiper
        },
    });
});