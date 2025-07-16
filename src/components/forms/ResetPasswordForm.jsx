import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordValidation } from "@/validations";
import { v4 as uuidV4 } from "uuid";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useResetPassword } from "@/tanstack-query/queries";

const ResetPasswordForm = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: yupResolver(ResetPasswordValidation),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync: resetPassword, isPending: isResetPasswordPending } =
    useResetPassword();

  const handleSubmit = async (value) => {
    try {
      const changePasswordToken = uuidV4();

      await resetPassword({ email: value?.email, changePasswordToken });

      localStorage.setItem("changePasswordToken", changePasswordToken);

      toast({
        title: "Password Reset Email Sent",
        description: "Check your inbox for password reset instructions.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Password Reset Failed",
        description: "Password Reset unsuccessful. Please try again.",
      });

      console.log(error.message);
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="h-[60px] text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="block">
          {isResetPasswordPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
