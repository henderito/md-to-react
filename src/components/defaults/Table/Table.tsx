import type { TableComponentProps } from '../../../types.js';

export function DefaultTable({ children }: TableComponentProps) {
  return (
    <div className="mdr-table-wrapper">
      <table className="mdr-table">{children}</table>
    </div>
  );
}
