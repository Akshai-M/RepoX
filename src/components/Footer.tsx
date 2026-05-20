import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Logo2 } from "@/components/Logo2";

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
  const supportLinks = [{ label: "Contact", href: "/contact" }];

  const resourceLinks = [
    { label: "Documentation", href: "/docs" },
    { label: "Blog", href: "https://medium.com/@prathyarti/vaiu-d9e33ef48464" },
    { label: "FAQ", href: "/faq" },
  ];

  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/KiranBusari/vaiu",
    },
  ];

  return (
    <footer className="w-full border-t dark:border-slate-800 border-slate-200">
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        {/* Main Footer Content */}
        <div className="mb-5 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-10 lg:gap-16">
          {/* Branding - Column 1 */}
          <div className="max-w-sm shrink-0">
            <Link href="/" className="mb-2 -ml-2 inline-flex items-center transition-opacity hover:opacity-80">
              <Logo className="h-7 w-auto dark:hidden" />
              <Logo2 className="hidden h-7 w-auto dark:block" />
            </Link>
            <p className="text-sm leading-snug text-slate-600 dark:text-slate-400">
              Empowering teams to collaborate and build together.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {/* Support Links - Column 2 */}
            <div className="flex space-x-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Support
              </h3>
              <nav className="flex space-x-4">
                {supportLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Connect */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                Connect
              </h3>
              <nav className="space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="mailto:contact.vaiuteam@gmail.com"
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Email
                </a>
              </nav>
            </div>

            {/* Resources Links - Column 3 */}
            <div className="flex space-x-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Resources
              </h3>
              <nav className="flex space-x-4">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        {/* Divider */}
          <div className="flex px-14 flex-col items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-400 md:flex-row">
            <p>© {CURRENT_YEAR} Vaiu. All rights reserved.</p>
            <div className="flex pr-[62px] gap-6">
              <Link
                href="/terms"
                className="transition-colors hover:text-slate-900 dark:hover:text-white"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="transition-colors hover:text-slate-900 dark:hover:text-white"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
