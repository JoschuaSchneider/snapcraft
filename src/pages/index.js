import React, { useState, useRef } from "react"

import domtoimage from "dom-to-image"
import shortid from "shortid"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MinecraftItem from "../components/minecraft-item"
import CraftingField from "../components/crafting-field"
import ItemSelect from "../components/item-select"
import download from "../utils/download"

import { getItemByName } from "../utils/minecraft-data"
import { motion } from "framer-motion"

const IndexPage = () => {
  const [items, setItems] = useState({})
  const [width, setWidth] = useState(3)
  const [height, setHeight] = useState(3)

  const fieldRef = useRef(null)

  const [recentItemNames, setRecentItemNames] = useState(() => {
    try {
      const storedHistory = localStorage.getItem("recent-items")
      if (!storedHistory) return ["diamond"]
      return JSON.parse(storedHistory)
    } catch (e) {
      console.error(e)
      return ["diamond"]
    }
  })

  const [currentItem, setCurrentItem] = useState(null)

  function setBrushItem(item) {
    const newRecentItems = [
      item.name,
      ...recentItemNames.filter(i => i !== item.name),
    ].slice(0, 7)
    localStorage.setItem("recent-items", JSON.stringify(newRecentItems))
    setRecentItemNames(newRecentItems)
    setCurrentItem(item)
  }

  function setItemAt(x, y, item) {
    setItems({ ...items, [`${x}:${y}`]: item })
  }

  function loadPreset(w, h) {
    setWidth(w)
    setHeight(h)
  }

  return (
    <Layout>
      <SEO title="Snapcraft" />
      <header className="flex flex-col px-5 py-6">
        <a href="/" className="text-3xl font-semibold text-gray-700">
          <span className="text-green-500">Snap</span>craft
        </a>
        <h4 className="mt-1 font-semibold text-gray-700">
          Create beautiful inventory screenshots.
        </h4>
      </header>
      <div className="flex justify-center px-5 py-12 mt-10 mb-5 rounded-tl rounded-tr">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="overflow-auto scrolling-touch rounded shadow-2xl"
        >
          <CraftingField
            ref={fieldRef}
            onItemClick={(x, y, item) => setItemAt(x, y, currentItem.name)}
            width={width > 0 ? width : 1}
            height={height > 0 ? height : 1}
            items={items}
          />
        </motion.div>
      </div>
      <div className="flex flex-col px-6 py-6 mb-2 rounded">
        <span className="font-semibold text-gray-700 text-md">
          Selected Item
        </span>
        <span className="mb-2 text-gray-700">
          Click on a slot to apply the selected item
        </span>
        <div className="flex items-center mt-2">
          <div style={{ width: "50px", height: "50px" }}>
            <MinecraftItem
              style={{ width: "50px", height: "50px" }}
              className="overflow-hidden rounded"
              name={currentItem?.name}
            />
          </div>
          <span className="flex flex-col ml-4 font-semibold text-gray-700 text-md">
            <span className="text-gray-700">
              {currentItem?.displayName || "Empty"}
            </span>
            <span className="text-sm text-gray-600">
              {!currentItem && "Click on a slot to clear it."}
              {currentItem && `minecraft:${currentItem.name}`}
            </span>
          </span>
        </div>
      </div>
      <div className="flex flex-col px-8 py-8 bg-white border-b-4 border-green-600 rounded shadow-xl">
        <div className="flex flex-col -mx-3 md:flex-row">
          <button
            className="flex-grow px-4 py-2 mx-3 mb-3 font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            onClick={() => setCurrentItem(null)}
          >
            Clear Selected Item
          </button>
          <button
            className="flex-grow px-4 py-2 mx-3 mb-3 font-semibold text-red-700 bg-red-100 rounded hover:bg-red-200"
            onClick={() => setItems({})}
          >
            Clear Inventory
          </button>
          <button
            className="flex-grow px-4 py-2 mx-3 mb-3 font-semibold text-green-700 bg-green-100 rounded hover:bg-green-200"
            onClick={async () => {
              const img = await domtoimage.toPng(fieldRef.current)
              download(img, `snapcraft-${shortid.generate()}.png`)
            }}
          >
            Download Image
          </button>
        </div>
        <div className="flex mt-4 -mx-3">
          <label htmlFor="item-search" className="flex-grow block mx-3">
            <span className="text-gray-700">Item Search</span>
            <ItemSelect
              id="item-search"
              className="mt-1"
              onSelectItem={item => setBrushItem(item)}
            />
          </label>
        </div>
        <h3 className="mt-3 text-gray-700">Item history</h3>
        <div className="flex flex-wrap mt-2">
          {recentItemNames.map(item_name => (
            <MinecraftItem
              key={item_name}
              onClick={() => setBrushItem(getItemByName(item_name))}
              style={{ width: "50px", height: "50px" }}
              className="mb-2 mr-2 overflow-hidden rounded cursor-pointer hover:opacity-75"
              name={item_name}
            />
          ))}
        </div>
        <div className="flex mt-3 -mx-3">
          <label htmlFor="width" className="flex-grow block mx-3">
            <span className="text-gray-700">Width</span>
            <input
              min={1}
              step={1}
              max={100}
              type="number"
              id="width"
              className="block w-full mt-1 form-input"
              value={width}
              onChange={e =>
                setWidth(Number(e.target.valueAsNumber.toFixed(0)))
              }
            />
          </label>
          <label htmlFor="width" className="flex-grow block mx-3">
            <span className="text-gray-700">Height</span>
            <input
              min={1}
              step={1}
              max={100}
              type="number"
              id="height"
              className="block w-full mt-1 form-input"
              value={height}
              onChange={e =>
                setHeight(Number(e.target.valueAsNumber.toFixed(0)))
              }
            />
          </label>
        </div>
        <h3 className="mt-3 text-gray-700">Inventory Presets</h3>
        <div className="flex flex-col flex-wrap mt-2 -mb-3 md:flex-row">
          <button
            className="px-4 py-2 mb-3 mr-3 font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            onClick={() => loadPreset(3, 3)}
          >
            Crafting Table (3x3)
          </button>
          <button
            className="px-4 py-2 mb-3 mr-3 font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            onClick={() => loadPreset(9, 3)}
          >
            Inventory/Chest (9x3)
          </button>
          <button
            className="px-4 py-2 mb-3 mr-3 font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            onClick={() => loadPreset(9, 6)}
          >
            Double Chest (9x6)
          </button>
          <button
            className="px-4 py-2 mb-3 mr-3 font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            onClick={() => loadPreset(9, 1)}
          >
            Hotbar (9x1)
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center mt-16 mb-10">
        <span className="text-gray-600">
          Copyright {new Date().getFullYear()} &copy;{" "}
          <a href="https://twitter.com/joschuadev" className="text-blue-500">
            Joschua Schneider
          </a>
        </span>
        <span className="text-gray-600">
          Item images are owned by{" "}
          <a href="https://minecraft.net" className="text-blue-500">
            Minecraft
          </a>
        </span>
        <a
          href="https://github.com/JoschuaSchneider/snapcraft"
          className="text-blue-500"
        >
          View source on GitHub
        </a>
      </div>
    </Layout>
  )
}

export default IndexPage
