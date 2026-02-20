import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { IconCheck, IconCircleCheck } from '@tabler/icons-react'
import Link from 'next/link'

const styles = {
    yellow: {
        color: "text-yellow-600 dark:text-yellow-600",
        titleColor: "text-yellow-600 dark:text-yellow-600",
        featureColor1: "bg-yellow-100/40 dark:bg-yellow-800/40",
        featureColor2: "bg-yellow-800/50 dark:bg-yellow-200",
        serviceColor: "bg-orange-200/40 dark:bg-orange-400/40",
        bgLinearTo: "from-[#ffc5a3] to-[#ffeeaa]",
    },
    orange: {
        color: "text-orange-600 dark:text-orange-600",
        titleColor: "text-orange-600 dark:text-orange-600",
        featureColor1: "bg-orange-100/40 dark:bg-orange-800/40",
        featureColor2: "bg-orange-800/50 dark:bg-orange-200",
        serviceColor: "bg-orange-200/40 dark:bg-orange-400/40",
        bgLinearTo: "from-[#ff8f43] to-[#ffd384]",
    },
    green: {
        color: "text-green-600 dark:text-green-600",
        titleColor: "text-green-600 dark:text-green-600",
        featureColor1: "bg-green-100/40 dark:bg-green-800/40",
        featureColor2: "bg-green-800/50 dark:bg-green-200",
        serviceColor: "bg-green-200/40 dark:bg-green-400/40",
        bgLinearTo: "from-[#90e0ef] to-[#caf0f8]",
    },
    blue: {
        color: "text-blue-600 dark:text-blue-600",
        titleColor: "text-blue-600 dark:text-blue-600",
        featureColor1: "bg-blue-100/40 dark:bg-blue-800/40",
        featureColor2: "bg-blue-800/50 dark:bg-blue-200",
        serviceColor: "bg-blue-200/40 dark:bg-blue-400/40",
        bgLinearTo: "from-[#00b4d8] to-[#007bff]",
    },
    red: {
        color: "text-red-600 dark:text-red-600",
        titleColor: "text-red-600 dark:text-red-600",
        featureColor1: "bg-red-100/40 dark:bg-red-800/40",
        featureColor2: "bg-red-800/50 dark:bg-red-200",
        serviceColor: "bg-red-200/40 dark:bg-red-400/40",
        bgLinearTo: "from-[#fb8500] to-[#ffb703]",
    },
    purple: {
        color: "text-purple-600 dark:text-purple-600",
        titleColor: "text-purple-600 dark:text-purple-600",
        featureColor1: "bg-purple-100/40 dark:bg-purple-800/40",
        featureColor2: "bg-purple-800/50 dark:bg-purple-200",
        serviceColor: "bg-purple-200/40 dark:bg-purple-400/40",
        bgLinearTo: "from-[#9d4edd] to-[#c77dff]",
    },
    pink: {
        color: "text-pink-600 dark:text-pink-600",
        titleColor: "text-pink-600 dark:text-pink-600",
        featureColor1: "bg-pink-100/40 dark:bg-pink-800/40",
        featureColor2: "bg-pink-800/50 dark:bg-pink-200",
        serviceColor: "bg-pink-200/40 dark:bg-pink-400/40",
        bgLinearTo: "from-[#ff79c6] to-[#ff9ac1]",
    },
    gray: {
        color: "text-gray-600 dark:text-gray-600",
        titleColor: "text-gray-600 dark:text-gray-600",
        featureColor1: "bg-gray-100/40 dark:bg-gray-800/40",
        featureColor2: "bg-gray-800/50 dark:bg-gray-200",
        serviceColor: "bg-gray-200/40 dark:bg-gray-400/40",
        bgLinearTo: "from-[#6c757d] to-[#adb5bd]",
    },
    indigo: {
        color: "text-indigo-600 dark:text-indigo-600",
        titleColor: "text-indigo-600 dark:text-indigo-600",
        featureColor1: "bg-indigo-100/40 dark:bg-indigo-800/40",
        featureColor2: "bg-indigo-800/50 dark:bg-indigo-200",
        serviceColor: "bg-indigo-200/40 dark:bg-indigo-400/40",
        bgLinearTo: "from-[#495057] to-[#6c757d]",
    },
}

function FeatureService({ service, color }: { service: { name: string, description: string }, color: string }) {
    const style = styles[color as keyof typeof styles]
    return (
        <div className={`flex flex-col gap-x-4 ${style.serviceColor} rounded-md p-4`}>
            <h5 className="text-md font-bold text-gray-900 dark:text-white">{service.name}</h5>
            <p className="text-sm text-gray-600 dark:text-white">{service.description}</p>
        </div>
    )
}

type FeatureProps = {
    feature: {
        id: string,
        icon: React.ReactNode,
        title: string,
        subtitle: string,
        description: string,
        services: { name: string, description: string }[],
        benefits: string[],
        color: string,
        side: string,
    }
}

