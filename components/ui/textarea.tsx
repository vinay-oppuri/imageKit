import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full p-2.5 rounded-lg bg-background outline-none",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
