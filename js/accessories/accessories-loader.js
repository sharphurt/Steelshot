const catalogs = {}
let namesMapping = {}

const loadCatalogs = (names, callback) => {
    const promises = [];

    names.forEach(function (e) {
        promises.push(getJSONPromise(e));
    })

    $.when.apply($, promises).then(function () {
        promises.forEach(function (e) {
            const data = e['responseJSON'];
            catalogs[data['collection-name']] = data['collection'];
        })

        callback();
    }, function () {
        // TODO: error occurred
    });
}

const loadNamesMappingTable = (callback) => {
    getJSONPromise('field-names-mapping').then(function (promise) {
        namesMapping = promise
        callback();
    }, function () {
        // TODO: error occured
    })
}

const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
}

const loadAllData = (catalogNames, callback) => {
    const internalCallback = function () {
        if (!isObjectEmpty(catalogs) && !isObjectEmpty(namesMapping)) {
            callback();
        }
    }

    loadCatalogs(catalogNames, internalCallback);
    loadNamesMappingTable(internalCallback);
}