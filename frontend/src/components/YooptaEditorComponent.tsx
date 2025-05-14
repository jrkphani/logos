import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

// This is a placeholder for the actual Yoopta editor import
// In a real implementation, you would import from the Yoopta library
// import { Editor, useEditor } from '@yoopta/editor';
// import { Paragraph, Heading, BulletList } from '@yoopta/paragraphs';
// import { Bold, Italic } from '@yoopta/marks';

// Define the props for the YooptaEditorComponent
interface YooptaEditorComponentProps {
  documentId?: string;
  initialValue?: any[];
  onUpdate?: () => void;
}

// Define the ref methods that will be exposed to parent components
export interface YooptaEditorRef {
  getMarkdown: () => Promise<string>;
  resetDirty: () => void;
  isDirty: () => boolean;
}

// Sample conversion function (placeholder)
const convertYooptaToMarkdown = async (content: any[]): Promise<string> => {
  // In a real implementation, this would use Yoopta's export functionality
  // For now, return a simple string representation
  return content
    .map((block) => {
      if (block.type === 'heading') {
        const level = block.level || 1;
        const text = block.value?.[0]?.children?.[0]?.text || '';
        return `${'#'.repeat(level)} ${text}`;
      } else if (block.type === 'paragraph') {
        const text = block.value?.[0]?.children?.[0]?.text || '';
        return text;
      }
      return '';
    })
    .join('\n\n');
};

// Sample conversion function (placeholder)
export const convertMarkdownToYooptaValue = (markdown: string): any[] => {
  // In a real implementation, this would use Yoopta's import functionality
  // For now, create simple blocks from markdown lines
  if (!markdown || typeof markdown !== 'string') {
    return [
      {
        id: Math.random().toString(36).substring(2, 9),
        type: 'paragraph',
        value: [{
          id: Math.random().toString(36).substring(2, 9),
          type: 'text',
          children: [{ text: 'Start writing...' }]
        }]
      }
    ];
  }

  return markdown.split('\n').filter(line => line.trim()).map(line => {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      return {
        id: Math.random().toString(36).substring(2, 9),
        type: 'heading',
        level,
        value: [{
          id: Math.random().toString(36).substring(2, 9),
          type: 'text',
          children: [{ text }]
        }]
      };
    }
    
    return {
      id: Math.random().toString(36).substring(2, 9),
      type: 'paragraph',
      value: [{
        id: Math.random().toString(36).substring(2, 9),
        type: 'text',
        children: [{ text: line }]
      }]
    };
  });
};

export const YooptaEditorComponent = forwardRef<YooptaEditorRef, YooptaEditorComponentProps>(
  ({ documentId, initialValue, onUpdate }, ref) => {
    const [content, setContent] = useState<any[]>(
      initialValue || [
        {
          id: 'default',
          type: 'paragraph',
          value: [
            {
              id: 'default-text',
              type: 'text',
              children: [{ text: 'Start writing...' }]
            }
          ]
        }
      ]
    );
    const [isDirtyState, setIsDirtyState] = useState(false);
    const [editorText, setEditorText] = useState('');

    // Reset content when initialValue changes
    useEffect(() => {
      if (initialValue && initialValue.length > 0) {
        setContent(initialValue);
        setIsDirtyState(false);
        
        // Extract initial text to display in the editor
        const initialText = initialValue
          .map(block => {
            const text = block.value?.[0]?.children?.[0]?.text || '';
            return block.type === 'heading' ? `${block.level ? '#'.repeat(block.level) + ' ' : ''}${text}` : text;
          })
          .join('\n\n');
        
        setEditorText(initialText);
      }
    }, [initialValue]);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      getMarkdown: async () => {
        return await convertYooptaToMarkdown(content);
      },
      resetDirty: () => {
        setIsDirtyState(false);
      },
      isDirty: () => {
        return isDirtyState;
      }
    }));

    // Updated editor change handler
    const handleContentChange = (text: string) => {
      // Parse the text input into structured content
      const lines = text.split('\n').filter(line => line.trim());
      const newContent = lines.length > 0 ? lines.map((line, index) => {
        const id = `content-${index}-${Date.now()}`;
        const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
        
        if (headingMatch) {
          const level = headingMatch[1].length;
          const headingText = headingMatch[2];
          return {
            id,
            type: 'heading',
            level,
            value: [{
              id: `${id}-text`,
              type: 'text',
              children: [{ text: headingText }]
            }]
          };
        }
        
        return {
          id,
          type: 'paragraph',
          value: [{
            id: `${id}-text`,
            type: 'text',
            children: [{ text: line }]
          }]
        };
      }) : [
        {
          id: `default-${Date.now()}`,
          type: 'paragraph',
          value: [{
            id: `default-text-${Date.now()}`,
            type: 'text',
            children: [{ text: text || 'Start writing...' }]
          }]
        }
      ];
      
      setContent(newContent);
      setIsDirtyState(true);
      if (onUpdate) {
        onUpdate();
      }
    };

    return (
      <Box 
        className="yoopta-editor-container" 
        minH="400px"
        p={4} 
        bg="white" 
        borderRadius="md"
        boxShadow="sm"
      >
        {/* This is a placeholder UI for the Yoopta editor */}
        {/* Now using a controlled approach instead of contentEditable */}
        <Box className="editor-content">
          {/* Display rendered content for visual representation */}
          {content.map((block) => {
            const text = block.value?.[0]?.children?.[0]?.text || '';
            const blockKey = block.id || `block-${Math.random()}`;
            
            if (block.type === 'heading') {
              const level = block.level || 1;
              switch (level) {
                case 1: return <h1 key={blockKey}>{text}</h1>;
                case 2: return <h2 key={blockKey}>{text}</h2>;
                case 3: return <h3 key={blockKey}>{text}</h3>;
                case 4: return <h4 key={blockKey}>{text}</h4>;
                case 5: return <h5 key={blockKey}>{text}</h5>;
                case 6: return <h6 key={blockKey}>{text}</h6>;
                default: return <h1 key={blockKey}>{text}</h1>;
              }
            }
            return <p key={blockKey}>{text}</p>;
          })}

          {/* Actual editing interface */}
          <textarea
            value={editorText}
            onChange={(e) => {
              setEditorText(e.target.value);
              handleContentChange(e.target.value);
            }}
            style={{
              width: '100%',
              minHeight: '300px',
              marginTop: '20px',
              padding: '10px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              resize: 'vertical'
            }}
            placeholder="Start writing..."
          />
        </Box>
      </Box>
    );
  }
);

YooptaEditorComponent.displayName = 'YooptaEditorComponent'; 