import Link from "next/link";
import type { ReactNode } from "react";
import { parseArticle, type ArticleInline } from "./article";

function renderInlines(inlines: ArticleInline[], keyPrefix: string): ReactNode[] {
  return inlines.map((inline, index) => {
    const key = `${keyPrefix}-${index}`;
    if (inline.type === "strong") return <strong key={key}>{inline.text}</strong>;
    if (inline.type === "em") return <em key={key}>{inline.text}</em>;
    if (inline.type === "link") {
      if (inline.href.startsWith("/")) return <Link key={key} href={inline.href}>{inline.text}</Link>;
      return <a key={key} href={inline.href}>{inline.text}</a>;
    }
    return <span key={key}>{inline.text}</span>;
  });
}

export default function ArticleBody({ markdown }: { markdown: string }) {
  const blocks = parseArticle(markdown);
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "h2") return <h2 key={index}>{renderInlines(block.inlines, `h2-${index}`)}</h2>;
        if (block.type === "h3") return <h3 key={index}>{renderInlines(block.inlines, `h3-${index}`)}</h3>;
        if (block.type === "ul") {
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => <li key={itemIndex}>{renderInlines(item, `ul-${index}-${itemIndex}`)}</li>)}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={index}>
              {block.items.map((item, itemIndex) => <li key={itemIndex}>{renderInlines(item, `ol-${index}-${itemIndex}`)}</li>)}
            </ol>
          );
        }
        return <p key={index}>{renderInlines(block.inlines, `p-${index}`)}</p>;
      })}
    </>
  );
}
