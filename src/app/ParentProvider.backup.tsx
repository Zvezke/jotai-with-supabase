"use client";

// This component maintains a piece of state, data, using the useAtomValue hook. This state is linked to the dataAtom from the application's atom store.

// The useSetAtom hook is used to get a setter function, setData, for updating the dataAtom.

// The handleInsertData function is an asynchronous function that inserts new data into the "test" table in the database using the Supabase client. After the insertion, it retrieves the inserted data and updates the dataAtom state with this new data.

// The component renders a button that, when clicked, triggers the handleInsertData function, causing new data to be inserted into the database and the state to be updated.

// The component is exported as the default export of the module.

import React, { useEffect } from "react";

// Import Jotai hooks and atoms
import { useAtomValue, useSetAtom, useStore } from "jotai";
import {
  dataAtom,
  userAtom,
  selectedStableAtom,
  stablesAtom,
} from "./store/atoms";

// Import Supabase client creation utility
import { createClient } from "@/utils/supabase/client";
// import { Session } from "@supabase/supabase-js";
import Login from "@/components/Login";
import SelectedStable from "./SelectedStable";

const ParentProvider = () => {
  // Get current value of atoms
  const testDataAtom = useAtomValue(dataAtom);
  const user = useAtomValue(userAtom);
  const stables = useAtomValue(stablesAtom);
  // Get setter function for dataAtom
  const setData = useSetAtom(dataAtom, { store: useStore() });
  const setStables = useSetAtom(stablesAtom, { store: useStore() });
  // const setStableChild = useSetAtom(selectedStableAtom, { store: useStore() });

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

  const handleInsertData = async () => {
    // Create Supabase client
    const supabase = createClient();
    // Insert new data into "test" table and retrieve the inserted data
    const { data: testData, error } = await supabase
      .from("test")
      .insert([{ title: "Title1", body: "Body1" }])
      .select();

    // If insertion was successful, update dataAtom with new data
    if (testData) {
      setData([...testDataAtom, ...testData]);
    }
  };

  const handleLogin = async () => {
    // Create Supabase client
    const supabase = createClient();
    // Sign in with email and password
    let { data: userData, error } = await supabase.auth.signInWithPassword({
      email: process.env.NEXT_PUBLIC_SUPABASE_USERNAME!,
      password: process.env.NEXT_PUBLIC_SUPABASE_PASSWORD!,
    });
    // if (userData) {
    //   setUser(userData);
    // }
  };

  const handleLogout = async () => {
    // Create Supabase client
    const supabase = createClient();
    // Sign out
    await supabase.auth.signOut();
    // setUser(null);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Button to trigger data insertion */}
      <button onClick={handleInsertData}>Press to insert data</button>
      {/* <button onClick={handleLogin}>Press to login</button> */}
      <Login />
      <button onClick={handleLogout}>Press to logout</button>
      {/* Display current data */}
      {true ? (
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
              <SelectedStable />
              <br />
            </div>
          ))}
        </ul>
      ) : (
        <>
          <p>Not authenticated</p>
          <button onClick={handleLogin}>Press to login</button>
        </>
      )}
    </div>
  );
};

export default ParentProvider;
