import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full p-2.5 rounded-lg bg-background border outline-none focus-within:ring-2 focus-within:ring-blue-500",
        className
      )}
      {...props}
    />
  )
}

export { Input }
