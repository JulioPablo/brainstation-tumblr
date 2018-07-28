const ACCESS_TOKEN = 'efd8f49eea411ca23ebaaab6340a79417afd1c4dc52919e2c97652a879334095';
const OWN_POSTS_URL = 'https://api.netlify.com/api/v1/sites/' + location.host + '/submissions?access_token=' + ACCESS_TOKEN;

let postText = document.querySelector('#post-text');
let postPhoto = document.querySelector('#post-photo');
let photoContent = document.querySelector('#photo-modal-content');
let textContent = document.querySelector('#text-modal-content');
let closeModalBtn = document.querySelector('#close-modal-btn');

let modal = document.querySelector('#modal');
let recommendedBlogs = document.querySelector('.recommended__blogs');

let blogPostTemplate = document.querySelector('#blog-post-template');
let recommendedBlogTemplate = document.querySelector('#recommended-blog-template');
let blogPostImageContentTemplate = document.querySelector("#blog-post-image-content-template");
let blogPostTextContentTemplate =  document.querySelector("#blog-post-text-content-template");
let ownBlogPostTemplate = document.querySelector("#own-blog-post-template");

let main = document.querySelector('main');
let menu = document.querySelector('#menu');
let textPostForm = document.querySelector('#text-post-form');

textPostForm.addEventListener('submit', (e)=>{

    if(!textContent.style.display || textContent.style.display === 'none'){
        console.log('Cancelled');
        e.preventDefault();
        return false;
    }
});

closeModalBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.style.display = 'none';
    photoContent.style.display = 'none';
    textContent.style.display = 'none';
});

postPhoto.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.style.display = 'block';
    photoContent.style.display = 'flex';
});

postText.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.style.display = 'block';
    textContent.style.display = 'flex';
});

function get(url, callback){
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(j => {
        callback(j);
      });
}

get(OWN_POSTS_URL,(j)=>{
    let blogPost;
    for(let i = (j.length - 1); i >= 0; i--){
        blogPost = ownBlogPostTemplate.content.cloneNode(true);
        blogPost.querySelector('.blog-post__content').appendChild(blogPostTextContentTemplate.content.cloneNode(true));
        blogPost.querySelector('.blog-post__content__title').innerHTML = j[i].data.title;
        blogPost.querySelector('.blog-post__content__text').innerHTML = j[i].data.content;
        blogPost.querySelector('.blog-post__tags').innerHTML = j[i].data.tags;
        menu.after(blogPost);
    }
});

get('api/posts.json',(j)=>{

    let blogPost;
    for(let i = 0; i < j.length; i++){
        blogPost = blogPostTemplate.content.cloneNode(true);
        blogPost.querySelector('.profile-img-lg').src = j[i].author.avatar;
        blogPost.querySelector('.blog-post__author').innerHTML = j[i].author.name;
        blogPost.querySelector('.blog-post__content').appendChild(blogPostImageContentTemplate.content.cloneNode(true));
        blogPost.querySelector('.blog-post__image-content').src = j[i].content;
        blogPost.querySelector('.blog-post__notes span').innerHTML = j[i].notes;
        blogPost.querySelector('.blog-post__tags').innerHTML = j[i].tags.join(' ');
        main.appendChild(blogPost);
    }

});

get('api/recommended_blogs.json',(j)=>{

    let recommendedBlog;
    for(let i = 0; i < j.length; i++){
        recommendedBlog = recommendedBlogTemplate.content.cloneNode(true);
        recommendedBlog.querySelector('.profile-img-sm').src = j[i].author.avatar;
        recommendedBlog.querySelector('.blog-post__author').innerHTML = j[i].author.name;
        recommendedBlog.querySelector('.recommended__blog__name').innerHTML = j[i].blogName;
        recommendedBlogs.appendChild(recommendedBlog);
    }

});
