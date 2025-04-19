"use client"

import { useState } from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/cn"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DateTimePickerProps {
  date: Date | undefined | string
  onDateChange: (date: Date | undefined) => void
  includeTime?: boolean
  className?: string
}

export function DateTimePicker({
  date,
  onDateChange,
  includeTime = true,
  className,
}: DateTimePickerProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  // convert the line to the Date object if required
  const getDateValue = (): Date | undefined => {
    if (!date) return undefined
    if (typeof date === "string") {
      const parsedDate = new Date(date)
      return isNaN(parsedDate.getTime()) ? undefined : parsedDate
    }
    return date
  }

  const dateValue = getDateValue()

  function handleDateSelect(selectedDate: Date | undefined) {
    if (selectedDate) {
      // If the time is off, set the time at 00:00
      if (!includeTime) {
        selectedDate.setHours(0, 0, 0, 0)
      } else if (dateValue) {
        // keep the current time when the date is changed
        selectedDate.setHours(
          dateValue.getHours(),
          dateValue.getMinutes(),
          dateValue.getSeconds()
        )
      }
      onDateChange(selectedDate)
    }
  }

  function handleTimeChange(type: "hour" | "minute", value: string) {
    const currentDate = dateValue || new Date()
    const newDate = new Date(currentDate)

    if (type === "hour") {
      const hour = parseInt(value, 10)
      newDate.setHours(hour)
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10))
    }

    onDateChange(newDate)
  }

  // Determine the date of display of the date depending on the time setup
  const displayFormat = includeTime ? "PPP HH:mm" : "PPP"
  const placeholderText = includeTime ? "Select date and time" : "Select date"

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start bg-accent text-left font-normal",
              !dateValue && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {dateValue ? format(dateValue, displayFormat) : placeholderText}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto p-0">
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={handleDateSelect}
            initialFocus
          />
          {includeTime && dateValue && (
            <div className="border-t border-border p-3">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-1">
                  <div className="text-xs font-medium">Hour</div>
                  <ScrollArea className="h-72 w-16">
                    <div className="flex flex-col">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <Button
                          key={`hour-${i}`}
                          variant="ghost"
                          className={cn(
                            "h-8 justify-start rounded-none text-left",
                            dateValue &&
                              dateValue.getHours() === i &&
                              "bg-accent text-accent-foreground"
                          )}
                          onClick={() => handleTimeChange("hour", String(i))}
                        >
                          {i.toString().padStart(2, "0")}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium">Minute</div>
                  <ScrollArea className="h-72 w-16">
                    <div className="flex flex-col">
                      {Array.from({ length: 60 }).map((_, i) => (
                        <Button
                          key={`minute-${i}`}
                          variant="ghost"
                          className={cn(
                            "h-8 justify-start rounded-none text-left",
                            dateValue &&
                              dateValue.getMinutes() === i &&
                              "bg-accent text-accent-foreground"
                          )}
                          onClick={() => handleTimeChange("minute", String(i))}
                        >
                          {i.toString().padStart(2, "0")}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
