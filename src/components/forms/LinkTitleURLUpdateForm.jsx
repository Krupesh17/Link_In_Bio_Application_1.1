import React, { useCallback, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNewLinkValidation } from "@/validations";
import { debounce } from "lodash";
import {
  useDeleteClicksByLinkId,
  useUpdateLink,
} from "@/tanstack-query/queries";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { updateLinksData } from "@/redux/features/dashboardSlice";

const LinkTitleURLUpdateForm = ({ linkData, setLoading }) => {
  const { links } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [editTitle, setEditTitle] = useState(false);
  const [editURL, setEditURL] = useState(false);

  const form = useForm({
    resolver: yupResolver(addNewLinkValidation),
    defaultValues: {
      link_title: linkData ? linkData?.link_title : "",
      link_url: linkData ? linkData?.link_url : "",
    },
  });

  const { mutateAsync: updateLink } = useUpdateLink();
  const { mutateAsync: deleteClicksByLinkId } = useDeleteClicksByLinkId();

  const handleSubmit = async (value) => {
    try {
      const initialLinkURL = linkData?.link_url;

      const response = await updateLink({
        link_id: linkData?.id,
        data_object: {
          link_title: value?.link_title,
          link_url: value?.link_url,
        },
      });

      if (initialLinkURL !== value?.link_url) {
        await deleteClicksByLinkId(linkData?.id);
      }

      const indexOfLinkToBeUpdated = await links?.findIndex(
        (link) => link?.id === response?.at(0)?.id
      );

      const updatedLinks = [...links];
      updatedLinks?.splice(indexOfLinkToBeUpdated, 1, response?.at(0));

      dispatch(updateLinksData(updatedLinks));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Link Update Failed.",
        description:
          "The link couldn't be updated due to a technical issue. Please try again.",
      });
      console.error(error.message);
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
    if (editTitle) form.setFocus("link_title");
    if (editURL) form.setFocus("link_url");
  }, [editTitle, editURL]);

  useEffect(() => {
    const subscription = form.watch(() => {
      debouncedSubmit();
      setLoading(true);
    });

    return () => subscription.unsubscribe();
  }, [form, debouncedSubmit]);

  return (
    <Form {...form}>
      <form className="w-full">
        <FormField
          control={form.control}
          name="link_title"
          render={({ field }) => (
            <FormItem className="leading-none space-y-0 mb-2">
              <Button
                type="button"
                className={`w-full text-sm font-semibold h-auto p-0 rounded-sm bg-transparent text-copy text-left text-wrap hover:bg-transparent hover:underline ${
                  editTitle ? "hidden" : "inline-block"
                }`}
                onClick={() => setEditTitle(true)}
              >
                {linkData?.link_title ? (
                  <span className="text-wrap text-ellipsis line-clamp-1">
                    {linkData?.link_title}
                  </span>
                ) : (
                  <span className="text-copy-lighter">Title</span>
                )}
              </Button>
              <FormControl
                onBlur={() => {
                  setEditTitle(false);
                  form.clearErrors("link_title");
                }}
              >
                <Input
                  type="text"
                  placeholder="Title"
                  autoComplete="title"
                  className={`text-sm font-semibold h-auto p-0 border-none focus-visible:ring-0 ${
                    editTitle ? "block" : "hidden"
                  }`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link_url"
          render={({ field }) => (
            <FormItem className="leading-none space-y-0">
              <Button
                type="button"
                className={`w-full text-sm h-auto p-0 rounded-sm bg-transparent text-copy text-left text-wrap hover:bg-transparent hover:underline ${
                  editURL ? "hidden" : "inline-block"
                }`}
                onClick={() => setEditURL(true)}
              >
                {linkData?.link_url ? (
                  <span className="text-wrap text-ellipsis line-clamp-1">
                    {linkData?.link_url}
                  </span>
                ) : (
                  <span className="text-copy-lighter">
                    https://www.example-link.com
                  </span>
                )}
              </Button>

              <FormControl
                onBlur={() => {
                  setEditURL(false);
                  form.clearErrors("link_url");
                }}
              >
                <Input
                  type="url"
                  placeholder="https://www.example-link.com"
                  autoComplete="url"
                  className={`text-sm h-auto p-0 font-medium border-none focus-visible:ring-0 ${
                    editURL ? "block" : "hidden"
                  }`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default LinkTitleURLUpdateForm;
