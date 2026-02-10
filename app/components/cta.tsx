import Link from "next/link";

export function CTA() {
    return (
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
              Ready to take your business to the next level?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-primary-200">
              I am sure we can find a solution that fits your needs. Let's talk about your project and see how we can help you.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="https://calendar.app.google/1kXGjsszjPB3eFGr7"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-xs hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:shadow-none animate-bounce"
              >
                {' '}
                Book a call{' '}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
  