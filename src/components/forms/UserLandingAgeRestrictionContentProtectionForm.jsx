import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLandingLinkLockDateOfBirthValidation } from "@/validations";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const UserLandingAgeRestrictionContentProtectionForm = ({
  setContentProtectionStatus,
}) => {
  const [ageError, setAgeError] = useState(false);
  const [isLoading, setLoading] = useState(false);

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
    try {
      setAgeError(false);
      setLoading(true);

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

      if (age < 18) {
        setAgeError(true);
      } else {
        setContentProtectionStatus(false);
      }
    } catch (error) {
      console.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h4 className="text-lg text-center font-semibold text-wrap text-white">
        Age Restriction
      </h4>
      <p className="text-sm text-wrap text-gray-300">
        This content is restricted and may only be viewed by users who meet the
        required age criteria.
      </p>

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
                      className={`text-center border-white ${
                        errors.day && "border-error"
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
              name="month"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="MM"
                      autoComplete="off"
                      className={`text-center border-white ${
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
                      className={`text-center border-white ${
                        errors.year && "border-error"
                      }`}
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

          <Button
            type="submit"
            className="w-full h-10 bg-black text-white hover:bg-[#101010]"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Continue"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UserLandingAgeRestrictionContentProtectionForm;
