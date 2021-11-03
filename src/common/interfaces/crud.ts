/**
 * interface for CRUD operations
 */
export interface CRUD {
    list: (limit: number, page: number) => Promise<any>,
    create: (resource: any) => Promise<any>,
    readById: (resourceId: any) => Promise<any>,
    readByUrl: (resouceUrl: string) => Promise<any>
}