import { ReactNode } from "react";

export * from "sdk/types/orders";

export type OrderError = {
  msg: ReactNode;
  key: string;
  level: "error" | "warning";
};

export type OrderErrors = {
  errors: OrderError[];
  level: "error" | "warning" | undefined;
};
