type ListTitleProps = {
  title: string;
  count: number;
};

const ListTitle: React.FC<ListTitleProps> = ({ title, count }) => {
  return (
    <h2 className="text-xs text-grey font-semibold uppercase tracking-wider my-4">
      {title} ({count})
    </h2>
  );
};

export default ListTitle;
