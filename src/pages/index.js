import React, { useState, useRef } from "react"

import domtoimage from "dom-to-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MinecraftItem from "../components/minecraft-item"
import CraftingField from "../components/crafting-field"
import ItemSelect from "../components/item-select"
import download from "../utils/download"

const IndexPage = () => {
  const [items, setItems] = useState({})
  const [width, setWidth] = useState(3)
  const [height, setHeight] = useState(3)

  const fieldRef = useRef(null)
  const [resultImage, setResultImage] = useState(null)

  const [recentItems, setRecentItems] = useState(() => {
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
    const newRecentItems = [item, ...recentItems.filter(i => i !== item)].slice(
      0,
      7
    )
    localStorage.setItem("recent-items", JSON.stringify(newRecentItems))
    setRecentItems(newRecentItems)
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
      <header className="py-4 px-5 flex flex-col">
        <a href="/" className="text-3xl text-gray-700 font-semibold">
          <span className="text-green-500">Snap</span>craft
        </a>
        <h4 className="text-gray-700 font-semibold mt-1">
          Create beautiful inventory screenshots.
        </h4>
      </header>
      <div className="flex justify-center py-12 px-5 rounded-tl mt-10 rounded-tr">
        <div className="shadow-2xl rounded overflow-hidden">
          <CraftingField
            ref={fieldRef}
            onItemClick={(x, y, item) => setItemAt(x, y, currentItem)}
            width={width}
            height={height}
            items={items}
          />
        </div>
      </div>
      {resultImage && <img src={resultImage} />}
      <div className="flex flex-col rounded mb-2 py-6 px-6">
        <span className="text-gray-700 font-semibold text-md mb-2">
          Current Brush
        </span>
        <div className="flex items-center mt-2">
          <div style={{ width: "50px", height: "50px" }}>
            <MinecraftItem
              style={{ width: "50px", height: "50px" }}
              className="rounded overflow-hidden"
              name={currentItem}
            />
          </div>
          <span className="text-gray-700 font-semibold text-md ml-4">
            <span className="text-green-600">{currentItem || "Clear"}</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col shadow-xl rounded bg-white py-8 px-8 border-b-4 border-green-600">
        <div className="flex">
          <button
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 px-4 font-semibold rounded"
            onClick={() => setCurrentItem(null)}
          >
            Clear Brush
          </button>
          <button
            className="bg-red-100 text-red-700 hover:bg-red-200 py-2 px-4 font-semibold rounded ml-3"
            onClick={() => setItems({})}
          >
            Clear All
          </button>
          <button
            className="bg-green-100 text-green-700 hover:bg-green-200 py-2 px-4 font-semibold rounded ml-auto"
            onClick={async () => {
              const img = await domtoimage.toPng(fieldRef.current)
              download(img, "snapcraft-snap.png")
            }}
          >
            Download Image
          </button>
        </div>
        <div className="flex -mx-3 mt-4">
          <label htmlFor="item-search" className="block mx-3 flex-grow">
            <span className="text-gray-700">Item Search</span>
            <ItemSelect
              id="item-search"
              className="mt-1"
              onSelectItem={item => setBrushItem(item.id_name)}
            />
          </label>
        </div>
        <h3 className="text-gray-700 mt-3">Item history</h3>
        <div className="flex flex-wrap mt-2">
          {recentItems.map(item => (
            <MinecraftItem
              key={item}
              onClick={() => setBrushItem(item)}
              style={{ width: "50px", height: "50px" }}
              className="rounded cursor-pointer hover:opacity-75 overflow-hidden mr-2 mb-2"
              name={item}
            />
          ))}
        </div>
        <div className="flex -mx-3 mt-3">
          <label htmlFor="width" className="block mx-3 flex-grow">
            <span className="text-gray-700">Width</span>
            <input
              min={1}
              type="number"
              id="width"
              className="form-input block w-full mt-1"
              value={width}
              onChange={e => setWidth(e.target.valueAsNumber)}
            />
          </label>
          <label htmlFor="width" className="block mx-3 flex-grow">
            <span className="text-gray-700">Height</span>
            <input
              min={1}
              type="number"
              id="height"
              className="form-input block w-full mt-1"
              value={height}
              onChange={e => setHeight(e.target.valueAsNumber)}
            />
          </label>
        </div>
        <h3 className="text-gray-700 mt-3">Inventory Presets</h3>
        <div className="flex flex-wrap mt-2 -mb-3">
          <button
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 px-4 font-semibold rounded mr-3 mb-3"
            onClick={() => loadPreset(3, 3)}
          >
            Crafting Table (3x3)
          </button>
          <button
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 px-4 font-semibold rounded mr-3 mb-3"
            onClick={() => loadPreset(9, 3)}
          >
            Inventory/Chest (9x3)
          </button>
          <button
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 px-4 font-semibold rounded mr-3 mb-3"
            onClick={() => loadPreset(9, 6)}
          >
            Double Chest (9x6)
          </button>
          <button
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 px-4 font-semibold rounded mr-3 mb-3"
            onClick={() => loadPreset(9, 1)}
          >
            Hotbar (9x1)
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center mt-16">
        <span className="text-red-500 mb-3 max-w-2xl text-center">
          There are some missing items that don't have Images, they will be
          added in the future!
        </span>
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
