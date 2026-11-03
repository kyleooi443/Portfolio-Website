import Image from 'next/image';

export function ArticleMedia({ src, alt, caption, width = 1200, height = 800 }: { src: string; alt: string; caption?: string; width?: number; height?: number }) {
  return <figure className="article-media"><Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 720px) 100vw, 680px" /><figcaption>{caption}</figcaption></figure>;
}
