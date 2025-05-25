import React, { useCallback, useEffect, useState } from "react";
import { CheckCircle2, ChevronRight, MoveLeft, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { debounce } from "lodash";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { socialChannelList } from "@/resources/appData";
import { useSelector } from "react-redux";

const SocialIconOptionGroupForm = ({ setFormState }) => {
  const { socialChannels } = useSelector((state) => state?.dashboard);

  const [optionList, setOptionList] = useState([...socialChannelList]);

  const form = useForm({
    defaultValues: {
      search: "",
    },
  });

  const handleSubmit = ({ search }) => {
    if (!search) {
      setOptionList(socialChannelList);
      return;
    }

    let result = socialChannelList?.filter((item) =>
      item.slug.includes(search.toLowerCase())
    );

    result = !result.length ? [] : result;

    setOptionList(result);
  };

  const debouncedSubmit = useCallback(
    debounce(() => {
      form.handleSubmit(handleSubmit)();
    }, 1000),
    []
  );

  useEffect(() => {
    const subscription = form.watch(() => {
      debouncedSubmit();
    });

    return () => subscription.unsubscribe();
  }, [form, debouncedSubmit]);

  return (
    <section>
      <DialogHeader className="relative mb-2.5">
        <Button
          size="icon"
          variant="link"
          className="w-5 h-5 [&_svg]:size-4 opacity-70 hover:opacity-100 absolute top-0 left-0"
          onClick={() => setFormState({ step: 1, addIconFormData: null })}
        >
          <MoveLeft />
        </Button>
        <DialogTitle className="text-copy text-center">
          Add social icon
        </DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormControl>
                  <div className="flex items-center gap-2.5 border border-input px-3 rounded-md focus-within:ring-1 focus-within:ring-ring">
                    <Search size={16} />
                    <Input
                      type="text"
                      placeholder="Search"
                      className="border-none shadow-none px-0 text-base focus-visible:ring-0"
                      autoComplete="off"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <ScrollArea className="h-64 w-full">
        {!optionList.length && (
          <div className="h-9 px-2.5 text-sm text-copy-lighter">
            <span>No results found. Try again?</span>
          </div>
        )}
        {optionList?.map((option, index) => {
          const already_added = socialChannels?.find((socialChannel) =>
            socialChannel.social_channel_slug.includes(option?.slug)
          );

          return (
            <Button
              key={index}
              type="button"
              variant="ghost"
              className="w-full justify-normal px-2.5 focus-visible:bg-accent"
              disabled={!!already_added}
              onClick={() =>
                setFormState({
                  step: 3,
                  addIconFormData: {
                    name: option?.name,
                    slug: option?.slug,
                    placeholder: option?.placeholder,
                    example: option?.example,
                    form_type: "insert",
                    form_value: null,
                    social_channel_id: null,
                    validation: option?.validation,
                  },
                })
              }
            >
              <div className="flex items-center w-full gap-2.5">
                {option?.icon}
                <span>{option?.name}</span>
                <span className="ml-auto">
                  {!!already_added ? (
                    <CheckCircle2 className="text-success" />
                  ) : (
                    <ChevronRight />
                  )}
                </span>
              </div>
            </Button>
          );
        })}
      </ScrollArea>
    </section>
  );
};

export default SocialIconOptionGroupForm;
