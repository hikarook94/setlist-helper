document.addEventListener("turbo:load", () => {
  const uploader = document.querySelector('#uploader');
  if (!uploader) return;

  uploader.addEventListener('change', event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const preview = document.querySelector('#preview');
      if (preview) {
        preview.innerHTML = `<img src="${reader.result}">`;
      }
    };

    reader.readAsDataURL(file);
  });
});
