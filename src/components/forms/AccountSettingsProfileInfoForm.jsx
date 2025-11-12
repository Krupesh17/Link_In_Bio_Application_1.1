import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";
import {
  AlertCircleIcon,
  Loader2,
  Loader2Icon,
  Pencil,
  StarsIcon,
} from "lucide-react";
import {
  useChangeEmail,
  useIsUsernameTaken,
  useUpdateUserProfile,
} from "@/tanstack-query/queries";
import { updateProfileData, updateUserData } from "@/redux/features/userSlice";
import { v4 as uuidV4 } from "uuid";
import { AccountAvatar, EnhancedBioSuggestionList } from "..";
import { EditProfileImageDialog } from "../dialog-boxs";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountSettingsProfileInfoValidation } from "@/validations";
import { enhanceBio } from "@/services/geminiService";

const AccountSettingsProfileInfoForm = () => {
  const { user, profile } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [bioLength, setBioLength] = useState(
    profile?.bio?.length ? profile?.bio?.length : 0
  );
  const [isLoading, setLoading] = useState(false);
  const [isEditProfileImageDialogOpen, setEditProfileImageDialogOpen] =
    useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsLoading, setSuggestionsLoading] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState(null);

  const form = useForm({
    resolver: yupResolver(accountSettingsProfileInfoValidation),
    defaultValues: {
      profile_title: profile ? profile?.profile_title : "",
      bio: profile ? profile?.bio : "",
      username: profile ? profile?.username : "",
      email: user ? user?.email : "",
    },
  });

  const { setValue, getValues } = form;
  const bio = getValues("bio");

  const { mutateAsync: isUsernameTaken } = useIsUsernameTaken();
  const { mutateAsync: updateUserProfile } = useUpdateUserProfile();
  const { mutateAsync: changeEmail } = useChangeEmail();

  const updateUserProfileInfo = async (data, profile_id) => {
    try {
      if (!profile_id) {
        throw new Error("Failed to update profile: undefined profile id");
      }

      const response = await updateUserProfile({
        user_profile_data: data,
        user_profile_id: profile_id,
      });

      if (!response?.length) {
        throw new Error(
          "Something went wrong while updating user profile details."
        );
      }

      dispatch(updateProfileData(response[0]));
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (value) => {
    try {
      setLoading(true);
      localStorage.removeItem("changeEmailToken");
      console.log("click");

      if (
        profile?.profile_title !== value?.profile_title ||
        profile?.bio !== value?.bio
      ) {
        await updateUserProfileInfo(
          { profile_title: value?.profile_title, bio: value?.bio },
          profile?.id
        );
      }

      if (profile?.username !== value?.username) {
        const isUsernameExist = await isUsernameTaken(
          value?.username.toLowerCase()
        );

        if (isUsernameExist) {
          form.setError("username", {
            type: "manual",
            message: "Username already taken.",
          });
          throw new Error("Username already taken.");
        }

        await updateUserProfileInfo(
          { username: value?.username.toLowerCase() },
          profile?.id
        );
      }

      if (user?.email !== value?.email) {
        const changeEmailToken = uuidV4();

        const response = await changeEmail({
          newEmail: value?.email,
          changeEmailToken,
        });

        localStorage.setItem("changeEmailToken", changeEmailToken);

        if (!response) {
          throw new Error("Email address change unsuccessful.");
        }

        toast({
          variant: "success",
          title: "Email Change Request Sent",
          description:
            "Please check your NEW email address to confirm the change.",
        });

        dispatch(updateUserData({ ...user, email: response?.new_email }));
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! We Couldn't Save Your Profile Changes",
        description:
          "We ran into an error while updating your profile. Please check your information and try again.",
      });

      console.log(error?.message);
    } finally {
      setLoading(false);
      setSuggestions([]);
    }
  };

  const handleTextareaChange = (e, field) => {
    let textareaValue = e.target.value;
    if (textareaValue.length > 80) {
      form.setError("bio", {
        message: "Bio cannot be longer than 80 characters",
      });
    } else {
      field.onChange(textareaValue);
      setBioLength(textareaValue.length);
    }

    if (textareaValue.length < 80) {
      form.clearErrors("bio");
    }
  };

  const handleEnhanceBioWithAI = useCallback(async () => {
    try {
      if (!bio?.length) {
        throw new Error(
          "To enhance your bio, you need to write something first about yourself."
        );
      }

      if (!bio.trim() || isSuggestionsLoading) return;

      setSuggestionsLoading(true);
      setSuggestionsError(null);
      setSuggestions([]);

      const result = await enhanceBio(bio);
      setSuggestions(result);
    } catch (error) {
      if (error) {
        setSuggestionsError(error?.message);
        console.error(error?.message);
      } else {
        setSuggestionsError(
          "Bio enhancement couldn't be completed due to an error."
        );
        console.error("Bio enhancement couldn't be completed due to an error.");
      }
    } finally {
      setSuggestionsLoading(false);
    }
  }, [bio, isSuggestionsLoading]);

  return (
    <>
      <EditProfileImageDialog
        isEditProfileImageDialogOpen={isEditProfileImageDialogOpen}
        setEditProfileImageDialogOpen={setEditProfileImageDialogOpen}
      />

      <div className="p-4 border border-border rounded-md bg-background mb-4">
        <section className="w-full flex items-center my-2">
          <div className="relative mx-auto">
            <AccountAvatar
              name={profile?.profile_title}
              username={profile?.username}
              profileImageURL={profile?.profile_image_url}
              className="w-32 h-32 max-sm:w-16 max-sm:h-16 bg-black"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute bottom-0 right-0 w-10 h-10 max-sm:w-7 max-sm:h-7 [&_svg]:size-4 rounded-full text-copy-lighter"
              onClick={() => setEditProfileImageDialogOpen(true)}
            >
              <Pencil size={14} />
            </Button>
          </div>
        </section>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="profile_title"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Profile Title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Profile Title"
                      className="h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mb-2">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between gap-2">
                      <span>Bio</span>
                      <div className="">
                        <Button
                          type="button"
                          variant="outline"
                          className="text-xs [&_svg]:size-3.5 gap-1 h-6 px-3 rounded-md"
                          onClick={handleEnhanceBioWithAI}
                        >
                          <span
                            className={`bg-gradient-to-r from-purple-600 via-blue-500 to-teal-500 bg-clip-text text-transparent ${
                              isSuggestionsLoading &&
                              "animate-[gradient_3s_ease_infinite] bg-[length:200%_auto]"
                            }`}
                          >
                            Enhance
                          </span>
                          {isSuggestionsLoading ? (
                            <Loader2Icon className="animate-spin text-teal-500" />
                          ) : (
                            <StarsIcon className="text-teal-500" />
                          )}
                        </Button>
                      </div>
                    </FormLabel>
                    <FormControl
                      onChange={(e) => handleTextareaChange(e, field)}
                    >
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-xs text-copy-light text-right mt-1">
                {bioLength}/80
              </p>
            </div>

            {suggestionsError && (
              <p className="text-xs font-medium mb-4 flex items-center gap-1.5 text-red-600">
                <AlertCircleIcon className="size-4" />
                <span>{suggestionsError}</span>
              </p>
            )}

            {suggestions.length !== 0 && (
              <div className="mb-4">
                <EnhancedBioSuggestionList
                  suggestions={suggestions}
                  setSuggestions={setSuggestions}
                  setValue={setValue}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Username"
                      className="h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="contrast"
              className="w-full h-10"
              disabled={isSuggestionsLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save Details"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AccountSettingsProfileInfoForm;
