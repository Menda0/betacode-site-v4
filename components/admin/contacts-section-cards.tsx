import { IconInbox, IconLanguage, IconWorld } from "@tabler/icons-react"
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
  enCount: number
  ptCount: number
  withWebsiteCount: number
}

export function ContactsSectionCards({
  total,
  enCount,
  ptCount,
  withWebsiteCount,
}: ContactsSectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
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
            All pricing calculator leads
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>English</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {enCount}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          <Badge variant="outline">EN</Badge>
          <span className="ml-2">Submissions in English</span>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Portuguese</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {ptCount}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <IconLanguage className="size-4" />
            Submissions in Portuguese
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>With website</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {withWebsiteCount}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <IconWorld className="size-4" />
            Leads that shared a website
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
