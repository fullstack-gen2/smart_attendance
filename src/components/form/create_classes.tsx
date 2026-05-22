"use client";

import { useState } from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Field,
  FieldDescription,
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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import { CalendarIcon } from "lucide-react";

const programType = ["Scholarship", "Associate", "Bachelor"] as const;

export default function CreatingClassForm() {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  return (
    <div className="">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Start Create Class</FieldLegend>

            <FieldDescription>
              All transactions are secure and encrypted
            </FieldDescription>

            <FieldGroup>
              {/* Program Type */}
              <Field>
                <FieldLabel>
                  Program type
                </FieldLabel>

                <Combobox items={programType}>
                  <ComboboxInput placeholder="Select a program" />

                  <ComboboxContent>
                    <ComboboxEmpty>
                      No items found.
                    </ComboboxEmpty>

                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem
                          key={item}
                          value={item}
                        >
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </Field>

              {/* Class Name */}
              <Field>
                <FieldLabel>
                  Class Name
                </FieldLabel>

                <Combobox items={programType}>
                  <ComboboxInput placeholder="Select a class" />

                  <ComboboxContent>
                    <ComboboxEmpty>
                      No items found.
                    </ComboboxEmpty>

                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem
                          key={item}
                          value={item}
                        >
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </Field>

              {/* Generation / Year / Semester */}
              <div className="grid grid-cols-3 gap-2">
                <Field>
                  <FieldLabel>
                    Generation
                  </FieldLabel>

                  <Combobox items={programType}>
                    <ComboboxInput placeholder="Select generation" />

                    <ComboboxContent>
                      <ComboboxEmpty>
                        No items found.
                      </ComboboxEmpty>

                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem
                            key={item}
                            value={item}
                          >
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>

                <Field>
                  <FieldLabel>
                    Year
                  </FieldLabel>

                  <Combobox items={programType}>
                    <ComboboxInput placeholder="Select year" />

                    <ComboboxContent>
                      <ComboboxEmpty>
                        No items found.
                      </ComboboxEmpty>

                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem
                            key={item}
                            value={item}
                          >
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>

                <Field>
                  <FieldLabel>
                    Semester
                  </FieldLabel>

                  <Combobox items={programType}>
                    <ComboboxInput placeholder="Select semester" />

                    <ComboboxContent>
                      <ComboboxEmpty>
                        No items found.
                      </ComboboxEmpty>

                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem
                            key={item}
                            value={item}
                          >
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>
              </div>

              {/* Shift */}
              <Field>
                <FieldLabel>
                  Shift
                </FieldLabel>

                <Combobox items={programType}>
                  <ComboboxInput placeholder="Select shift" />

                  <ComboboxContent>
                    <ComboboxEmpty>
                      No items found.
                    </ComboboxEmpty>

                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem
                          key={item}
                          value={item}
                        >
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </Field>

              {/* Date Picker */}
              <div className="grid grid-cols-2 gap-2">
                {/* Start Date */}
                <Field>
                  <FieldLabel>
                    Start at
                  </FieldLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {startDate ? (
                          format(startDate, "PPP")
                        ) : (
                          <span className="text-muted-foreground">
                            Pick start date
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>

                {/* End Date */}
                <Field>
                  <FieldLabel>
                    End at
                  </FieldLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {endDate ? (
                          format(endDate, "PPP")
                        ) : (
                          <span className="text-muted-foreground">
                            Pick end date
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          {/* Action Buttons */}
          <Field
            orientation="horizontal"
            className="flex justify-end gap-2"
          >
            <Button
              variant="outline"
              type="button"
            >
              Cancel
            </Button>

            <Button type="submit">
              Submit
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}