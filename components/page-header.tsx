import Balance from "react-wrap-balancer"

import { cn } from "@/lib/utils"

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "flex w-full items-center justify-between mb-5",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]",
        className
      )}
      {...props}
    />
  )
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Balance
      className={cn(
        "max-w-[750px] text-lg text-muted-foreground sm:text-xl",
        className
      )}
      {...props}
    />
  )
}


function PageSubHeaderHeading({
                             className,
                             ...props
                           }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
      <h1
          className={cn(
              "text-xl font-bold leading-tight text-muted-foreground tracking-tighter md:text-3xl lg:leading-[1.1]",
              className
          )}
          {...props}
      />
  )
}

export { PageHeader, PageHeaderHeading, PageHeaderDescription, PageSubHeaderHeading }