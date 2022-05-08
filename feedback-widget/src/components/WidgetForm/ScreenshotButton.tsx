import { Camera, Trash } from "phosphor-react"
import html2canvas from "html2canvas"
import { useState } from "react"
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenShotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({ 
  screenshot,
  onScreenShotTook 
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)
  
  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);
    const canvas = await html2canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');
    setIsTakingScreenshot(false);
    onScreenShotTook(base64image);
  }
  if (screenshot) {
    return (
      <button
        type="button"
        className="p-1 w-10 rounded-md border-transparent flex justify-end items-end text-zinc-400"
        onClick={() => onScreenShotTook(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill"/>
      </button>
    )
  }
  return (
    <button
    type="button"
    className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:rign-offset-zinc-900 focus:ring-brand-500"
    onClick={handleTakeScreenshot}
  >
    { isTakingScreenshot ? <Loading /> : <Camera /> }
  </button>
  )
}