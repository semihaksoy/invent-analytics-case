import { Pagination, Table } from "antd";
import type { Movie } from "../../types/api/movies.types";
import styles from "./TableComponent.module.scss";

interface TableComponentProps {
  loading?: boolean;
  data: Movie[];
  columns: { title: string; dataIndex: string; key: string }[];
  showPagination?: boolean;
  totalResults?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onRowClick?: (record: Movie) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  loading = false,
  data,
  columns = [],
  showPagination = true,
  totalResults,
  currentPage,
  onPageChange,
  onRowClick,
}) => {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        onRow={(record) => ({
          onClick: () => onRowClick && onRowClick(record),
        })}
        rowKey="imdbID"
        rowClassName={styles.cursorPointer}
      />
      {showPagination && (
        <Pagination
          total={totalResults}
          current={currentPage}
          onChange={onPageChange}
          showSizeChanger={false}
          className="mt-20 ta-center"
        />
      )}
    </div>
  );
};

export default TableComponent;
