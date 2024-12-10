import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error() {
  <div className="relative min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
      <h1 className="text-9xl font-black text-gray-700">404</h1>
      <p className="text-2xl font-bold tracking-tight sm:text-4xl text-white">
        Uh-oh!
      </p>
      <p className="mt-4 text-gray-400">Ha ocurrido un error.</p>
      <Link href="/">
        <Button>Volver al inicio</Button>
      </Link>
    </div>
  </div>;
}