function Description({ feature }: FeatureProps) {
    const style = styles[feature.color as keyof typeof styles]
    const side = feature.side
    return (
        <div id={feature.id} className="px-6 md:px-0 lg:pt-4 lg:pr-4 ">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <div className="flex flex-col gap-4 items-start gap-x-2">
                    <div className={`flex w-full ${side === "left" ? "justify-start" : "justify-end"}`}>{feature.icon}</div>
                    <h2 className={`text-base/7 font-semibold w-full ${style.titleColor} uppercase ${side === "left" ? "text-left" : "text-right"}`}>{feature.title}</h2>
                </div>
                <p className={`mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white ${side === "left" ? "text-left" : "text-right"}`}>
                    {feature.subtitle}
                </p>

                <p className={`mt-6 text-lg/8 text-gray-700 dark:text-gray-300 ${side === "left" ? "text-left" : "text-right"}`}>
                    {feature.description}
                </p>
                <div className="mt-4 flex flex-col md:flex-row-reverse items-center gap-6">
                    <Link
                        href="https://calendar.app.google/1kXGjsszjPB3eFGr7"
                        className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus-visible:outline-primary-500 z-10"
                    >
                        Book a call!
                    </Link>
                </div>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none dark:text-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Key Benefits</h3>
                    <div className="flex flex-col gap-y-2">
                        {feature.benefits.map((benefit) => (
                            <div key={benefit} className="relative pl-9 ">
                                <dt className="inline font-semibold text-gray-900 dark:text-white flex items-center">
                                    <IconCircleCheck
                                        aria-hidden="true"
                                        className={`absolute top-1 left-1 size-5 ${style.color}`}
                                    />
                                    {benefit}
                                </dt>{' '}
                                {/* <dd className="inline">{feature.description}</dd> */}
                            </div>
                        ))}
                    </div>
                </dl>
            </div>
        </div>
    )
}

function Services({ feature }: FeatureProps) {
    const style = styles[feature.color as keyof typeof styles]
    const side = feature.side
    return (
        <div className="sm:px-6 lg:px-0">
            <div className={`relative isolate overflow-hidden ${style.featureColor1} px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pt-16 sm:pr-0 ${side === "left" ? "sm:pl-16" : "sm:pr-16"} lg:mx-0 lg:max-w-none`}>
                <div
                    aria-hidden="true"
                    className={`absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] ${style.featureColor2} opacity-20 ring-1 ring-white ring-inset`}
                />
                <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                    <div className="overflow-hidden rounded-tl-xl ">
                        <div className="md:px-6 pt-6 pb-14">
                            <div className="flex flex-col gap-y-2 gap-x-4 rounded-md md:p-4">
                                <h4 className={`text-lg font-semibold text-gray-900 dark:text-white w-full text-center mb-4 ${side === "left" ? "md:text-right" : "md:text-left"}`}>Our services that can help you!</h4>
                                {feature.services.map((service) => (
                                    <FeatureService key={service.name} service={service} color={feature.color} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 ring-1 ring-black/10 ring-inset sm:rounded-3xl dark:ring-white/10"
                />
            </div>
        </div>
    )
}

function Background({ style, side }: { style: typeof styles[keyof typeof styles], side: string }) {
    if (side === "left") {
        return (
            <div
                aria-hidden="true"
                className="col-start-1 row-start-1 overflow-hidden blur-3xl animate-pulse"
            >
                <div
                    style={{
                        clipPath: 'polygon(36.9% 29.5%, 0% 17.1%, 23.4% 3%, 51.6% 0%, 55.4% 4.7%, 45.5% 25.3%, 40.2% 49%, 44.8% 57.8%, 55.6% 57.2%, 72.2% 47.9%, 64.9% 81.5%, 100% 97.7%, 60.8% 100%, 64.8% 81.4%, 2.8% 52.8%, 36.9% 29.5%)',
                    }}
                    className={`
                        mx-auto
                        aspect-[801/236]
                        w-[100.25rem]
                        bg-linear-to-tr ${style.bgLinearTo}
                        opacity-30
                        blur-3xl
                    `}
                />
            </div>
        )
    } else {
        return (
            <div
                aria-hidden="true"
                className="col-start-1 row-start-1 overflow-hidden blur-3xl animate-pulse"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
                    }}
                    className="mx-auto aspect-[801/236] w-[100.25rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 blur-3xl"
                />
            </div>
        )
    }
}

export function Feature({ feature }: FeatureProps) {
    const style = styles[feature.color as keyof typeof styles]
    return (
        <div className="grid">
            {/* Background */}
            <Background style={style} side={feature.side} />
            {/* Content */}
            <div className="col-start-1 row-start-1 bg-white py-24 sm:py-32 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                        {feature.side === "left" && <Description feature={feature} />}
                        {feature.side === "right" && <Services feature={feature} />}
                        {feature.side === "left" && <Services feature={feature} />}
                        {feature.side === "right" && <Description feature={feature} />}
                    </div>
                </div>
            </div>
        </div>
    )
}