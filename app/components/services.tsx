'use client'

import { useTranslations } from 'next-intl'
import { Icon, IconBuilding, IconInfoSquareRounded, IconPoint, IconRocket, IconSquareCheck, IconSquareX, IconUsers } from '@tabler/icons-react'
import { TraditionalBusinessIcon, TechCocampaniesIcon, StartupsIcon, BetacodeVenturesIcon } from './icons'
import { Link } from '@/i18n/navigation'

const styles = {
    green: {
        color: 'text-green-400',
        icon: IconRocket,
        borderColor: 'bg-gray-100/40 dark:bg-gray-800/80 border-gray-200 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800',
        IconBgColor: 'bg-green-800/50 dark:bg-green-200',
        IconColor: 'text-green-200 dark:text-green-800',
        textColor: 'group-hover:text-green-600 dark:group-hover:text-green-400',
    },
    blue: {
        color: 'text-blue-400',
        icon: IconBuilding,
        borderColor: 'bg-gray-100/40 dark:bg-gray-800/80 border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800',
        IconBgColor: 'bg-blue-800/50 dark:bg-blue-200',
        IconColor: 'text-blue-200 dark:text-blue-800',
        textColor: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
    },
    red: {
        color: 'text-red-400',
        icon: IconSquareX,
        borderColor: 'bg-gray-100/40 dark:bg-gray-800/80 border-gray-200 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-800',
        IconBgColor: 'bg-red-800/50 dark:bg-red-200',
        IconColor: 'text-red-200 dark:text-red-800',
        textColor: 'group-hover:text-red-600 dark:group-hover:text-red-400',
    },
    yellow: {
        color: 'text-yellow-400',
        icon: IconInfoSquareRounded,
        borderColor: 'bg-gray-100/40 dark:bg-gray-800/80 border-gray-200 dark:border-gray-800 hover:border-yellow-200 dark:hover:border-yellow-800',
        IconBgColor: 'bg-yellow-800/50 dark:bg-yellow-200',
        IconColor: 'text-yellow-200 dark:text-yellow-800',
        textColor: 'group-hover:text-yellow-600 dark:group-hover:text-yellow-400',
    },
    orange: {
        color: 'text-orange-400',
        icon: IconBuilding,
        borderColor: 'bg-gray-100/40 dark:bg-gray-800/80 border-gray-200 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-800',
        IconBgColor: 'bg-orange-800/50 dark:bg-orange-200',
        IconColor: 'text-orange-200 dark:text-orange-800',
        textColor: 'group-hover:text-orange-600 dark:group-hover:text-orange-400',
    },
    indigo: {
        color: 'text-indigo-400',
        icon: IconBuilding,
        borderColor: 'bg-gray-100/40 dark:bg-gray-800/80 border-gray-200 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800',
        IconBgColor: 'bg-indigo-800/50 dark:bg-indigo-200',
        IconColor: 'text-indigo-200 dark:text-indigo-800',
        textColor: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
    },
    purple: {
        color: 'text-purple-400',
        icon: IconUsers,
        borderColor: 'bg-gray-100/40 dark:bg-gray-800/80 border-gray-200 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800',
        IconBgColor: 'bg-purple-800/50 dark:bg-purple-200',
        IconColor: 'text-purple-200 dark:text-purple-800',
        textColor: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
    },
}

type FeatureItem = {
    name: string
    description: string
    href: string
    icon: React.ComponentType
    color: keyof typeof styles
    techTeam: {
        label: string
        color: string
        icon: Icon
    }
    services: string[]
}

const featureConfig = [
    {
        key: 'traditionalBusiness' as const,
        href: '#traditional-business',
        icon: TraditionalBusinessIcon,
        color: 'orange' as const,
        techTeam: {
            color: 'bg-red-900/10 text-red-900 inset-ring inset-ring-red-200 dark:text-white dark:inset-ring-red-800 dark:bg-red-200/10',
            icon: IconSquareX,
        },
    },
    {
        key: 'techCompanies' as const,
        href: '#tech-companies',
        icon: TechCocampaniesIcon,
        color: 'indigo' as const,
        techTeam: {
            color: 'bg-green-900/10 text-green-900 inset-ring inset-ring-green-200 dark:text-white dark:inset-ring-green-800 dark:bg-green-200/10',
            icon: IconSquareCheck,
        },
    },
    {
        key: 'startups' as const,
        href: '#startups',
        icon: StartupsIcon,
        color: 'green' as const,
        techTeam: {
            color: 'bg-yellow-900/10 text-yellow-900 inset-ring inset-ring-yellow-200 dark:text-white dark:inset-ring-yellow-800 dark:bg-yellow-200/10',
            icon: IconInfoSquareRounded,
        },
    },
    {
        key: 'betacodeVentures' as const,
        href: '/betacode-ventures',
        icon: BetacodeVenturesIcon,
        color: 'purple' as const,
        techTeam: {
            color: 'bg-purple-900/10 text-purple-900 inset-ring inset-ring-purple-200 dark:text-white dark:inset-ring-purple-800 dark:bg-purple-200/10',
            icon: IconRocket,
        },
    },
]

function TeamBadge({ techTeam }: { techTeam: { label: string, color: string, icon: Icon } }) {
    return (
        <span className={`inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ${techTeam.color}`}>
            <techTeam.icon aria-hidden="true" className="size-4" />
            {techTeam.label}
        </span>
    )
}

function ServiceCard({ feature, learnMoreLabel, servicesLabel }: { feature: FeatureItem; learnMoreLabel: string; servicesLabel: string }) {
    const style = styles[feature.color]
    return (
        <Link href={feature.href} key={feature.name} className={`flex flex-col border ${style.borderColor} rounded-md p-4 group transition-all duration-300 cursor-pointer`}>
            <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900 dark:text-white">
                <feature.icon />
                <div className={`text-2xl font-semibold transition-all duration-300 ${style.textColor}`}>{feature.name}</div>
            </dt>
            <dd className="mt-4 flex flex-auto flex-col gap-y-4 text-base/7 text-gray-600 dark:text-gray-400">
                <p>{feature.description}</p>
                <div>
                    <TeamBadge techTeam={feature.techTeam} />
                </div>
                <div className="grow">
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white">{servicesLabel}</h4>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm ">
                        {feature.services.map((service: string) => (
                            <li key={service} className="flex items-center gap-x-2"><IconPoint className="size-4 text-blue-500" /> {service}</li>
                        ))}
                    </ul>
                </div>
                <p className="mt-6">
                    <span className={`text-sm/6 font-semibold ${style.textColor}`}>
                        {learnMoreLabel} <span aria-hidden="true">→</span>
                    </span>
                </p>
            </dd>
        </Link>
    )
}

export function Services() {
    const t = useTranslations('services')

    const features: FeatureItem[] = featureConfig.map((config) => ({
        name: t(`${config.key}.name`),
        description: t(`${config.key}.description`),
        href: config.href,
        icon: config.icon,
        color: config.color,
        techTeam: {
            label: t(`${config.key}.techTeam`),
            color: config.techTeam.color,
            icon: config.techTeam.icon,
        },
        services: t.raw(`${config.key}.services`) as string[],
    }))

    return (
        <div id="services" className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base/7 font-semibold text-indigo-400 uppercase">{t('eyebrow')}</h2>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
                        {t('title')}
                    </p>
                    <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
                        {t('description')}
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4 ">
                        {features.map((feature) => (
                            <ServiceCard
                                key={feature.name}
                                feature={feature}
                                learnMoreLabel={t('learnMore')}
                                servicesLabel={t('servicesLabel')}
                            />
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
