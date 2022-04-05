const tabs = document.querySelector(".wrapper");
const tabButton = document.querySelectorAll(".lc-tabs__tab");
const contents = document.querySelectorAll(".lc-tabs__content");
const vkladki = document.getElementById("vkladki");
const initialActiveItem = document.querySelector(".lc-tabs__content.lc-tabs__content_visible");
const tabsHeight = 41;

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

/* для переключения табов */
tabs.onclick = e => {
    const id = e.target.dataset.id;
    if (id) {
        tabButton.forEach(btn => {
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
vkladki.style.height = initialActiveItem.scrollHeight + tabsHeight + 'px';

/* при добавлении класса меняем высотц родителя в зависимости от высоты добавленного нода */
const workOnClassAdd = (node) => {
    vkladki.style.height = tabsHeight + node.scrollHeight + 'px';
}

const workOnClassRemoval = (node) => {
    console.log('class was removed');
}

contents.forEach(targetNode => {
    new ClassWatcher(targetNode, 'lc-tabs__content_visible', workOnClassAdd, workOnClassRemoval)
})

