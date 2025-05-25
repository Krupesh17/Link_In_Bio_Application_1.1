import React from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2, MoveLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateSocialChannel,
  useDeleteSocialChannel,
  useUpdateSocialChannel,
} from "@/tanstack-query/queries";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateSocialChannelsData } from "@/redux/features/dashboardSlice";

const AddSocialIconForm = ({
  formState,
  setFormState,
  setSocialIconsDialogOpen,
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { user } = useSelector((state) => state.user);
  const { socialChannels } = useSelector((state) => state.dashboard);

  const {
    name,
    slug,
    placeholder,
    example,
    form_type,
    form_value,
    social_channel_id,
    validation,
  } = formState?.addIconFormData;

  const form = useForm({
    resolver: yupResolver(validation),
    defaultValues: {
      socialAddress: !form_value ? "" : form_value,
    },
  });

  const {
    mutateAsync: createSocialChannel,
    isPending: isSocialChannelCreating,
  } = useCreateSocialChannel();

  const { mutateAsync: deleteSocialChannel, isPending: isDeleteSocialChannel } =
    useDeleteSocialChannel();

  const { mutateAsync: updateSocialChannel, isPending: isUpdatingChannel } =
    useUpdateSocialChannel();

  const handleSubmit = async (value) => {
    try {
      if (form_type === "update") {
        if (form_value === value?.socialAddress) {
          return;
        }
        const response = await updateSocialChannel({
          social_channel_id: social_channel_id,
          data_object: { social_channel_value: value?.socialAddress },
        });

        const indexOfObjectToBeUpdated = await socialChannels?.findIndex(
          (channel) => channel?.id === response?.at(0)?.id
        );

        const updatedSocialChannels = [...socialChannels];
        updatedSocialChannels?.splice(
          indexOfObjectToBeUpdated,
          1,
          response?.at(0)
        );

        dispatch(updateSocialChannelsData(updatedSocialChannels));
      } else {
        const channel_index = !socialChannels.length
          ? 0
          : Math.max(
              ...socialChannels?.map((channel) => channel.social_channel_index)
            ) + 1;

        const response = await createSocialChannel({
          user_id: user?.id,
          social_channel_name: name,
          social_channel_slug: slug,
          social_channel_value: value?.socialAddress,
          social_channel_visible: true,
          social_channel_index: channel_index,
        });

        const updatedSocialChannels = [...socialChannels];
        updatedSocialChannels?.push(response?.at(0));

        dispatch(updateSocialChannelsData(updatedSocialChannels));
      }
      setSocialIconsDialogOpen(false);
      setFormState({ step: 1, addIconFormData: null });
    } catch (error) {
      toast({
        variant: "destructive",
        title: `${
          form_type === "update"
            ? "Oops! Social Icon Update Failed"
            : "Oops! Social Icon Creation Failed"
        }`,
        description: `${
          form_type === "update"
            ? "The social icon couldn't be updated due to a technical issue. Please try again."
            : "The social icon couldn't be added due to a technical issue. Please try again."
        }`,
      });
      
      console.error(error.message);
    } finally {
      form.reset();
    }
  };

  const handleDelete = async () => {
    try {
      if (!social_channel_id) {
        throw new Error("Social channel Id is missing. Please try again.");
      }
      
      const response = await deleteSocialChannel(social_channel_id);

      const indexOfObjectToBeDeleted = await socialChannels?.findIndex(
        (channel) => channel?.id === response?.at(0)?.id
      );

      const updatedSocialChannels = [...socialChannels];
      updatedSocialChannels?.splice(indexOfObjectToBeDeleted, 1);

      dispatch(updateSocialChannelsData(updatedSocialChannels));

      setSocialIconsDialogOpen(false);
      setFormState({ step: 1, addIconFormData: null });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Social Icon Deletion Failed",
        description:
          "The social icon couldn't be deleted due to a technical issue. Please try again.",
      });
      console.error(error.message);
    }
  };

  return (
    <section>
      <DialogHeader className="relative mb-2.5">
        <Button
          size="icon"
          variant="link"
          className="w-5 h-5 [&_svg]:size-4 opacity-70 hover:opacity-100 absolute top-0 left-0"
          onClick={() =>
            setFormState({
              step: form_type === "update" ? 1 : 2,
              addIconFormData: null,
            })
          }
        >
          <MoveLeft />
        </Button>
        <DialogTitle className="text-copy text-center">
          {form_type === "update" ? "Edit" : "Add"} {name} icon
        </DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="socialAddress"
            render={({ field }) => (
              <FormItem className="mt-4 mb-2">
                <FormControl>
                  <Input
                    type="text"
                    placeholder={placeholder}
                    autoComplete="off"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-copy-lighter text-xs mb-4">Example: {example}</p>

          <Button type="submit" variant="contrast" className="w-full h-10">
            {isSocialChannelCreating || isUpdatingChannel ? (
              <Loader2 className="animate-spin" />
            ) : form_type === "update" ? (
              "Save"
            ) : (
              "Add"
            )}
          </Button>

          {form_type === "update" && (
            <Button
              type="button"
              variant="secondary"
              className="w-full h-10 mt-2"
              onClick={handleDelete}
            >
              {isDeleteSocialChannel ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Remove"
              )}
            </Button>
          )}
        </form>
      </Form>
    </section>
  );
};

export default AddSocialIconForm;
