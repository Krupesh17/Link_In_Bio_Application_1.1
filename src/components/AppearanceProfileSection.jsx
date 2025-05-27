import React, { useState } from "react";
import { Button } from "./ui/button";
import { Image, Loader2, User, Waypoints } from "lucide-react";
import {
  EditDisplayNameBioDialog,
  EditProfileImageDialog,
  SocialIconsDialog,
} from "./dialog-boxs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileImageLayoutValidation } from "@/validations";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useUpdateAppearance } from "@/tanstack-query/queries";
import { updateAppearanceData } from "@/redux/features/dashboardSlice";

const AppearanceProfileSection = () => {
  const { appearance, isLoading } = useSelector((state) => state?.dashboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [isProfileInfoUpdating, setProfileInfoUpdating] = useState(false);
  const [isEditProfileImageDialogOpen, setEditProfileImageDialogOpen] =
    useState(false);
  const [isEditDisplayNameBioDialogOpen, setEditDisplayNameBioDialogOpen] =
    useState(false);
  const [isSocialIconsDialogOpen, setSocialIconsDialogOpen] = useState(false);
  const [socialIconsFormState, setSocialIconsFormState] = useState({
    step: 1,
    addIconFormData: null,
  });

  const profileSectionButtonList = [
    {
      icon: <Image />,
      name: "Edit profile image",
      onClick: () => {
        setEditProfileImageDialogOpen(true);
      },
    },
    {
      icon: <User />,
      name: "Edit display name and bio",
      onClick: () => {
        setEditDisplayNameBioDialogOpen(true);
      },
    },
    {
      icon: <Waypoints />,
      name: "Edit social icons",
      onClick: () => {
        setSocialIconsDialogOpen(true);
      },
    },
  ];

  const profileImageLayoutRadioButtonList = [
    {
      layout_name: "Classic",
      radio_value: "classic",
      img_src: "/assets/images/profile_image_example.avif",
      img_alt: "Example classic profile image",
      img_className: "w-14 h-14 rounded-full mx-auto mt-5",
    },
    {
      layout_name: "Hero",
      radio_value: "hero",
      img_src: "/assets/images/profile_image_example.avif",
      img_alt: "Example hero profile image",
      img_className: "w-24 h-[106px] rounded-t-md mx-auto mt-5 object-cover",
    },
  ];

  const form = useForm({
    resolver: yupResolver(profileImageLayoutValidation),
    defaultValues: {
      profileImageLayout:
        !isLoading && appearance ? appearance?.profile_image_layout : "classic",
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
    <>
      <EditProfileImageDialog
        isEditProfileImageDialogOpen={isEditProfileImageDialogOpen}
        setEditProfileImageDialogOpen={setEditProfileImageDialogOpen}
      />

      <EditDisplayNameBioDialog
        isEditDisplayNameBioDialogOpen={isEditDisplayNameBioDialogOpen}
        setEditDisplayNameBioDialogOpen={setEditDisplayNameBioDialogOpen}
      />

      <SocialIconsDialog
        isSocialIconsDialogOpen={isSocialIconsDialogOpen}
        setSocialIconsDialogOpen={setSocialIconsDialogOpen}
        socialIconsFormState={socialIconsFormState}
        setSocialIconsFormState={setSocialIconsFormState}
      />

      <section className="max-w-[650px] mx-auto mb-4 my-8">
        <h2 className="text-xl max-sm:text-lg font-semibold mb-4">Profile</h2>

        <div className="relative p-4 border border-border rounded-md bg-background">
          {isProfileInfoUpdating && (
            <Loader2
              size={20}
              className="absolute top-2 left-2 text-copy-lighter animate-spin"
            />
          )}

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
                        {profileImageLayoutRadioButtonList?.map(
                          (item, index) => (
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
                          )
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <ul className="flex flex-col gap-2">
            {profileSectionButtonList.map((item, index) => {
              return (
                <li key={index}>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 w-full"
                    onClick={item?.onClick}
                  >
                    {item?.icon} <span>{item?.name}</span>
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default AppearanceProfileSection;
