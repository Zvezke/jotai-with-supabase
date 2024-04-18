"use client";

import React, { useState, useRef } from "react";

import { createClient } from "@/utils/supabase/client";

// import { userAtom } from "@/app/store/atoms";
// import { useStore, useSetAtom, useAtom } from "jotai";

// interface User {
//   userData:
//     | {
//         user: User;
//         session: Session;
//         weakPassword?: WeakPassword | undefined;
//       }
//     | {
//         user: null;
//         session: null;
//         weakPassword?: null | undefined;
//       };
// }

const Login = () => {
  // const [user, setUser] = useAtom(userAtom);
  // const [state, setState] = useState<User | null>(null);

  // const setUser = useSetAtom(userAtom, { store: useStore() });

  const handleLogin = async () => {
    // Create Supabase client
    const supabase = createClient();
    // Sign in with email and password
    let { data: userData, error } = await supabase.auth.signInWithPassword({
      email: process.env.NEXT_PUBLIC_SUPABASE_USERNAME!,
      password: process.env.NEXT_PUBLIC_SUPABASE_PASSWORD!,
    });
    // userData && setUser(userData);

    // if (userData) {
    // }
    // if (userData) {
    //   setUser(userData);
    // }
    // const store = useStore();
    // const loaded = useRef(false);
    // if (!loaded.current) {
    //   store.set(userAtom, state);
    //   loaded.current = true;
    // }
  };

  // const store = useStore();
  // store.set(userAtom, userData);

  return <button onClick={handleLogin}>Press to login</button>;
};

export default Login;
