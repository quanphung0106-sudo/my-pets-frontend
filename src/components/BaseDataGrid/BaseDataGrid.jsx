import { DataGrid } from "@mui/x-data-grid";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useState } from "react";

const BaseDataGrid = (props) => {
  const {
    data,
    columns,
    rows,
    rowPerPage,
    className,
    rowsPerPageOptions,
    ...others
  } = props;
  const [pageSize, setPageSize] = useState(rowPerPage);

  return (
    <DataGrid
      {...others}
      className={clsx(className)}
      disableColumnMenu
      disableColumnFilter
      disableVirtualization
      disableColumnSelector
      columns={columns}
      rows={rows !== undefined ? rows : []}
      loading={rows === undefined}
      disableSelectionOnClick
      pagination
      pageSize={pageSize ? pageSize : 0}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={rowsPerPageOptions}
      experimentalFeatures={{ newEditingApi: true }}
      rowCount={data?.totalData}
      checkboxSelection
    />
  );
};

BaseDataGrid.prototype = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  rowsPerPageOptions: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object,
};

export default BaseDataGrid;
