import { redirect } from "next/navigation";

/** The design-system catalog is the home of the style guide. */
export default function Home() {
  redirect("/catalog");
}
