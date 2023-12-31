const initializeAccessoriesController = (device, controllerLoadCallback) => {
    const catalogContainer = $('.slider-area')

    loadAllData(['cameras', 'lenses', 'cases', 'stands', 'batteries'], function () {
        loadTab('cameras', device)
        controllerLoadCallback()
    })
}

const clearContainer = () => {
    const catalogContainer = $('.slider-area');

    catalogContainer.children('div').animate({
        opacity: 0,
        marginTop: "10",
    }, 200, function () {
        $(this).remove();
    });
}

const loadTab = (tabName, device, callback) => {
    const catalogContainer = $('.slider-area');

    if (device === 'desktop')
        CatalogRenderer.renderCatalog(catalogs[tabName], catalogContainer);
    if (device === 'mobile') {
        MobileCatalogRenderer.renderCatalog(catalogs[tabName], tabName, catalogContainer)
    }

    initializeTechnicalInfoToggle();

    catalogContainer.children('div').css({
        opacity: 0,
        marginBottom: "10",
    });

    catalogContainer.children('div').animate({
        opacity: 1,
        marginBottom: "0",
    }, 200);

    document.querySelectorAll('.slider-area .cart-btn').forEach((e) => {
        if (itemsInCart.includes(e.getAttribute('id')))
            e.classList.add('added')

        e.addEventListener('click', () => {
            if (!itemsInCart.includes(e.getAttribute('id'))) {
                itemsInCart.push(e.getAttribute('id'))
                e.classList.add('added')

            } else {
                const index = itemsInCart.indexOf(e.getAttribute('id'))
                if (index > -1)
                    itemsInCart.splice(index, 1)

                e.classList.remove('added')
            }

            console.log(itemsInCart)
        })
    })
}

const initializeTechnicalInfoToggle = () => {
    $('.tech-info-header').each((i, obj) => {
        $(obj).on('click', () => {
            $(obj).parent().toggleClass('collapsed')
        })
    })
}


const onTabButtonClick = (tab, device) => {
    const currentTab = $('.tab-btn.active')

    if (!currentTab.attr('class').includes(tab)) {
        clearContainer();
        setTimeout(() => {
            loadTab(tab, device)

            if (device === 'mobile')
                initializeBottomSheet()

        }, 200);

        currentTab.removeClass('active')
    }

    $(`.tab-${tab}`).addClass('active')
}


