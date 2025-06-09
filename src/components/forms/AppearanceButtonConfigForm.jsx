import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { InputColor } from "..";
import { yupResolver } from "@hookform/resolvers/yup";
import { appearanceButtonsValidation } from "@/validations";
import { debounce } from "lodash";
import { useUpdateAppearance } from "@/tanstack-query/queries";
import { useDispatch, useSelector } from "react-redux";
import { updateAppearanceData } from "@/redux/features/dashboardSlice";
import { useToast } from "@/hooks/use-toast";

const buttonList = [
  {
    title: "Fill",
    buttons: [
      {
        button_slug: "fill_flat",
        button_class:
          "rounded-none bg-[#3a4147] border border-transparent hover:bg-transparent hover:border-[#3a4147]",
      },
      {
        button_slug: "fill_rounded_md",
        button_class:
          "rounded-md bg-[#3a4147] border border-transparent hover:bg-transparent hover:border-[#3a4147]",
      },
      {
        button_slug: "fill_rounded_full",
        button_class:
          "rounded-full bg-[#3a4147] border border-transparent hover:bg-transparent hover:border-[#3a4147]",
      },
    ],
  },
  {
    title: "Outline",
    buttons: [
      {
        button_slug: "outline_flat",
        button_class:
          "rounded-none bg-transparent hover:bg-[#3a4147] border border-[#3a4147] hover:border-transparent",
      },
      {
        button_slug: "outline_rounded_md",
        button_class:
          "rounded-md bg-transparent hover:bg-[#3a4147] border border-[#3a4147] hover:border-transparent",
      },
      {
        button_slug: "outline_rounded_full",
        button_class:
          "rounded-full bg-transparent hover:bg-[#3a4147] border border-[#3a4147] hover:border-transparent",
      },
    ],
  },
  {
    title: "Soft shadow",
    buttons: [
      {
        button_slug: "soft_shadow_flat",
        button_class:
          "rounded-none bg-[#3a4147] hover:bg-transparent shadow-lg shadow-[#3a4147]/80 border border-transparent hover:border-[#3a4147]",
      },
      {
        button_slug: "soft_shadow_rounded_md",
        button_class:
          "rounded-md bg-[#3a4147] hover:bg-transparent shadow-lg shadow-[#3a4147]/80 border border-transparent hover:border-[#3a4147]",
      },
      {
        button_slug: "soft_shadow_rounded_full",
        button_class:
          "rounded-full bg-[#3a4147] hover:bg-transparent shadow-lg shadow-[#3a4147]/80 border border-transparent hover:border-[#3a4147]",
      },
    ],
  },
  {
    title: "Hard shadow",
    buttons: [
      {
        button_slug: "hard_shadow_flat",
        button_class:
          "rounded-none bg-[#3a4147] border border-[#3a4147]/50 shadow-[5px_5px_0px_0px] shadow-[#3a4147]/50 hover:shadow-[3px_3px_0px_0px] hover:shadow-[#3a4147]/50 hover:translate-y-0.5",
      },
      {
        button_slug: "hard_shadow_rounded_md",
        button_class:
          "rounded-md bg-[#3a4147] border border-[#3a4147]/50 shadow-[5px_5px_0px_0px] shadow-[#3a4147]/50 hover:shadow-[3px_3px_0px_0px] hover:shadow-[#3a4147]/50 hover:translate-y-0.5",
      },
      {
        button_slug: "hard_shadow_rounded_full",
        button_class:
          "rounded-full bg-[#3a4147] border border-[#3a4147]/50 shadow-[5px_5px_0px_0px] shadow-[#3a4147]/50 hover:shadow-[3px_3px_0px_0px] hover:shadow-[#3a4147]/50 hover:translate-y-0.5",
      },
    ],
  },
];

const AppearanceButtonConfigForm = ({ setButtonConfigUpdating }) => {
  const { appearance } = useSelector((state) => state?.dashboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const form = useForm({
    resolver: yupResolver(appearanceButtonsValidation),
    defaultValues: {
      buttonType: appearance?.button_setup?.button_type
        ? appearance?.button_setup?.button_type
        : "fill_flat",
      buttonColor: appearance?.button_setup?.button_color
        ? appearance?.button_setup?.button_color
        : "#3A4147",
      buttonFontColor: appearance?.button_setup?.button_font_color
        ? appearance?.button_setup?.button_font_color
        : "#FFFFFF",
      buttonShadow: appearance?.button_setup?.button_shadow
        ? appearance?.button_setup?.button_shadow
        : "#9CA0A3",
    },
  });

  const { mutateAsync: updateAppearance } = useUpdateAppearance();

  const handleSubmit = async (value) => {
    try {
      const response = await updateAppearance({
        id: appearance?.id,
        data_object: {
          button_setup: {
            button_type: value?.buttonType,
            button_color: value?.buttonColor,
            button_font_color: value?.buttonFontColor,
            button_shadow: value?.buttonType?.includes("shadow")
              ? value?.buttonShadow
              : null,
          },
        },
      });

      dispatch(updateAppearanceData(response));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Button Style Update Unsuccessful",
        description: "Couldn't update button style. Please try again.",
      });

      console.error(error?.message);
    } finally {
      setButtonConfigUpdating(false);
    }
  };

  const debouncedSubmit = useCallback(
    debounce(() => {
      form.handleSubmit(handleSubmit)();
    }, 1000),
    []
  );

  useEffect(() => {
    const subscription = form.watch(() => {
      setButtonConfigUpdating(true);
      debouncedSubmit();
    });
    return () => subscription.unsubscribe();
  }, [form, debouncedSubmit]);

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="buttonType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  {buttonList.map((group, index) => (
                    <div key={index} className="mb-4">
                      <p className="text-sm font-medium mb-2">{group?.title}</p>
                      <ul className="grid max-[400px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 gap-4">
                        {group?.buttons?.map((button) => (
                          <li
                            key={button?.button_slug}
                            className={`relative w-full h-10 ${button?.button_class}`}
                          >
                            <FormItem className="absolute -top-2.5 -left-1 z-10">
                              <FormControl>
                                <RadioGroupItem
                                  value={button?.button_slug}
                                  className="bg-background"
                                />
                              </FormControl>
                            </FormItem>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="buttonColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button color</FormLabel>
                <FormControl>
                  <InputColor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="buttonFontColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button font color</FormLabel>
                <FormControl>
                  <InputColor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form?.getValues("buttonType").includes("shadow") && (
            <FormField
              control={form.control}
              name="buttonShadow"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button shadow</FormLabel>
                  <FormControl>
                    <InputColor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </form>
    </Form>
  );
};

export default AppearanceButtonConfigForm;
