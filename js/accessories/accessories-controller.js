const initializeAccessoriesController = (callback) => {
    const catalogContainer = $('.slider-area')

    loadAllData(['lenses', 'cases', 'stands', 'batteries'], function () {
        loadTab('lenses')
        callback()
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

const loadTab = (tabName) => {
    const catalogContainer = $('.slider-area');

    renderCatalog(catalogs[tabName], catalogContainer);
    initializeTechnicalInfoToggle();

    catalogContainer.children('div').css({
        opacity: 0,
        marginBottom: "10",
    });

    catalogContainer.children('div').animate({
        opacity: 1,
        marginBottom: "0",
    }, 200);
}

const initializeTechnicalInfoToggle = () => {
    $('.tech-info-header').each((i, obj) => {
        $(obj).on('click', () => {
            $(obj).parent().toggleClass('collapsed')
        })
    })
}


const onTabButtonClick = (tab) => {
    const currentTab = $('.tab-btn.active')

    if (!currentTab.attr('class').includes(tab)) {
        clearContainer();
        setTimeout(() => {
            loadTab(tab)
        }, 200);

        currentTab.removeClass('active')
    }

    $(`.tab-${tab}`).addClass('active')
}


