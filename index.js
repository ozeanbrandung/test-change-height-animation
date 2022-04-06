/* класс для отслеживания изменний в классах */
class ClassWatcher {
    constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
        this.targetNode = targetNode
        this.classToWatch = classToWatch
        this.classAddedCallback = classAddedCallback
        this.classRemovedCallback = classRemovedCallback
        this.observer = null
        this.lastClassState = targetNode.classList.contains(this.classToWatch)

        this.init()
    }

    init() {
        this.observer = new MutationObserver(this.mutationCallback)
        this.observe()
    }

    observe() {
        this.observer.observe(this.targetNode, { attributes: true })
    }

    // disconnect() {
    //     this.observer.disconnect()
    // }

    mutationCallback = mutationsList => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                let currentClassState = mutation.target.classList.contains(this.classToWatch)
                if(this.lastClassState !== currentClassState) {
                    this.lastClassState = currentClassState
                    if(currentClassState) {
                        this.classAddedCallback(this.targetNode)
                    }
                    else {
                        this.classRemovedCallback(this.targetNode)
                    }
                }
            }
        }
    }
}

const runOnReady = () => {
    /* элементы для осуществления переключения */
    const tabs = document.querySelector(".wrapper");
    const tabButtons = document.querySelectorAll(".lc-tabs__tab");
    /* --- */
    const contents = document.querySelectorAll("#vkladki .lc-tabs__content");
    const vkladki = document.getElementById("vkladki");
    const initialActiveItem = document.querySelector("#vkladki .lc-tabs__content.lc-tabs__content_visible");
    const tabsHeight = document.querySelector("#vkladki .lc-tabs__scroll-wrapper").offsetHeight;

    /* для переключения табов */
    tabs.onclick = e => {
        const id = e.target.dataset.id;
        if (id) {
            tabButtons.forEach(btn => {
                btn.classList.remove("lc-tabs__content_visible");
            });
            e.target.classList.add("lc-tabs__content_visible");

            contents.forEach(content => {
                content.classList.remove("lc-tabs__content_visible");
            });
            const element = document.getElementById(id);
            element.classList.add("lc-tabs__content_visible");
        }
    }
    /* ---- */

    /* первая инициализиция атрибута style　для общего контейнера */
    vkladki.style.height = initialActiveItem.offsetHeight + tabsHeight + 'px';

    /* при добавлении класса меняем высоту родителя в зависимости от высоты отображаемого сейчас нода */
    const workOnClassAdd = (node) => {
        vkladki.style.height = tabsHeight + node.scrollHeight + 'px';
    }

    const workOnClassRemoval = (node) => {
        console.log('class was removed');
    }

    contents.forEach(targetNode => {
        new ClassWatcher(targetNode, 'lc-tabs__content_visible', workOnClassAdd, workOnClassRemoval);
    })
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
