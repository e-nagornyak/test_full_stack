// "use client"

import * as React from "react"
// import { useState } from "react"
import Image, { type ImageProps } from "next/image"

import { cn } from "@/lib/cn"

// type BaseImgType = React.DetailedHTMLProps<
//   React.ImgHTMLAttributes<HTMLImageElement>,
//   HTMLImageElement
// >

export interface ImgProps extends ImageProps {
  isAnimated?: boolean
}

export function Img({
  isAnimated,
  className,
  src,
  alt,
  unoptimized = false,
  ...rest
}: ImgProps) {
  // const [isLoading, setLoading] = useState(isAnimated)/**/

  return (
    // @ts-ignore
    <Image
      className={cn(
        "duration-700 ease-in-out",
        // isLoading ? "blur-xs" : "blur-0",
        className
      )}
      // onLoad={isAnimated ? () => setLoading(false) : undefined}
      alt={alt}
      src={src}
      unoptimized={unoptimized}
      {...rest}
    />
  )
}
