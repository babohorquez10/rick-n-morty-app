type FilterButtonProps = {
  label: string;
  active: boolean;
  handleClick: () => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  active,
  handleClick,
}) => {
  return (
    <button
      className={`border-grey-border border-2 rounded-lg py-3 text-center font-semibold text-sm ${
        active ? "text-primary-600" : "text-filter-button-text"
      } ${active ? "bg-primary-100" : "bg-white"}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default FilterButton;
