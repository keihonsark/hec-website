import Image from "next/image";
import Section from "./Section";
import SectionLabel from "./SectionLabel";
import CTAButton from "./CTAButton";

export default function FinancingSection({ formAnchor = "#estimate" }: { formAnchor?: string }) {
  return (
    <Section className="relative py-24 md:py-32 bg-navy noise-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div>
            <SectionLabel>Flexible Financing</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              A New Upgrade Shouldn&apos;t Break the Bank
            </h2>
            <p className="text-gray-300 text-[15px] leading-relaxed">
              We believe every family deserves a comfortable, efficient home.
              That&apos;s why we offer multiple financing options — so you can
              upgrade now and pay on your terms.
            </p>
          </div>
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden ring-2 ring-orange/30 shadow-2xl">
            <Image
              src="/images/about/happy-homeowners.png"
              alt="Happy homeowners"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange/20 rounded-full blur-[40px] pointer-events-none" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {[
            {
              title: "$0 Down Payment",
              desc: "Get started with nothing out of pocket today",
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 6v3" />
                </svg>
              ),
            },
            {
              title: "Deferred Payments",
              desc: "Don't pay a cent for up to 18 months",
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              ),
            },
            {
              title: "Low Monthly Payments",
              desc: "Plans starting at $189/mo based on approved credit",
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898M2.25 6l3 3m-3-3h3m-3 0V3" />
                </svg>
              ),
            },
            {
              title: "All Credit Welcome",
              desc: "Multiple lender options — we'll find the right fit for you",
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              ),
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-navy-light/50 border-l-4 border-l-orange rounded-xl p-6 flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <CTAButton href={formAnchor}>See If You Qualify</CTAButton>
          <p className="text-gray-400 text-sm mt-3">
            Checking rates won&apos;t affect your credit score
          </p>
        </div>
      </div>
    </Section>
  );
}
