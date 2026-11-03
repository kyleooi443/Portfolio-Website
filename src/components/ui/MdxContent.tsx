import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArticleMedia } from './ArticleMedia';

export function MdxContent({ source }: { source: string }) {
  return <div className="prose-content"><MDXRemote source={source} components={{
    ArticleMedia,
    a: ({ href = '', children, ...props }) => href.startsWith('/') ? <Link href={href} {...props}>{children}</Link> : <a href={href} rel="noopener noreferrer" target="_blank" {...props}>{children}</a>,
  }} /></div>;
}
