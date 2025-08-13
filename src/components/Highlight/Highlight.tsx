import React, { useMemo } from "react";

/**
 * HighlightText
 * 通用的关键字高亮组件，适用于表格单元格渲染、Select 选项渲染等场景。
 *
 * 功能点：
 * - 支持多个关键字；
 * - 支持大小写开关；
 * - 自动转义特殊字符（可关）；
 * - 自定义高亮样式 className；
 * - 纯前端、无依赖；
 *
 * 用法：
 *   <HighlightText text={row.name} query={search} />
 *
 * 结合 Ant Design Table：
 *   const columns = [
 *     {
 *       title: 'Name',
 *       dataIndex: 'name',
 *       render: (text: string) => (
 *         <HighlightText text={text} query={keyword} highlightClassName="bg-yellow-200 rounded px-0.5" />
 *       ),
 *     }
 *   ]
 *
 * 结合 Ant Design Select：
 *   <Select
 *     showSearch
 *     filterOption={(input, option) => (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())}
 *     options={options.map(o => ({
 *       ...o,
 *       // 使用 label 渲染高亮（v5 支持 ReactNode）
 *       label: <HighlightText text={o.label} query={keyword} />,
 *     }))}
 *   />
 */

export type HighlightTextProps = {
  /** 待渲染文本（会被强制 toString） */
  text: React.ReactNode;
  /** 搜索关键字，字符串会按空白切分为多个 token；也可传入字符串数组 */
  query: string | string[];
  /** 是否大小写敏感 */
  caseSensitive?: boolean;
  /** 自动转义正则特殊字符 */
  autoEscape?: boolean;
  /** 自定义高亮样式 */
  highlightClassName?: string;
  /** 自定义包裹标签，默认 mark */
  highlightTag?: keyof JSX.IntrinsicElements;
  /** 如果为 true，仅整词匹配（对英文有效） */
  wholeWord?: boolean;
};

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function splitKeywords(input: string | string[]): string[] {
  const arr = Array.isArray(input)
    ? input
    : (input || "")
        .split(/\s+/)
        .map(s => s.trim())
        .filter(Boolean);
  // 去重
  return Array.from(new Set(arr));
}

function buildRegex(tokens: string[], opts: { caseSensitive?: boolean; autoEscape?: boolean; wholeWord?: boolean }) {
  if (!tokens.length) return null;
  const parts = tokens.map(t => (opts.autoEscape ? escapeRegExp(t) : t)).filter(Boolean);
  if (!parts.length) return null;

  // 英文整词边界：\b；对 CJK 不生效，因此仅在 wholeWord 时对 token 使用 \b 包裹
  const pat = parts
    .map(p => (opts.wholeWord ? `\\b${p}\\b` : p))
    .join("|");
  try {
    return new RegExp(pat, opts.caseSensitive ? "g" : "gi");
  } catch {
    // 回退：如果用户输入形成非法正则，降级转义
    const safe = parts.map(escapeRegExp).join("|");
    return new RegExp(safe, opts.caseSensitive ? "g" : "gi");
  }
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  query,
  caseSensitive = false,
  autoEscape = true,
  highlightClassName = "bg-yellow-200/70 text-inherit rounded-sm px-0.5",
  highlightTag = "mark",
  wholeWord = false,
}) => {
  const content = (text ?? "").toString();
  const tokens = useMemo(() => splitKeywords(query), [JSON.stringify(query)]);
  const regex = useMemo(
    () => buildRegex(tokens, { caseSensitive, autoEscape, wholeWord }),
    [caseSensitive, autoEscape, wholeWord, JSON.stringify(tokens)]
  );

  if (!regex || !tokens.length || !content) return <>{content}</>;

  const Tag = highlightTag as any;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    const start = match.index;
    const end = start + match[0].length;
    if (start > lastIndex) {
      parts.push(content.slice(lastIndex, start));
    }
    parts.push(
      <Tag key={`${start}-${end}`} className={highlightClassName}>
        {content.slice(start, end)}
      </Tag>
    );
    lastIndex = end;
    // 防止零宽匹配死循环
    if (regex.lastIndex === start) regex.lastIndex++;
  }
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return <>{parts}</>;
};

/**
 * 工具：生成 antd Table 列渲染器
 * 示例：
 *   const renderName = buildHighlighter({ query: keyword });
 *   { title: 'Name', dataIndex: 'name', render: renderName }
 */
export function buildHighlighter(opts: Omit<HighlightTextProps, "text">) {
  return function render(text: any) {
    return <HighlightText text={text} {...opts} />;
  };
}

/**
 * ⚠️ 注意：将 `label` 直接替换为 ReactNode 会影响默认搜索行为（`optionFilterProp` 默认为 `value`，
 *  且当 label 为 ReactNode 时，基于 label 的字符串匹配会失效）。
 *
 * ✅ 推荐做法：保持 `options[].label` 为字符串用于过滤，通过 Select 的 `optionRender`
 *  来定制下拉项的渲染，以显示高亮效果，同时不破坏搜索。
 *
 * 用法：
 *   const optionRender = makeOptionRenderHighlighter({ query: searchValue });
 *   <Select
 *     showSearch
 *     optionFilterProp="label"
 *     options={options}      // 其中 options[i].label 需保持为 string
 *     optionRender={optionRender}
 *   />
 */
export function makeOptionRenderHighlighter(
  opts: Omit<HighlightTextProps, "text">
) {
  // antd v5: optionRender(option, dom) => ReactNode
  // 为避免样式收缩，保留 antd 生成的 dom 外壳，仅替换其 children
  return function optionRender(option: any, dom?: React.ReactNode) {
    const label: React.ReactNode = option?.data?.label ?? option?.label;
    const highlighted = <HighlightText text={label} {...opts} />;

    if (React.isValidElement(dom)) {
      // 保留 antd 的 .ant-select-item-option-content 等结构和样式
      return React.cloneElement(dom as React.ReactElement, {
        children: highlighted,
      });
    }
    // 兜底：如果 dom 不存在（极少数自定义场景），给出与 antd 一致的包裹类名，避免宽度异常
    return <div className="ant-select-item-option-content">{highlighted}</div>;
  };
}

/**
 * 工具：给 AntD v5 Select options 映射高亮 label
 * 示例：
 *   const mapped = mapOptionsWithHighlight(options, { query: keyword });
 *   <Select showSearch options={mapped} />
 */
export function mapOptionsWithHighlight<T extends { label: React.ReactNode }>(
  options: T[],
  opts: Omit<HighlightTextProps, "text">
): T[] {
  return options.map(o => ({
    ...o,
    label: <HighlightText text={o.label} {...opts} />,
  }));
}

/**
 * 进阶：自定义高亮样式
 * - 默认使用 <mark> 标签并配合 Tailwind 的浅黄底；
 * - 你可以把 highlightTag 改为 'span'，并传入自定义类名；
 * - 或者在全局 CSS 定义 mark { background-color: ... }；
 */

export default HighlightText;
