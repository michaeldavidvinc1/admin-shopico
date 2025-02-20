import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Fragment} from "react";

interface BreadcrumbProps {
    items: { label: string; href?: string }[];
}

function DynamicBreadcrumb({ items }: BreadcrumbProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <Fragment key={item.label || index}>
                        {item.href ? (
                            <BreadcrumbItem>
                                <BreadcrumbLink href={item.href} className="inline-flex items-center gap-1.5">
                                    {item.label}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        ) : (
                            <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        )}
                        {index < items.length - 1 && <BreadcrumbSeparator />}
                    </Fragment>
                ))}

            </BreadcrumbList>
        </Breadcrumb>
    );
}

export { DynamicBreadcrumb };
