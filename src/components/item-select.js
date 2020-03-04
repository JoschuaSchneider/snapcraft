import React from "react"
import classnames from "classnames"
import { components } from "react-select"
import AsyncSelect from "react-select/async"
import { debounce } from "lodash"
import { itemsArray } from "../utils/minecraft-data"
import MinecraftItem from "./minecraft-item"

const itemOptions = itemsArray.map(item => ({
  value: item.name,
  id_name: item.name,
  label: item.displayName,
}))

const debouncedFilter = debounce((value, callback) => {
  callback(
    itemOptions.filter(option =>
      option.label.toLowerCase().includes(value.toLowerCase())
    )
  )
}, 500)

const loadOptions = (value, callback) => {
  if (value.length > 2) return debouncedFilter(value, callback)
  callback([])
}

const CustomOption = props => {
  const { onMouseMove, onMouseOver, ...newInnerProps } = props.innerProps
  const newProps = { ...props, innerProps: newInnerProps }
  return (
    <components.Option {...newProps} className="bg-white hover:bg-gray-200">
      <div className="flex items-center">
        <MinecraftItem
          className="w-8 h-8 rounded overflow-hidden mr-3"
          name={props.data.id_name}
        />
        <span className="text-lg text text-gray-700">{props.label}</span>
      </div>
    </components.Option>
  )
}

const SingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>
    <div className="flex items-center">
      <MinecraftItem
        className="w-5 h-5 rounded overflow-hidden mr-3"
        name={props.data.id_name}
      />
      <span className="text-lg text text-gray-700">{props.data.label}</span>
    </div>
  </components.SingleValue>
)

export default function ItemSelect({
  className = "",
  onSelectItem = () => {},
}) {
  return (
    <AsyncSelect
      cacheOptions
      placeholder="Search Item to place..."
      noOptionsMessage={() => "No Items found, enter a name or id name."}
      className={classnames("flex-grow", className)}
      onChange={item => onSelectItem(item)}
      components={{ Option: CustomOption, SingleValue: SingleValue }}
      loadOptions={loadOptions}
    />
  )
}
