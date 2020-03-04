import React, { forwardRef } from "react"
import classnames from "classnames"
import MinecraftItem from "./minecraft-item"
import { motion, AnimatePresence } from "framer-motion"

const CraftingField = forwardRef(
  (
    {
      className = "",
      width = 3,
      height = 3,
      items = {},
      onItemClick = () => {},
    },
    ref
  ) => {
    const itemAtCoords = (x, y) => items[`${x}:${y}`] || null

    const coordsX = Array.from(Array(width), (_, i) => i)
    const coordsY = Array.from(Array(height), (_, i) => i)

    return (
      <div
        className={classnames("crafting-field p-5 float-left", className)}
        style={{ backgroundColor: "#c6c6c6" }}
        ref={ref}
      >
        {coordsY.map(y => (
          <div key={y} className="flex">
            {coordsX.map(x => {
              const item = itemAtCoords(x, y)
              return (
                <div
                  key={`${x}:${y}`}
                  onClick={() => onItemClick(x, y, item)}
                  className="item-field overflow-hidden"
                  title="Click to apply brush"
                >
                  <AnimatePresence>
                    {item !== null ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <MinecraftItem name={item} />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  }
)

export default CraftingField
