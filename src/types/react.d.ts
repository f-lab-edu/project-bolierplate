import type {
  ComponentPropsWithoutRef,
  DetailedHTMLProps,
  HTMLAttributes,
  ElementType,
  AriaAttributes,
  AriaRole,
} from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      element: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }

  type ComponentPropsWithoutRefWithAsChild<
    Comp extends ElementType,
    Props extends Record<string, unknown> = unknown,
  > = Combine<Combine<{ asChild?: boolean }, Props>, ComponentPropsWithoutRef<Comp>>;

  type AriaAttributeWithRole = AriaAttributes & { role?: AriaRole };
}
