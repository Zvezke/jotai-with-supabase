"use client";

// This component maintains a piece of state, data, using the useAtomValue hook. This state is linked to the dataAtom from the application's atom store.

// The useSetAtom hook is used to get a setter function, setData, for updating the dataAtom.

// The handleInsertData function is an asynchronous function that inserts new data into the "test" table in the database using the Supabase client. After the insertion, it retrieves the inserted data and updates the dataAtom state with this new data.

// The component renders a button that, when clicked, triggers the handleInsertData function, causing new data to be inserted into the database and the state to be updated.

// The component is exported as the default export of the module.

import React from "react";

// Import Jotai hooks and atoms
import { useAtomValue, useSetAtom, useStore } from "jotai";
import { dataAtom } from "./store/atoms";

// Import Supabase client creation utility
import { createClient } from "@/utils/supabase/client";

const TestingJotai = () => {
  // Get current value of dataAtom
  const data = useAtomValue(dataAtom);
  // Get setter function for dataAtom
  const setData = useSetAtom(dataAtom, { store: useStore() });

  const handleInsertData = async () => {
    // Create Supabase client
    const supabase = createClient();
    // Insert new data into "test" table and retrieve the inserted data
    const { data: testData, error } = await supabase
      .from("test")
      .insert([{ title: "Title8", body: "Body8" }])
      .select();

    // If insertion was successful, update dataAtom with new data
    if (testData) {
      setData([...data, ...testData]);
    }
  };

  return (
    <div>
      {/* Button to trigger data insertion */}
      <button onClick={handleInsertData}>Press to insert data</button>
    </div>
  );
};

export default TestingJotai;
