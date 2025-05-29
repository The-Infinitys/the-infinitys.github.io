import "./page.css";
import Explains from "./components/explains";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Infinity's Games",
  description: "Enjoy! with yourself!",
};

export default function GamePages() {
  return (
    <>
      <Explains />
    </>
  );
}
