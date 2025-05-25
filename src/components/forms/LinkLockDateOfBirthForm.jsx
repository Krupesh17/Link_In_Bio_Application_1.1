import React, { useCallback, useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { AlertCircle, Calendar1, CheckCircle2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { debounce } from "lodash";
import { useUpdateLink } from "@/tanstack-query/queries";
import { updateLinksData } from "@/redux/features/dashboardSlice";

const LinkLockDateOfBirthForm = ({ linkData, setLoading }) => {
  const { links } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [descLength, setDescLength] = useState(
    linkData?.link_lock_date_of_birth
      ? linkData?.link_lock_date_of_birth?.description?.length
      : 0
  );

  const form = useForm({
    defaultValues: {
      minimum_age: linkData?.link_lock_date_of_birth
        ? linkData?.link_lock_date_of_birth?.minimum_age
        : undefined,
      description: linkData?.link_lock_date_of_birth
        ? linkData?.link_lock_date_of_birth?.description
        : "",
    },
  });

  const { mutateAsync: updateLink } = useUpdateLink();

  const handleDateOfBirthLockForm = async (value) => {
    try {
      const linkLockData = value?.minimum_age === undefined ? null : value;

      const response = await updateLink({
        link_id: linkData?.id,
        data_object: { link_lock_date_of_birth: linkLockData },
      });

      const indexOfLinkToBeUpdated = await links?.findIndex(
        (link) => link?.id === response?.at(0)?.id
      );

      const updatedLinks = [...links];
      updatedLinks?.splice(indexOfLinkToBeUpdated, 1, response?.at(0));

      dispatch(updateLinksData(updatedLinks));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Failed to Enable Date of Birth Lock",
        description:
          "Date of birth lock could not be enabled due to a technical issue. Please refresh and try once more.",
      });

      console.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSubmit = useCallback(
    debounce(() => {
      form.handleSubmit(handleDateOfBirthLockForm)();
    }, 1000),
    []
  );

  const handleTextareaChange = (e, field) => {
    let textareaValue = e.target.value;
    if (textareaValue.length > 80) {
      form.setError("bio", {
        message: "Description cannot be longer than 80 characters",
      });
    } else {
      field.onChange(textareaValue);
      setDescLength(textareaValue.length);
    }

    if (textareaValue.length < 80) {
      form.clearErrors("description");
    }
  };

  useEffect(() => {
    const subscription = form.watch(() => {
      if (form.getValues("minimum_age") === undefined) {
        if (form.getValues("description") !== "") {
          form.setValue("description", "");
          setDescLength(0);
        }
        setLoading(true);
        debouncedSubmit();
      } else {
        setLoading(true);
        debouncedSubmit();
      }
    });

    return () => subscription.unsubscribe();
  }, [form, debouncedSubmit]);

  return (
    <AccordionItem value="item-2" className="border px-4 rounded-md">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-2 w-full">
          <Calendar1 size={20} strokeWidth={1.5} />
          <h4 className="font-semibold hover:underline">Date of Birth</h4>
          {!!linkData?.link_lock_date_of_birth && (
            <div className="bg-success text-white font-medium text-xs px-1 py-0.5 rounded-sm">
              <span>Enabled</span>
            </div>
          )}
        </div>
      </AccordionTrigger>

      <AccordionContent className="border-t">
        <Form {...form}>
          <form>
            <section className="flex flex-col gap-0.5 my-4">
              <h4 className="text-copy">Set minimum age</h4>
              <p className="text-copy-lighter">
                Visitors need to be over a certain age to unlock the link with
                their date of birth
              </p>
            </section>

            <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
              <FormField
                control={form.control}
                name="minimum_age"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={field.value?.toString() ?? ""}
                        onValueChange={(value) => {
                          if (value === "disable") {
                            form.setValue("minimum_age", undefined);
                          } else {
                            form.setValue("minimum_age", Number(value));
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select age" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="disable">Disable</SelectItem>

                          {[...Array(88)].map((_, i) => {
                            const age = i + 12;
                            return (
                              <SelectItem key={age} value={age.toString()}>
                                {age}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                    {!!linkData?.link_lock_date_of_birth && (
                      <FormDescription>
                        <span className="font-semibold">Note: </span>
                        To disable the Date of Birth link lock, select
                        'Disable'.
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <section className="flex flex-col gap-0.5 my-4">
              <h4 className="text-copy">Lock explanation</h4>
              <p className="text-copy-lighter">
                Provide a brief description of this lock
              </p>
            </section>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl onChange={(e) => handleTextareaChange(e, field)}>
                    <Textarea
                      placeholder="Description (Optional)"
                      className="resize-none"
                      disabled={form.getValues("minimum_age") === undefined}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-xs text-copy-light text-right mt-1">
              {descLength}/80
            </p>

            <section
              className={`p-4 flex items-center gap-4 rounded-md mt-4 border ${
                !!linkData?.link_lock_date_of_birth
                  ? "border-success/40 bg-success/10"
                  : "border-error/40 bg-error/10"
              } `}
            >
              {!!linkData?.link_lock_date_of_birth ? (
                <CheckCircle2 size={20} className="text-success/80" />
              ) : (
                <AlertCircle size={20} className="text-error/80" />
              )}

              <div>
                <h4 className="text-copy font-medium">
                  {!!linkData?.link_lock_date_of_birth
                    ? "Lock is activated"
                    : "Lock not activated"}
                </h4>
                {!!linkData?.link_lock_date_of_birth === false && (
                  <p className="text-copy-lighter">
                    Set minimum age to activate lock.
                  </p>
                )}
              </div>
            </section>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
};

export default LinkLockDateOfBirthForm;
