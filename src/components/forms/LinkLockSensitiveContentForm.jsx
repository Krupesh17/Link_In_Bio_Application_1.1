import React, { useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EyeSlash } from "@phosphor-icons/react/dist/ssr";
import { Checkbox } from "../ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateLink } from "@/tanstack-query/queries";
import { updateLinksData } from "@/redux/features/dashboardSlice";

const LinkLockSensitiveContentForm = ({ linkData, setLoading }) => {
  const { links } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [isEnabled, setEnabled] = useState(
    linkData?.link_lock_sensitive_content
  );

  const { mutateAsync: updateLink } = useUpdateLink();

  const handleCheckboxChange = async (value) => {
    try {
      setEnabled(value);
      setLoading(true);

      const response = await updateLink({
        link_id: linkData?.id,
        data_object: { link_lock_sensitive_content: value },
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
        title: "Oops! Failed to Enable Sensitive Content Lock",
        description:
          "Sensitive content lock could not be enabled due to a technical issue. Please refresh and try once more.",
      });

      console.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AccordionItem value="item-1" className="border px-4 rounded-md">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-2 w-full">
          <EyeSlash size={20} strokeWidth={1.5} />
          <h4 className="font-semibold hover:underline">Sensitive content</h4>
          {isEnabled && (
            <div className="bg-success text-white font-medium text-xs px-1 py-0.5 rounded-sm">
              <span>Enabled</span>
            </div>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="border-t">
        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md mt-4">
          <div>
            <Checkbox
              id="checkbox_sensitive_content"
              checked={isEnabled}
              onCheckedChange={handleCheckboxChange}
            />
          </div>
          <div className="space-y-1 leading-none">
            <label
              htmlFor="checkbox_sensitive_content"
              className="font-semibold text-copy"
            >
              Enable sensitive content lock
            </label>
            <p className="text-copy-lighter text-xs">
              Visitors must acknowledge that this link may contain content that
              is not appropriate for all audiences.
            </p>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default LinkLockSensitiveContentForm;
