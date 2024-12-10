/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900/50 border-slate-700">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">
            Oops! Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-400 mb-6">
            We couldn't find what you were looking for. The page might have been removed, renamed, or doesn't exist.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
