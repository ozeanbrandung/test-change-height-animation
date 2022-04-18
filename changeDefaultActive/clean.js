const runOnReady = () => {
    const tabButtons = document.querySelectorAll("#tabs .lc-tabs__tab");
    const contents = document.querySelectorAll("#tabs .lc-tabs__content-wrapper .lc-tabs__content");

    tabButtons[0].classList.remove("lc-tabs__tab_active");
    tabButtons[0].setAttribute("aria-selected", "false");
    contents[0].classList.remove("lc-tabs__content_visible");

    tabButtons[1].classList.add("lc-tabs__tab_active");
    tabButtons[1].setAttribute("aria-selected", "true");
    tabButtons[1].focus();
    contents[1].classList.add("lc-tabs__content_visible");
}

//после полной прогрузки страницы:
document.addEventListener("DOMContentLoaded", runOnReady);
