import React, { useState } from "react";
import {
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SocialIconPositionValidation } from "@/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Loader2, Plus } from "lucide-react";
import { SocialIconDragDropReorderingList } from "..";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateAppearance } from "@/tanstack-query/queries";
import { useToast } from "@/hooks/use-toast";
import { updateAppearanceData } from "@/redux/features/dashboardSlice";

const SocialIconsForm = ({ setFormState }) => {
  const { appearance, isLoading } = useSelector((state) => state?.dashboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [isSocialChannelsUpdating, setSocialChannelsUpdating] = useState(false);

  const form = useForm({
    resolver: yupResolver(SocialIconPositionValidation),
    defaultValues: {
      socialIconPlacement:
        !isLoading && appearance ? appearance?.social_icons_position : "top",
    },
  });

  const { mutateAsync: updateAppearance } = useUpdateAppearance();

  const handleSubmit = async (value) => {
    try {
      setSocialChannelsUpdating(true);
      const response = await updateAppearance({
        id: appearance?.id,
        data_object: { social_icons_position: value.socialIconPlacement },
      });

      dispatch(updateAppearanceData(response));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Unable to Update Social Icon Placement",
        description:
          "Couldn't update social icon placement. Check your selection and try again.",
      });
      console.error(error.message);
    } finally {
      setSocialChannelsUpdating(false);
    }
  };

  return (
    <section>
      <DialogHeader className="relative gap-2.5 mb-4">
        <Loader2
          size={16}
          className={`animate-spin text-copy-lighter absolute top-0 left-0 ${
            isSocialChannelsUpdating ? "block" : "invisible"
          }`}
        />
        <DialogTitle className="text-copy text-center">
          Social icons
        </DialogTitle>
        <DialogDescription className="text-left">
          <span className="block text-base text-copy font-semibold">
            Let visitors know where to find you.
          </span>
          <span className="text-copy-lighter">
            Showcase your social profiles, email, and more with clickable icons
            on your LinkChain.
          </span>
        </DialogDescription>
      </DialogHeader>

      <SocialIconDragDropReorderingList
        setFormState={setFormState}
        setSocialChannelsUpdating={setSocialChannelsUpdating}
      />

      <div className="mb-4">
        <h5 className="text-sm font-semibold text-copy">
          Social icon placement.
        </h5>
        <p className="text-sm text-copy-lighter">
          Place icons either at the top or bottom of your profile.
        </p>
      </div>

      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="socialIconPlacement"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.handleSubmit(handleSubmit)({
                        socialIconPlacement: value,
                      });
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1 gap-2.5"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="top" />
                      </FormControl>
                      <FormLabel className="font-normal">Top</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="bottom" />
                      </FormControl>
                      <FormLabel className="font-normal">Bottom</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter>
        <Button
          type="button"
          variant="contrast"
          className="w-full h-10 mt-4"
          onClick={() => setFormState({ step: 2, addIconFormData: null })}
        >
          <Plus className="text-contrast-foreground" /> Add social icons
        </Button>
      </DialogFooter>
    </section>
  );
};

export default SocialIconsForm;
