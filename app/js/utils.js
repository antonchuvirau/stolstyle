(function() {
    function getCollectionItemIndex(DOMCollection, DOMElement) {
        return Array.from(DOMCollection).findIndex(item => item === DOMElement);
    }

    function findArrayItem(array, element) {
        return array.find(item => +item === element);
    }

    function createDOMElement(tagName, className = ``, textContent = ``) {
        const domElement = document.createElement(tagName);

        if (className) {
            domElement.classList.add(className);
        }
        if (textContent) {
            domElement.textContent = textContent;
        }

        return domElement;
    }

    function removeActiveClass(DOMCollection, activeClassName) {
        for (const collectionElement of DOMCollection) {
            collectionElement.classList.remove(activeClassName);
        }
    }

    function makeAjaxRequest(requestData) {
        return jQuery.ajax({
            url: ajax.url,
            type: 'POST',
            data: requestData
        });
    }

    window.globalUtils = {
        getCollectionItemIndex: getCollectionItemIndex,
        findArrayItem: findArrayItem,
        createDOMElement: createDOMElement,
        removeActiveClass: removeActiveClass,
        makeAjaxRequest: makeAjaxRequest
    };
})();