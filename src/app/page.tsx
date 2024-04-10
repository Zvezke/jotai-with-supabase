import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import ClientComponentInitiatingJotai from "./ClientComponentInitiatingJotai";
import TestingJotai from "./TestingJotai";

const App = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: supbaseData, error } = await supabase.from("test").select("*");

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-900">
      <h1 className="font-roboto text-2xl font-bold text-neutral-200">
        <ClientComponentInitiatingJotai data={supbaseData ?? []}>
          <TestingJotai />
        </ClientComponentInitiatingJotai>
      </h1>
    </main>
  );
};

export default App;
