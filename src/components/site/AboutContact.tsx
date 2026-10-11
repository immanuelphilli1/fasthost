const phones = [
  { label: "+233 504 426415", href: "tel:+233504426415" },
  { label: "+233 547 658525", href: "tel:+233547658525" },
] as const;

const emails = ["info@fasthosttech.com", "sms@fasthosttech.com"] as const;

const work = [
  {
    title: "Web hosting",
    body: "Sites are hosted with cPanel, a free SSL certificate, one-click WordPress, DNS management, and domain theft protection. Yearly plans on the hosting site start at GHs 300. The same team builds custom websites and mobile applications.",
  },
  {
    title: "Bulk SMS",
    body: "Fasthost SMS sends high volumes of messages for schools, hospitals, churches, corporations, banks, and individuals. Accounts can store contact groups, upload contacts, and keep message templates. Bundles do not expire.",
  },
  {
    title: "FastHost Console",
    body: "The console is the SMS desk: send messages, watch credits, and keep API keys in one place. A key stays in the browser tab and is cleared when that tab closes.",
  },
  {
    title: "Brocchure",
    body: "Brocchure turns a brochure, menu, pitch deck, or PDF into a QR code people can scan without an app. It is used for weddings, funerals and memorials, restaurants, and events. Mobile money payments on Brocchure are processed by Fasthost Technology Enterprise, which Brocchure names as its mother company.",
  },
  {
    title: "Slip Builder and HotSpark",
    body: "Slip Builder turns plain language into SportyBet GH slips. HotSpark is a dating app from Fasthost. It does not have a public site yet.",
  },
] as const;

export function AboutContact() {
  return (
    <div className="bg-paper text-ink">
      <section id="about" className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-12">
          <p className="text-sm tracking-[0.16em] text-ink/50 uppercase">Company</p>
          <div>
            <h2 className="max-w-xl text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              Fasthost Technology Enterprise
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink/75 sm:text-lg">
              <p>
                The company is on Weija Road in Accra. The office is open Monday to Friday, 9am to
                6pm. Support for the hosting and SMS services is offered around the clock, including
                weekends.
              </p>
              <p>
                It began as web hosting and bulk SMS. Those services are still the daily work.
                Beside them, Fasthost ships products people open on their own, and it takes payment
                for Brocchure.
              </p>
            </div>
            <ul className="mt-10 max-w-2xl space-y-6">
              {work.map((item) => (
                <li key={item.title}>
                  <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70 sm:text-base">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-border px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-12">
          <p className="text-sm tracking-[0.16em] text-ink/50 uppercase">Contact</p>
          <div>
            <h2 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              Weija Road, Ghana-Accra
            </h2>
            <p className="mt-4 text-base text-ink/70 sm:text-lg">Monday to Friday, 9am to 6pm</p>
            <ul className="mt-8 space-y-3 text-base sm:text-lg">
              {phones.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href} className="underline decoration-ink/20 underline-offset-4">
                    {phone.label}
                  </a>
                </li>
              ))}
              {emails.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="underline decoration-ink/20 underline-offset-4"
                  >
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="terms" className="border-t border-border px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-12">
          <p className="text-sm tracking-[0.16em] text-ink/50 uppercase">Terms</p>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              Terms of service
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink/75 sm:text-base">
              <p>
                These terms follow the terms published for Fasthost hosting and related services.
                “You” means the person using the services, or someone authorized to act for them.
                “We” means Fasthost Technology Enterprise and its subsidiaries. Using an account to
                buy, open, or cancel a service is agreement to these terms, including when someone
                else uses the account.
              </p>
              <p>
                Fasthost may change the agreement and the services. Continuing to use a service
                after a change means the new terms apply. The privacy policy is part of the
                agreement. Fasthost may change that policy too. If you do not accept a privacy
                change, you may end the agreement. Fees already paid are not refunded for that
                reason.
              </p>
              <p>
                If you give Fasthost personal data about someone else, you confirm that you told
                them why it was collected, who receives it, which parts are required, and how they
                can see and correct it. Fasthost is not responsible for missing consent, or for data
                that is old, incomplete, or wrong.
              </p>
              <p>
                An account cancelled within the first 15 days after sign-up may be refunded. After
                that, there is no refund. Domain registration, renewals, and licenses bought
                outside a package are not refunded. If the agreement ends because of your default,
                you pay the reasonable cost of closing the account. Fasthost may then delete the
                information related to you on the services.
              </p>
              <p>
                Support for issues with a Fasthost service is included. Hosting and related
                electronic services may be used only for legal purposes. The hosting space is for
                serving web pages, not as off-site file storage. Fasthost can end or refuse service,
                with or without notice, if a site or a link from it is illegal, misleading, or
                obscene, or breaks the acceptable use rules.
              </p>
              <p>
                The full hosting terms are also published at{" "}
                <a
                  href="https://hosting.fasthosttech.com/tos"
                  className="underline decoration-ink/20 underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  hosting.fasthosttech.com/tos
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="privacy" className="border-t border-border px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-12">
          <p className="text-sm tracking-[0.16em] text-ink/50 uppercase">Privacy</p>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              Privacy policy
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink/75 sm:text-base">
              <p>
                This policy follows the privacy policy published for Fasthosttech.com. It covers
                information people share on the website. It does not cover information collected
                offline or through other channels. Using the website is consent to the policy.
              </p>
              <p>
                When a form asks for personal information, the reason is shown at that point. A
                direct message can include a name, email address, phone number, the message, and
                any files attached. An account registration can ask for a name, company name,
                address, email address, and telephone number.
              </p>
              <p>
                Fasthost uses that information to run and maintain the site, improve it, understand
                how it is used, develop products, reply to customers, send updates and promotional
                email, and find and prevent fraud.
              </p>
              <p>
                The site uses cookies to remember preferences and the pages a visitor opened, and to
                adjust the page to the browser. The published policy also lists California requests
                to see personal data, delete it, or ask that it not be sold, and says a request is
                answered within one month.
              </p>
              <p>
                Questions go to{" "}
                <a
                  href="mailto:info@fasthosttech.com"
                  className="underline decoration-ink/20 underline-offset-4"
                >
                  info@fasthosttech.com
                </a>{" "}
                or{" "}
                <a
                  href="tel:+233504426415"
                  className="underline decoration-ink/20 underline-offset-4"
                >
                  +233 504 426415
                </a>
                . The same policy is published at{" "}
                <a
                  href="https://hosting.fasthosttech.com/privacy"
                  className="underline decoration-ink/20 underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  hosting.fasthosttech.com/privacy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-sm text-ink/60">
          <p>Fasthost Technology Enterprise</p>
          <p className="flex gap-4">
            <a href="#terms" className="underline decoration-ink/20 underline-offset-4">
              Terms
            </a>
            <a href="#privacy" className="underline decoration-ink/20 underline-offset-4">
              Privacy
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
