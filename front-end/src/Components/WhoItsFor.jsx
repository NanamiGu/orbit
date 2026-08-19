import React from 'react';
import { useTranslation } from 'react-i18next';
import { HoverExpand_002 } from './Ui/HoverExpand_002';

export default function WhoItsFor() {
  const { t } = useTranslation();

  const audiences = [
    {
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
      title: t("whoItsFor.aud1Title"),
      description: t("whoItsFor.aud1Desc"),
      code: "# 01",
    },
    {
      src: "https://images.unsplash.com/photo-1523580494112-071d31174ee8?q=80&w=2070&auto=format&fit=crop",
      title: t("whoItsFor.aud2Title"),
      description: t("whoItsFor.aud2Desc"),
      code: "# 02",
    },
    {
      src: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1973&auto=format&fit=crop",
      title: t("whoItsFor.aud3Title"),
      description: t("whoItsFor.aud3Desc"),
      code: "# 03",
    },
    {
      src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
      title: t("whoItsFor.aud4Title"),
      description: t("whoItsFor.aud4Desc"),
      code: "# 04",
    },
  ];

  return (
    <section className="bg-slate-950 py-24 border-t border-white/5" id="who-it-is-for">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4">
          {t("whoItsFor.label")}
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-16">
          {t("whoItsFor.headline")}
        </h2>

        {/* Hover Expand Component */}
        <HoverExpand_002 images={audiences} />
      </div>
    </section>
  );
}