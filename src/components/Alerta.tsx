import type { ReactNode } from "react";

type AlertaProps = {
  children: ReactNode;
};

export default function Alerta({ children }: AlertaProps) {
  return (
    <p className="bg-red-50 text-red-600 p-3 text-sm font-bold text-center">
      {children}
    </p>
  );
}
