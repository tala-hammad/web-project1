const EducationalpageURL=window.location.pathname.split('/').pop();
const buttonlinks=document.querySelectorAll('.inline');
buttonlinks.forEach(link => {
    if (link.getAttribute('href') === EducationalpageURL ) {
        link.classList.add('active-btn');
    }
});
