import { Link } from './styling';

const InlineLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => (
  <Link target="_blank" href={href}>
    {children}
  </Link>
);

export default InlineLink;
