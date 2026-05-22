"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowLeft, FileImage, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { ProfileInfoItem, StudentProfileInfo } from "./student"

type EditProfileProps = {
  profile: StudentProfileInfo
  onBack: () => void
  onDone: () => void
}

export default function EditProfile({
  profile,
  onBack,
  onDone,
}: EditProfileProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  function handleProfileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setPreviewUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl)
      }

      return URL.createObjectURL(file)
    })
  }

  return (
    <main className="">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-zinc-900">Profile</h1>

        <Button
          type="button"
          variant="ghost"
          className="h-9 rounded-full border border-transparent px-4 text-sm font-semibold text-zinc-800 hover:border-zinc-300 hover:bg-white/70"
          onClick={onBack}
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </div>

      <form
        className="mx-auto grid max-w-5xl gap-10 md:px-10 lg:grid-cols-[260px_minmax(480px,1fr)] lg:items-start xl:gap-10"
        onSubmit={(event) => {
          event.preventDefault()
          onDone()
        }}
      >
        <aside className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="flex w-48 flex-col items-center">
            <div className="flex size-48 items-center justify-center overflow-hidden rounded-full border border-zinc-500 bg-zinc-300 text-zinc-100 shadow-inner">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Selected profile preview"
                  width={192}
                  height={192}
                  unoptimized
                  className="size-full object-cover"
                />
              ) : (
                <User className="size-36 stroke-[1.2] text-zinc-100" />
              )}
            </div>

            <label className="mt-8 inline-flex cursor-pointer items-center justify-center gap-2 text-center text-base font-medium text-zinc-950 underline underline-offset-2">
              choose image
              <FileImage className="size-5" />
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleProfileChange}
              />
            </label>
          </div>
        </aside>

        <Card className="rounded-lg border-zinc-300 bg-white/60 py-0 shadow-sm backdrop-blur-sm">
          <CardContent className="px-8 py-8 md:px-12 md:py-9">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-zinc-950">
                Personal Information
              </h2>

              <Button
                type="submit"
                className="h-7 rounded-full bg-indigo-900 px-4 text-sm font-bold text-white hover:bg-indigo-700"
              >
                Done
              </Button>
            </div>

            <div className="grid gap-x-12 gap-y-5 sm:grid-cols-2">
              {profile.information.map((item) => (
                <EditField key={item.label} item={item} />
              ))}
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  )
}

function EditField({ item }: { item: ProfileInfoItem }) {
  return (
    <label
      className={
        item.wide
          ? "flex flex-col gap-1 sm:col-span-2 sm:max-w-55"
          : "flex flex-col gap-1"
      }
    >
      <span className="text-sm font-medium text-zinc-700">{item.label}</span>
      <Input
        name={item.label}
        defaultValue={item.value}
        placeholder="name"
        className="h-7 rounded-lg border-zinc-400 bg-transparent px-4 text-sm text-zinc-950 shadow-none placeholder:text-zinc-300 focus-visible:ring-0"
      />
    </label>
  )
}
