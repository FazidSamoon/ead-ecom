import PropTypes from "prop-types";

const CommonTable = ({ tableHeaders, tableRows, onRowClick, sort, filter }) => {
  return (
    <div className="table-responsive">
      <div className=" d-flex justify-content-between">
        <div className=" px-2">{sort}</div>
        <div className=" px-2">{filter}</div>
      </div>
      <table className="table  table-hover shadow-sm">
        <thead className="thead-light">
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row) => (
            <tr
              key={row.id}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              style={{ cursor: "pointer" }}
              className="table-row"
            >
              {tableHeaders.map((header) => (
                <td key={header.key}>{row[header.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

CommonTable.propTypes = {
  tableHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  tableRows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowClick: PropTypes.func,
  sort: PropTypes.element,
  filter: PropTypes.element,
};

export default CommonTable;
