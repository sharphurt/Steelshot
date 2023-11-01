const setIsSheetShown = (isShown, sheet, item) => {
    if (isShown === true) {
        MobileCatalogRenderer.renderPopup(item, document.querySelector('.item-detailed-info'))
        $('body').css("overflow", "hidden");

        const popUpButton = $('.controls .cart-btn');
        const catalogButton = $(`.slider-area button[id=${item.id}]`)

        renderActualButtonState([popUpButton], item)
        popUpButton.off()
        popUpButton.on('click', (e) => {
            setActualButtonState([popUpButton, catalogButton], item)
        })
    } else {
        $('body').css("overflow", "auto");
    }
    sheet.setAttribute("aria-hidden", String(!isShown))
}

const setActualButtonState = (buttons, item) => {
    if (!itemsInCart.includes(item.id.toString())) {
        itemsInCart.push(item.id.toString())
    } else {
        const index = itemsInCart.indexOf(item.id.toString())
        if (index > -1)
            itemsInCart.splice(index, 1)
    }

    renderActualButtonState(buttons, item)
}

const renderActualButtonState = (buttons, item) => {
    if (itemsInCart.includes(item.id.toString())) {
        buttons.forEach(button => button.addClass('added'))
    } else {
        buttons.forEach(button => button.removeClass('added'))
    }
}

const initializeBottomSheet = () => {
    linkItems()
}

const linkItems = () => {
    const sheet = document.querySelector("#sheet")
    const openSheetButton = document.querySelectorAll(".item-card-trigger")

    openSheetButton.forEach((e) => {
        const itemId = parseInt(e.parentElement.getAttribute('id'))
        const itemTab = e.parentElement.getAttribute('tab')
        const itemData = catalogs[itemTab].find((item) => item.id === itemId);

        e.addEventListener("click", () => {
            setIsSheetShown(true, sheet, itemData)
        })
    })
}