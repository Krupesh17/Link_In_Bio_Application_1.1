import React, { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Copy, CopyCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { debounce } from "lodash";

const URLBox = () => {
  const { profile } = useSelector((state) => state.user);
  const [isURLCopied, setURLCopied] = useState(false);

  const debounceURLCopied = useCallback(
    debounce(() => {
      setURLCopied(false);
    }, 1000),
    []
  );

  const handleCopyURL = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${profile?.username}`
      );
      setURLCopied(true);
    } catch (error) {
      console.error("Failed to copy: ", error);
    } finally {
      debounceURLCopied();
    }
  };
  return (
    <div className="min-h-16 rounded-xl mt-5 mb-16 flex items-center gap-2.5 sm:px-5 max-sm:px-2.5 bg-sky-300/20 text-copy overflow-hidden">
      <img
        src="/assets/icons/high_voltage.svg"
        width={28}
        height={28}
        alt="fire_icon"
      />

      <p className="text-copy-light flex gap-1 mr-auto max-md:flex-col max-sm:text-sm">
        <span className="font-semibold">Your LinkChain is live: </span>
        <span>
          {window.location.host}/{profile?.username}
        </span>
      </p>

      <Button
        className="rounded-full font-semibold max-md:hidden"
        onClick={handleCopyURL}
      >
        {isURLCopied ? "Copied!" : "Copy URL"}
      </Button>
      <Button
        className="rounded-full md:hidden text-copy-lighter hover:text-copy focus-visible:text-copy"
        size="icon"
        variant="link"
        onClick={handleCopyURL}
      >
        {isURLCopied ? <CopyCheck /> : <Copy />}
      </Button>
    </div>
  );
};

export default URLBox;
