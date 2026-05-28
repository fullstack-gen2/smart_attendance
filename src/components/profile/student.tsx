"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Pencil, User } from "lucide-react"
import { PiLockKeyOpenDuotone } from "react-icons/pi"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { studentProfileInfo } from "@/lib/mockupData/student"
import EditProfile from "./edit-profile"

export type ProfileInfoItem = {
  label: string
  value: string
  wide?: boolean
}

export type StudentProfileInfo = {
  username: string
  email: string
  information: ProfileInfoItem[]
}

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const profile = studentProfileInfo as StudentProfileInfo

  if (isEditing) {
    return (
      <EditProfile
        profile={profile}
        onBack={() => router.back()}
        onDone={() => setIsEditing(false)}
      />
    )
  }

  return (
    <main className="">
      {/* header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-zinc-900">Profile</h1>
        <Button
          type="button"
          variant="ghost"
          className="h-9 rounded-full border border-transparent px-4 text-sm font-semibold text-zinc-800 hover:border-zinc-300 hover:bg-white/70"
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </div>

      <section className="mx-auto md:px-10 grid max-w-5xl gap-10 lg:grid-cols-[260px_minmax(480px,1fr)] lg:items-start xl:gap-10">
        <aside className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="flex size-24 items-center justify-center rounded-full border-[1.5px] border-zinc-400 bg-zinc-300 text-zinc-100 shadow-inner">
            <User className="size-16 stroke-[1.5] text-zinc-100" />
          </div>

          <div className="mt-5 space-y-1 text-base leading-6 text-zinc-900">
            <p>
              <span className="font-semibold">Username:</span>{"  "}
              <span className="font-light">{profile.username}</span>
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <span className="font-light">{profile.email}</span>
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            className="mt-14 h-auto gap-2 px-0 text-base font-semibold text-red-500 hover:bg-transparent hover:text-red-600"
          >
            <PiLockKeyOpenDuotone className="size-5 shrink-0" />
            Change Password
          </Button>
        </aside>

        <Card className="rounded-lg border-zinc-300 bg-white py-0 shadow-sm">
          <CardContent className="px-8 md:px-12 md:py-9">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-800">
                Personal Information
              </h2>

              <Button
                type="button"
                className="h-7 rounded-full bg-red-500 px-3 text-sm font-bold text-white hover:bg-red-600"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="size-3.5" />
                Edit
              </Button>
            </div>

            <dl className="grid gap-y-4 sm:grid-cols-2">
              {profile.information.map((item) => (
                <InfoItem key={item.label} {...item} />
              ))}
            </dl>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

function InfoItem({ label, value, wide }: ProfileInfoItem) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <dt className="text-sm font-medium text-zinc-500">{label}</dt>
      <dd className="text-sm font-semibold text-zinc-950">{value}</dd>
    </div>
  )
}
