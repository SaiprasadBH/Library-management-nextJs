import { signOut } from "@/auth";

export default function booksHome() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <button type="submit">SignOut</button>
    </form>
  );
}
