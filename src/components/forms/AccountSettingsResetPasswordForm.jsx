import React from "react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useResetPassword } from "@/tanstack-query/queries";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidV4 } from "uuid";
import { Loader2 } from "lucide-react";

const AccountSettingsResetPasswordForm = () => {
  const { user } = useSelector((state) => state.user);

  const { toast } = useToast();

  const { mutateAsync: resetPassword, isPending: isResetPasswordPending } =
    useResetPassword();

  const handleCreatePassword = async () => {
    try {
      const changePasswordToken = uuidV4();

      await resetPassword({ email: user?.email, changePasswordToken });

      localStorage.setItem("changePasswordToken", changePasswordToken);

      toast({
        variant: "success",
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
    }
  };

  return (
    <div className="relative p-4 border border-border rounded-md bg-background mb-4">
      <div className="mb-4">
        <h2 className="font-semibold text-lg">Reset Password</h2>
        <p className="text-sm text-copy-light">
          Set a password for your account to log in with your email and password
          in the future.
        </p>
      </div>

      <Button
        type="button"
        onClick={handleCreatePassword}
        className="h-10 w-full"
      >
        {isResetPasswordPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Create Password"
        )}
      </Button>
    </div>
  );
};

export default AccountSettingsResetPasswordForm;
