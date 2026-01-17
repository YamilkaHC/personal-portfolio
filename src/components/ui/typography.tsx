import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Definición de estilos base y variantes usando CVA.
 * Cubre toda la jerarquía tipográfica estándar de un Design System moderno.
 */
const typographyVariants = cva(
  'text-foreground', // Color base por defecto
  {
    variants: {
      variant: {
        h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        h2: 'scroll-m-20  pb-2 text-3xl font-medium tracking-tight first:mt-0',
        h3: 'scroll-m-20 text-2xl font-medium tracking-tight',
        h4: 'scroll-m-20 text-xl font-medium tracking-tight',
        h5: 'scroll-m-20 text-lg font-medium tracking-tight',
        h6: 'scroll-m-20 text-base font-medium tracking-tight',
        p: 'leading-7 [&:not(:first-child)]:mt-6',
        blockquote: 'mt-6 border-l-2 pl-6 italic',
        ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
        ol: 'my-6 ml-6 list-decimal [&>li]:mt-2',
        li: 'text-sm', // Estilo base para items de lista si se usan sueltos
        code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium',
        lead: 'text-xl text-muted-foreground',
        large: 'text-lg font-medium',
        small: 'text-sm font-medium leading-none',
        muted: 'text-sm text-muted-foreground',
        link: 'font-medium text-primary underline underline-offset-4 hover:text-primary/80 cursor-pointer',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
      transform: {
        default: '',
        uppercase: 'uppercase',
        lowercase: 'lowercase',
        capitalize: 'capitalize',
      },
    },
    defaultVariants: {
      variant: 'p',
      align: 'left',
      transform: 'default',
    },
  },
)

/**
 * Mapeo de variantes a etiquetas HTML por defecto.
 * Esto asegura que si usas variant="h1", se renderice un <h1> automáticamente
 * sin necesidad de especificar as="h1".
 */
const defaultElementMapping: Record<string, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  blockquote: 'blockquote',
  ul: 'ul',
  ol: 'ol',
  li: 'li',
  code: 'code',
  lead: 'p',
  large: 'div',
  small: 'small',
  muted: 'p',
  link: 'a',
}

// Interfaz para permitir cualquier prop HTML válida (onClick, id, etc.)
interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, align, transform, as, ...props }, ref) => {
    // 1. Determinar qué etiqueta HTML usar
    // Si 'as' está presente, tiene prioridad. Si no, usa el mapeo por defecto.
    const Component = as || defaultElementMapping[variant || 'p'] || 'p'

    return (
      <Component
        ref={ref}
        className={cn(
          typographyVariants({ variant, align, transform, className }),
        )}
        {...props}
      />
    )
  },
)

Typography.displayName = 'Typography'

export { Typography, typographyVariants }
