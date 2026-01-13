import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string; // If no href, it's the current page (last item)
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  if (items.length === 0) {
    return (
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2"></ol>
      </nav>
    );
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="mx-2 text-muted-foreground"
                >
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  className="text-sm font-medium text-foreground"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
