//insert banner
fetch('src/embed/banner.html')
    .then(res => res.text())
    .then(html => {
        document.body.insertAdjacentHTML('afterbegin', html);
        setActiveOnNav();
    });



function setActiveOnNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.navigation').forEach(link => {
        if (("/" + link.getAttribute('href')) === path) {
            link.classList.add('active');
        }
    });
}