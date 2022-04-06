/* класс для отслеживания изменний в атрибутах заданного узла */
class ClassWatcher {
    constructor(targetNode, classToWatch, classAddedCallback) {
        this.targetNode = targetNode
        this.classToWatch = classToWatch
        this.classAddedCallback = classAddedCallback
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

    mutationCallback = mutationsList => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                let currentClassState = mutation.target.classList.contains(this.classToWatch)
                if(this.lastClassState !== currentClassState) {
                    this.lastClassState = currentClassState
                    if(currentClassState) {
                        this.classAddedCallback(this.targetNode)
                    }
                }
            }
        }
    }
}

//после полной прогрузки страницы:
document.addEventListener("DOMContentLoaded", function(){
    const contents = document.querySelectorAll("#vkladki .lc-tabs__content");
    const vkladki = document.getElementById("vkladki");
    const initialActiveItem = document.querySelector("#vkladki .lc-tabs__content.lc-tabs__content_visible");
    const tabsHeight = document.querySelector("#vkladki .lc-tabs__scroll-wrapper").offsetHeight;

    /* первая инициализиция атрибута style　для общего контейнера */
    vkladki.style.height = initialActiveItem.offsetHeight + tabsHeight + 'px';

    /* при добавлении класса меняем высоту родителя в зависимости от высоты отображаемого сейчас нода */
    const workOnClassAdd = (node) => {
        vkladki.style.height = tabsHeight + node.scrollHeight + 'px';
    }

    //устанавливаем слежку за каждым элементом контента
    contents.forEach(targetNode => {
        new ClassWatcher(targetNode, 'lc-tabs__content_visible', workOnClassAdd);
    })
});

