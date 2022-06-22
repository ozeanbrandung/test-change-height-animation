const runOnReady = () => {
    const tabs = document.querySelector(".lc-tabs__scroll-wrapper");
    const tabButtons = tabs.querySelectorAll(".lc-tabs__tab");

    document.addEventListener('click', (e) => {
        if (e.target === tabButtons[1] || e.target.parentNode === tabButtons[1] || tabButtons[1].classList.contains('lc-tabs__tab_active')) {
            tabButtons.forEach(tab => {
                const text = tab.querySelector('.lc-tabs__tab-text');
                text.style = "color: #1A1A1A;"
            })
        } else {
            tabButtons.forEach(tab => {
                const text = tab.querySelector('.lc-tabs__tab-text');
                text.style = "color: #fff;"
            })
        }
    })
}

document.addEventListener("DOMContentLoaded", runOnReady);
