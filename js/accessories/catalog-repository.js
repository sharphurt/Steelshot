export function getJSONPromise(filename) {
    return $.getJSON(`data/catalog-data/${filename}.json`);
}

