import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'

type Props = {
  resetTransform:  (animationTime: number, animationType?: "easeOut" | "linear" | "easeInQuad" | "easeOutQuad" | "easeInOutQuad" | "easeInCubic" | "easeOutCubic" | "easeInOutCubic" | "easeInQuart" | "easeOutQuart" | "easeInOutQuart" | "easeInQuint" | "easeOutQuint" | "easeInOutQuint" ) => void
}

const Zoom = () => {
  return (
    <div className=' flex   px-2 py-4 gap-8'>
        <div className="w-10 h-10 flex justify-center items-center rounded-full shadow-xl bg-gray-200 cursor-pointer hover:bg-black/50 hover:text-white"><ZoomIn /></div>
        <div className="w-10 h-10 flex justify-center items-center rounded-full shadow-xl bg-gray-200 cursor-pointer hover:bg-black/50 hover:text-white"><ZoomOut /></div>
        <div className="w-10 h-10 flex justify-center items-center rounded-full shadow-xl bg-gray-200 cursor-pointer hover:bg-black/50 hover:text-white"><RotateCcw /></div>
    </div>
  )
}

export default Zoom