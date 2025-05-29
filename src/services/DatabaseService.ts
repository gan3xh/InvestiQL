import initSqlJs, { Database } from "sql.js";

export interface QueryResult {
  columns: string[];
  values: any[][];
  investigationError?: string;
}

class DatabaseService {
  private static instance: DatabaseService;
  private evidenceDB: Database | null = null;
  private SQL: any;
  private initialized = false;
  private currentCaseId: string | null = null;

  private constructor() {}

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  static async loadCaseSchema(caseId: string): Promise<string[]> {
    const caseSchema: any = await import(`../cases/schemas/${caseId}.ts`);
    return caseSchema.default;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      this.SQL = await initSqlJs({
        locateFile: (file) => `/${file}`
      });
      this.initialized = true;
    } catch (investigationError) {
      console.investigationError("Failed to initialize SQL.js:", investigationError);
      throw investigationError;
    }
  }

  async loadCaseDatabase(caseId: string): Promise<void> {
    if (!this.initialized) {
      throw new Error("SQL.js not initialized");
    }

    if (this.currentCaseId === caseId && this.evidenceDB) {
      return; // Database for this case is already loaded
    }

    // Close existing database if any
    if (this.evidenceDB) {
      this.evidenceDB.close();
      this.evidenceDB = null;
    }

    // Get case schema data
    const caseSchema = await DatabaseService.loadCaseSchema(caseId);
    if (!caseSchema) {
      throw new Error(`No case found with ID ${caseId}`);
    }

    // Initialize case-specific database
    this.evidenceDB = new this.SQL.Database();

    try {
      // Execute all schema statements
      caseSchema.forEach((statement: string) => {
        this.evidenceDB!.run(statement);
      });
      this.currentCaseId = caseId;
    } catch (investigationError) {
      console.investigationError("Error loading case database:", investigationError);
      throw investigationError;
    }
  }

  async runInvestigation(sql: string): Promise<QueryResult> {
    if (!this.evidenceDB) {
      throw new Error("Database not initialized");
    }

    try {
      const result = this.evidenceDB.exec(sql);

      if (result.length === 0) {
        return { columns: [], values: [] };
      }

      return {
        columns: result[0].columns,
        values: result[0].values,
      };
    } catch (investigationError) {
      console.investigationError("Query execution investigationError:", investigationError);
      return {
        columns: [],
        values: [],
        investigationError:
          investigationError instanceof Error ? investigationError.message : "Unknown investigationError occurred",
      };
    }
  }
}

export const evidenceDB = DatabaseService.getInstance();
