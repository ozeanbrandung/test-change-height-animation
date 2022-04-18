const runOnReady = () => {
    /* элементы для осуществления переключения */
    const tabs = document.querySelector(".wrapper");
    const tabButtons = document.querySelectorAll(".lc-tabs__tab");
    /* --- */
    const contents = document.querySelectorAll("#vkladki .lc-tabs__content");
    //const blockWithSmoothingHeight = document.querySelector("#vkladki .lc-tabs");
    //const initialActiveItem = document.querySelector("#vkladki .lc-tabs__content.lc-tabs__content_visible");
    //const tabsHeight = document.querySelector("#vkladki .lc-tabs__scroll-wrapper").offsetHeight;

    /* для переключения табов */
    tabs.onclick = e => {
        const id = e.target.dataset.id;
        if (id) {
            tabButtons.forEach(btn => {
                btn.classList.remove("lc-tabs__tab_active");
                btn.setAttribute("aria-selected", "false");
            });
            e.target.classList.add("lc-tabs__tab_active");
            e.target.setAttribute("aria-selected", "true");

            contents.forEach(content => {
                content.classList.remove("lc-tabs__content_visible");
            });
            const element = document.getElementById(id);
            element.classList.add("lc-tabs__content_visible");
        }
    }
    /* ---- */

    /* */
    tabButtons[0].classList.remove("lc-tabs__tab_active");
    tabButtons[0].setAttribute("aria-selected", "false");
    contents[0].classList.remove("lc-tabs__content_visible");

    tabButtons[1].classList.add("lc-tabs__tab_active");
    tabButtons[1].setAttribute("aria-selected", "true");
    tabButtons[1].focus();
    contents[1].classList.add("lc-tabs__content_visible");
}

function areWeReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

//после полной прогрузки страницы:
areWeReady(runOnReady);
