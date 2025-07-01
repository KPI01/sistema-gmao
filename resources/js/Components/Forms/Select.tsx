import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

export const Select = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.PropsWithChildren<
        React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>
    >
>(({ children, ...props }, forwardedRef) => {
    return (
        <SelectPrimitive.Root {...props}>
            <SelectPrimitive.Trigger
                className="btn btn-ghost no-animation justify-between"
                style={{ borderColor: "oklch(var(--bc)/0.2)" }}
                ref={forwardedRef}
            >
                <SelectPrimitive.Value />
                <SelectPrimitive.Icon>
                    <ChevronDown />
                </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Portal>
                <SelectPrimitive.Content className="bg-base-100 p-4 border rounded-lg shadow">
                    <SelectPrimitive.ScrollUpButton>
                        <ChevronUp />
                    </SelectPrimitive.ScrollUpButton>
                    <SelectPrimitive.Viewport className="space-y-4">
                        {children}
                    </SelectPrimitive.Viewport>
                    <SelectPrimitive.ScrollDownButton>
                        <ChevronDown />
                    </SelectPrimitive.ScrollDownButton>
                </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
    );
});

export const SelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.PropsWithChildren<
        React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
    >
>(({ children, ...props }, forwardedRef) => {
    return (
        <SelectPrimitive.Item
            {...props}
            className="flex items-center gap-4 cursor-pointer py-1 px-2 hover:border-none hover:ring-0 active:border-none active:ring-0 hover:bg-base-300 p-2 rounded transition"
            ref={forwardedRef}
        >
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
            <SelectPrimitive.ItemIndicator>
                <Check size={18} />
            </SelectPrimitive.ItemIndicator>
        </SelectPrimitive.Item>
    );
});
