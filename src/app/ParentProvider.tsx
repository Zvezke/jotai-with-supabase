"use client";

// This component maintains a piece of state, data, using the useAtomValue hook. This state is linked to the dataAtom from the application's atom store.

// The useSetAtom hook is used to get a setter function, setData, for updating the dataAtom.

// The handleInsertData function is an asynchronous function that inserts new data into the "test" table in the database using the Supabase client. After the insertion, it retrieves the inserted data and updates the dataAtom state with this new data.

// The component renders a button that, when clicked, triggers the handleInsertData function, causing new data to be inserted into the database and the state to be updated.

// The component is exported as the default export of the module.

import React, { useState, useEffect } from "react";

// Import Jotai hooks and atoms
import { useAtomValue, useSetAtom, useStore } from "jotai";
import {
  dataAtom,
  userAtom,
  stablesAtom,
  stableChildAtom,
} from "./store/atoms";

// Import Supabase client creation utility
import { createClient } from "@/utils/supabase/client";
// import { Session } from "@supabase/supabase-js";
import Login from "@/components/Login";
import StableChild from "./StableChild";

// import { useServerAuthSession } from "@/utils/authSession";

const ParentProvider = () => {
  // Get current value of atoms
  const testDataAtom = useAtomValue(dataAtom);
  const user = useAtomValue(userAtom);
  const stables = useAtomValue(stablesAtom);
  // Get setter function for dataAtom
  const setData = useSetAtom(dataAtom, { store: useStore() });
  const setStables = useSetAtom(stablesAtom, { store: useStore() });

  const setStableChild = useSetAtom(stableChildAtom, { store: useStore() });

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      let { data: stables, error: stablesError } = await supabase
        .from("stables")
        .select(
          "id, name, admin_id, users!users_stables(id,first_name,last_name), feeders(id, name, stable_id), horses(id, name)",
        )
        .order("name");
      if (stables) {
        setStables(stables);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {/* Display current data */}
      {
        <ul>
          {stables?.map((stable, i) => (
            <div key={i}>
              {/* <li key={stable.id} onClick={() => console.log("stable")}> */}
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
                  onClick={() => setStableChild(stable)}
                >
                  Open slide in (setStableChild)
                </button>
                <StableChild />
              </div>
              <br />
            </div>
          ))}
        </ul>
      }
    </div>
  );
};

export default ParentProvider;
