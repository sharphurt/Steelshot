class MobileCatalogRenderer {
    static baseHTML = `
     <div class="item-card" id="%id%" tab="%tab%">
            <img class="item-image" src="%image%" width="170" height="170">
            <div class="item-text-container">
                <span class="text-t2-bold item-name">%name%</span>
                <span class="text-t2-bold item-price">%price%</span>
                <span class="text-t3 item-type">%type%</span>
            </div>
            
            <div class="item-card-trigger">
            
            </div>
            <button class="small-btn cart-btn" id="%id%">
                <span class="text-t3">Add to card</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M12.4688 7.5C12.4688 7.67405 12.3996 7.84097 12.2765 7.96404C12.1535 8.08711 11.9865 8.15625 11.8125 8.15625H7.65625V12.3125C7.65625 12.4865 7.58711 12.6535 7.46404 12.7765C7.34097 12.8996 7.17405 12.9688 7 12.9688C6.82595 12.9688 6.65903 12.8996 6.53596 12.7765C6.41289 12.6535 6.34375 12.4865 6.34375 12.3125V8.15625H2.1875C2.01345 8.15625 1.84653 8.08711 1.72346 7.96404C1.60039 7.84097 1.53125 7.67405 1.53125 7.5C1.53125 7.32595 1.60039 7.15903 1.72346 7.03596C1.84653 6.91289 2.01345 6.84375 2.1875 6.84375H6.34375V2.6875C6.34375 2.51345 6.41289 2.34653 6.53596 2.22346C6.65903 2.10039 6.82595 2.03125 7 2.03125C7.17405 2.03125 7.34097 2.10039 7.46404 2.22346C7.58711 2.34653 7.65625 2.51345 7.65625 2.6875V6.84375H11.8125C11.9865 6.84375 12.1535 6.91289 12.2765 7.03596C12.3996 7.15903 12.4688 7.32595 12.4688 7.5Z"
                          fill="#E5E7E8"/>
                </svg>
                  <svg class="check" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M12.5595 4.24727L5.55953 11.2473C5.5189 11.288 5.47065 11.3202 5.41754 11.3422C5.36442 11.3643 5.30749 11.3756 5.25 11.3756C5.1925 11.3756 5.13557 11.3643 5.08246 11.3422C5.02935 11.3202 4.9811 11.288 4.94047 11.2473L1.87797 8.18477C1.79588 8.10268 1.74976 7.99134 1.74976 7.87524C1.74976 7.75915 1.79588 7.6478 1.87797 7.56571C1.96006 7.48362 2.0714 7.4375 2.1875 7.4375C2.3036 7.4375 2.41494 7.48362 2.49703 7.56571L5.25 10.3192L11.9405 3.62821C12.0226 3.54612 12.1339 3.5 12.25 3.5C12.3661 3.5 12.4774 3.54612 12.5595 3.62821C12.6416 3.7103 12.6877 3.82165 12.6877 3.93774C12.6877 4.05384 12.6416 4.16518 12.5595 4.24727Z" fill="#1C1C1C"/>
                  </svg>
            </button>
        </div>
`

    static popupBaseInfo = `
    <img class="item-image" src="%image%">
    <div class="item-text-container">
        <span class="text-t1-bold item-name">%name%</span>
        <span class="text-t2-bold item-price">%price%</span>
        <span class="text-t3 item-type">%type%</span>
    </div>
    <div class="divider"></div>
    <span class="text-t2 item-description">%description%</span>
    <div class="divider description-divider"></div>
    <div class="properties-info-container"></div>
    <div class="divider properties-divider"></div>
    <div class="tech-info-wrapper collapsed">
        <div class="tech-info-header">
            <span class="text-t3">Technical information</span>
        </div>
        <div class="tech-info-container"></div>
    </div>
`
    static hideElement = (html, property) => {
        return html.replaceAll(`${property}`, `${property} hidden`)
    }

    static  setBaseInfo = (baseHTML, item, tabName) => {
        let result = baseHTML;
        result = result.replaceAll('%id%', item.id)
        result = result.replaceAll('%tab%', tabName)

        if (item['image'] !== undefined)
            result = result.replaceAll('%image%', item.image)
        else
            result = this.hideElement(result, 'item-image')

        if (item['name'] !== undefined)
            result = result.replaceAll('%name%', item.name)
        else
            result = this.hideElement(result, 'item-name')

        if (item['price'] !== undefined)
            result = result.replaceAll('%price%', item.price)
        else
            result = this.hideElement(result, 'item-price')

        if (item['description'] !== undefined)
            result = result.replaceAll('%description%', item.description)
        else
            result = this.hideElement(result, 'item-description')

        if (item['type'] !== undefined)
            result = result.replaceAll('%type%', item.type)
        else
            result = this.hideElement(result, 'item-type')

        return result;
    }

    static getItemHTML = (item, tebName) => {
        let html = this.setBaseInfo(this.baseHTML, item, tebName);
        return document.createElement('div').innerHTML = html;
    }
    static renderCatalog = (catalogElements, tabName, parentElement) => {
        catalogElements.forEach((e) => {
            parentElement.append(this.getItemHTML(e, tabName));
        })
    }
    static setTechnicalInfo = (baseHTML, item) => {
        const techInfo = item['technical'];
        if (techInfo === undefined) {
            return this.hideElement(baseHTML, 'tech-info-wrapper');
        }

        const DOMItem = document.createElement('div');
        DOMItem.innerHTML = baseHTML;
        const container = $(DOMItem).find('.tech-info-container');

        Object.entries(techInfo).forEach(function (e) {
            const readableName = namesMapping[e[0]];
            const value = e[1];
            const html = `
            <div>  
                <span class="text-t3">${readableName}</span>
                <span class="text-t3">${value}</span>
            </div>
        `
            container.append(html);
        });

        return DOMItem.innerHTML;
    }

    static setPropertiesInfo = (baseHTML, item) => {
        const properties = item['properties'];
        if (properties === undefined) {
            let result = this.hideElement(baseHTML, 'properties-info-container');
            return this.hideElement(result, 'properties-divider')
        }

        const DOMItem = document.createElement('div');
        DOMItem.innerHTML = baseHTML;
        const container = $(DOMItem).find('.properties-info-container');

        Object.entries(properties).forEach(function (e) {
            const readableName = namesMapping[e[0]];
            const value = e[1];
            const html = `
            <div>  
                <span class="text-t3">${readableName}</span>
                <span class="text-t3">${value}</span>
            </div>
        `
            container.append(html);
        });

        return DOMItem.innerHTML;
    }

    static setColorsSelector = (baseHTML, item) => {
        const colors = item['available-colors'];
        if (colors === undefined)
            return this.hideElement(baseHTML, 'color-selector')

        const DOMItem = document.createElement('div');
        DOMItem.innerHTML = baseHTML;
        const container = $(DOMItem).find('.color-selector');

        colors.forEach(function (e, i) {
            let html = `<input type="radio" style="background-color: ${e}; border-color: ${e};" id="${e}" name="${item.id}" value="${e}" />`
            if (i === 0)
                html = `<input type="radio" checked style="background-color: ${e}; border-color: ${e};" id="${e}" name="${item.id}" value="${e}" />`
            container.append(html);
        });

        return DOMItem.innerHTML;
    }

    static renderPopup = (item, parentElement) => {
        let html = this.setBaseInfo(this.popupBaseInfo, item);
        html = this.setColorsSelector(html, item);
        html = this.setPropertiesInfo(html, item);
        html = this.setTechnicalInfo(html, item);
        const element = document.createElement('div')
        parentElement.innerHTML = html
    }
}