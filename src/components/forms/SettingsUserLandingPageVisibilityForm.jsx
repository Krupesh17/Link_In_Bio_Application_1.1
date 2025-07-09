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
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useUpdateUserProfile } from "@/tanstack-query/queries";
import { debounce } from "lodash";
import { useToast } from "@/hooks/use-toast";
import { updateProfileData } from "@/redux/features/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLandingPageVisibilityValidation } from "@/validations";

const SettingsUserLandingPageVisibilityForm = () => {
  const { profile } = useSelector((state) => state?.user);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [isLoading, setLoading] = useState(false);

  const form = useForm({
    resolver: yupResolver(userLandingPageVisibilityValidation),
    defaultValues: {
      pageVisibilityStatus: profile
        ? profile?.profile_page_visibility_status
        : "public",
    },
  });

  const { mutateAsync: updateUserProfile } = useUpdateUserProfile();

  const handleSubmit = async (value) => {
    try {
      const response = await updateUserProfile({
        user_profile_data: {
          profile_page_visibility_status: value?.pageVisibilityStatus,
        },
        user_profile_id: profile?.id,
      });

      dispatch(updateProfileData(response[0]));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! User Landing Page Visibility Status Update Failed.",
        description:
          "The user landing page visibility status couldn't be updated due to a technical issue. Please try again.",
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
          Page Visibility
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
            <FormField
              control={form.control}
              name="pageVisibilityStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Page Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a page visibility status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="public">
                        Public - Anyone can view
                      </SelectItem>
                      <SelectItem value="private">
                        Private - Only you can view
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-copy-light">
                    Control who can see your page and links
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SettingsUserLandingPageVisibilityForm;
