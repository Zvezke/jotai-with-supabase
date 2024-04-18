import { createClient } from "@/utils/supabase/client";
// import { cookies } from "next/headers";

// const useAuthSession = async () => {
//   const supabase = createClient();
//   const user = await supabase.auth.getUser();
//   const session = supabase.auth.getSession();
//   return { user, session };
// };

// export default useAuthSession;

export function useServerAuthSession() {
  const fetchSession = async () => {
    const supabase = createClient();

    const { data } = await supabase.auth.getSession();

    return { data };
  };
  return fetchSession();
}
