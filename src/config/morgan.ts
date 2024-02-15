import morgan from "morgan";

export const morganAdapter = (format: string) => {
  if (!format)
    throw new Error("Format is mandatory. Please provide a valid format");
  return morgan(format);
};
