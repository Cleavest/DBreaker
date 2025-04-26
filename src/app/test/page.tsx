'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
});

export default function GamePage() {
    const [sqlQuery, setSqlQuery] = useState('');
    const [queryResults, setQueryResults] = useState<any[]>([]);

    return (
        <div className="h-96">
            <MonacoEditor
                height="100%"
                defaultLanguage="sql"
                theme="vs-dark"
                value={sqlQuery}
                onChange={(value) => setSqlQuery(value || '')}
                options={{
                    minimap: {
                        enabled: false,
                    },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
}
