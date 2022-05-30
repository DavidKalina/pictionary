import { BsEraserFill } from 'react-icons/bs'
import { IoMdColorPalette } from 'react-icons/io'

const Toolbar = () => {
  return (
    <div className="flex justify-evenly">
      <BsEraserFill />
      <IoMdColorPalette />
    </div>
  )
}

export default Toolbar
