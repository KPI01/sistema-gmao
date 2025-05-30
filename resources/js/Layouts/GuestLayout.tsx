import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {

}

function GuestLayout({ children }: Props) {
    return (
        <div className="w-screen h-screen grid place-content-center py-4 px-6">
            {children}
        </div>
    )
}

export default GuestLayout;