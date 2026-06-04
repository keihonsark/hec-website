import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | Home Energy Construction",
  description:
    "How Home Energy Construction collects, uses, and protects information from homeowners in Fresno and the Central Valley.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

const EFFECTIVE_DATE = "June 4, 2026";
const CONTACT_EMAIL = "hello@hecfresno.com";

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-navy-dark text-white py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-white/50 mb-4">
            <Link href="/" className="hover:text-orange transition-colors">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-white/70">Privacy Policy</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Privacy Policy
          </h1>
          <p className="text-white/60 text-sm mt-3">
            Effective date: {EFFECTIVE_DATE}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-text leading-relaxed space-y-10">
          <div className="space-y-4">
            <p>
              Home Energy Construction (&ldquo;HEC,&rdquo; &ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is a licensed home
              improvement contractor based in Fresno, California, serving
              homeowners throughout the Central Valley with windows, doors,
              roofing, HVAC, insulation, and outdoor living services. This
              Privacy Policy explains what information we collect, how we use
              it, who we share it with, and the choices you have. It applies to
              our website at{" "}
              <a
                href={SITE_URL}
                className="text-orange hover:underline"
              >
                homeenergyconstruction.com
              </a>{" "}
              and to interactions you have with us by phone, email, text, and
              third-party lead forms.
            </p>
          </div>

          <Heading>Information We Collect</Heading>
          <div className="space-y-4">
            <p>
              We collect information you provide directly to us and information
              we receive automatically when you interact with our website or
              advertising. Specifically:
            </p>
            <List>
              <li>
                <strong className="text-navy">Contact information</strong> —
                name, phone number, email address, and home or service address
                you submit through our website forms, our financing or estimate
                request flows, or our review-request enrollment tool.
              </li>
              <li>
                <strong className="text-navy">Project details</strong> — the
                services you are interested in (e.g., roofing, windows, HVAC),
                home characteristics you share, financing preferences, and any
                notes or messages you include.
              </li>
              <li>
                <strong className="text-navy">Communications</strong> —
                recordings or transcripts of phone calls placed to or from
                tracking numbers on our website, the content of text messages
                and emails, and notes our team takes during in-home
                consultations.
              </li>
              <li>
                <strong className="text-navy">
                  Lead-form information from Meta and other platforms
                </strong>{" "}
                — when you submit an inquiry through a Facebook or Instagram
                lead form (or a similar form on Google or another platform), we
                receive the contact and project information you authorized that
                platform to share with us.
              </li>
              <li>
                <strong className="text-navy">Website usage data</strong> —
                pages visited, referring URL, device and browser type, general
                location derived from IP address, and interactions captured by
                analytics and call-tracking scripts.
              </li>
            </List>
          </div>

          <Heading>How We Use Your Information</Heading>
          <div className="space-y-4">
            <p>We use the information we collect to:</p>
            <List>
              <li>
                Contact you about the services you inquired about, including by
                phone, text message, and email;
              </li>
              <li>
                Schedule and conduct free in-home consultations, satellite roof
                analyses, and other appointments;
              </li>
              <li>Provide quotes, financing options, and project proposals;</li>
              <li>
                Coordinate installation, inspections, warranty work, and
                follow-up service;
              </li>
              <li>
                Send transactional messages (appointment reminders, project
                updates, review requests after a completed job);
              </li>
              <li>
                Improve our website, our advertising, and the quality of the
                service we deliver;
              </li>
              <li>
                Comply with our legal obligations, enforce our agreements, and
                protect our rights and the rights of our customers.
              </li>
            </List>
            <p>
              We do not sell your personal information, and we do not share it
              with third parties for their own independent marketing purposes.
            </p>
          </div>

          <Heading>Third-Party Tools and Service Providers</Heading>
          <div className="space-y-4">
            <p>
              We use a small number of well-known service providers to operate
              our website, run our advertising, and stay in touch with
              customers. These providers process some of your information on
              our behalf and are bound by their own privacy practices:
            </p>
            <List>
              <li>
                <strong className="text-navy">CallRail</strong> — provides the
                tracking phone numbers shown on our website and may record or
                transcribe calls for quality and attribution.
              </li>
              <li>
                <strong className="text-navy">
                  Meta Platforms (Facebook and Instagram)
                </strong>{" "}
                — delivers our ads, runs lead forms, and provides reporting on
                ad performance. If you submit a Meta lead form, Meta shares
                your contact information with us.
              </li>
              <li>
                <strong className="text-navy">Google</strong> — provides
                Analytics, Ads, Tag Manager, and Maps. Google may set cookies
                and process limited usage data to measure ad performance and
                website traffic.
              </li>
              <li>
                <strong className="text-navy">
                  Webhook and workflow tools
                </strong>{" "}
                — we use services such as Make.com to route form submissions to
                our internal systems so we can respond to you promptly.
              </li>
            </List>
            <p>
              We may also share your information with our installation crews,
              subcontractors, financing partners (when you request a financing
              quote), and our attorneys or accountants, in each case only as
              needed to deliver the services you requested or to meet a legal
              obligation.
            </p>
          </div>

          <Heading>Cookies and Tracking</Heading>
          <div className="space-y-4">
            <p>
              Our website uses cookies and similar technologies to remember
              your preferences, measure traffic, and support advertising. You
              can control cookies through your browser settings, and you can
              opt out of personalized advertising at{" "}
              <a
                href="https://optout.aboutads.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:underline"
              >
                optout.aboutads.info
              </a>{" "}
              and{" "}
              <a
                href="https://www.networkadvertising.org/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:underline"
              >
                networkadvertising.org/choices
              </a>
              .
            </p>
          </div>

          <Heading>Your Choices: Opt Out and Data Deletion</Heading>
          <div className="space-y-4">
            <p>You can:</p>
            <List>
              <li>
                <strong className="text-navy">Stop receiving messages</strong>{" "}
                — reply STOP to any text message from us, click the unsubscribe
                link at the bottom of our emails, or ask us during a call to
                add you to our do-not-contact list.
              </li>
              <li>
                <strong className="text-navy">Request deletion</strong> — email{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-orange hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                with the subject line &ldquo;Data Deletion Request&rdquo; and
                we will delete the personal information we hold about you,
                except where we are required to retain it (for example, project
                records tied to a permit, warranty, or financing agreement).
              </li>
              <li>
                <strong className="text-navy">Access or correct</strong> the
                information we have about you by emailing the same address.
              </li>
            </List>
            <p>
              We will respond to verifiable requests within a reasonable time
              frame, and within any time frame required by applicable law.
            </p>
          </div>

          <Heading>California Privacy Rights (CCPA)</Heading>
          <div className="space-y-4">
            <p>
              If you are a California resident, the California Consumer
              Privacy Act (CCPA), as amended by the California Privacy Rights
              Act (CPRA), gives you the following rights:
            </p>
            <List>
              <li>
                <strong className="text-navy">Right to know</strong> — you can
                ask us to disclose the categories and specific pieces of
                personal information we have collected about you, the sources
                we collected it from, the business purposes for collecting it,
                and the categories of third parties we shared it with.
              </li>
              <li>
                <strong className="text-navy">Right to delete</strong> — you
                can ask us to delete the personal information we collected
                from you, subject to limited exceptions (such as completing a
                transaction you requested or meeting a legal obligation).
              </li>
              <li>
                <strong className="text-navy">Right to correct</strong> — you
                can ask us to correct inaccurate personal information we hold
                about you.
              </li>
              <li>
                <strong className="text-navy">
                  Right to opt out of sale or sharing
                </strong>{" "}
                — we do not sell personal information for money. To the extent
                our use of advertising cookies and pixels (for example, the
                Meta Pixel or Google Ads tags) is treated as &ldquo;sharing&rdquo;
                under California law, you may opt out by emailing us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-orange hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                or by using the browser-level Global Privacy Control (GPC)
                signal.
              </li>
              <li>
                <strong className="text-navy">
                  Right to non-discrimination
                </strong>{" "}
                — we will not deny you services, charge you a different price,
                or provide a different level of service because you exercised
                any of your CCPA rights.
              </li>
            </List>
            <p>
              To exercise any of these rights, email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-orange hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              with the subject line &ldquo;California Privacy Request&rdquo;
              and include enough information for us to verify your identity
              (such as the name, phone number, and email address you used when
              you contacted us). You may also designate an authorized agent to
              make a request on your behalf, in which case we will need
              written proof of that authorization.
            </p>
          </div>

          <Heading>Children&apos;s Privacy</Heading>
          <div className="space-y-4">
            <p>
              Our website and services are intended for homeowners and other
              adults. We do not knowingly collect personal information from
              children under 16. If you believe a child has provided us with
              personal information, please email us and we will delete it.
            </p>
          </div>

          <Heading>Changes to This Policy</Heading>
          <div className="space-y-4">
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, the tools we use, or the law. When we
              do, we will update the &ldquo;Effective date&rdquo; above and, if
              the changes are significant, take reasonable steps to notify you.
            </p>
          </div>

          <Heading>Contact Us</Heading>
          <div className="space-y-4">
            <p>
              If you have questions about this Privacy Policy or how we handle
              your information, you can reach us at:
            </p>
            <p>
              Home Energy Construction
              <br />
              Fresno, California
              <br />
              Email:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-orange hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </article>
      </section>
    </>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mt-12 first:mt-0">
      {children}
    </h2>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-5 space-y-2 marker:text-orange">{children}</ul>
  );
}
