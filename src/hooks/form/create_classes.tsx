"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";

const formSchema = z.object({
  class_name: z.enum(["Full-Stack", "Foundation"]),
  session: z.enum(["8:00 - 12:00 PM", "1:30 - 5:00 PM"]),
  lecturer: z.enum(["Mom Reksmey", "Chan Chhaya"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreatingClassForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      class_name: "Full-Stack",
      session: "8:00 - 12:00 PM",
      lecturer: "Mom Reksmey",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      onReset={onReset}
      className="space-y-6"
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <p className="text-xl font-semibold">Start Create Class</p>
        </div>

        {/* Class Name */}
        <Controller
          control={form.control}
          name="class_name"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 flex flex-col gap-2"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel>Class Name</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Full-Stack">Full-Stack</SelectItem>

                  <SelectItem value="Foundation">Foundation</SelectItem>
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Session */}
        <Controller
          control={form.control}
          name="session"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 flex flex-col gap-2"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel>Session</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select session" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="8:00 - 12:00 PM">
                    8:00 - 12:00 PM
                  </SelectItem>

                  <SelectItem value="1:30 - 5:00 PM">1:30 - 5:00 PM</SelectItem>
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Lecturer */}
        <Controller
          control={form.control}
          name="lecturer"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 flex flex-col gap-2"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel>Lecturer</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select lecturer" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Mom Reksmey">Mom Reksmey</SelectItem>

                  <SelectItem value="Chan Chhaya">Chan Chhaya</SelectItem>
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Buttons */}
        <div className="col-span-12 mt-6 grid gap-2">
          <Button type="submit" className="w-full bg-blue-700">
            Create
          </Button>

          <Button type="reset" variant="outline"  className="w-full bg-red-500 text-white">
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
