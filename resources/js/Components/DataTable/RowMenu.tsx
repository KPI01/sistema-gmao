import { DropdownMenu } from "radix-ui";
import { ReactNode } from "react";

type MenuItem = {
    children: ReactNode;
    submenu?: Omit<MenuItem, "submenu">[];
};

interface RowMenuProps {
    icon: React.ReactNode;
    items: MenuItem[];
}

function RowMenu({ icon, items }: RowMenuProps) {
    if (items.length < 1) {
        console.error("You must provide at least one menu item.");
        return;
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="btn btn-sm">
                {icon}
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="dropdown-content menu bg-base-100 shadow-lg rounded-box w-52 p-4 space-y-2"
                    sideOffset={5}
                >
                    {items.map((item, index) => {
                        return (
                            <DropdownMenu.Item
                                className="btn btn-ghost btn-xs"
                                key={index}
                                asChild
                            >
                                {item.children}
                            </DropdownMenu.Item>
                        );
                    })}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}

export { RowMenu, type MenuItem };
