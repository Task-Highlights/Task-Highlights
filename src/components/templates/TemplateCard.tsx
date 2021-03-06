import { useContext, useEffect, useState } from "react";

import { CreateTemplate } from "./CreateTemplate";
import FireUserContext from "../../contexts/FireUserContext";
import { IndividualTemplateItem } from "./IndividualTemplateItem";
import { Template } from "@prisma/client";
import { fetch_getAllUserTemplates } from "../../utils/fetchHelpers";

export const TemplateCard = (): JSX.Element => {
  const fireId = useContext(FireUserContext);
  const [templates, setTemplates] = useState<Template[]>(null);
  const [addedCounter, setAddedCounter] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const fetched_templates: Template[] = await fetch_getAllUserTemplates(
        fireId
      );

      if (JSON.stringify(fetched_templates) !== JSON.stringify(templates)) {
        setTemplates(fetched_templates);
      }
    })();
  }, [templates, addedCounter, fireId]);

  const stateReload = (): void => {
    if (addedCounter < 50) {
      setAddedCounter(addedCounter + 1);
    } else {
      setAddedCounter(0);
    }
  };

  return (
    <div className="noScrollbar relative space-y-5 max-h-[80vh] w-11/12 sm:max-w-md md:max-w-lg py-4 px-8 bg-theme-blueGray-800 shadow-lg rounded-lg mx-auto overflow-y-scroll overflow-x-hidden">
      <div className="flex justify-between items-center">
        <p className="text-4xl flex w-full justify-between">
          Templates{" "}
          <CreateTemplate stateReload={stateReload} user_id={fireId} />
        </p>
      </div>

      <hr className="border-dashed" />

      <div className="space-y-2 flex flex-col">
        {templates?.map((routine) => (
          <IndividualTemplateItem
            routine={routine}
            key={routine.template_id}
            stateReload={stateReload}
          />
        ))}
      </div>
    </div>
  );
};
