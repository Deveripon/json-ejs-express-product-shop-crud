const featuredPhoto = document.getElementById("featuredPhoto");
const galleryImage = document.getElementById("galleryImage");
const featuredImagePreview = document.getElementById("featured-image-preview");
const galleryImagePreview = document.getElementById("gallery-image-preview");
const galHeading = document.getElementById("gal-heading");
let photoUrl;
let galleryImagePreviewUrl = [];
featuredPhoto.onchange = (e) => {
    let photo = e.target.files[0];
    photoUrl = URL.createObjectURL(photo);
    featuredImagePreview.setAttribute("src", photoUrl);
};
galleryImage.onchange = (e) => {
    let gallPhoto = e.target.files;
    for (let i = 0; i < gallPhoto.length; i++) {
        let gallUrl = URL.createObjectURL(gallPhoto[i]);
        galleryImagePreviewUrl.push(gallUrl);
    }
    galleryImagePreviewUrl.map((item) => {
        galleryImagePreview.innerHTML += `
   <img
   style="
   width: 200px;
   height: 200px;
   margin: 2px;
   object-fit: cover;
   border-radius: 5px;
"
   src="${item}"
   alt=""
/>
   `;
    });
    galleryImagePreview.setAttribute("style", "display:flex;gap:5px;flex-wrap:wrap;");
    galHeading.setAttribute("style", "display:block");
};
