const baseHTML = `
<div class="item-card">
    <div class="image-header-container">
        <img class="item-image" src="%image%" width=340 height=340 alt="%name% image"/>
        <div>
            <span class="item-name text-t1-bold">%name%</span>
            <span class="item-price text-t1-bold">%price%</span>
        </div>
    </div>
    <div class="buttons-container">
        <button class="small-btn btn-dark">
            <span class="text-t3">Add to cart</span>
            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.4688 7.5C12.4688 7.67405 12.3996 7.84097 12.2765 7.96404C12.1535 8.08711 11.9865 8.15625 11.8125 8.15625H7.65625V12.3125C7.65625 12.4865 7.58711 12.6535 7.46404 12.7765C7.34097 12.8996 7.17405 12.9688 7 12.9688C6.82595 12.9688 6.65903 12.8996 6.53596 12.7765C6.41289 12.6535 6.34375 12.4865 6.34375 12.3125V8.15625H2.1875C2.01345 8.15625 1.84653 8.08711 1.72346 7.96404C1.60039 7.84097 1.53125 7.67405 1.53125 7.5C1.53125 7.32595 1.60039 7.15903 1.72346 7.03596C1.84653 6.91289 2.01345 6.84375 2.1875 6.84375H6.34375V2.6875C6.34375 2.51345 6.41289 2.34653 6.53596 2.22346C6.65903 2.10039 6.82595 2.03125 7 2.03125C7.17405 2.03125 7.34097 2.10039 7.46404 2.22346C7.58711 2.34653 7.65625 2.51345 7.65625 2.6875V6.84375H11.8125C11.9865 6.84375 12.1535 6.91289 12.2765 7.03596C12.3996 7.15903 12.4688 7.32595 12.4688 7.5Z" fill="#E5E7E8"/>
            </svg>
        </button>
        <div class="color-selector">
        </div>        
    </div>
    <div class="divider"></div>
    <span class="item-type text-t3">%type%</span>
    <span class="text-t3 item-description">%description%</span>
    <div class="divider description-divider"></div>
    <div class="properties-info-container"></div>
    <div class="divider properties-divider"></div>
    <div class="tech-info-wrapper collapsed">
        <div class="tech-info-header">
            <span class="text-t3">Technical information</span>
            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="caretDown">
                    <path id="Vector" d="M11.6845 6.05953L7.30953 10.4345C7.2689 10.4752 7.22065 10.5075 7.16754 10.5295C7.11442 10.5515 7.05749 10.5628 7 10.5628C6.9425 10.5628 6.88557 10.5515 6.83246 10.5295C6.77935 10.5075 6.7311 10.4752 6.69047 10.4345L2.31547 6.05953C2.23338 5.97744 2.18726 5.8661 2.18726 5.75C2.18726 5.6339 2.23338 5.52256 2.31547 5.44047C2.39756 5.35837 2.5089 5.31226 2.625 5.31226C2.7411 5.31226 2.85244 5.35837 2.93453 5.44047L7 9.50648L11.0655 5.44047C11.1061 5.39982 11.1544 5.36758 11.2075 5.34558C11.2606 5.32358 11.3175 5.31226 11.375 5.31226C11.4325 5.31226 11.4894 5.32358 11.5425 5.34558C11.5956 5.36758 11.6439 5.39982 11.6845 5.44047C11.7252 5.48112 11.7574 5.52937 11.7794 5.58248C11.8014 5.63559 11.8127 5.69251 11.8127 5.75C11.8127 5.80748 11.8014 5.86441 11.7794 5.91752C11.7574 5.97063 11.7252 6.01888 11.6845 6.05953Z" fill="#1C1C1C"/>
                </g>    
            </svg>
        </div>
        <div class="tech-info-container"></div>
    </div>
    <button class="small-btn btn-secondary">
        <span class="text-t3">Show more</span>
    </button>
</div>`

const hideElement = (html, property) => {
   return html.replaceAll(`${property}`, `${property} hidden`)
}

const setBaseInfo = (baseHTML, item) => {
    let result = baseHTML;

    if (item['image'] !== undefined)
        result = result.replaceAll('%image%', item.image)
    else
        result = hideElement(result, 'item-image')

    if (item['name'] !== undefined)
        result = result.replaceAll('%name%', item.name)
    else
        result = hideElement(result, 'item-name')

    if (item['price'] !== undefined)
        result = result.replaceAll('%price%', item.price)
    else
        result = hideElement(result, 'item-price')

    if (item['type'] !== undefined)
        result = result.replaceAll('%type%', item.type)
    else
        result = hideElement(result, 'item-type')

    if (item['description'] !== undefined)
        result = result.replaceAll('%description%', item.description)
    else
        result = hideElement(result, 'item-description')

    return result;
}

const setTechnicalInfo = (baseHTML, item) => {
    const techInfo = item['technical'];
    if (techInfo === undefined) {
        return hideElement(baseHTML, 'tech-info-wrapper');
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

const setPropertiesInfo = (baseHTML, item) => {
    const properties = item['properties'];
    if (properties === undefined) {
        let result = hideElement(baseHTML, 'properties-info-container');
        return hideElement(result, 'properties-divider')
    }

    const DOMItem = document.createElement('div');
    DOMItem.innerHTML = baseHTML;
    const container = $(DOMItem).find('.properties-info-container');

    console.log(Object.entries(properties))
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

const setColorsSelector = (baseHTML, item) => {
    const colors = item['available-colors'];
    if (colors === undefined)
        return hideElement(baseHTML, 'color-selector')

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

const getItemHTML = (item) => {
    let html = setBaseInfo(baseHTML, item);
    html = setColorsSelector(html, item);
    html = setPropertiesInfo(html, item);
    html = setTechnicalInfo(html, item);

    return document.createElement('div').innerHTML = html;
}

const renderCatalog = (catalogElements, parentElement) => {
    catalogElements.forEach(function (e) {
        parentElement.append(getItemHTML(e));
    })
}
