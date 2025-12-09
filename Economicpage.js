const Economicpage=window.location.pathname.split('/').pop();
const buttonlinks=document.querySelectorAll('.inline');
buttonlinks.forEach(link => {
    if (link.getAttribute('href') === Economicpage ) {
        link.classList.add('active-btn');
    }
});
