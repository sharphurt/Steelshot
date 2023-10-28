let sheetHeight

const setSheetHeight = (value, sheetContents) => {
    sheetHeight = Math.max(0, Math.min(100, value))
    sheetContents.style.height = `${sheetHeight / zoom}vh`

    if (sheetHeight === 100) {
        sheetContents.classList.add("fullscreen")
    } else {
        sheetContents.classList.remove("fullscreen")
    }
}

const setIsSheetShown = (isShown, sheet, item) => {
    if (isShown === true) {
        MobileCatalogRenderer.renderPopup(item, document.querySelector('.item-detailed-info'))
        $('body').css("overflow", "hidden");
    } else {
        $('body').css("overflow", "auto");
    }
    sheet.setAttribute("aria-hidden", String(!isShown))
}

const initializeBottomSheet = () => {
    const sheet = document.querySelector("#sheet")
    const sheetContents = document.querySelector("#sheet .contents")
    const draggableArea = document.querySelector("#sheet")

    linkItems()

    sheet.querySelector(".overlay").addEventListener("click", () => {
        setIsSheetShown(false, sheet)
    })

    const touchPosition = (event) =>
        event.touches ? event.touches[0] : event

    let dragPosition

    const onDragStart = (event) => {
        if ($('#sheet main').scrollTop() !== 0)
            return

        dragPosition = touchPosition(event).pageY
        sheetContents.classList.add("not-selectable")
        draggableArea.style.cursor = document.body.style.cursor = "grabbing"
    }

    const onDragMove = (event) => {
        if (dragPosition === undefined) return

        const y = touchPosition(event).pageY
        const deltaY = dragPosition - y
        const deltaHeight = deltaY / window.innerHeight * 100

        setSheetHeight(sheetHeight + deltaHeight, sheetContents)
        dragPosition = y
    }

    const onDragEnd = () => {
        dragPosition = undefined
        sheetContents.classList.remove("not-selectable")
        draggableArea.style.cursor = document.body.style.cursor = ""

        if (sheetHeight < 25) {
            setIsSheetShown(false, sheet)
        } else if (sheetHeight > 75) {
            setSheetHeight(100, sheetContents)
        } else {
            setSheetHeight(50, sheetContents)
        }
    }

    draggableArea.addEventListener("mousedown", onDragStart)
    draggableArea.addEventListener("touchstart", onDragStart)


    window.addEventListener("mousemove", onDragMove)
    window.addEventListener("touchmove", onDragMove)

    window.addEventListener("mouseup", onDragEnd)
    window.addEventListener("touchend", onDragEnd)
}

const linkItems = () => {
    const sheet = document.querySelector("#sheet")
    const sheetContents = document.querySelector("#sheet .contents")

    const openSheetButton = document.querySelectorAll(".item-card-trigger")

    openSheetButton.forEach((e) => {
        const itemId = parseInt(e.parentElement.getAttribute('id'))
        const itemTab = e.parentElement.getAttribute('tab')
        const itemData = catalogs[itemTab].find((item) => item.id === itemId);

        e.addEventListener("click", () => {
            setSheetHeight(50, sheetContents)
            setIsSheetShown(true, sheet, itemData)
        })
    })
}