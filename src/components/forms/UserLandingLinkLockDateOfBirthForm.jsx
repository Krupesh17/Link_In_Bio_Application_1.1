import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLandingLinkLockDateOfBirthValidation } from "@/validations";
import { Loader2 } from "lucide-react";

const UserLandingLinkLockDateOfBirthForm = ({
  linkData,
  handleRedirectToLockedLink,
  isCreatingClick,
}) => {
  const [ageError, setAgeError] = useState(false);

  const form = useForm({
    resolver: yupResolver(userLandingLinkLockDateOfBirthValidation),
    defaultValues: {
      day: "",
      month: "",
      year: "",
    },
  });

  const { errors } = form.formState;

  const handleSubmit = (value) => {
    setAgeError(false);

    const { day, month, year } = value;

    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < linkData?.link_lock_date_of_birth?.minimum_age) {
      setAgeError(true);
    } else {
      handleRedirectToLockedLink(
        linkData?.link_url,
        linkData?.id,
        linkData?.user_id
      );
    }
  };

  return (
    <div>
      {linkData?.link_lock_date_of_birth?.description && (
        <p className="text-sm text-copy-light text-center mb-2">
          {linkData?.link_lock_date_of_birth?.description}
        </p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex items-center gap-2 mb-4">
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="DD"
                      autoComplete="off"
                      className={`text-center ${errors.day && "border-error"}`}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 2) {
                          field.onChange(value);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="MM"
                      autoComplete="off"
                      className={`text-center ${
                        errors.month && "border-error"
                      }`}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 2) {
                          field.onChange(value);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="YYYY"
                      autoComplete="off"
                      className={`text-center ${errors.year && "border-error"}`}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 4) {
                          field.onChange(value);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {(errors.day || errors.month || errors.year) && (
            <p className="text-red-500 text-xs mb-4 text-center">
              {errors.day && <span>{errors.day.message}, </span>}
              {errors.month && <span>{errors.month.message}, </span>}
              {errors.year && <span>{errors.year.message}</span>}
            </p>
          )}

          {ageError && (
            <p className="text-red-500 text-xs mb-4 text-center">
              You can't access this content because you haven't met the minimum
              age requirement.
            </p>
          )}

          <Button type="submit" className="w-full h-10">
            {isCreatingClick ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserLandingLinkLockDateOfBirthForm;
