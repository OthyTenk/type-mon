import Typing from "./components/Typing";
import { Analytics } from "@vercel/analytics/react";

const Page = () => {
  return (
    <>
      <Typing />
      <Analytics mode={"production"} />
    </>
  );
};

export default Page;
