import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import MasterBrokerContext from "context/MasterBrokerContext";

const headCells = [
  {
    id: "kode_broker",
    numeric: false,
    disablePadding: false,
    label: "Kode Broker",
  },
  {
    id: "kode_produk",
    numeric: false,
    disablePadding: false,
    label: "Kode Produk",
  },
  { id: "tenor", numeric: true, disablePadding: false, label: "Tenor" },
  {
    id: "umur",
    numeric: true,
    disablePadding: false,
    label: "Umur",
  },
  {
    id: "rate",
    numeric: true,
    disablePadding: false,
    label: "Rate",
  },
  {
    id: "okupasi",
    numeric: true,
    disablePadding: false,
    label: "Okupasi",
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
        <TableCell
          id={headCells[2].id}
          key={headCells[2].id}
          align="left"
          padding={headCells[2].disablePadding ? "none" : "default"}
          sortDirection={orderBy === headCells[2].id ? order : false}
          className={classes.cell}
        >
          <TableSortLabel
            active={orderBy === headCells[2].id}
            direction={orderBy === headCells[2].id ? order : "asc"}
            onClick={createSortHandler(headCells[2].id)}
          >
            {headCells[2].label}
            {orderBy === headCells[2].id ? (
              <span className={classes.visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell
          id={headCells[3].id}
          key={headCells[3].id}
          align="left"
          padding={headCells[3].disablePadding ? "none" : "default"}
          sortDirection={orderBy === headCells[3].id ? order : false}
          className={classes.cell}
        >
          <TableSortLabel
            active={orderBy === headCells[3].id}
            direction={orderBy === headCells[3].id ? order : "asc"}
            onClick={createSortHandler(headCells[3].id)}
          >
            {headCells[3].label}
            {orderBy === headCells[3].id ? (
              <span className={classes.visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell
          id={headCells[4].id}
          key={headCells[4].id}
          align="left"
          padding={headCells[4].disablePadding ? "none" : "default"}
          sortDirection={orderBy === headCells[4].id ? order : false}
          className={classes.cell}
        >
          <TableSortLabel
            active={orderBy === headCells[4].id}
            direction={orderBy === headCells[4].id ? order : "asc"}
            onClick={createSortHandler(headCells[4].id)}
          >
            {headCells[4].label}
            {orderBy === headCells[4].id ? (
              <span className={classes.visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell
          id={headCells[5].id}
          key={headCells[5].id}
          align="left"
          padding={headCells[5].disablePadding ? "none" : "default"}
          sortDirection={orderBy === headCells[5].id ? order : false}
          className={classes.cell}
        >
          <TableSortLabel
            active={orderBy === headCells[5].id}
            direction={orderBy === headCells[5].id ? order : "asc"}
            onClick={createSortHandler(headCells[5].id)}
          >
            {headCells[5].label}
            {orderBy === headCells[5].id ? (
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
