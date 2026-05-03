'use client';

import { Blog } from '../../../../payload-types';

interface BlogContentProps {
  content: Blog['content'];
  className?: string;
}

interface Node {
  [k: string]: unknown;
  type: string;
  version: number;
  children?: Node[];
}

export default function BlogContent({ content, className = '' }: BlogContentProps) {
  // Render Lexical structure properly
  const renderNode = (node: Node, index: number): React.ReactNode => {
    if (!node) return null;

    // Handle line break nodes
    if (node.type === 'linebreak') {
      return <br key={index} />;
    }

    // Handle text nodes
    if (node.text) {
      // Preserve line breaks within text
      const textParts = (node.text as string).split('\n');
      if (textParts.length > 1) {
        return textParts.map((part: string, partIndex: number) => (
          <span key={`${index}-${partIndex}`}>
            {part}
            {partIndex < textParts.length - 1 && <br />}
          </span>
        ));
      }
      return node.text as string;
    }

    // Handle paragraph nodes
    if (node.type === 'paragraph') {
      const children = node.children?.map((child: Node, childIndex: number) =>
        renderNode(child, childIndex)
      );
      return <p key={index} className="mb-4">{children}</p>;
    }

    // Handle heading nodes
    if (node.type === 'heading') {
      const children = node.children?.map((child: Node, childIndex: number) =>
        renderNode(child, childIndex)
      );
      const headingLevel = node.tag || '2';

      switch (headingLevel) {
        case '1':
          return <h1 key={index} className="text-3xl font-bold mb-4">{children}</h1>;
        case '2':
          return <h2 key={index} className="text-2xl font-bold mb-4">{children}</h2>;
        case '3':
          return <h3 key={index} className="text-xl font-bold mb-4">{children}</h3>;
        case '4':
          return <h4 key={index} className="text-lg font-bold mb-4">{children}</h4>;
        case '5':
          return <h5 key={index} className="text-base font-bold mb-4">{children}</h5>;
        case '6':
          return <h6 key={index} className="text-sm font-bold mb-4">{children}</h6>;
        default:
          return <h2 key={index} className="text-2xl font-bold mb-4">{children}</h2>;
      }
    }

    // Handle list nodes
    if (node.type === 'list') {
      const children = node.children?.map((child: Node, childIndex: number) =>
        renderNode(child, childIndex)
      );
      const ListTag = node.listType === 'number' ? 'ol' : 'ul';
      return <ListTag key={index} className="mb-4 ml-6">{children}</ListTag>;
    }

    // Handle list item nodes
    if (node.type === 'listitem') {
      const children = node.children?.map((child: Node, childIndex: number) =>
        renderNode(child, childIndex)
      );
      return <li key={index} className="mb-2">{children}</li>;
    }

    // Handle quote nodes
    if (node.type === 'quote') {
      const children = node.children?.map((child: Node, childIndex: number) =>
        renderNode(child, childIndex)
      );
      return (
        <blockquote key={index} className="border-l-4 border-gray-400 pl-4 mb-4 italic">
          {children}
        </blockquote>
      );
    }

    // Handle code block nodes
    if (node.type === 'code') {
      const children = node.children?.map((child: Node, childIndex: number) =>
        renderNode(child, childIndex)
      );
      return (
        <pre key={index} className="bg-gray-800 p-4 rounded-lg mb-4 overflow-x-auto">
          <code>{children}</code>
        </pre>
      );
    }

    // Handle other nodes with children
    if (node.children && Array.isArray(node.children)) {
      return node.children.map((child: Node, childIndex: number) =>
        renderNode(child, childIndex)
      );
    }

    return null;
  };

  if (!content) {
    return <p className="text-gray-400">No content available</p>;
  }

  if (typeof content === 'object' && content.root) {
    const renderedContent = content.root.children?.map((child: Node, index: number) =>
      renderNode(child, index)
    );

    return (
      <div className={`text-gray-100 prose prose-lg prose-invert max-w-none whitespace-pre-line ${className}`}>
        {renderedContent && renderedContent.length > 0 ? renderedContent : <p>No content available</p>}
      </div>
    );
  }

  // Fallback for string content - safely display as text
  const contentStr = content.toString();
  const cleanText = contentStr.replace(/<[^>]*>/g, ''); // Strip HTML tags for safety

  return (
    <div className={`text-gray-100 prose prose-lg prose-invert max-w-none whitespace-pre-line ${className}`}>
      <p>{cleanText || 'No content available'}</p>
    </div>
  );
}
