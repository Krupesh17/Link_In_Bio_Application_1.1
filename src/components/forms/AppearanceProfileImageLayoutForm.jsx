import { useToast } from "@/hooks/use-toast";
import { updateAppearanceData } from "@/redux/features/dashboardSlice";
import { useUpdateAppearance } from "@/tanstack-query/queries";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { profileImageLayoutValidation } from "@/validations";

const AppearanceProfileImageLayoutForm = ({ setProfileInfoUpdating }) => {
  const { appearance, isLoading } = useSelector((state) => state?.dashboard);
  const { profile } = useSelector((state) => state?.user);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const profileImageLayoutRadioButtonList = [
    {
      layout_name: "Classic",
      radio_value: "classic",
      img_src: `${
        !profile?.profile_image_url
          ? "/assets/images/profile_image_example.avif"
          : profile?.profile_image_url
      }`,
      img_alt: "Example classic profile image",
      img_className: "w-14 h-14 rounded-full mx-auto mt-5",
    },
    {
      layout_name: "Hero",
      radio_value: "hero",
      img_src: `${
        !profile?.profile_image_url
          ? "/assets/images/profile_image_example.avif"
          : profile?.profile_image_url
      }`,
      img_alt: "Example hero profile image",
      img_className: "w-24 h-[106px] rounded-t-md mx-auto mt-5 object-cover",
    },
  ];

  const form = useForm({
    resolver: yupResolver(profileImageLayoutValidation),
    defaultValues: {
      profileImageLayout:
        !isLoading && appearance.profile_image_layout
          ? appearance?.profile_image_layout
          : "classic",
    },
  });

  const { mutateAsync: updateAppearance } = useUpdateAppearance();

  const handleSubmit = async (value) => {
    try {
      setProfileInfoUpdating(true);
      const response = await updateAppearance({
        id: appearance?.id,
        data_object: { profile_image_layout: value?.profileImageLayout },
      });

      dispatch(updateAppearanceData(response));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Unable to Update Profile Image Layout",
        description:
          "Couldn't update profile image layout. Check your selection and try again.",
      });

      console.error(error?.message);
    } finally {
      setProfileInfoUpdating(false);
    }
  };

  return (
    <Form {...form}>
      <form className="mb-4">
        <FormField
          control={form.control}
          name="profileImageLayout"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.handleSubmit(handleSubmit)({
                      profileImageLayout: value,
                    });
                  }}
                  defaultValue={field.value}
                  className="flex items-center justify-center gap-4"
                >
                  {profileImageLayoutRadioButtonList?.map((item, index) => (
                    <div className="flex flex-col gap-1" key={index}>
                      <div className="relative border border-border rounded-md w-32 h-32 overflow-hidden bg-accent/40">
                        <img
                          src={item?.img_src}
                          alt={item?.img_alt}
                          className={item?.img_className}
                        />
                        <FormItem className="absolute top-0 right-0.5">
                          <FormControl>
                            <RadioGroupItem value={item?.radio_value} />
                          </FormControl>
                        </FormItem>
                        <div className="px-2 absolute bottom-2 left-0 right-0">
                          <h6 className="h-3 max-w-16 mx-auto mb-1.5 bg-border rounded-md"></h6>
                          <p className="h-2 max-w-20 mx-auto bg-border rounded-sm"></p>
                        </div>
                      </div>
                      <p className="text-center text-sm font-medium">
                        {item?.layout_name}
                      </p>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AppearanceProfileImageLayoutForm;
