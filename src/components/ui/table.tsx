// import * as React from "react";

// import { cn } from "@/lib/utils";

// const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
//   ({ className, ...props }, ref) => (
//     <div className="relative w-full overflow-auto">
//       <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
//     </div>
//   ),
// );
// Table.displayName = "Table";

// const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
//   ({ className, ...props }, ref) => <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />,
// );
// TableHeader.displayName = "TableHeader";

// const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
//   ({ className, ...props }, ref) => (
//     <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
//   ),
// );
// TableBody.displayName = "TableBody";

// const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
//   ({ className, ...props }, ref) => (
//     <tfoot ref={ref} className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props} />
//   ),
// );
// TableFooter.displayName = "TableFooter";

// const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
//   ({ className, ...props }, ref) => (
//     <tr
//       ref={ref}
//       className={cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className)}
//       {...props}
//     />
//   ),
// );
// TableRow.displayName = "TableRow";

// const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
//   ({ className, ...props }, ref) => (
//     <th
//       ref={ref}
//       className={cn(
//         "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
//         className,
//       )}
//       {...props}
//     />
//   ),
// );
// TableHead.displayName = "TableHead";

// const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
//   ({ className, ...props }, ref) => (
//     <td ref={ref} className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
//   ),
// );
// TableCell.displayName = "TableCell";

// const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
//   ({ className, ...props }, ref) => (
//     <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
//   ),
// );
// TableCaption.displayName = "TableCaption";

// export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };




import * as React from "react";
import { View, Text, ScrollView, FlatList, StyleSheet, ViewStyle } from "react-native";

interface TableProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TableHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TableBodyProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TableFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TableRowProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

interface TableHeadProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TableCellProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TableCaptionProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

// Main Table Component
export const Table = ({ children, style }: TableProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
      <View style={[styles.table, style]}>
        <View style={styles.tableContainer}>{children}</View>
      </View>
    </ScrollView>
  );
};

// Table Header
export const TableHeader = ({ children, style }: TableHeaderProps) => {
  return <View style={[styles.tableHeader, style]}>{children}</View>;
};

// Table Body
export const TableBody = ({ children, style }: TableBodyProps) => {
  return <View style={[styles.tableBody, style]}>{children}</View>;
};

// Table Footer
export const TableFooter = ({ children, style }: TableFooterProps) => {
  return <View style={[styles.tableFooter, style]}>{children}</View>;
};

// Table Row
export const TableRow = ({ children, style, onPress }: TableRowProps) => {
  return (
    <View style={[styles.tableRow, style]}>
      {children}
    </View>
  );
};

// Table Head (Header Cell)
export const TableHead = ({ children, style }: TableHeadProps) => {
  return (
    <View style={[styles.tableHead, style]}>
      {typeof children === 'string' ? (
        <Text style={styles.tableHeadText}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
};

// Table Cell
export const TableCell = ({ children, style }: TableCellProps) => {
  return (
    <View style={[styles.tableCell, style]}>
      {typeof children === 'string' ? (
        <Text style={styles.tableCellText}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
};

// Table Caption
export const TableCaption = ({ children, style }: TableCaptionProps) => {
  return (
    <View style={[styles.tableCaption, style]}>
      {typeof children === 'string' ? (
        <Text style={styles.tableCaptionText}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
};

// Data Table Component (for dynamic data)
interface DataTableProps<T> {
  data: T[];
  columns: {
    key: string;
    title: string;
    width?: number;
    render?: (item: T) => React.ReactNode;
  }[];
  onRowPress?: (item: T) => void;
  style?: ViewStyle;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  onRowPress,
  style,
}: DataTableProps<T>) {
  const renderHeader = () => (
    <TableHeader>
      <TableRow>
        {columns.map((column, index) => (
          <TableHead key={index} style={{ width: column.width || 100 }}>
            {column.title}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );

  const renderRow = ({ item }: { item: T }) => (
    <TableRow onPress={() => onRowPress?.(item)}>
      {columns.map((column, index) => (
        <TableCell key={index} style={{ width: column.width || 100 }}>
          {column.render ? column.render(item) : String(item[column.key as keyof T])}
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <View style={[styles.dataTableContainer, style]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {renderHeader()}
          <FlatList
            data={data}
            renderItem={renderRow}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={true}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalScroll: {
    flex: 1,
  },
  table: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  tableContainer: {
    flex: 1,
  },
  tableHeader: {
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableBody: {
    flex: 1,
  },
  tableFooter: {
    backgroundColor: '#f9fafb',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    minHeight: 48,
    alignItems: 'center',
  },
  tableHead: {
    padding: 12,
    minWidth: 100,
    justifyContent: 'center',
  },
  tableHeadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  tableCell: {
    padding: 12,
    minWidth: 100,
    justifyContent: 'center',
  },
  tableCellText: {
    fontSize: 14,
    color: '#4b5563',
  },
  tableCaption: {
    padding: 12,
    marginTop: 8,
  },
  tableCaptionText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  dataTableContainer: {
    flex: 1,
    maxHeight: 400,
  },
});

// Export all components
export default Table;