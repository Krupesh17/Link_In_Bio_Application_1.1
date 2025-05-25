import React, { useState } from "react";
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
import { Loader2 } from "lucide-react";
import { fetchProfileByUserId } from "@/redux/thunks";

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

  const form = useForm({
    resolver: yupResolver(profileInfoValidation),
    defaultValues: {
      profile_title:
        !profile?.profile_title === "" ? "" : profile?.profile_title,
      bio: !profile?.bio === "" ? "" : profile?.bio,
    },
  });

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

  return (
    <Dialog
      open={isEditDisplayNameBioDialogOpen}
      onOpenChange={setEditDisplayNameBioDialogOpen}
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
                    <FormLabel>Bio</FormLabel>
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

            <Button type="submit" variant="contrast" className="w-full h-10">
              {isUserProfileUpdating ? (
                <Loader2 className="animate-spin" />
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
