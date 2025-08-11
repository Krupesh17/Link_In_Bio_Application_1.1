import React, { useCallback, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Globe, SquareArrowOutUpRight, Upload } from "lucide-react";
import { useSelector } from "react-redux";
import { debounce } from "lodash";

const ShareDropdownMenu = () => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="secondary" className="h-10">
          <Upload /> <span className="font-semibold">Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-2.5">
        <div className="pb-1">
          <h4 className="text-lg font-semibold">Share your LinkChain</h4>
        </div>
        <DropdownMenuSeparator />
        <div className="py-2.5">
          <p className="text-sm text-copy-light font-medium">
            Get more visitors by sharing your LinkChain everywhere.
          </p>
        </div>

        <div className="relative w-full h-10 px-2 mb-2 border border-border rounded-md text-sm flex items-center gap-2 overflow-hidden">
          <div className="w-full overflow-hidden">
            <p className="text-wrap text-ellipsis line-clamp-1">
              {window.location.host}/{profile?.username}
            </p>
          </div>
          <div className="h-full flex items-center shrink-0">
            <Button
              type="button"
              variant="secondary"
              className="h-6"
              size="sm"
              onClick={handleCopyURL}
            >
              {isURLCopied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          className="h-10 w-full px-2"
          onClick={() =>
            window.open(
              `${window.location.origin}/${profile?.username}`,
              "_blank"
            )
          }
        >
          <Globe />
          <span>Open</span>
          <SquareArrowOutUpRight className="ml-auto" />
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareDropdownMenu;
