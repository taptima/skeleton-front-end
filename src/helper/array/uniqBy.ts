export default function uniqBy<Item = Record<string, unknown>>(
    array: Item[],
    accessor: keyof Item,
) {
    const pickedObjectsMap = array.reduce((map, item) => {
        const key = item[accessor];

        if (!key) {
            return map;
        }

        return map.has(key) ? map : map.set(key, item);
    }, new Map<Item[keyof Item], Item>());

    return [...pickedObjectsMap.values()];
}
