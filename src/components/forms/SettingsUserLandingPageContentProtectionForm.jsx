import React, { useCallback, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useUpdateUserProfile } from "@/tanstack-query/queries";
import { debounce } from "lodash";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Switch } from "../ui/switch";
import { updateProfileData } from "@/redux/features/userSlice";

const userLandingPageContentProtectionSwitch = [
  {
    name: "sensitiveContentProtection",
    title: "Sensitive Content Warning",
    description: "Show warning before displaying your page",
  },
  {
    name: "ageRestrictionProtection",
    title: "Age Restriction",
    description: "Require age verification (18+)",
  },
];

const SettingsUserLandingPageContentProtectionForm = () => {
  const { profile } = useSelector((state) => state?.user);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [isLoading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      sensitiveContentProtection: profile
        ? profile?.sensitive_content_page_protection
        : false,
      ageRestrictionProtection: profile
        ? profile?.age_restriction_page_protection
        : false,
    },
  });

  const { mutateAsync: updateUserProfile } = useUpdateUserProfile();

  const handleSubmit = async (value) => {
    try {
      const response = await updateUserProfile({
        user_profile_data: {
          sensitive_content_page_protection: value?.sensitiveContentProtection,
          age_restriction_page_protection: value?.ageRestrictionProtection,
        },
        user_profile_id: profile?.id,
      });

      dispatch(updateProfileData(response[0]));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! User Landing Page Protection Update Failed.",
        description:
          "The  user landing page elements protection couldn't be updated due to a technical issue. Please try again.",
      });

      console.error(error?.message);
    } finally {
      setLoading(false);
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
      debouncedSubmit();
      setLoading(true);
    });

    return () => subscription.unsubscribe();
  }, [form, debouncedSubmit]);

  return (
    <section className="max-w-[650px] mx-auto my-8">
      <div className="mb-4">
        <h2 className="text-xl max-sm:text-lg font-semibold mb-2">
          Content Protection
        </h2>
      </div>

      <div className="relative p-4 border border-border rounded-md bg-background">
        {isLoading && (
          <Loader2
            size={20}
            className="absolute top-2 right-2 text-copy-lighter animate-spin"
          />
        )}

        <Form {...form}>
          <form>
            <ul className="flex flex-col gap-4">
              {userLandingPageContentProtectionSwitch?.map((element, index) => (
                <li key={index}>
                  <FormField
                    control={form.control}
                    name={element?.name}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            {element?.title}
                          </FormLabel>
                          <FormDescription>
                            {element?.description}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            aria-label={`Toggle ${element?.title}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </li>
              ))}
            </ul>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SettingsUserLandingPageContentProtectionForm;
