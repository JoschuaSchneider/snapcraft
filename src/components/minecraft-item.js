import React from "react"
import Img from "react-image"
import classnames from "classnames"

import { getItemByName } from "../utils/minecraft-data"

export default function MinecraftItem({ className = "", name, ...props }) {
  if (!getItemByName(name)) {
    return (
      <Img
        className={classnames("relative", className)}
        src={`/materials/air.png`}
        alt={"Nicht gefunden"}
        title={`Nicht gefunden "${name}"`}
        crossOrigin="anonymous"
        {...props}
      />
    )
  }

  return (
    <Img
      className={classnames("relative", className)}
      src={`/materials/${name}.png`}
      alt={getItemByName(name)?.displayName}
      title={`${getItemByName(name)?.displayName} | minecraft:${name}`}
      crossOrigin="anonymous"
      loader={<div className="w-full h-full bg-gray-900 opacity-25"></div>}
      {...props}
    />
  )
}
