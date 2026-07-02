import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CodePreview({code, language = 'javascript'}) {
    return (
        <div className="overflow-hidden rounded-2xl bg-[#050816]">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            <SyntaxHighlighter
                language={language}
                style={oneDark}
                customStyle={{
                    margin: 0,
                    padding: '24px',
                    background: 'transparent',
                    fontSize: '14px',
                }}
                showLineNumbers
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}
