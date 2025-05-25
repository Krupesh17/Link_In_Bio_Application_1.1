import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckUsernameValidation } from "@/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { debounce } from "lodash";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useIsUsernameTaken } from "@/tanstack-query/queries";

const CheckUsernameForm = ({ setFormState }) => {
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);

  const form = useForm({
    resolver: yupResolver(CheckUsernameValidation),
    defaultValues: {
      username: "",
    },
  });

  const { mutateAsync: isUsernameTaken, isPending: isUsernameScanning } =
    useIsUsernameTaken();

  const handleSubmit = async (value) => {
    try {
      setIsUsernameAvailable(false);

      const isUsernameExist = await isUsernameTaken(
        value?.username.toLowerCase()
      );

      if (isUsernameExist) {
        throw new Error("Username already taken.");
      }

      setIsUsernameAvailable(true);
    } catch (error) {
      form.setError("username", { type: "manual", message: error.message });
    }
  };

  const debouncedSubmit = useCallback(
    debounce(() => {
      form.handleSubmit(handleSubmit)();
    }, 1000),
    []
  );

  useEffect(() => {
    const subscription = form.watch(() => {
      setIsUsernameAvailable(false);
      debouncedSubmit();
    });
    return () => subscription.unsubscribe();
  }, [form, debouncedSubmit]);

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormControl>
                <div className="flex items-center gap-2.5 border border-input px-3 rounded-md focus-within:ring-1 focus-within:ring-ring">
                  <Input
                    type="text"
                    placeholder="Create your username"
                    className="h-[60px] border-none shadow-none px-0 text-base focus-visible:ring-0"
                    {...field}
                  />
                  {isUsernameAvailable && (
                    <CheckCircle2 className="text-success" />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="button"
          size="block"
          disabled={!isUsernameAvailable}
          onClick={() => {
            setFormState({
              step: 2,
              data: { username: form.getValues("username").toLowerCase() },
            });
          }}
        >
          {isUsernameScanning ? <Loader2 className="animate-spin" /> : "Next"}
        </Button>
      </form>
    </Form>
  );
};

export default CheckUsernameForm;
