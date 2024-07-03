//? Patron adaptador TS
export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
}
