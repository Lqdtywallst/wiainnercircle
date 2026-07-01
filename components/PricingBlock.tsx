import { PRICING } from "@/lib/constants";

type PricingVariant = "hero" | "section" | "form";

interface PricingBlockProps {
  variant?: PricingVariant;
  className?: string;
}

export default function PricingBlock({
  variant = "section",
  className = "",
}: PricingBlockProps) {
  if (variant === "hero") {
    return (
      <div
        className={`pricing-block inline-flex flex-col gap-1 rounded-[14px] px-6 py-5
                    max-sm:px-5 max-sm:py-4 ${className}`}
      >
        <p className="flex items-baseline gap-2 flex-wrap">
          <span className="pricing-block__amount text-[clamp(52px,7vw,76px)]">
            {PRICING.displayMonthly}
          </span>
          <span className="pricing-block__period text-[clamp(18px,2.2vw,24px)] tracking-[0.08em]">
            {PRICING.displayPeriod}
          </span>
        </p>
        <p className="pricing-block__annual">
          {PRICING.annualLabel} · {PRICING.annualNote}
        </p>
      </div>
    );
  }

  if (variant === "form") {
    return (
      <div
        className={`pricing-block rounded-[16px] px-8 py-8 text-center
                    max-sm:px-6 max-sm:py-6 ${className}`}
      >
        <p className="label mb-4">Inversión</p>
        <p className="flex items-baseline justify-center gap-2 flex-wrap mb-3">
          <span className="pricing-block__amount text-[clamp(56px,10vw,88px)]">
            {PRICING.displayMonthly}
          </span>
          <span className="pricing-block__period text-[clamp(20px,3vw,28px)] tracking-[0.08em]">
            {PRICING.displayPeriod}
          </span>
        </p>
        <p className="pricing-block__annual mb-2">
          {PRICING.annualLabel} · {PRICING.annualNote}
        </p>
        <p className="pricing-block__note">{PRICING.formNote}</p>
      </div>
    );
  }

  return (
    <div
      className={`pricing-block rounded-[20px] px-10 py-12 text-center
                  max-md:px-8 max-md:py-10 max-sm:px-6 max-sm:py-8 ${className}`}
    >
      <p className="flex items-baseline justify-center gap-3 flex-wrap mb-4">
        <span className="pricing-block__amount text-[clamp(64px,12vw,120px)]">
          {PRICING.displayMonthly}
        </span>
        <span className="pricing-block__period text-[clamp(22px,3.5vw,32px)] tracking-[0.08em]">
          {PRICING.displayPeriod}
        </span>
      </p>
      <p className="pricing-block__annual text-[clamp(14px,2vw,16px)] mb-3">
        {PRICING.annualLabel} · {PRICING.annualNote}
      </p>
      <p className="pricing-block__note">{PRICING.sectionBody}</p>
    </div>
  );
}
