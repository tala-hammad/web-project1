const homepageURL=window.location.pathname.split('/').pop();
const buttonlinks=document.querySelectorAll('.inline');
buttonlinks.forEach(link => {
    if (link.getAttribute('href') === homepageURL ) {
        link.classList.add('active-btn');
    }
});









