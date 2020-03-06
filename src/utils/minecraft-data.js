import items from "./items.json"
import itemsNameIndexMap from "./items-name-index-map.json"

export const getItemByName = name => {
  const index = itemsNameIndexMap[name]
  if (index !== undefined) {
    return items[index]
  }

  return null
}
export const itemsArray = items
