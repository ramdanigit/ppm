import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
// import MasterBrokerContext from "context/MasterBrokerContext";

const headCells = [
  {
    id: "kode_asuransi",
    numeric: false,
    disablePadding: false,
    label: "Nama Dokumen",
  },
  {
    id: "nama_asuransi",
    numeric: false,
    disablePadding: false,
    label: "Deskripsi",
  },
];
function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" align="center" className={classes.cell}>
          Action
        </TableCell>
        <TableCell
          id={headCells[0].id}
          key={headCells[0].id}
          align="left"
          padding={headCells[0].disablePadding ? "none" : "default"}
          sortDirection={orderBy === headCells[0].id ? order : false}
          className={classes.cell}
        >
          <TableSortLabel
            active={orderBy === headCells[0].id}
            direction={orderBy === headCells[0].id ? order : "asc"}
            onClick={createSortHandler(headCells[0].id)}
          >
            {headCells[0].label}
            {orderBy === headCells[0].id ? (
              <span className={classes.visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell
          id={headCells[1].id}
          key={headCells[1].id}
          align="left"
          padding={headCells[1].disablePadding ? "none" : "default"}
          sortDirection={orderBy === headCells[1].id ? order : false}
          className={classes.cell}
        >
          <TableSortLabel
            active={orderBy === headCells[1].id}
            direction={orderBy === headCells[1].id ? order : "asc"}
            onClick={createSortHandler(headCells[1].id)}
          >
            {headCells[1].label}
            {orderBy === headCells[1].id ? (
              <span className={classes.visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  //   numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  // rowCount: PropTypes.number.isRequired
};

export default EnhancedTableHead;
