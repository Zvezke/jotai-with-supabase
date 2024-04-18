"use client";

// This component maintains a piece of state, data, using the useAtomValue hook. This state is linked to the dataAtom from the application's atom store.

// The useSetAtom hook is used to get a setter function, setData, for updating the dataAtom.

// The handleInsertData function is an asynchronous function that inserts new data into the "test" table in the database using the Supabase client. After the insertion, it retrieves the inserted data and updates the dataAtom state with this new data.

// The component renders a button that, when clicked, triggers the handleInsertData function, causing new data to be inserted into the database and the state to be updated.

// The component is exported as the default export of the module.

import React from "react";

// Import Jotai hooks and atoms
import { useAtomValue, useSetAtom, useStore } from "jotai";
import { selectedStableAtom, stablesAtom } from "./store/atoms";

import SelectedStable from "./SelectedStable";

const Stables = () => {
  // Get current value of atoms
  const stables = useAtomValue(stablesAtom);
  // Get setter function for dataAtom
  const setSelectedStable = useSetAtom(selectedStableAtom, {
    store: useStore(),
  });

  return (
    <div className="flex flex-col gap-2">
      {/* Display current data */}
      {
        <ul>
          {stables?.map((stable, i) => (
            <div key={i}>
              <li key={stable.id}>
                <strong>{stable.name}</strong>
                <ul>
                  {stable.users.map((user) => (
                    <li key={user.id}>
                      <strong>
                        {user.first_name} {user.last_name}
                      </strong>
                    </li>
                  ))}
                  {stable.feeders.map((feeder) => (
                    <li key={feeder.id}>
                      <strong>{feeder.name}</strong>
                    </li>
                  ))}
                  {stable.horses.map((horse) => (
                    <li key={horse.id}>
                      <strong>{horse.name}</strong>
                    </li>
                  ))}
                </ul>
              </li>
              <div key={i} className="flex gap-2">
                <button
                  className="rounded-md bg-slate-600 p-4"
                  onClick={() => setSelectedStable(stable)}
                >
                  Open slide in (setStableChild)
                </button>
                <SelectedStable />
              </div>
              <br />
            </div>
          ))}
        </ul>
      }
    </div>
  );
};

export default Stables;
