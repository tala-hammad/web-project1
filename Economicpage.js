const EconomicpageURL=window.location.pathname.split('/').pop();
const buttonlinks=document.querySelectorAll('.inline');
buttonlinks.forEach(link => {
    if (link.getAttribute('href') === EconomicpageURL ) {
        link.classList.add('active-btn');
    }
});
