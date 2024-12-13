// Footer.tsx
"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const isMainPage = pathname === "/" || pathname === "/analytics" || pathname === "/gifts";

  if (!isMainPage) return null;

  return (
    <footer className="mt-auto border-t border-border/10 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-base font-medium text-foreground">Gift List</h3>
            <p className="mt-2 text-sm font-light text-foreground/60 leading-relaxed">
              Seamless organization.<br />
              Thoughtful gifting.<br />
              Effortless tracking.
            </p>
          </div>
          <div className="md:col-span-2 flex flex-col md:flex-row md:justify-end gap-12">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1.5">Features</h4>
              <ul className="text-sm font-light text-foreground/60 space-y-0.5">
                <li>Organize</li>
                <li>Budget</li>
                <li>Categorize</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1.5">Resources</h4>
              <ul className="text-sm font-light text-foreground/60 space-y-0.5">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-4 border-t border-border/5">
          <p className="text-xs font-light text-center text-foreground/50">
            © {new Date().getFullYear()} Gift List. <a href="https://github.com/jayrichh" className="text-foreground/70 hover:text-foreground transition-colors">Jay</a>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
