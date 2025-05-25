import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpValidation } from "@/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { InputPassword, TextDivider } from "..";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useCreateAccount,
  useGetStartedWithGoogle,
} from "@/tanstack-query/queries";

const SignUpForm = ({ formState, setFormState }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(SignUpValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: createAccount, isPending: isCreatingAccount } =
    useCreateAccount();

  const {
    mutateAsync: getStartedWithGoogle,
    isPending: isGoogleSignUpPending,
  } = useGetStartedWithGoogle();

  const handleSubmit = async (value) => {
    try {
      if (!formState?.data?.username) {
        setFormState({ step: 1, data: {} });
      }

      const newAccountData = await createAccount({
        username: formState?.data?.username,
        name: value?.name,
        email: value?.email,
        password: value?.password,
      });

      if (!isCreatingAccount && newAccountData) {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Sign Up Failed.",
        description: error.message,
      });
    } finally {
      form.reset();
    }
  };

  const handleSignUpWithGoogle = async () => {
    try {
      await getStartedWithGoogle({
        username: formState?.data?.username,
        type: "sign-up",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Sign Up Failed.",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    if (!formState?.data?.username) setFormState({ step: 1, data: {} });
  }, [formState]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormControl>
                <Input
                  type="text"
                  placeholder="Name"
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

        <Button type="submit" size="block">
          {isCreatingAccount ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>

        <TextDivider text="or" className="my-5" />

        <Button
          type="button"
          variant="outline"
          size="block"
          onClick={handleSignUpWithGoogle}
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
              />
              <span>Sign up with Google</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
