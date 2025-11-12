import React, { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileInfoValidation } from "@/validations";
import { useUpdateUserProfile } from "@/tanstack-query/queries";
import { useToast } from "@/hooks/use-toast";
import { AlertCircleIcon, Loader2Icon, StarsIcon } from "lucide-react";
import { fetchProfileByUserId } from "@/redux/thunks";
import { enhanceBio } from "@/services/geminiService";
import { EnhancedBioSuggestionList } from "..";

const EditDisplayNameBioDialog = ({
  isEditDisplayNameBioDialogOpen,
  setEditDisplayNameBioDialogOpen,
}) => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const { user, profile } = useSelector((state) => state.user);

  const [bioLength, setBioLength] = useState(
    profile?.bio?.length ? profile?.bio?.length : 0
  );

  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsLoading, setSuggestionsLoading] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState(null);

  const form = useForm({
    resolver: yupResolver(profileInfoValidation),
    defaultValues: {
      profile_title:
        !profile?.profile_title === "" ? "" : profile?.profile_title,
      bio: !profile?.bio === "" ? "" : profile?.bio,
    },
  });

  const { setValue, getValues, reset } = form;
  const bio = getValues("bio");

  const { mutateAsync: updateUserProfile, isPending: isUserProfileUpdating } =
    useUpdateUserProfile();

  const handleSubmit = async (value) => {
    try {
      if (!profile?.id) {
        throw new Error("Failed to update profile: undefined profile id");
      }

      await updateUserProfile({
        user_profile_data: value,
        user_profile_id: profile?.id,
      });

      dispatch(fetchProfileByUserId(user?.id));

      setEditDisplayNameBioDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Profile Update Failed.",
        description: error.message,
      });
    } finally {
      form.reset();
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

  const handleEditDisplayNameBioDialogOpen = (value) => {
    if (isSuggestionsLoading || isUserProfileUpdating) return;

    setEditDisplayNameBioDialogOpen(value);
    setSuggestionsLoading(false);
    setSuggestionsError(null);
    setSuggestions([]);
    reset();
  };

  return (
    <Dialog
      open={isEditDisplayNameBioDialogOpen}
      onOpenChange={handleEditDisplayNameBioDialogOpen}
    >
      <DialogContent className="sm:max-w-[450px]" aria-describedby={undefined}>
        <DialogHeader className="gap-2.5">
          <DialogTitle className="text-copy text-center">
            Edit profile title and bio
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="profile_title"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Profile title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Profile title"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mb-4">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between gap-2">
                      <span>Bio</span>

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
                    </FormLabel>
                    <FormControl
                      onChange={(e) => handleTextareaChange(e, field)}
                    >
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className={`resize-none ${
                          isSuggestionsLoading && "animate-pulse-shadow"
                        }`}
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

            <Button
              type="submit"
              variant="contrast"
              className="w-full h-10"
              disabled={isSuggestionsLoading}
            >
              {isUserProfileUpdating ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDisplayNameBioDialog;
