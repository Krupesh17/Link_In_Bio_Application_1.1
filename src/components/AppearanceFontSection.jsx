import React, { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { InputColor } from ".";
import { debounce } from "lodash";
import { appearanceFontConfigValidation } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateAppearance } from "@/tanstack-query/queries";
import { updateAppearanceData } from "@/redux/features/dashboardSlice";

const AppearanceFontSection = () => {
  const [isFontConfigUpdating, setFontConfigUpdating] = useState(false);

  const { appearance } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const form = useForm({
    resolver: yupResolver(appearanceFontConfigValidation),
    defaultValues: {
      fontColor: appearance?.font_color ? appearance?.font_color : "#FFFFFF",
    },
  });

  const { mutateAsync: updateAppearance } = useUpdateAppearance();

  const handleSubmit = async (value) => {
    try {
      if (!value?.fontColor) {
        throw new Error(
          "Font color is required, please provide a valid color value."
        );
      }

      const response = await updateAppearance({
        id: appearance?.id,
        data_object: {
          font_color: value?.fontColor,
        },
      });

      dispatch(updateAppearanceData(response));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Font configuration update unsuccessful",
        description: "Could not update font configuration. Please try again.",
      });

      console.log(error?.message);
    } finally {
      setFontConfigUpdating(false);
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
      setFontConfigUpdating(true);
      debouncedSubmit();
    });
    return () => subscription.unsubscribe();
  }, [form, debouncedSubmit]);

  return (
    <section className="max-w-[650px] mx-auto mb-8">
      <h2 className="text-xl max-sm:text-lg font-semibold flex items-center gap-2 mt-8 mb-4">
        Fonts
        {isFontConfigUpdating && (
          <Loader2 size={20} className="text-copy-light animate-spin" />
        )}
      </h2>
      <div className="relative p-4 border border-border rounded-md bg-background">
        <Form {...form}>
          <form>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="fontColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Font color</FormLabel>
                    <FormControl>
                      <InputColor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default AppearanceFontSection;
