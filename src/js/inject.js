//insert banner
fetch('/src/embed/banner.html')
    .then(res => res.text())
    .then(html => {
        document.body.insertAdjacentHTML('afterbegin', html);
        setActiveOnNav();
    });

//insert footer
fetch('/src/embed/footer.html')
    .then(res => res.text())
    .then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
    });

function setActiveOnNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.navigation').forEach(link => {
        // for main paage
        if (path == "/" && link.getAttribute('href') === "/index.html") {
            link.classList.add('active');
            return;
        }

        //for other pages if path is other than '/
        if ((link.getAttribute('href')) === path) {
            link.classList.add('active');
        }
    });
}