import React from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNewLinkValidation } from "@/validations";
import { useCreateLink } from "@/tanstack-query/queries";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { updateLinksData } from "@/redux/features/dashboardSlice";

const AddNewLinkDialog = ({
  isAddNewLinkDialogOpen,
  setAddNewLinkDialogOpen,
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { user, profile } = useSelector((state) => state.user);
  const { links } = useSelector((state) => state.dashboard);

  const form = useForm({
    resolver: yupResolver(addNewLinkValidation),
    defaultValues: {
      link_title: "",
      link_url: "",
    },
  });

  const { mutateAsync: createLink, isPending: creatingLink } = useCreateLink();

  const handleSubmit = async (value) => {
    try {
      const link_index = !links.length
        ? 0
        : Math.max(...links?.map((link) => link.link_index)) + 1;

      const response = await createLink({
        user_id: user?.id,
        username: profile?.username,
        link_title: value?.link_title,
        link_url: value?.link_url,
        link_index: link_index,
      });

      const updatedLinks = [...links];
      updatedLinks?.push(response?.at(0));

      dispatch(updateLinksData(updatedLinks));
      setAddNewLinkDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Link Addition Failed",
        dispatch:
          "The link couldn't be added due to a technical issue. Please try again.",
      });

      console.error(error.message);
    } finally {
      form.reset();
    }
  };

  const handleDialogClose = () => {
    setAddNewLinkDialogOpen(false);
    form.reset();
  };
  return (
    <Dialog open={isAddNewLinkDialogOpen} onOpenChange={handleDialogClose}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader className="mb-2">
          <DialogTitle className="text-copy text-center">
            Add new link
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="link_title"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Title"
                      autoComplete="off"
                      className="h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-copy-lighter text-xs mb-4">Example: Cat Goals</p>

            <FormField
              control={form.control}
              name="link_url"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Enter URL"
                      autoComplete="off"
                      className="h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-copy-lighter text-xs mb-5">
              Example: www.naptimeisnow.com/dreams
            </p>

            <Button type="submit" variant="contrast" className="w-full h-10">
              {creatingLink ? <Loader2 className="animate-spin" /> : "Add"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewLinkDialog;
