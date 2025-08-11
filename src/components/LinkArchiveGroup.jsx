import React from "react";
import { Button } from "./ui/button";
import { Archive, ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { LinkArchiveGroupItem } from ".";

const LinkArchiveGroup = ({ setDashboardContentState }) => {
  const { links: fetchedLinks, isLoading } = useSelector(
    (state) => state.dashboard
  );

  return (
    <div className="max-w-[650px] mx-auto mb-5 mt-10">
      <section className="relative flex items-center gap-2 mb-4">
        <Button
          type="button"
          variant="link"
          className="h-auto text-sm px-0 py-0 absolute left-0 top-0"
          onClick={() => setDashboardContentState(null)}
        >
          <ChevronLeft />
          <span>Back</span>
        </Button>
        <h6 className="font-semibold mx-auto">Archive</h6>
      </section>

      {!isLoading &&
      ![...fetchedLinks]?.filter((link) => link?.link_archived === true)
        .length ? (
        <section className="max-w-[400px] mx-auto p-4">
          <Archive
            className="mx-auto text-copy-lighter/80"
            size={120}
            strokeWidth={0.5}
          />
          <h3 className="text-center font-semibold whitespace-pre-line mt-4 text-copy-lighter">
            <span className="invisible">"</span>Keep your link admin clean and
            focused by archiving links you're not currently using.
            <span className="invisible">"</span>
          </h3>
        </section>
      ) : (
        <ul className="flex flex-col gap-4">
          {fetchedLinks?.map((link) => {
            if (!link?.link_archived) return;
            return <LinkArchiveGroupItem key={link?.id} linkData={link} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default LinkArchiveGroup;
