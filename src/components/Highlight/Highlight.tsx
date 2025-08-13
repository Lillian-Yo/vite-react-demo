import React from "react";
import "./index.scss";

type HighlightTextProps = {
  /** 优先使用 children；若 children 不是纯文本且存在，则原样返回 */
  children?: React.ReactNode;
  /** 备用文本；当没有纯文本 children 时使用 */
  text?: string;
  keyword?: string;
  className?: string;                // 支持 className
  style?: React.CSSProperties;       // 支持内联样式
};

const DEFAULT_CLASS = "bolder";

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** 纯函数：把匹配 keyword 的片段用 <span> 包裹返回 ReactNode[] */
export function highlightText(
  text: string,
  keyword?: string,
  className?: string,
  style?: React.CSSProperties
): React.ReactNode {
  if (!text) return text;
  const kw = (keyword ?? "").trim();
  if (!kw) return text;

  const re = new RegExp(`(${escapeRegExp(kw)})`, "gi");
  const parts = text.split(re);

  return parts.map((part, i) =>
    part.toLowerCase() === kw.toLowerCase() ? (
      <span key={i} className={className ?? DEFAULT_CLASS} style={style}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

export function HighlightText({
  children,
  text,
  keyword,
  className,
  style,
}: HighlightTextProps) {
  // 1) 若提供了 children，且为纯文本/数字，则以 children 为准并高亮
  if (
    children !== undefined &&
    (typeof children === "string" || typeof children === "number")
  ) {
    return (
      <>{highlightText(String(children), keyword, className, style)}</>
    );
  }

  // 2) 若提供了 children，但不是纯文本（例如 <div/>），按“以 children 为准”原样返回
  if (children !== undefined) {
    return <>{children}</>;
  }

  // 3) 否则使用 text 进行高亮（允许 text 为空字符串）
  return <>{highlightText(text ?? "", keyword, className, style)}</>;
}

/** 便于 antd Select 的 optionRender 复用，保留样式参数 */
export function makeOptionRenderHighlighter({
  query,
  className,
  style,
}: {
  query?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (option: any) => {
    const labelText = String(option?.data?.label ?? option?.label ?? "");
    return <span>{highlightText(labelText, query, className, style)}</span>;
  };
}

export default HighlightText;
