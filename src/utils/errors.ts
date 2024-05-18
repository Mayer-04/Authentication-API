export class DatabaseError extends Error {
  constructor(message: string) {
    // El constructor padre establece la propiedad "message"
    super(message);
    // Restablecemos el valor de "name"
    this.name = "DatabaseError";
  }
}
