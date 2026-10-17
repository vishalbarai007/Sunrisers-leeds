import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { mainNavItems, footerNavItems } from "@/data/navigation";
import { Flame } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#05070D] border-t border-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-slate-900">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#E05A00] to-[#FFA040] flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,107,0,0.4)]">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <span className="font-extrabold text-lg tracking-wider text-white uppercase">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            <p className="text-xs text-slate-500">
              {siteConfig.contact.address} &bull; {siteConfig.contact.phone}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#FF6B00] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Social */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider mb-4">
              Contact & Social
            </h4>
            <p className="text-sm text-slate-400 mb-2">
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#FF6B00] transition-colors">
                {siteConfig.contact.email}
              </a>
            </p>
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-slate-500">
              {siteConfig.contact.socials.instagram && (
                <a href={siteConfig.contact.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-slate-300">
                  Instagram
                </a>
              )}
              {siteConfig.contact.socials.twitter && (
                <a href={siteConfig.contact.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-slate-300">
                  Twitter
                </a>
              )}
              {siteConfig.contact.socials.facebook && (
                <a href={siteConfig.contact.socials.facebook} target="_blank" rel="noreferrer" className="hover:text-slate-300">
                  Facebook
                </a>
              )}
              {siteConfig.contact.socials.youtube && (
                <a href={siteConfig.contact.socials.youtube} target="_blank" rel="noreferrer" className="hover:text-slate-300">
                  YouTube
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            {footerNavItems.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-slate-400">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
