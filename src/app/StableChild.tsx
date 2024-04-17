"use client";

import React from "react";

import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { stableChildAtom, stablesAtom } from "@/app/store/atoms";
import { createClient } from "@/utils/supabase/client";

const StableChild = () => {
  const stableChild = useAtomValue(stableChildAtom);
  const setStables = useSetAtom(stablesAtom);

  const addHorse = async () => {
    const supabase = createClient();
    const horseToAdd = {
      id: "11111111-2222-3333-4444-555555555555",
      name: "Hest",
    };
    const horseListWithNewHorse = [...(stableChild?.horses || []), horseToAdd];
    if (stableChild) {
      const stableChildWithUpdatedHorses = {
        ...stableChild,
        horses: horseListWithNewHorse,
      };

      const { error } = await supabase
        .from("horses")
        .insert([
          {
            id: "11111111-2222-3333-4444-555555555555",
            name: "Hest",
            stable_id: stableChild?.id,
            admin_id: stableChild?.admin_id,
          },
        ])
        .select();

      if (error) {
        console.error("Error adding horse", error);
        return;
      }

      setStables((previousStableList) =>
        previousStableList
          ? previousStableList.map((stable) =>
              stable.id === stableChildWithUpdatedHorses.id
                ? stableChildWithUpdatedHorses
                : stable,
            )
          : [stableChildWithUpdatedHorses],
      );
    }
  };

  return (
    <div>
      <button
        className="rounded-md bg-slate-600 p-4"
        onClick={() => addHorse()}
      >
        Add horse
      </button>
    </div>
  );
};

export default StableChild;
