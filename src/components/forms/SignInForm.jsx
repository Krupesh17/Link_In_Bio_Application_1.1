import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInValidation } from "@/validations";
import { InputPassword, TextDivider } from "..";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useGetStartedWithGoogle, useSignIn } from "@/tanstack-query/queries";

const SignInForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm({
    resolver: yupResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signIn, isPending: isSignInPending } = useSignIn();
  const {
    mutateAsync: getStartedWithGoogle,
    isPending: isGoogleSignUpPending,
  } = useGetStartedWithGoogle();

  const handleSubmit = async (value) => {
    try {
      const user = await signIn({
        email: value?.email,
        password: value?.password,
      });

      if (user) {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Sign In Failed",
        description: error.message,
      });
      console.error(error?.message);
    } finally {
      form.reset();
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await getStartedWithGoogle({ type: "sign-in" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Sign In Failed",
        description: error.message,
      });
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormControl>
                <InputPassword
                  placeholder="Password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="block" className="mb-4">
          {isSignInPending ? <Loader2 className="animate-spin" /> : "Sign In"}
        </Button>

        <div className="text-center">
          <Link
            to="/reset-password"
            className="text-sm font-semibold hover:underline focus-visible:underline"
          >
            Forgot password?
          </Link>
        </div>

        <TextDivider text="or" className="my-5" />

        <Button
          type="button"
          variant="outline"
          size="block"
          onClick={handleSignInWithGoogle}
        >
          {isGoogleSignUpPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <img
                src="/assets/icons/google_icon.svg"
                alt="Google"
                width={24}
                height={24}
              />{" "}
              <span>Sign in with Google</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
