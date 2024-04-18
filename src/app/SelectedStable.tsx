"use client";

import React from "react";

import { useAtomValue, useSetAtom } from "jotai";
import { selectedStableAtom, stablesAtom } from "@/app/store/atoms";
import { createClient } from "@/utils/supabase/client";

const SelectedStable = () => {
  const selectedStable = useAtomValue(selectedStableAtom);
  const setStables = useSetAtom(stablesAtom);

  // addHorse is an async function that adds a horse to the stable.
  // I have hardcoded the horse to be added.

  // It first creates a new horse object with an id and a name.
  // Then it creates a new array of horses with the new horse added to the list.
  // It then creates a new stable object with the updated list of horses.

  // It uses the Supabase client to insert a new horse into the database.
  // If there is an error, it logs the error to the console.
  // If there is no error, it updates Jotai with the new stable object.

  const addHorse = async () => {
    const supabase = createClient();
    const horseToAdd = {
      id: "11111111-2222-3333-4444-555555555555",
      name: "Hest",
    };
    const horseListWithNewHorse = [
      ...(selectedStable?.horses ?? []),
      horseToAdd,
    ];
    if (selectedStable) {
      const stableChildWithUpdatedHorses = {
        ...selectedStable,
        horses: horseListWithNewHorse,
      };

      const { error } = await supabase
        .from("horses")
        .insert([
          {
            id: "11111111-2222-3333-4444-555555555555",
            name: "Hest",
            stable_id: selectedStable?.id,
            admin_id: selectedStable?.admin_id,
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

export default SelectedStable;
