import { useState } from "react";
import {
  Play,
  AlertCircle,
  Loader2,
  Command,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SQLEditor } from "./SQLEditor";
import { useDatabase } from "../../hooks/useDatabase";
import type { QueryResult } from "../../services/DatabaseService";

interface SQLWorkspaceProps {
  caseId: string;
}

export function SQLWorkspace({ caseId }: SQLWorkspaceProps) {
  const [query, setQuery] = useState("");
  const [investigationError, setError] = useState("");
  const [evidence, setResults] = useState<QueryResult>({
    columns: [],
    values: [],
  });
  const [isExecuting, setIsExecuting] = useState(false);
  const [isResultsExpanded, setIsResultsExpanded] = useState(true);

  const { isInvestigating, investigationError: dbError, runInvestigation } = useDatabase(caseId);

  const handleExecute = async () => {
    try {
      if (!query.trim()) {
        setError("Query cannot be empty");
        setResults({ columns: [], values: [] });
        return;
      }

      setIsExecuting(true);
      setError("");
      setIsResultsExpanded(true);

      // Clear previous evidence first to avoid stale state
      setResults({ columns: [], values: [] });

      const result = await runInvestigation(query);

      if (result.investigationError) {
        setError(result.investigationError);
        setResults({ columns: [], values: [] });
      } else {
        // Validate that the number of columns matches the data
        const isValid = result.values.every(
          (row) => row.length === result.columns.length
        );
        if (!isValid) {
          setError("Query result structure is invalid");
          setResults({ columns: [], values: [] });
          return;
        }

        // Set the new evidence atomically
        setResults({
          columns: result.columns,
          values: result.values,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An investigationError occurred");
      setResults({ columns: [], values: [] });
    } finally {
      setIsExecuting(false);
    }
  };

  if (isInvestigating) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 text-amber-700 animate-spin" />
        <span className="ml-2 text-amber-900">Loading database...</span>
      </div>
    );
  }

  if (dbError) {
    return (
      <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded">
        <p className="font-bold">Failed to load database</p>
        <p className="text-sm">{dbError}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-amber-900 rounded-lg overflow-hidden">
        <div className="bg-amber-800 px-4 py-2 flex justify-between items-center">
          <span className="text-amber-100 font-detective">SQL Query</span>
          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className={`flex items-center px-4 py-1 rounded text-sm transition-colors ${
              isExecuting
                ? "bg-amber-800 text-amber-300 cursor-not-allowed"
                : "bg-amber-700 hover:bg-amber-600 text-amber-100"
            }`}
          >
            {isExecuting ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-1" />
            )}
            Execute
            <span className="hidden md:flex items-center ml-2 text-xs opacity-75">
              <Command className="w-3 h-3 mr-1" />
              Enter
            </span>
          </button>
        </div>
        <div className="bg-amber-950">
          <SQLEditor
            value={query}
            onChange={setQuery}
            onExecute={handleExecute}
            placeholder="SELECT * FROM some_table WHERE..."
            caseId={caseId}
          />
        </div>
      </div>

      {investigationError && (
        <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Error in query</p>
            <p className="text-sm">{investigationError}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg overflow-hidden shadow border border-amber-900/10">
        <button
          onClick={() => setIsResultsExpanded(!isResultsExpanded)}
          className="w-full bg-amber-100 px-4 py-2 flex items-center justify-between hover:bg-amber-200/50 transition-colors"
        >
          <span className="text-amber-900 font-detective">Results</span>
          {isResultsExpanded ? (
            <ChevronUp className="w-4 h-4 text-amber-700" />
          ) : (
            <ChevronDown className="w-4 h-4 text-amber-700" />
          )}
        </button>

        {isResultsExpanded && (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-amber-50">
                <tr>
                  {evidence.columns.map((column) => (
                    <th
                      key={column}
                      className="px-6 py-3 text-left text-xs font-detective text-amber-900 tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-amber-200">
                {evidence.values.map((row, i) => (
                  <tr key={i}>
                    {row.map((value: any, j) => (
                      <td
                        key={j}
                        className="px-6 py-4 whitespace-nowrap text-sm text-amber-900"
                      >
                        {value === null ? (
                          <span className="text-amber-400 italic">NULL</span>
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                {evidence.values.length === 0 && (
                  <tr>
                    <td
                      colSpan={Math.max(1, evidence.columns.length)}
                      className="px-6 py-4 whitespace-nowrap text-sm text-amber-900 italic"
                    >
                      No evidence yet. Execute a query to see the evidence.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
