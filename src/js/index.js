let postText = document.querySelector('#post-text');
let postPhoto = document.querySelector('#post-photo');
let photoContent = document.querySelector('#photo-modal-content');
let textContent = document.querySelector('#text-modal-content');
let closeModalBtn = document.querySelector('#close-modal-btn');
let modal = document.querySelector('#modal');

closeModalBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.style.display = 'none';
    photoContent.style.display = "none";
    textContent.style.display = "none";
});

postPhoto.addEventListener('click', (e)=>{
    modal.style.display = "block";
    photoContent.style.display = "flex";
});

/*postText.addEventListener('click', (e)=>{
    modal.style.display = "block";
    textContent.style.display = "flex";
});*/
