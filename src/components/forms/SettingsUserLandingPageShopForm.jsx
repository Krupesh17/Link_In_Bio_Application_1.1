import React, { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
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
import { useUpdateUserProfile } from "@/tanstack-query/queries";
import { debounce } from "lodash";
import { updateProfileData } from "@/redux/features/userSlice";
import { useToast } from "@/hooks/use-toast";

const SettingsUserLandingPageShopForm = () => {
  const { profile } = useSelector((state) => state?.user);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [isLoading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      shop_published: profile ? profile?.shop_published : false,
    },
  });

  const { mutateAsync: updateUserProfile } = useUpdateUserProfile();

  const handleSubmit = async (value) => {
    try {
      const response = await updateUserProfile({
        user_profile_data: {
          shop_published: value?.shop_published,
        },
        user_profile_id: profile?.id,
      });

      dispatch(updateProfileData(response[0]));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! User Landing Page Shop Visibility Update Failed.",
        description:
          "The user landing page shop visibility couldn't be updated due to a technical issue. Please try again.",
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
        <h2 className="text-xl max-sm:text-lg font-semibold mb-2">Shop</h2>
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
            <FormField
              control={form.control}
              name="shop_published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Publish Shop</FormLabel>
                    <FormDescription>
                      Have your Shop tab visible on your LinkChain.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label={`Toggle Publish Shop`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SettingsUserLandingPageShopForm;
