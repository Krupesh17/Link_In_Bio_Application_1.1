import React from "react";
import { LinkLockDateOfBirthForm, LinkLockSensitiveContentForm } from ".";
import { Accordion } from "../ui/accordion";

const LinkLockForm = ({ linkData, setLoading }) => {
  return (
    <section className="px-4 pb-4">
      <div className="flex flex-col gap-0.5 mb-4">
        <h5 className="text-copy text-sm font-semibold">Lock this link</h5>
        <p className="text-wrap text-copy-lighter text-sm">
          Visitors can only access this link by fulfilling certain criteria.
        </p>
      </div>

      <h5 className="text-copy text-sm font-semibold mb-2">
        Link locked with:
      </h5>

      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-2"
      >
        <LinkLockSensitiveContentForm
          linkData={linkData}
          setLoading={setLoading}
        />
        <LinkLockDateOfBirthForm linkData={linkData} setLoading={setLoading} />
      </Accordion>
    </section>
  );
};

export default LinkLockForm;
