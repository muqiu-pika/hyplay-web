document.addEventListener('DOMContentLoaded', () => {
    const sideBarToggle = document.querySelector('.side-bar-toggle');
    const sideBar = document.querySelector('.side-bar');

    const mediaQuery = window.matchMedia('(min-width: 769px)');

    function handleScreenChange(e) {
        if (e.matches) {
            sideBar.classList.remove('open');
            sideBarToggle.classList.remove('open');
            sideBarToggle.classList.remove('fa-solid', 'fa-xmark');
            sideBarToggle.classList.add('fa-solid', 'fa-bars');
            sideBarToggle.style.transform = 'rotate(0deg)';
            sideBarToggle.textContent = '';
        }
    }

    mediaQuery.addListener(handleScreenChange);
    handleScreenChange(mediaQuery);

    sideBarToggle.addEventListener('click', () => {
        sideBar.classList.toggle('open');
        sideBarToggle.classList.toggle('open');
        sideBarToggle.textContent = '';
        if (sideBar.classList.contains('open')) {
            sideBarToggle.classList.remove('fa-solid', 'fa-bars');
            sideBarToggle.classList.add('fa-solid', 'fa-xmark');
            sideBarToggle.style.transform = 'rotate(90deg)';
        } else {
            sideBarToggle.classList.remove('fa-solid', 'fa-xmark');
            sideBarToggle.classList.add('fa-solid', 'fa-bars');
            sideBarToggle.style.transform = 'rotate(0deg)';
        }
    });
});
