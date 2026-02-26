import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { LinkProps } from 'next/link';

interface NavLinkCompatProps extends Omit<LinkProps, 'className'> {
  className?: string;
  activeClassName?: string;
  children?: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, href, children, ...props }, ref) => {
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

NavLink.displayName = 'NavLink';

export { NavLink };
