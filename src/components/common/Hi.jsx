import { useEffect } from "react";

export default function Hi({ name = "Benali" }) {
  // Get today's date in the desired format
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short", // "Wed"
    
    month: "long", // "June"
    day: "numeric", // "15"
  });

  useEffect(() => {
    // You can perform side effects here
  }, []);

  return (
    <div className="h-fit p-8 bg-secondaryo text-start flex flex-col gap-4 rounded-3xl mb-6">
      <p className="font-bold text-2xl text-black">{today}</p>
      <p className="font-bold text-5xl text-black">Welcome back, {name}</p>
    </div>
  );
}
