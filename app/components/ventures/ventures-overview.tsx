import { IconCircleCheck, IconHeartHandshake } from '@tabler/icons-react'
import { venturesOverview } from '@/lib/ventures-content'

function PartnershipList({
  title,
  subtitle,
  items,
  icon: Icon,
  iconClassName,
}: {
  title: string
  subtitle?: string
  items: string[]
  icon: typeof IconCircleCheck
  iconClassName: string
}) {
  return (
    <div className="flex flex-col">
      <div className="min-h-[5.5rem] lg:min-h-[6rem]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {subtitle && (
          <p className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="relative pl-9 text-base/7">
            <Icon
              aria-hidden="true"
              className={`absolute top-0.5 left-1 size-5 ${iconClassName}`}
            />
            <span className="font-medium text-gray-900 dark:text-white">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function VenturesOverview() {
  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-purple-600 uppercase dark:text-purple-400">
            {venturesOverview.title}
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            {venturesOverview.subtitle}
          </p>
          <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
            {venturesOverview.description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
            {venturesOverview.steps.map((step, index) => (
              <div key={step.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-lg font-semibold text-gray-900 dark:text-white">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    {index + 1}
                  </span>
                  {step.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-600 dark:text-gray-400">
                  <p>{step.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 items-start gap-12 lg:max-w-none lg:grid-cols-2 lg:gap-16">
          <PartnershipList
            title={venturesOverview.whatYouGet.title}
            subtitle={venturesOverview.whatYouGet.subtitle}
            items={venturesOverview.whatYouGet.items}
            icon={IconCircleCheck}
            iconClassName="text-purple-600 dark:text-purple-400"
          />
          <PartnershipList
            title={venturesOverview.partnershipAsk.title}
            subtitle={venturesOverview.partnershipAsk.subtitle}
            items={venturesOverview.partnershipAsk.items}
            icon={IconHeartHandshake}
            iconClassName="text-indigo-600 dark:text-indigo-400"
          />
        </div>
      </div>
    </div>
  )
}
