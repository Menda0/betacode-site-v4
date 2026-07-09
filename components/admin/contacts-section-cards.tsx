import { IconBuildingStore, IconCalculator, IconInbox, IconRocket } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type ContactsSectionCardsProps = {
  total: number
  generalCount: number
  venturesCount: number
  priceCalculatorCount: number
}

export function ContactsSectionCards({
  total,
  generalCount,
  venturesCount,
  priceCalculatorCount,
}: ContactsSectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-none dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total contacts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {total}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <IconInbox className="size-4" />
            All contact submissions
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>General</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {generalCount}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <IconBuildingStore className="size-4" />
            <Badge variant="outline">General</Badge>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Betacode Ventures</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {venturesCount}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <IconRocket className="size-4" />
            <Badge variant="outline">Ventures</Badge>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Price calculator</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {priceCalculatorCount}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <IconCalculator className="size-4" />
            <Badge variant="outline">Calculator</Badge>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
