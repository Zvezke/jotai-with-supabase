import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import ParentProvider from "./ParentProvider";
// import ParentProvider from "./ParentProvider";

import { useServerAuthSession } from "@/utils/authSession";
import Stables from "./Stables";

const App = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // const { data } = await supabase.auth.getSession();

  // let { data: supbaseData, error } = await supabase.from("test").select("*");

  let { data: stables, error: stablesError } = await supabase
    .from("stables")
    .select(
      "id, name, admin_id, users!users_stables(id,first_name,last_name), feeders(id, name, stable_id), horses(id, name)",
    )
    .order("name");

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
        <ParentProvider data={stables ?? []}>
          <Stables />
        </ParentProvider>
      </h1>
    </main>
  );
};

export default App;
