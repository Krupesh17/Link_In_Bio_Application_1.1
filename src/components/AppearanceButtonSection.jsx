import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { AppearanceButtonConfigForm } from "./forms";


const AppearanceButtonSection = () => {
  const [isButtonConfigUpdating, setButtonConfigUpdating] = useState(false);

  return (
    <section className="max-w-[650px] mx-auto mb-8">
      <h2 className="text-xl max-sm:text-lg font-semibold flex items-center gap-2 mt-8 mb-4">
        Buttons
        {isButtonConfigUpdating && (
          <Loader2 size={20} className="text-copy-light animate-spin" />
        )}
      </h2>
      <div className="relative p-4 border border-border rounded-md bg-background">
        <AppearanceButtonConfigForm
          setButtonConfigUpdating={setButtonConfigUpdating}
        />
      </div>
    </section>
  );
};

export default AppearanceButtonSection;
