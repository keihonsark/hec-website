export default function ThankYouPage() {
  return (
    <section className="min-h-[80vh] bg-light-bg flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center bg-white rounded-2xl shadow-xl p-8 sm:p-12">
        <div className="w-16 h-16 rounded-full bg-orange/10 flex items-center justify-center text-orange mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
          Thank You — We&apos;ve Got It!
        </h1>
        <p className="text-gray-text text-lg leading-relaxed mb-8">
          A member of our team will text or call you within the hour to confirm
          your details and schedule your free in-home consultation.
        </p>
        <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-3 sm:justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center bg-navy text-white font-bold px-6 py-3 rounded-xl hover:bg-navy-dark transition-colors w-full sm:w-auto"
          >
            Return Home
          </a>
          <a
            href="tel:+15592158516"
            className="inline-flex items-center justify-center bg-orange text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-dark transition-colors w-full sm:w-auto"
          >
            Call (559) 215-8516
          </a>
        </div>
      </div>
    </section>
  );
}
