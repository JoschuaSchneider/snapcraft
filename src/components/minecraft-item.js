import React from "react"
import Img from "react-image"

import { itemsByName } from "../utils/minecraft-data"

export default function MinecraftItem({ className = "", name, ...props }) {
  if (!itemsByName[name]) {
    return (
      <Img
        className={className}
        src={`https://joschuadev-cdn.fra1.digitaloceanspaces.com/minecraft-snapcraft/materials/air.png`}
        alt={"Nicht gefunden"}
        title={`Nicht gefunden "${name}"`}
        {...props}
      />
    )
  }

  return (
    <Img
      className={className}
      src={`https://joschuadev-cdn.fra1.digitaloceanspaces.com/minecraft-snapcraft/materials/${name}.png`}
      alt={itemsByName[name]?.displayName}
      title={`${itemsByName[name]?.displayName} | minecraft:${name}`}
      loader={
        <div
          className="bg-gray-900 opacity-25"
          style={{ width: "50px", height: "50px" }}
        ></div>
      }
      {...props}
    />
  )
}
