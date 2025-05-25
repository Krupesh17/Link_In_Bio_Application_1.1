import React from "react";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { linkLayoutValidation } from "@/validations";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useUpdateLink } from "@/tanstack-query/queries";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { updateLinksData } from "@/redux/features/dashboardSlice";
import { Button } from "../ui/button";
import { CircleAlert, Image } from "lucide-react";

const LinkButtonLayoutForm = ({ linkData, setLoading, setActionState }) => {
  const { links } = useSelector((state) => state?.dashboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const form = useForm({
    resolver: yupResolver(linkLayoutValidation),
    defaultValues: {
      link_layout: linkData ? linkData?.link_layout : "classic",
    },
  });

  const { mutateAsync: updateLink } = useUpdateLink();

  const handleSubmit = async (value) => {
    try {
      setLoading(true);
      const response = await updateLink({
        link_id: linkData?.id,
        data_object: { link_layout: value?.link_layout },
      });

      const indexOfLinkToBeUpdated = await links?.findIndex(
        (link) => link?.id === response?.at(0)?.id
      );

      const updatedLinks = [...links];
      updatedLinks?.splice(indexOfLinkToBeUpdated, 1, response?.at(0));

      dispatch(updateLinksData(updatedLinks));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Unable to Update link layout",
        description:
          "Couldn't update link layout. Check your selection and try again.",
      });
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 pb-4">
      <p className="text-sm text-copy-lighter mb-4">
        Choose a layout for your link
      </p>

      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="link_layout"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.handleSubmit(handleSubmit)({
                        link_layout: value,
                      });
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1 gap-2.5"
                  >
                    <FormItem className="flex sm:items-center max-sm:flex-col gap-4 p-4 border border-border rounded-md space-y-0">
                      <div className="flex items-center gap-4">
                        <FormControl>
                          <RadioGroupItem value="classic" />
                        </FormControl>
                        <div className="text-wrap w-full">
                          <FormLabel>Classic</FormLabel>
                          <FormDescription>
                            Efficient, direct and compact.
                          </FormDescription>
                        </div>
                      </div>

                      <img
                        src="/assets/images/classic_link_layout.webp"
                        className="sm:h-10 max-sm:w-full ml-auto"
                      />
                    </FormItem>

                    <FormItem className="p-4 border border-border rounded-md space-y-0">
                      <section
                        className={`flex sm:items-center max-sm:flex-col gap-4 ${
                          linkData?.link_thumbnail_icon
                            ? "text-copy-lighter mb-4"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <FormControl>
                            <RadioGroupItem
                              value="featured"
                              disabled={
                                linkData?.link_thumbnail_icon ? true : false
                              }
                            />
                          </FormControl>

                          <div className="text-wrap w-full">
                            <FormLabel>Featured</FormLabel>
                            <FormDescription>
                              Make your link stand out with a larger, more
                              attractive display.
                            </FormDescription>

                            {!linkData?.link_thumbnail_url &&
                              !linkData?.link_thumbnail_icon && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="h-10 w-full mt-4"
                                  onClick={() => {
                                    setActionState({
                                      action_form_title: "Add Thumbnail",
                                      action_form_slug: "link_thumbnail",
                                    });
                                  }}
                                >
                                  <Image strokeWidth={1.5} />
                                  <span>Add thumbnail</span>
                                </Button>
                              )}
                          </div>
                        </div>

                        <img
                          src="/assets/images/featured_link_layout.webp"
                          className="sm:h-[120px] max-sm:w-full ml-auto"
                        />
                      </section>

                      {linkData?.link_thumbnail_icon && (
                        <section className="bg-sky-300/20 text-copy flex items-center gap-4 p-4 rounded-md">
                          <CircleAlert size={20} strokeWidth={1} />
                          <span className="text-sm">
                            Featured layout is not available for links with icon
                            thumbnails
                          </span>
                        </section>
                      )}
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default LinkButtonLayoutForm;
