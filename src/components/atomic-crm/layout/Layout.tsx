import { RefreshCw } from "lucide-react";
import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Notification } from "@/components/admin/notification";
import { Error } from "@/components/admin/error";
import { Skeleton } from "@/components/ui/skeleton";

import { useConfigurationLoader } from "../root/useConfigurationLoader";
import Header from "./Header";

const HardRefreshButton = () => (
  <button
    type="button"
    onClick={() => window.location.reload()}
    className="fixed bottom-4 right-4 z-50 p-2 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground shadow-sm transition-colors cursor-pointer"
    title="Refresh page"
  >
    <RefreshCw className="w-4 h-4" />
  </button>
);

export const Layout = ({ children }: { children: ReactNode }) => {
  useConfigurationLoader();
  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto pt-4 px-4" id="main-content">
        <ErrorBoundary FallbackComponent={Error}>
          <Suspense fallback={<Skeleton className="h-12 w-12 rounded-full" />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </main>
      <Notification />
      <HardRefreshButton />
    </>
  );
};
