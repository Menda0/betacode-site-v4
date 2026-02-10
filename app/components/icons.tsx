import { IconBuilding, IconDeviceLaptop, IconRocket 
 } from "@tabler/icons-react";

export function TraditionalBusinessIcon() {
    return (
        <div className="p-2 rounded-md bg-yellow-100/40 dark:bg-yellow-800/40 w-fit">
            <IconBuilding aria-hidden="true" className={`size-10 flex-none text-yellow-600 dark:text-yellow-600`} />
        </div>
    )
}   

export function TechCocampaniesIcon() {
    return (
        <div className="p-2 rounded-md bg-indigo-100/40 dark:bg-indigo-800/40 w-fit">
            <IconDeviceLaptop aria-hidden="true" className={`size-10 flex-none text-indigo-600 dark:text-indigo-600`} />
        </div>
    )
}

export function StartupsIcon() {
    return (
        <div className="p-2 rounded-md bg-green-100/40 dark:bg-green-800/40 w-fit">
            <IconRocket aria-hidden="true" className={`size-10 flex-none text-green-600 dark:text-green-600`} />
        </div>
    )
}