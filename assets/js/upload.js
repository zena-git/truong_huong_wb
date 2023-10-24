const CLOUD_NAME = "dgxbxvkso";
const UPLOAD_PRESET = "upload_truonghuong";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

function uploadDinary(e) {
    const file = fileInput.files[0];
  const fileInput = document.querySelector('.fileInput');
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  // Tạo yêu cầu XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.open("POST", API_URL, true);

  // Xác định hành động sau khi tải lên thành công
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      console.log("Tải lên thành công:", response);
      // Ở đây, bạn có thể lấy URL của ảnh từ response và làm gì bạn muốn với nó
    } else {
      console.error("Lỗi khi tải lên:", xhr.statusText);
    }
  };

  // Gửi yêu cầu tải lên
  xhr.send(formData);
}