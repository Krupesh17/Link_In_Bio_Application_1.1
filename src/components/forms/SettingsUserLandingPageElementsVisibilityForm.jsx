import React, { useCallback, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserProfile } from "@/tanstack-query/queries";
import { useForm } from "react-hook-form";
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
import { debounce } from "lodash";
import { updateProfileData } from "@/redux/features/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLandingPageElementsVisibilityValidation } from "@/validations";

const userLandingPageElementVisibilitySwitch = [
  {
    name: "profileImageVisible",
    title: "Show Profile Picture",
    description: "Display your profile picture on your page",
  },
  {
    name: "profileBioVisible",
    title: "Show Bio",
    description: "Display your bio text on your page",
  },
  {
    name: "profileSocialIconsVisible",
    title: "Show Social Icons",
    description: "Display social media icons on your page",
  },
];

const SettingsUserLandingPageElementsVisibilityForm = () => {
  const { profile } = useSelector((state) => state?.user);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [isLoading, setLoading] = useState(false);

  const form = useForm({
    resolver: yupResolver(userLandingPageElementsVisibilityValidation),
    defaultValues: {
      profileImageVisible: profile ? profile?.profile_image_visible : true,
      profileBioVisible: profile ? profile?.profile_bio_visible : true,
      profileSocialIconsVisible: profile
        ? profile?.profile_social_icons_visible
        : true,
    },
  });

  const { mutateAsync: updateUserProfile } = useUpdateUserProfile();

  const handleSubmit = async (value) => {
    try {
      const response = await updateUserProfile({
        user_profile_data: {
          profile_image_visible: value?.profileImageVisible,
          profile_bio_visible: value?.profileBioVisible,
          profile_social_icons_visible: value?.profileSocialIconsVisible,
        },
        user_profile_id: profile?.id,
      });

      dispatch(updateProfileData(response[0]));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! User Landing Page Visibility Update Failed.",
        description:
          "The  user landing page elements visibility couldn't be updated due to a technical issue. Please try again.",
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
          Page Options
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
              {userLandingPageElementVisibilitySwitch?.map((element, index) => (
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

export default SettingsUserLandingPageElementsVisibilityForm;
