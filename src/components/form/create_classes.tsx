"use client";

import { format } from "date-fns";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { CalendarIcon } from "lucide-react";

/* =========================
   MOCKUP DATA
========================= */

const mockupData = {
  programTypes: ["Scholarship", "Associate", "Bachelor"],

  classNames: ["A1", "A2", "B1", "B2"],

  generations: ["Generation 1", "Generation 2", "Generation 3"],

  years: ["Year 1", "Year 2", "Year 3", "Year 4"],

  semesters: ["Semester 1", "Semester 2"],

  shifts: ["Morning", "Afternoon", "Evening"],
};

/* =========================
   ZOD SCHEMA
========================= */

const createClassSchema = z.object({
  programType: z.string().min(1, "required to select"),

  className: z.string().min(1, {
    message: "Class name is required",
  }),

  generation: z.string().min(1, {
    message: "Generation is required",
  }),

  year: z.string().min(1, {
    message: "Year is required",
  }),

  semester: z.string().min(1, {
    message: "Semester is required",
  }),

  shift: z.string().min(1, {
    message: "Shift is required",
  }),

  startDate: z.date(),

  endDate: z.date(),
});

type CreateClassForm = z.infer<typeof createClassSchema>;

export default function CreatingClassForm() {
  const form = useForm<CreateClassForm>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      programType: "",
      className: "",
      generation: "",
      year: "",
      semester: "",
      shift: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  function onSubmit(values: CreateClassForm) {
    console.log(values);
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} onReset={onReset}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Start Create Class</FieldLegend>
            <FieldDescription>
              All transactions are secure and encrypted
            </FieldDescription>
            <FieldGroup>
              <Controller
                control={form.control}
                name="programType"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Program type</FieldLabel>
                    <Combobox
                      items={mockupData.programTypes}
                      name={field.name}
                      value={field.value || null}
                      onValueChange={(value) => field.onChange(value ?? "")}
                    >
                      <ComboboxInput
                        ref={field.ref}
                        onBlur={field.onBlur}
                        placeholder="Select a program"
                      />
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Class Name */}
              <Controller
                control={form.control}
                name="className"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Class Name</FieldLabel>

                    <Combobox
                      items={mockupData.classNames}
                      name={field.name}
                      value={field.value || null}
                      onValueChange={(value) => field.onChange(value ?? "")}
                    >
                      <ComboboxInput
                        ref={field.ref}
                        onBlur={field.onBlur}
                        placeholder="Select a class"
                      />

                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>

                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Generation / Year / Semester */}
              <div className="grid grid-cols-3 gap-2">
                {/* Generation */}
                <Controller
                  control={form.control}
                  name="generation"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Generation</FieldLabel>

                      <Combobox
                        items={mockupData.generations}
                        name={field.name}
                        value={field.value || null}
                        onValueChange={(value) => field.onChange(value ?? "")}
                      >
                        <ComboboxInput
                          ref={field.ref}
                          onBlur={field.onBlur}
                          placeholder="Select generation"
                        />

                        <ComboboxContent>
                          <ComboboxEmpty>No items found.</ComboboxEmpty>

                          <ComboboxList>
                            {(item) => (
                              <ComboboxItem key={item} value={item}>
                                {item}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Year */}
                <Controller
                  control={form.control}
                  name="year"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Year</FieldLabel>

                      <Combobox
                        items={mockupData.years}
                        name={field.name}
                        value={field.value || null}
                        onValueChange={(value) => field.onChange(value ?? "")}
                      >
                        <ComboboxInput
                          ref={field.ref}
                          onBlur={field.onBlur}
                          placeholder="Select year"
                        />

                        <ComboboxContent>
                          <ComboboxEmpty>No items found.</ComboboxEmpty>

                          <ComboboxList>
                            {(item) => (
                              <ComboboxItem key={item} value={item}>
                                {item}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Semester */}
                <Controller
                  control={form.control}
                  name="semester"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Semester</FieldLabel>

                      <Combobox
                        items={mockupData.semesters}
                        name={field.name}
                        value={field.value || null}
                        onValueChange={(value) => field.onChange(value ?? "")}
                      >
                        <ComboboxInput
                          ref={field.ref}
                          onBlur={field.onBlur}
                          placeholder="Select semester"
                        />

                        <ComboboxContent>
                          <ComboboxEmpty>No items found.</ComboboxEmpty>

                          <ComboboxList>
                            {(item) => (
                              <ComboboxItem key={item} value={item}>
                                {item}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Shift */}
              <Controller
                control={form.control}
                name="shift"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Shift</FieldLabel>

                    <Combobox
                      items={mockupData.shifts}
                      name={field.name}
                      value={field.value || null}
                      onValueChange={(value) => field.onChange(value ?? "")}
                    >
                      <ComboboxInput
                        ref={field.ref}
                        onBlur={field.onBlur}
                        placeholder="Select shift"
                      />

                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>

                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Date Picker */}
              <div className="grid grid-cols-2 gap-2">
                {/* Start Date */}
                <Controller
                  control={form.control}
                  name="startDate"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Start at</FieldLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            type="button"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />

                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="text-muted-foreground">
                                Pick start date
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* End Date */}
                <Controller
                  control={form.control}
                  name="endDate"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>End at</FieldLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            type="button"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />

                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="text-muted-foreground">
                                Pick end date
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          {/* Action Buttons */}
          <Field orientation="horizontal" className="flex justify-end gap-2">
            <Button variant="outline" type="reset">
              Cancel
            </Button>

            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
