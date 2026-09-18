import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        gold: "bg-gold-gradient text-accent-foreground shadow-gold hover:-translate-y-0.5 hover:brightness-105",
        wine: "bg-wine-gradient text-primary-foreground shadow-card hover:-translate-y-0.5 hover:brightness-110",
        outline:
          "border border-gold/70 bg-transparent text-foreground hover:bg-gold/10 hover:border-gold",
        ghost: "text-foreground hover:text-wine hover:bg-gold/10",
        whatsapp:
          "bg-whatsapp text-whatsapp-foreground shadow-card hover:-translate-y-0.5 hover:brightness-105",
        link: "text-wine underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-xs uppercase tracking-[0.18em]",
        md: "h-11 px-6 text-sm uppercase tracking-[0.18em]",
        lg: "h-13 px-8 text-sm uppercase tracking-[0.2em]",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";

function ButtonLink({
  className,
  variant,
  size,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof buttonVariants>) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, ButtonLink, buttonVariants };
