window.addEventListener('load', () => {
  const uploader = document.querySelector('#uploader');
  if (uploader) {
    uploader.addEventListener('change', (e) => {
      const file = uploader.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image = reader.result;
        document.querySelector('#cover_image_preview').setAttribute('src', image);
      }
    });
  }
});
