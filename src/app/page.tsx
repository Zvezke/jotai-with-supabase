import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import ClientComponentInitiatingJotai from "./ClientComponentInitiatingJotai";
import ParentProvider from "./ParentProvider";

import { useServerAuthSession } from "@/utils/authSession";

const App = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // const { data } = await supabase.auth.getSession();

  let { data: supbaseData, error } = await supabase.from("test").select("*");

  // if (!data.session) {
  //   return (
  //     <main className="flex min-h-screen items-center justify-center bg-neutral-900">
  //       <h1 className="font-roboto text-2xl font-bold text-neutral-200">
  //         You are not authenticated
  //       </h1>
  //     </main>
  //   );
  // }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-900">
      <h1 className="font-roboto text-2xl font-bold text-neutral-200">
        <ClientComponentInitiatingJotai data={supbaseData ?? []}>
          <ParentProvider />
        </ClientComponentInitiatingJotai>
      </h1>
    </main>
  );
};

export default App;
