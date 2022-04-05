const tabs = document.querySelector(".wrapper");
const tabButton = document.querySelectorAll(".lc-tabs__tab");
const contents = document.querySelectorAll(".lc-tabs__content");

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

    disconnect() {
        this.observer.disconnect()
    }

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

/* первая инициализиция атрибута style　для всех контентов */
contents.forEach(el => {
    if (el.classList.contains("lc-tabs__content_visible")) {
        const newHeight = el.scrollHeight;
        el.style.height = newHeight + 'px';
    } else {
        el.style.height = "0px";
    }
})

/* при добавлении класса lc-tabs__content_visible на какой-либо из контентов */
const workOnClassAdd = (node) => {
    console.log('class Added node: ', node)
    const newHeight = node.scrollHeight;
    node.style.height = newHeight + 'px';
}


/* при удалении класса lc-tabs__content_visible на какой-либо из контентов */
const workOnClassRemoval = (node) => {
    console.log('class removed node:', node)
    node.style.height = "0px";
}

contents.forEach(targetNode => {
    new ClassWatcher(targetNode, 'lc-tabs__content_visible', workOnClassAdd, workOnClassRemoval)
})

