"use client";

// This component maintains a piece of state, data, using the useAtomValue hook. This state is linked to the dataAtom from the application's atom store.

// The useSetAtom hook is used to get a setter function, setData, for updating the dataAtom.

// The handleInsertData function is an asynchronous function that inserts new data into the "test" table in the database using the Supabase client. After the insertion, it retrieves the inserted data and updates the dataAtom state with this new data.

// The component renders a button that, when clicked, triggers the handleInsertData function, causing new data to be inserted into the database and the state to be updated.

// The component is exported as the default export of the module.

import React, { use } from "react";

// Import Jotai hooks and atoms
import { useAtomValue, useSetAtom, useStore } from "jotai";
import { dataAtom } from "./store/atoms";

// Import Supabase client creation utility
import { createClient } from "@/utils/supabase/client";

// import { useServerAuthSession } from "@/utils/authSession";

const TestingJotai = () => {
  // Get current value of atoms
  const testDataAtom = useAtomValue(dataAtom);
  // Get setter function for dataAtom
  const setData = useSetAtom(dataAtom, { store: useStore() });

  // const { data } = useServerAuthSession();

  // const {
  //   data: { user },
  // } = await supabase.auth.getSession().session.user;

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
      email: "***REMOVED***",
      password: "***REMOVED***",
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

  // // Check if user is authenticated
  // const supabase = createClient();
  // let userIsAuthenticated;
  // (async () => {
  //   userIsAuthenticated = (await supabase.auth.getUser()) !== null;
  // })();

  return (
    <div className="flex flex-col gap-2">
      {/* Button to trigger data insertion */}
      <button onClick={handleInsertData}>Press to insert data</button>
      <button onClick={handleLogin}>Press to login</button>
      <button onClick={handleLogout}>Press to logout</button>
      {/* Display current data */}
      {true ? (
        <ul>
          {testDataAtom.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>: {item.body}
            </li>
          ))}
        </ul>
      ) : (
        <p>Not authenticated</p>
      )}
    </div>
  );
};

export default TestingJotai;
