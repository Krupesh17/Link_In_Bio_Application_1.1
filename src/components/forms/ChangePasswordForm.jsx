import React from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePasswordValidation } from "@/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { InputPassword } from "..";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useChangePassword } from "@/tanstack-query/queries";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";

const ChangePasswordForm = ({ setChangePasswordState }) => {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("reset_token");

  const changePasswordToken = localStorage.getItem("changePasswordToken");

  const { user } = useSelector((state) => state.user);

  const form = useForm({
    resolver: yupResolver(ChangePasswordValidation),
    defaultValues: {
      newPassword: "",
    },
  });

  const { mutateAsync: changePassword, isPending: isChangePasswordPending } =
    useChangePassword();

  const handleSubmit = async (value) => {
    try {
      if (resetToken !== changePasswordToken) {
        throw new Error("Token missing or invalid. Please retry.");
      }

      await changePassword(value.newPassword);
      setChangePasswordState((pervState) => ({
        ...pervState,
        isSubmitted: true,
      }));
    } catch (error) {
      console.error(error?.message);
      setChangePasswordState((pervState) => ({
        ...pervState,
        isSubmitted: true,
        isError: true,
      }));
    } finally {
      localStorage.removeItem("changePasswordToken");
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="username"
          defaultValue={user?.email}
          readOnly={true}
          className="hidden"
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormControl>
                <InputPassword
                  placeholder="New Password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="block">
          {isChangePasswordPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Change Password"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
