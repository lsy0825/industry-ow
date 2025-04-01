import { Tooltip } from 'antd'
import { MouseEventHandler, useState } from 'react'

// 判断文本是否溢出
export const isBeyond = (e: any) => {
  const textContent = e.target
  const clientW = textContent.clientWidth
  const scrollW = textContent.scrollWidth
  return scrollW > clientW //true为溢出  false为不溢出
}

const EllipsisTooltip: React.FC<any> = ({ value }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleEnter: MouseEventHandler = e => {
    setIsOpen(isBeyond(e))
  }

  return (
    <Tooltip placement='topLeft' title={value} open={isOpen}>
      <span onMouseEnter={handleEnter} onMouseLeave={() => setIsOpen(false)}>
        {value}
      </span>
    </Tooltip>
  )
}

export default EllipsisTooltip
