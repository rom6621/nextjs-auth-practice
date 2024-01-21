import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const Home = async () => {
  const session = await auth();

  console.table(session);

  return (
    <main>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button variant="ghost" type="submit">
          Sign Out
        </Button>
      </form>
    </main>
  );
};

export default Home;
