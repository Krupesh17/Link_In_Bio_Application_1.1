import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { XIcon } from "lucide-react";
import { Button } from "./ui/button";

const toneColorMap = {
  Professional: "bg-blue-600/20 text-blue-700 border-blue-400",
  Casual: "bg-green-600/20 text-green-700 border-green-400",
  Witty: "bg-yellow-600/20 text-yellow-700 border-yellow-400",
  Inspirational: "bg-purple-600/20 text-purple-700 border-purple-400",
};

const EnhancedBioSuggestionList = ({
  suggestions,
  setSuggestions,
  setValue,
}) => {
  return (
    <>
      <div className="pb-2 border-b border-border flex items-center justify-between gap-2">
        <h4 className="text-sm">Suggestions</h4>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="w-8 h-8 [&_svg]:size-4"
          onClick={() => setSuggestions([])}
        >
          <XIcon />
        </Button>
      </div>

      <ScrollArea className="h-48 w-full">
        <ul className="w-full mb-5 space-y-2.5 pt-2">
          {suggestions?.map((item, index) => (
            <li
              key={index}
              className="p-3 space-y-3 bg-secondary border border-border rounded-lg cursor-pointer hover:bg-secondary/80 focus:outline-none focus:ring-1 focus:ring-ring"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setValue("bio", item?.suggestion);
                }
              }}
              onClick={() => {
                setValue("bio", item?.suggestion);
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`font-medium text-xs py-1 px-1.5 rounded-md ${
                    toneColorMap[item?.tone]
                  }`}
                >
                  {item?.tone}
                </span>
                <span className="text-xs text-copy-light">
                  {item?.suggestion?.length}/80
                </span>
              </div>

              <p className="text-sm">{item?.suggestion}</p>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </>
  );
};

export default EnhancedBioSuggestionList;
