import { useState } from 'react';
import {
  EditorBubbleMenu,
  EditorFloatingMenu,
  EditorProvider,
  EditorSelector,
  EditorLinkSelector,
  EditorClearFormatting,
  EditorFormatBold,
  EditorFormatItalic,
  EditorFormatStrike,
  EditorFormatCode,
  EditorFormatSubscript,
  EditorFormatSuperscript,
  EditorFormatUnderline,
  EditorNodeText,
  EditorNodeHeading1,
  EditorNodeHeading2,
  EditorNodeHeading3,
  EditorNodeBulletList,
  EditorNodeOrderedList,
  EditorNodeTaskList,
  EditorNodeQuote,
  EditorNodeCode,
  EditorNodeTable,
  EditorTextColor,
  EditorBackgroundColor,
  EditorTableMenu,
  EditorTableGlobalMenu,
  EditorTableColumnMenu,
  EditorTableRowMenu,
  EditorTableColumnBefore,
  EditorTableColumnAfter,
  EditorTableRowBefore,
  EditorTableRowAfter,
  EditorTableColumnDelete,
  EditorTableRowDelete,
  EditorTableHeaderColumnToggle,
  EditorTableHeaderRowToggle,
  EditorTableDelete,
  EditorTableMergeCells,
  EditorTableSplitCell,
  EditorTableFix,
  EditorCharacterCount,
} from '@/components/ui/kibo-ui/editor';
import { Editor, JSONContent } from '@tiptap/core';

const textColors = [
  { name: 'Red', color: '#b91c1c' },
  { name: 'Orange', color: '#c2410c' },
  { name: 'Amber', color: '#b45309' },
  { name: 'Yellow', color: '#a16207' },
];

const backgroundColors = [
  { name: 'Red', color: '#fca5a5' },
  { name: 'Orange', color: '#fdba74' },
  { name: 'Amber', color: '#fcd34d' },
  { name: 'Yellow', color: '#fde047' },
];

export const KiboEditor = () => {
  const [content, setContent] = useState<JSONContent>({"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Heading 1"}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Heading 2"}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Heading 3"}]},{"type":"heading","attrs":{"level":4},"content":[{"type":"text","text":"Heading 4"}]},{"type":"heading","attrs":{"level":5},"content":[{"type":"text","text":"Heading 5"}]},{"type":"heading","attrs":{"level":6},"content":[{"type":"text","text":"Heading 6"}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Hello, world."}]},{"type":"paragraph"},{"type":"taskList","content":[{"type":"taskItem","attrs":{"checked":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"This is a todo list"}]}]},{"type":"taskItem","attrs":{"checked":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"With two items"}]}]}]},{"type":"paragraph"},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"This is an unordered list"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"With a nested item"}]}]}]}]}]},{"type":"paragraph"},{"type":"orderedList","attrs":{"start":1},"content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"This is an ordered list"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"With two items"}]}]}]},{"type":"paragraph"},{"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"This is a quote, probably by someone famous."}]}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"This is some "},{"type":"text","marks":[{"type":"code"}],"text":"inline code"},{"type":"text","text":", while this is a code block:"}]},{"type":"paragraph"},{"type":"codeBlock","attrs":{"language":null},"content":[{"type":"text","text":"function x () {\n  console.log('hello, world.');\n}"}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"You can also create complex tables, like so:"}]},{"type":"table","content":[{"type":"tableRow","content":[{"type":"tableHeader","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph","content":[{"type":"text","text":"Here’s a column"}]}]},{"type":"tableHeader","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph","content":[{"type":"text","text":"Another column"}]}]},{"type":"tableHeader","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph","content":[{"type":"text","text":"Yet another"}]}]}]},{"type":"tableRow","content":[{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph","content":[{"type":"text","text":"Cell 1A"}]}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph","content":[{"type":"text","text":"Cell 2A"}]}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph","content":[{"type":"text","text":"Cell 3A"}]}]}]},{"type":"tableRow","content":[{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph","content":[{"type":"text","text":"Cell 1B"}]}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph","content":[{"type":"text","text":"Cell 2B"}]}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph","content":[{"type":"text","text":"Cell 3B"}]}]}]}]}]});

  const handleUpdate = ({ editor }: { editor: Editor }) => {
    const json = editor.getJSON();

    setContent(json);
    console.log(JSON.stringify(json));
  };

  return (
    <div className="bg-secondary flex h-screen w-full items-center justify-center p-8">
      <EditorProvider
        content={content}
        placeholder="Start typing..."
        className="bg-background rounded-lg border w-full h-full p-4 overflow-y-auto"
        onUpdate={handleUpdate}
      >
        <EditorFloatingMenu>
          <EditorNodeHeading1 hideName />
          <EditorNodeBulletList hideName />
          <EditorNodeQuote hideName />
          <EditorNodeCode hideName />
          <EditorNodeTable hideName />
        </EditorFloatingMenu>
        <EditorBubbleMenu>
          <EditorSelector title="Text" open={false} onOpenChange={(open) => console.log('Open state changed:', open)}>
            <EditorNodeText />
            <EditorNodeHeading1 />
            <EditorNodeHeading2 />
            <EditorNodeHeading3 />
            <EditorNodeBulletList />
            <EditorNodeOrderedList />
            <EditorNodeTaskList />
            <EditorNodeQuote />
            <EditorNodeCode />
          </EditorSelector>
          <EditorSelector title="Format" open={false} onOpenChange={(open) => console.log('Open state changed:', open)}>
            <EditorFormatBold />
            <EditorFormatItalic />
            <EditorFormatUnderline />
            <EditorFormatStrike />
            <EditorFormatCode />
            <EditorFormatSuperscript />
            <EditorFormatSubscript />
          </EditorSelector>
          <EditorSelector title="Color" open={false} onOpenChange={(open) => console.log('Open state changed:', open)}>
            {textColors.map((color) => (
              <EditorTextColor key={color.name} color={color.color} name={color.name} />
            ))}
            {backgroundColors.map((color) => (
              <EditorBackgroundColor key={color.name} color={color.color} name={color.name} />
            ))}
          </EditorSelector>
          <EditorLinkSelector open={false} onOpenChange={(open) => console.log('Link selector open state:', open)} />
          <EditorClearFormatting />
        </EditorBubbleMenu>
        <EditorTableMenu>
          <EditorTableColumnMenu>
            <EditorTableColumnBefore />
            <EditorTableColumnAfter />
            <EditorTableColumnDelete />
          </EditorTableColumnMenu>
          <EditorTableRowMenu>
            <EditorTableRowBefore />
            <EditorTableRowAfter />
            <EditorTableRowDelete />
          </EditorTableRowMenu>
          <EditorTableGlobalMenu>
            <EditorTableHeaderColumnToggle />
            <EditorTableHeaderRowToggle />
            <EditorTableDelete />
            <EditorTableMergeCells />
            <EditorTableSplitCell />
            <EditorTableFix />
          </EditorTableGlobalMenu>
        </EditorTableMenu>
        <EditorCharacterCount.Words>字數：</EditorCharacterCount.Words>
      </EditorProvider>
    </div>
  );
}